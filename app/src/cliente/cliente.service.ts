import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Customer, Prisma } from '@prisma/client';
import { IClienteRepository } from './repository/cliente.interface';
import { ReturnClienteDto } from './dto/return-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(@Inject('IClienteRepository') private readonly clienteRepository: IClienteRepository) { }

  async criaCliente(request: Customer) {
    try {
      const cliente = await this.clienteRepository.criaCliente(request)
      return cliente as ReturnClienteDto;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Cliente ja cadastrado');
        }
      }
    }
  }

  async buscaPorCPF(cpf: string) {
    const cliente = await this.clienteRepository.buscaPorCPF(cpf)

    if (cliente) return cliente as ReturnClienteDto;

    throw new NotFoundException('Nao existe cliente com esse registro');
  }
}
