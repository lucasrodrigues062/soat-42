import { Module } from '@nestjs/common';
import { FilaService } from './fila.service';
import { FilaController } from './fila.controller';
import { FilaRepository } from './repository/fila.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [FilaController],
  providers: [FilaService, PrismaService, {
    provide: 'IFilaRepository',
    useClass: FilaRepository,
  }],
  exports: [FilaService]
})
export class FilaModule {}
