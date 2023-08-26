import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreatePedidoDto } from '../dtos/pedido/create-pedido.dto';
import { UpdatePedidoDto } from '../dtos/pedido/update-pedido.dto';
import { PedidoUseCase } from 'src/application/use-cases/pedido-use-case';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoUseCase) { }

  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidoService.create(createPedidoDto);
  }

  @Get()
  findAll() {
    return this.pedidoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePedidoDto: UpdatePedidoDto) {
    return this.pedidoService.update(+id, updatePedidoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidoService.remove(+id);
  }
}
