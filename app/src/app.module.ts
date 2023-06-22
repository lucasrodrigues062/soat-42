import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [CustomerModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
