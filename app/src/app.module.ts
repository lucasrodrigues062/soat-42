import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CustomerModule } from './customer/customer.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProdutoModule } from './produto/produto.module';

@Module({
  imports: [
    CustomerModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProdutoModule,
  ],

  providers: [],
})
export class AppModule { }
