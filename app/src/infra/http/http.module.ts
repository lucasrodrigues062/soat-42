import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ClienteController } from './controllers/cliente.controller';
import { CadastraClienteUseCase } from 'src/application/use-cases/cadastra-cliente-use-case';
import { BuscaClienteUseCase } from 'src/application/use-cases/busca-cliente-use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [ClienteController],
  providers: [CadastraClienteUseCase, BuscaClienteUseCase],
})
export class HttpModule { }
