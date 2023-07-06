import { DenormalizedDoc } from './../../node_modules/@nestjs/swagger/dist/interfaces/denormalized-doc.interface.d';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { OrderItem, Prisma, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto, StatusPedido } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { QueueService } from 'src/queue/queue.service';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    private readonly db: PrismaService,
    private readonly queue: QueueService,
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    try {
      const order = await this.db.order.create({
        data: {
          customerId: createOrderDto.cliente_id,
          status: StatusPedido.PENDENTE.toString(),
        },
      });
      const items = createOrderDto.items.map((item) => {
        return {
          productId: item.id,
          quantity: item.quantidade,
        } as OrderItem;
      });
      const finished = await this.db.order.update({
        where: {
          id: order.id,
        },
        data: {
          items: {
            createMany: {
              data: items,
            },
          },
        },
        include: {
          items: true,
        },
      });

      this.queue.create({
        order_id: finished.id,
        status: finished.status,
      });

      return {
        client_id: finished.customerId,
        status: finished.status,
        id: finished.id,
        items: finished.items.map((item) => {
          return {
            id: item.productId,
            quantidade: item.quantity,
          };
        }),
      };
    } catch (error) {
      this.logger.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Ordem ja cadastrado');
        }
      }
    }
  }

  async findAll() {
    const pedidos = await this.db.order.findMany({ include: { items: true } });

    return pedidos.map((el) => {
      return {
        id: el.id,
        items: el.items.map((item) => {
          return {
            id: item.productId,
            quantidade: item.quantity,
          };
        }),
        status: el.status,
        data_pedido: el.createdAt,
        data_entregue: el.deliveredAt,
      };
    });
  }

  async findOne(orderId: number) {
    const pedido = await this.db.order.findFirst({
      where: { id: orderId },
      include: { items: true },
    });

    if (pedido === null || pedido === undefined) {
      throw new NotFoundException();
    }

    return {
      id: pedido.id,
      items: pedido.items.map((item) => {
        return {
          id: item.productId,
          quantidade: item.quantity,
        };
      }),
      status: pedido.status,
      data_pedido: pedido.createdAt,
      data_entregue: pedido.deliveredAt,
    };
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    for await (const item of updateOrderDto.items) {
      const existItem = await this.db.orderItem.findFirst({
        where: { orderId: id, productId: item.id },
      });

      if (existItem != null) {
        if (item.quantidade <= 0) {
          await this.db.orderItem.delete({ where: { id: existItem.id } });
        } else {
          await this.db.orderItem.update({
            where: { id: existItem.id },
            data: {
              quantity: item.quantidade,
            },
          });
        }
      } else {
        await this.db.orderItem.create({
          data: {
            orderId: id,
            productId: item.id,
            quantity: item.quantidade,
          },
        });
      }
    }

    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.db.orderItem.deleteMany({ where: { orderId: id } });
    await this.db.order.delete({ where: { id: id } });
  }
}
