import { IsNumber } from 'class-validator';

export class ItemDto {
  @IsNumber()
  id: number;
  @IsNumber()
  quantidade: number;
}
