import { Prisma, Queue, QueuePayload } from "@prisma/client"
import { CreateFilaDto } from "../dto/create-fila.dto"
import { UpdateFilaDto } from "../dto/update-fila.dto";


type QueueWithOrder = Prisma.QueueGetPayload<{
    include: {
        order: true;
    }
}>

export interface IFilaRepository {
    criaFila(createFilaDto: CreateFilaDto): Promise<Queue>
    buscaFila(filaId: number): Promise<QueueWithOrder>
    buscaFilas(): Promise<QueueWithOrder[]>
    atualizaFila(filaId: number, updateFilaDto: UpdateFilaDto): Promise<Queue>
    removeFila(filaId:number): Promise<Queue>
}