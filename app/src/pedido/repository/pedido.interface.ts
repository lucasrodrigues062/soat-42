import { Order, OrderItem, Prisma } from "@prisma/client"
import { CreatePedidoDto, StatusPedido } from "../dto/create-pedido.dto"

type OrderWithItem = Prisma.OrderGetPayload<{
    include: {
        items: true;
    }
}>

export interface IPedidoRepository {
    criaPedido(createPedidoDto: CreatePedidoDto, statusPedido: StatusPedido): Promise<Order>
    buscaPedidos(): Promise<OrderWithItem[]>
    buscaPedido(pedidoId: number): Promise<OrderWithItem>
    atualizaPedido(pedidoId: number, items: OrderItem[]): Promise<OrderWithItem>
    removePedido(id: number): void
}
