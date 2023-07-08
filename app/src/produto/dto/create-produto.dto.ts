import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Categoria } from './categoria-enum';
import { Product } from '@prisma/client';
import { Produto } from '../entities/produto.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProdutoDto {
  @IsNotEmpty()
  @ApiProperty()
  nome: string;
  
  @IsNumber()
  @ApiProperty()
  preco: number;
  
  @IsEnum(Categoria)
  @ApiProperty()
  categoria: string;
  
  @IsNotEmpty()
  @ApiProperty()
  descricao: string;
  id: number;

  fromProduct(product: Product) {
    const produto = new CreateProdutoDto();
    produto.categoria = product.category;
    produto.descricao = product.description;
    produto.nome = product.name;
    produto.preco = product.price;
    produto.id = product.id;
    return produto;
  }
}
