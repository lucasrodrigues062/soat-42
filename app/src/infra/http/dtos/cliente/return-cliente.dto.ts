import { PartialType } from '@nestjs/mapped-types';
import CreateClienteDTO from './create-cliente.dto';

export class ReturnClienteDto extends PartialType(CreateClienteDTO) {
    id: number;
}
