import { OrderItem } from '@prisma/client';
import { ItemDto } from '../../infra/http/dtos/pedido/create-item-pedido-dto';

export abstract class IPedidoItemRepository {
    abstract criaItemPedido(
        pedidoId: number,
        produtoId: number,
        quantidade: number,
    ): Promise<OrderItem>;
    abstract buscaItemPedido(
        pedidoId: number,
        itemId: number,
    ): Promise<OrderItem>;
    abstract atualizaItemPedido(
        pedidoId: number,
        quantidade: number,
    ): Promise<OrderItem>;
    abstract removeItemPedido(pedidoId: number): Promise<OrderItem>;
}
