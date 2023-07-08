import { Module } from '@nestjs/common';
import { FilaService } from './fila.service';
import { FilaController } from './fila.controller';
import { FilaRepository } from './repository/fila.repository';

@Module({
  controllers: [FilaController],
  providers: [FilaService, {
    provide: 'IFilaRepository',
    useClass: FilaRepository,
  }]
})
export class FilaModule {}
