import { IsNotEmpty, IsNumber } from 'class-validator';
import { ItemDto } from './create-item-pedido-dto';

export enum StatusPedido {
  PENDENTE = 'PENDENTE',
  ENTREGUE = 'ENTREGUE',
  CANCELADO = 'CANCELADO',
}

export class CreatePedidoDto {
  @IsNumber()
  cliente_id: number;
  @IsNotEmpty()
  items: ItemDto[];
}
