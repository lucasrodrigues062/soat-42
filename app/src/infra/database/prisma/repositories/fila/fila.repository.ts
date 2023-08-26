import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { IFilaRepository } from '../../../../../application/repositories/fila.interface';
import { Inject } from '@nestjs/common';
import { Queue } from '@prisma/client';

export class FilaRepository implements IFilaRepository {
    constructor(@Inject(PrismaService) private readonly db: PrismaService) { }

    criaFila(createFilaDto) {
        return this.db.queue.create({
            data: {
                status: createFilaDto.status,
                orderId: createFilaDto.order_id,
            },
        });
    }
    buscaFila(queueId) {
        return this.db.queue.findFirst({
            where: {
                orderId: queueId,
            },
            include: { order: true },
        });
    }
    buscaFilas() {
        return this.db.queue.findMany({ include: { order: true } });
    }
    atualizaFila(queueId, updateQueueDto) {
        return this.db.queue.update({
            data: {
                status: updateQueueDto.status,
                deliveredAt: updateQueueDto.status === 'ENTREGUE' ? new Date() : null,
            },
            where: {
                id: queueId,
            },
            include: {
                order: true,
            },
        });
    }
    removeFila(queueId) {
        return this.db.queue.delete({ where: { id: queueId } });
    }
}
