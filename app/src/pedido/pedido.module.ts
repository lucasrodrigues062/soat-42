import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { PedidoRepository } from './repository/pedido.repository';
import { PedidoItemRepository } from './repository/pedidoItem.repository';
import { PrismaService } from 'src/prisma.service';
import { FilaModule } from 'src/fila/fila.module';

@Module({
  imports: [FilaModule],
  controllers: [PedidoController],
  providers: [PedidoService, PrismaService, {
    provide: 'IPedidoRepository',
    useClass: PedidoRepository,
  },{
    provide: 'IPedidoItemRepository',
    useClass: PedidoItemRepository,
  }]
})
export class PedidoModule {}
