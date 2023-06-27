import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { Customer, Prisma } from '@prisma/client';
import CreateCustomerDTO from './dto/create-user';

@Injectable()
export class CustomerService {
  constructor(private readonly db: PrismaService) { }

  async create(request: Customer) {
    try {
      const customer = await this.db.customer.create({
        data: request,
      });
      return {
        nome: customer.name,
        cpf: customer.cpf,
        telefone: customer.phone,
        email: customer.email,
      } as CreateCustomerDTO;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Cliente ja cadastrado');
        }
      }
    }
  }

  async findByCPF(cpf: string) {
    const customer = await this.db.customer.findUnique({
      where: {
        cpf: cpf,
      },
    });

    if (customer) {
      return {
        nome: customer.name,
        cpf: customer.cpf,
        telefone: customer.phone,
        email: customer.email,
      } as CreateCustomerDTO;
    }

    throw new NotFoundException('Nao existe cliente com esse registro');
  }
}
