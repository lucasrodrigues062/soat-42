import { Controller, Get, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly service: CustomerService) { }

  @Post()
  register() { }

  @Get()
  searchw() { }
}
