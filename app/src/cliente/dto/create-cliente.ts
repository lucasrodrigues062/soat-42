/* eslint-disable prettier/prettier */
import { Customer } from '@prisma/client';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

class CreateClienteDTO {
  @IsNotEmpty()
  nome: string;
  cpf: string;
  telefone: string;
  @IsEmail()
  email: string;


}

export default CreateClienteDTO;

export const toCliente = (object: CreateClienteDTO) => {
  return {
    name: object.nome,
    cpf: object.cpf.replace('.', '').replace('-', ''),
    phone: object.telefone,
    email: object.email,
  } as Customer;
}
