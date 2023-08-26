import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ClienteRepository } from './prisma/repositories/cliente/cliente.repository';
import { IClienteRepository } from 'src/application/repositories/cliente.interface';
import { IFilaRepository } from 'src/application/repositories/fila.interface';
import { FilaRepository } from './prisma/repositories/fila/fila.repository';

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
  ],
})
export class DatabaseModule { }
