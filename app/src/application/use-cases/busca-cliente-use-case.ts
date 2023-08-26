import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnClienteDto } from 'src/infra/http/dtos/return-cliente.dto';
import { IClienteRepository } from '../repositories/cliente.interface';

@Injectable()
export class BuscaClienteUseCase {
  constructor(private readonly clienteRepository: IClienteRepository) { }

  async porCPF(cpf: string) {
    const cliente = await this.clienteRepository.buscaPorCPF(cpf);

    if (cliente) return cliente as ReturnClienteDto;

    throw new NotFoundException('Nao existe cliente com esse registro');
  }
}
