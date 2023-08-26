import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ClienteRepository } from './prisma/repositories/cliente/cliente.repository';
import { IClienteRepository } from 'src/application/repositories/cliente.interface';
import { IFilaRepository } from 'src/application/repositories/fila.interface';
import { FilaRepository } from './prisma/repositories/fila/fila.repository';
import { IPedidoRepository } from 'src/application/repositories/pedido.interface';
import { PedidoRepository } from './prisma/repositories/pedido/pedido.repository';
import { IPedidoItemRepository } from 'src/application/repositories/pedidoItem.interface';
import { PedidoItemRepository } from './prisma/repositories/pedido/pedidoItem.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: IClienteRepository,
      useClass: ClienteRepository,
    },
    {
      provide: IFilaRepository,
      useClass: FilaRepository,
    },
    {
      provide: IPedidoRepository,
      useClass: PedidoRepository,
    },
    {
      provide: IPedidoItemRepository,
      useClass: PedidoItemRepository,
    },
  ],
  exports: [
    {
      provide: IClienteRepository,
      useClass: ClienteRepository,
    },
    {
      provide: IFilaRepository,
      useClass: FilaRepository,
    },
    {
      provide: IPedidoRepository,
      useClass: PedidoRepository,
    },
    {
      provide: IPedidoItemRepository,
      useClass: PedidoItemRepository,
    },
  ],
})
export class DatabaseModule { }
