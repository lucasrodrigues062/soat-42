import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  providers: [CustomerService],
  controllers: [CustomerController],
})
export class CustomerModule { }
