import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { QueueService } from 'src/queue/queue.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [QueueService],
})
export class OrderModule { }
