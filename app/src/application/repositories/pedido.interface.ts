import { Order, OrderItem, Prisma } from '@prisma/client';
import {
    CreatePedidoDto,
    StatusPedido,
} from '../../infra/http/dtos/pedido/create-pedido.dto';

type OrderWithItem = Prisma.OrderGetPayload<{
    include: {
        items: true;
    };
}>;

export abstract class IPedidoRepository {
    abstract criaPedido(
        createPedidoDto: CreatePedidoDto,
        statusPedido: StatusPedido,
    ): Promise<Order>;
    abstract buscaPedidos(): Promise<OrderWithItem[]>;
    abstract buscaPedido(pedidoId: number): Promise<OrderWithItem>;
    abstract atualizaPedido(
        pedidoId: number,
        items: OrderItem[],
    ): Promise<OrderWithItem>;
    abstract removePedido(id: number): void;
}
