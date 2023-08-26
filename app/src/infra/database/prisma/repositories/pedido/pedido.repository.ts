import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { Inject } from '@nestjs/common';
import { IPedidoRepository } from 'src/application/repositories/pedido.interface';

export class PedidoRepository implements IPedidoRepository {
    constructor(@Inject(PrismaService) private readonly db: PrismaService) { }

    criaPedido(createPedidoDto, statusPedido) {
        return this.db.order.create({
            data: {
                customerId: createPedidoDto.cliente_id,
                status: statusPedido,
            },
        });
    }
    buscaPedidos() {
        return this.db.order.findMany({ include: { items: true } });
    }
    buscaPedido(orderId) {
        return this.db.order.findFirst({
            where: { id: orderId },
            include: { items: true },
        });
    }
    atualizaPedido(pedidoId, items) {
        return this.db.order.update({
            where: {
                id: pedidoId,
            },
            data: {
                items: {
                    createMany: {
                        data: items,
                    },
                },
            },
            include: {
                items: true,
            },
        });
    }
    removePedido(id) {
        return this.db.order.delete({ where: { id: id } });
    }
}
