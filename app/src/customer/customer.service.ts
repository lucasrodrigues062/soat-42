import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { Customer, Prisma } from '@prisma/client';
import CreateCustomerDTO from './requests/create-user';

@Injectable()
export class CustomerService {
  constructor(private readonly db: PrismaService) { }

  async create(request: Customer) {
    try {
      const customer = await this.db.customer.create({
        data: request,
      });
      console.log('criou');
      return {
        nome: customer.name,
        cpf: customer.cpf,
        telefone: customer.phone,
        email: customer.email,
      } as CreateCustomerDTO;
    } catch (error) {
      console.log(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Cliente ja cadastrado');
        }
      }
    }
  }
}
