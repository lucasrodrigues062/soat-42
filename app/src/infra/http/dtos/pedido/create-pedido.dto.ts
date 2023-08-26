import { IsNotEmpty, IsNumber } from 'class-validator';
import { ItemDto } from './create-item-pedido-dto';
import { ApiProperty } from '@nestjs/swagger';

export enum StatusPedido {
  PENDENTE = 'PENDENTE',
  ENTREGUE = 'ENTREGUE',
  CANCELADO = 'CANCELADO',
}

export class CreatePedidoDto {
  @IsNumber()
  @ApiProperty()
  cliente_id: number;
  @IsNotEmpty()
  @ApiProperty()
  items: ItemDto[];
}
