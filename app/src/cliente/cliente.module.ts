import { Module } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { ClienteRepository } from './repository/cliente.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService, ClienteService, {
    provide: 'IClienteRepository',
    useClass: ClienteRepository,
  }],
  controllers: [ClienteController],
})
export class ClienteModule { }
