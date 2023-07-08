import { PrismaService } from "src/prisma.service";
import { IPedidoItemRepository } from "./pedidoItem.interface";
import { Inject } from "@nestjs/common";

export class PedidoItemRepository implements IPedidoItemRepository {
    constructor(@Inject(PrismaService) private readonly db: PrismaService) { }

    criaItemPedido(orderId, productId, quantity) {
        return this.db.orderItem.create({
            data: {
                orderId,
                productId,
                quantity,
            },
        });
    }

    buscaItemPedido(orderId, productId) {
        return this.db.orderItem.findFirst({
            where: { orderId, productId },
        });
    }
    atualizaItemPedido(id, quantity) {
        return this.db.orderItem.update({
            where: { id },
            data: {
                quantity,
            },
        });
    }
    removeItemPedido(id) { // TODO: Remover relaçoes
        return this.db.orderItem.delete({ where: { id } });
    }
}