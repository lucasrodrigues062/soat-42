import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Categoria } from '../dtos/produto/categoria-enum';
import { ProdutoUseCase } from 'src/application/use-cases/produto-use-case';
import { CreateProdutoDto } from '../dtos/produto/create-produto.dto';
import { UpdateProdutoDto } from '../dtos/produto/update-produto.dto';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoUseCase) { }

  @Post()
  @HttpCode(201)
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtoService.create(createProdutoDto);
  }

  @Get()
  findAll(@Query('categoria') categoria: Categoria) {
    if (categoria !== null || categoria !== undefined) {
      return this.produtoService.findAllByCategory(categoria);
    }
    return this.produtoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtoService.update(+id, updateProdutoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtoService.remove(+id);
  }
}
