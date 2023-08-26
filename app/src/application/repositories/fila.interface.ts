import { Prisma, Queue } from '@prisma/client';
import { CreateFilaDto } from '../../infra/http/dtos/fila/create-fila.dto';
import { UpdateFilaDto } from '../../infra/http/dtos/fila/update-fila.dto';

type QueueWithOrder = Prisma.QueueGetPayload<{
    include: {
        order: true;
    };
}>;

export abstract class IFilaRepository {
    abstract criaFila(createFilaDto: CreateFilaDto): Promise<Queue>;
    abstract buscaFila(filaId: number): Promise<QueueWithOrder>;
    abstract buscaFilas(): Promise<QueueWithOrder[]>;
    abstract atualizaFila(
        filaId: number,
        updateFilaDto: UpdateFilaDto,
    ): Promise<Queue>;
    abstract removeFila(filaId: number): Promise<Queue>;
}
