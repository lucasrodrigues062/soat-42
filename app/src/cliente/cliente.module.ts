import { Module } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { ClienteRepository } from './repository/cliente.repository';

@Module({
  providers: [ClienteService, {
    provide: 'IClienteRepository',
    useClass: ClienteRepository,
  }],
  controllers: [ClienteController],
})
export class ClienteModule { }
