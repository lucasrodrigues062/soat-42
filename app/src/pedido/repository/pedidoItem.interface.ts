import { OrderItem } from "@prisma/client"
import { ItemDto } from "../dto/create-item-pedido-dto"

export interface IPedidoItemRepository {
    criaItemPedido(pedidoId: number, produtoId:number, quantidade: number): Promise<OrderItem>
    buscaItemPedido(pedidoId: number, itemId: number): Promise<OrderItem>
    atualizaItemPedido(pedidoId: number, quantidade: number): Promise<OrderItem>
    removeItemPedido(pedidoId:number): Promise<OrderItem>
}