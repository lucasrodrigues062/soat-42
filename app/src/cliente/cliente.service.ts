import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { Customer, Prisma } from '@prisma/client';
import CreateClienteDTO from './dto/create-cliente';

@Injectable()
export class ClienteService {
  constructor(private readonly db: PrismaService) { }

  async create(request: Customer) {
    try {
      const cliente = await this.db.customer.create({
        data: request,
      });
      return {
        nome: cliente.name,
        cpf: cliente.cpf,
        telefone: cliente.phone,
        email: cliente.email,
      } as CreateClienteDTO;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Cliente ja cadastrado');
        }
      }
    }
  }

  async findByCPF(cpf: string) {
    const cliente = await this.db.customer.findUnique({
      where: {
        cpf: cpf,
      },
    });

    if (cliente) {
      return {
        nome: cliente.name,
        cpf: cliente.cpf,
        telefone: cliente.phone,
        email: cliente.email,
      } as CreateClienteDTO;
    }

    throw new NotFoundException('Nao existe cliente com esse registro');
  }
}
