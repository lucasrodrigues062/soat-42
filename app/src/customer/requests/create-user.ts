/* eslint-disable prettier/prettier */
import { Customer } from '@prisma/client';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

class CreateCustomerDTO {
  @IsNotEmpty()
  nome: string;
  @Matches('([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})')
  cpf: string;
  @Matches('(^[0-9]{2})?(s|-)?(9?[0-9]{4})-?([0-9]{4}$)')
  telefone: string;
  @IsEmail()
  email: string;


}

export default CreateCustomerDTO;

export const toCustomer = (object: CreateCustomerDTO) => {
  return {
    name: object.nome,
    cpf: object.cpf.replace('.', '').replace('-', ''),
    phone: object.telefone,
    email: object.email,
  } as Customer;
}
