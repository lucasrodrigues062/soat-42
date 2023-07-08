import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UpdateFilaDto } from './dto/update-fila.dto';
import { FilaService } from './fila.service';

@Controller('filas')
export class FilaController {
  constructor(private readonly filaService: FilaService) { }

  @Get()
  findAll() {
    return this.filaService.findAll();
  }

  @Get(':pedidoId')
  findOne(@Param('pedidoId') id: string) {
    return this.filaService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFilaDto: UpdateFilaDto) {
  //   return this.filaService.update(+id, updateFilaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.filaService.remove(+id);
  // }
}
