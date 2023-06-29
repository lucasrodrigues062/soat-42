import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Categoria } from './categoria-enum';
import { Product } from '@prisma/client';
import { Produto } from '../entities/produto.entity';

export class CreateProdutoDto {
  @IsNotEmpty()
  nome: string;
  @IsNumber()
  preco: number;
  @IsEnum(Categoria)
  categoria: string;
  @IsNotEmpty()
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
