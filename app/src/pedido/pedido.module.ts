import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { PedidoRepository } from './repository/pedido.repository';
import { PedidoItemRepository } from './repository/pedidoItem.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
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
