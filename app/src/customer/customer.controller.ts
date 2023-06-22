/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import CreateCustomerDTO, { toCustomer } from './requests/create-user';


@Controller('customer')
export class CustomerController {
  constructor(private readonly service: CustomerService) { }

  @Post()
  @HttpCode(201)
  async register(@Body() request: CreateCustomerDTO) {
    return await this.service.create(toCustomer(request));
  }

  @Get()
  search() { return }
}

