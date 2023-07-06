import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CustomerModule } from './customer/customer.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProdutoModule } from './produto/produto.module';
import { OrderModule } from './order/order.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    CustomerModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProdutoModule,
    OrderModule,
    QueueModule,
  ],

  providers: [],
})
export class AppModule { }
