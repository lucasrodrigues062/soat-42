import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './infra/database/database.module';
import { PrismaService } from './infra/database/prisma/prisma.service';
import { HttpModule } from './infra/http/http.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    HttpModule,
    DatabaseModule,
  ],
  providers: [PrismaService],
})
export class AppModule { }
