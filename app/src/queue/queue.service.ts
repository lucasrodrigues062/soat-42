import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQueueDto } from './dto/create-queue.dto';
import { UpdateQueueDto } from './dto/update-queue.dto';
import { IQueueRepository } from './repository/queue.interface';

@Injectable()
export class QueueService {
  constructor(@Inject('IQueueRepository') private readonly queueRepository: IQueueRepository) { }

  create(createQueueDto: CreateQueueDto) {
    return this.queueRepository.criaFila(createQueueDto)
  }

  async findAll() {
    return (await this.queueRepository.buscaFilas()).map(
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

  async findOne(filaId: number) {
    const queue = await this.queueRepository.buscaFila(filaId)
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

  async update(filaId: number, updateQueueDto: UpdateQueueDto) {
    try {
      const queue = await this.queueRepository.atualizaFila(filaId, updateQueueDto)

      return {
        numero_pedido: queue.orderId,
        status: queue.status,
      };
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async remove(filaId: number) {
    return await this.queueRepository.removeFila(filaId)
  }
}
