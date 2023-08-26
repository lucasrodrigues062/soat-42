import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UpdateFilaDto } from '../dtos/fila/update-fila.dto';
import { FilaUseCase } from 'src/application/use-cases/fila-use-case';

@Controller('filas')
export class FilaController {
  constructor(private readonly filaService: FilaUseCase) { }

  @Get()
  findAll() {
    return this.filaService.findAll();
  }

  @Get(':pedidoId')
  findOne(@Param('pedidoId') id: string) {
    return this.filaService.findOne(+id);
  }

  @Patch(':pedidoId')
  update(@Param('id') id: string, @Body() updateFilaDto: UpdateFilaDto) {
    return this.filaService.update(+id, updateFilaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filaService.remove(+id);
  }
}
