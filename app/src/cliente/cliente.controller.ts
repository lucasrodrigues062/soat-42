/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import CreateClienteDTO, { toCliente } from './dto/create-cliente';


@Controller('cliente')
export class ClienteController {
  constructor(private readonly service: ClienteService) { }

  @Post()
  @HttpCode(201)
  register(@Body() request: CreateClienteDTO) {
    return this.service.create(toCliente(request));
  }

  @Get()
  search(@Query('cpf') request: string) {
    const cpf = request.replace('.', '').replace('-', '')
    return this.service.findByCPF(cpf)
  }
}

