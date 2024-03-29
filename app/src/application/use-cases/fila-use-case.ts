import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFilaDto } from 'src/infra/http/dtos/fila/create-fila.dto';
import { UpdateFilaDto } from 'src/infra/http/dtos/fila/update-fila.dto';
import { IFilaRepository } from '../repositories/fila.interface';

@Injectable()
export class FilaUseCase {
  constructor(private readonly filaRepository: IFilaRepository) { }

  create(createFilaDto: CreateFilaDto) {
    return this.filaRepository.criaFila(createFilaDto);
  }

  async findAll() {
    return (await this.filaRepository.buscaFilas()).map((el) => {
      return {
        cliente_id: el.order.customerId,
        criado: el.order.createdAt,
        numero: el.orderId,
        status: el.status,
        entregue: el.deliveredAt,
      };
    });
  }

  async findOne(pedidoId: number) {
    const queue = await this.filaRepository.buscaFila(pedidoId);
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

  async update(filaId: number, updateFilaDto: UpdateFilaDto) {
    try {
      const queue = await this.filaRepository.atualizaFila(
        filaId,
        updateFilaDto,
      );

      return {
        numero_pedido: queue.orderId,
        status: queue.status,
      };
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async remove(filaId: number) {
    return await this.filaRepository.removeFila(filaId);
  }
}
