import { IsEnum, IsNumber } from 'class-validator';

export class ItemDto {
  @IsNumber()
  id: number;
  @IsNumber()
  quantidade: number;
}

export enum StatusPedido {
  PENDENTE = 'PENDENTE',
  ENTREGUE = 'ENTREGUE',
  CANCELADO = 'CANCELADO',
}

export class CreateOrderDto {
  @IsNumber()
  cliente_id: number;
  @IsEnum(StatusPedido)
  status: StatusPedido;
  items: ItemDto[];
}
