import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ClienteController } from './controllers/cliente.controller';
import { CadastraClienteUseCase } from 'src/application/use-cases/cadastra-cliente-use-case';
import { BuscaClienteUseCase } from 'src/application/use-cases/busca-cliente-use-case';
import { FilaController } from './controllers/fila.controller';
import { FilaUseCase } from 'src/application/use-cases/fila-use-case';
import { PedidoController } from './controllers/pedido.controller';
import { PedidoUseCase } from 'src/application/use-cases/pedido-use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [ClienteController, FilaController, PedidoController],
  providers: [
    CadastraClienteUseCase,
    BuscaClienteUseCase,
    FilaUseCase,
    PedidoUseCase,
  ],
})
export class HttpModule { }
