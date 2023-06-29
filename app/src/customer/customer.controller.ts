/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import CreateCustomerDTO, { toCustomer } from './dto/create-user';
import { cp } from 'fs';


@Controller('cliente')
export class CustomerController {
  constructor(private readonly service: CustomerService) { }

  @Post()
  @HttpCode(201)
  register(@Body() request: CreateCustomerDTO) {
    return this.service.create(toCustomer(request));
  }

  @Get()
  search(@Query('cpf') request: string) {
    const cpf = request.replace('.', '').replace('-', '')
    return this.service.findByCPF(cpf)
  }
}

