import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ClienteRepository } from './prisma/repositories/cliente/cliente.repository';
import { IClienteRepository } from 'src/application/repositories/cliente.interface';

@Module({
  providers: [
    PrismaService,
    {
      provide: IClienteRepository,
      useClass: ClienteRepository,
    },
  ],
  exports: [
    {
      provide: IClienteRepository,
      useClass: ClienteRepository,
    },
  ],
})
export class DatabaseModule { }
