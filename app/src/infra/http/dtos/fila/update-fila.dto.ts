import { PartialType } from '@nestjs/swagger';
import { CreateFilaDto } from './create-fila.dto';

export class UpdateFilaDto extends PartialType(CreateFilaDto) {}
