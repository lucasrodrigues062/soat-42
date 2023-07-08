/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import CreateClienteDTO, { toCliente } from './dto/create-cliente';


@Controller('clientes')
export class ClienteController {
  constructor(private readonly service: ClienteService) { }

  @Post()
  @HttpCode(201)
  register(@Body() request: CreateClienteDTO) {
    return this.service.criaCliente(toCliente(request));
  }

  @Get()
  search(@Query('cpf') request: string) {
    return this.service.buscaPorCPF(request)
  }
}

