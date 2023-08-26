import { FilaRepository } from './../infra/database/prisma/repositories/fila/fila.repository';
import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { PedidoRepository } from './repository/pedido.repository';
import { PedidoItemRepository } from './repository/pedidoItem.repository';

import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { HttpModule } from 'src/infra/http/http.module';
import { FilaUseCase } from 'src/application/use-cases/fila-use-case';
import { IFilaRepository } from 'src/application/repositories/fila.interface';

@Module({
  imports: [HttpModule],
  controllers: [PedidoController],
  providers: [
    PedidoService,
    PrismaService,
    FilaUseCase,
    {
      provide: IFilaRepository,
      useClass: FilaRepository,
    },
    {
      provide: 'IPedidoRepository',
      useClass: PedidoRepository,
    },
    {
      provide: 'IPedidoItemRepository',
      useClass: PedidoItemRepository,
    },
  ],
})
export class PedidoModule { }
