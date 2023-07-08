import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';
import { QueueRepository } from './repository/queue.repository';

@Module({
  controllers: [QueueController],
  providers: [QueueService, {
    provide: 'IQueueRepository',
    useClass: QueueRepository,
  }]
})
export class QueueModule {}
