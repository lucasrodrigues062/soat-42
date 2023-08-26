import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { OrderItem, Prisma } from '@prisma/client';
import { FilaUseCase } from 'src/application/use-cases/fila-use-case';
import { StatusPedidoFila } from 'src/infra/http/dtos/fila/create-fila.dto';
import {
  CreatePedidoDto,
  StatusPedido,
} from '../../infra/http/dtos/pedido/create-pedido.dto';
import { UpdatePedidoDto } from '../../infra/http/dtos/pedido/update-pedido.dto';
import { IPedidoRepository } from '../repositories/pedido.interface';
import { IPedidoItemRepository } from '../repositories/pedidoItem.interface';

@Injectable()
export class PedidoUseCase {
  private readonly logger = new Logger(PedidoUseCase.name);
  constructor(
    private readonly pedidoRepository: IPedidoRepository,
    private readonly pedidoItemRepository: IPedidoItemRepository,
    private readonly filaService: FilaUseCase,
  ) { }

  async create(createPedidoDto: CreatePedidoDto) {
    try {
      const pedido = await this.pedidoRepository.criaPedido(
        createPedidoDto,
        StatusPedido.PENDENTE,
      );
      const items = createPedidoDto.items.map((item) => {
        return {
          productId: item.id,
          quantity: item.quantidade,
        } as OrderItem;
      });

      const finished = await this.pedidoRepository.atualizaPedido(
        pedido.id,
        items,
      );

      await this.filaService.create({
        order_id: pedido.id,
        status: StatusPedidoFila.RECEBIDO,
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
    const pedidos = await this.pedidoRepository.buscaPedidos();

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

  async findOne(pedidoId: number) {
    const pedido = await this.pedidoRepository.buscaPedido(pedidoId);

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

  async update(pedidoId: number, updatePedidoDto: UpdatePedidoDto) {
    for await (const item of updatePedidoDto.items) {
      const existItem = await this.pedidoItemRepository.buscaItemPedido(
        pedidoId,
        item.id,
      );

      if (existItem != null) {
        if (item.quantidade <= 0) {
          await this.pedidoItemRepository.removeItemPedido(pedidoId);
        } else {
          await this.pedidoItemRepository.atualizaItemPedido(
            pedidoId,
            item.quantidade,
          );
        }
      } else {
        await this.pedidoItemRepository.criaItemPedido(
          pedidoId,
          item.id,
          item.quantidade,
        );
      }
    }

    return await this.findOne(pedidoId);
  }

  remove(pedidoId: number) {
    return this.pedidoRepository.removePedido(pedidoId);
  }
}
