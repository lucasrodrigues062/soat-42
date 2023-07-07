import { Module } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';

@Module({
  providers: [ClienteService],
  controllers: [ClienteController],
})
export class ClienteModule { }
