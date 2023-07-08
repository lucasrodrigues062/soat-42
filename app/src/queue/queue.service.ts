import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQueueDto } from './dto/create-queue.dto';
import { UpdateQueueDto } from './dto/update-queue.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QueueService {
  constructor(private readonly db: PrismaService) { }
  async create(createQueueDto: CreateQueueDto) {
    return await this.db.queue.create({
      data: {
        status: createQueueDto.status,
        orderId: createQueueDto.order_id,
      },
    });
  }

  async findAll() {
    return (await this.db.queue.findMany({ include: { order: true } })).map(
      (el) => {
        return {
          cliente_id: el.order.customerId,
          criado: el.order.createdAt,
          numero: el.orderId,
          status: el.status,
          entregue: el.deliveredAt,
        };
      },
    );
  }

  async findOne(id: number) {
    const queue = await this.db.queue.findFirst({
      where: {
        id: id,
      },
      include: { order: true },
    });
    if (queue == null) {
      throw new NotFoundException();
    }
    return {
      cliente_id: queue.order.customerId,
      criado: queue.order.createdAt,
      numero: queue.orderId,
      status: queue.status,
      entregue: queue.deliveredAt,
    };
  }

  async update(id: number, updateQueueDto: UpdateQueueDto) {
    try {
      const queue = await this.db.queue.update({
        data: {
          status: updateQueueDto.status,
          deliveredAt: updateQueueDto.status === 'ENTREGUE' ? new Date() : null,
        },
        where: {
          id: id,
        },
        include: {
          order: true,
        },
      });

      return {
        numero_pedido: queue.orderId,
        status: queue.status,
      };
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async remove(id: number) {
    return await this.db.queue.delete({ where: { id: id } });
  }
}
