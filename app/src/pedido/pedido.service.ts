import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { OrderItem, Prisma } from '@prisma/client';
import { CreatePedidoDto, StatusPedido } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { IPedidoRepository } from './repository/pedido.interface';
import { IPedidoItemRepository } from './repository/pedidoItem.interface';
import { FilaUseCase } from 'src/application/use-cases/fila-use-case';
import { StatusPedidoFila } from 'src/infra/http/dtos/fila/create-fila.dto';

@Injectable()
export class PedidoService {
  private readonly logger = new Logger(PedidoService.name);
  constructor(
    @Inject('IPedidoRepository')
    private readonly pedidoRepository: IPedidoRepository,
    @Inject('IPedidoItemRepository')
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
