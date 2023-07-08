/* eslint-disable prettier/prettier */
import { Customer } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CreateClienteDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nome: string;

  @IsString()
  @ApiProperty()
  cpf: string;
  
  @IsString()
  @ApiProperty()
  telefone: string;
  
  @IsEmail()
  @IsString()
  @ApiProperty()
  email: string;


}

export default CreateClienteDTO;

export const toCliente = (object: CreateClienteDTO) => {
  return {
    name: object.nome,
    cpf: object.cpf,
    phone: object.telefone,
    email: object.email,
  } as Customer;
}
