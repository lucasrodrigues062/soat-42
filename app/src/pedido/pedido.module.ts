import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { PedidoRepository } from './repository/pedido.repository';
import { PedidoItemRepository } from './repository/pedidoItem.repository';

@Module({
  controllers: [PedidoController],
  providers: [PedidoService,{
    provide: 'IPedidoRepository',
    useClass: PedidoRepository,
  },{
    provide: 'IPedidoItemRepository',
    useClass: PedidoItemRepository,
  }]
})
export class PedidoModule {}
