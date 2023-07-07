import { DenormalizedDoc } from '@nestjs/swagger/dist/interfaces/denormalized-doc.interface';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { OrderItem, Prisma, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePedidoDto, StatusPedido } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Injectable()
export class PedidoService {
  private readonly logger = new Logger(PedidoService.name);
  constructor(private readonly db: PrismaService) { }

  async create(CreatePedidoDto: CreatePedidoDto) {
    try {
      const pedido = await this.db.order.create({
        data: {
          customerId: CreatePedidoDto.cliente_id,
          status: StatusPedido.PENDENTE.toString(),
        },
      });
      const items = CreatePedidoDto.items.map((item) => {
        return {
          productId: item.id,
          quantity: item.quantidade,
        } as OrderItem;
      });
      const finished = await this.db.order.update({
        where: {
          id: pedido.id,
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

  async update(id: number, updatePedidoDto: UpdatePedidoDto) {
    for await (const item of updatePedidoDto.items) {
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
