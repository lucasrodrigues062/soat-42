import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ItemDto {
  @IsNumber()
  @ApiProperty()
  id: number;
  @IsNumber()
  @ApiProperty()
  quantidade: number;
}
