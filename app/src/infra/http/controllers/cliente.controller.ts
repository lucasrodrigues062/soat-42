/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';

import CreateClienteDTO, { toCliente } from '../dtos/create-cliente.dto';
import { CadastraClienteUseCase } from 'src/application/use-cases/cadastra-cliente-use-case';
import { BuscaClienteUseCase } from 'src/application/use-cases/busca-cliente-use-case';


@Controller('clientes')
export class ClienteController {
  constructor(private readonly cadastraClienteUseCase: CadastraClienteUseCase, private readonly buscaClienteUseCase: BuscaClienteUseCase) { }

  @Post()
  @HttpCode(201)
  register(@Body() request: CreateClienteDTO) {
    return this.cadastraClienteUseCase.execute(toCliente(request));
  }

  @Get()
  search(@Query('cpf') request: string) {
    return this.buscaClienteUseCase.porCPF(request)
  }
}

