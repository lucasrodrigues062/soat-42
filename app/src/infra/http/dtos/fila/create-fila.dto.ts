export enum StatusPedidoFila {
  RECEBIDO = 'RECEBIDO',
  EM_PREPARACAO = 'EM_PREPARACAO',
  PRONTO = 'PRONTO',
  FINALIZADO = 'FINALIZADO'
}


export class CreateFilaDto {
  order_id: number;
  status: StatusPedidoFila;
}
