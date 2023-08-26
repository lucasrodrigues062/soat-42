import { BadRequestException, Injectable } from '@nestjs/common';

import { Customer, Prisma } from '@prisma/client';

import { ReturnClienteDto } from 'src/infra/http/dtos/cliente/return-cliente.dto';
import { IClienteRepository } from '../repositories/cliente.interface';

@Injectable()
export class CadastraClienteUseCase {
  constructor(private readonly clienteRepository: IClienteRepository) { }

  async execute(request: Customer) {
    try {
      const cliente = await this.clienteRepository.criaCliente(request);
      return cliente as ReturnClienteDto;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Cliente ja cadastrado');
        }
      }
    }
  }
}
