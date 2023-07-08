import { Prisma, Queue, QueuePayload } from "@prisma/client"
import { CreateQueueDto } from "../dto/create-queue.dto"
import { UpdateQueueDto } from "../dto/update-queue.dto";


type QueueWithOrder = Prisma.QueueGetPayload<{
    include: {
        order: true;
    }
}>

export interface IQueueRepository {
    criaFila(createQueueDto: CreateQueueDto): Promise<Queue>
    buscaFila(filaId: number): Promise<QueueWithOrder>
    buscaFilas(): Promise<QueueWithOrder[]>
    atualizaFila(filaId: number, updateQueueDto: UpdateQueueDto): Promise<Queue>
    removeFila(filaId:number): Promise<Queue>
}