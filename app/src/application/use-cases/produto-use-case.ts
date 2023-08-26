import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Categoria } from '../../infra/http/dtos/produto/categoria-enum';
import { IProdutoRepository } from '../repositories/produto.interface';
import { CreateProdutoDto } from 'src/infra/http/dtos/produto/create-produto.dto';
import { UpdateProdutoDto } from 'src/infra/http/dtos/produto/update-produto.dto';

@Injectable()
export class ProdutoUseCase {
  constructor(private readonly produtoRepository: IProdutoRepository) { }

  async create(createProdutoDto: CreateProdutoDto) {
    try {
      const product = await this.produtoRepository.criaProduto(
        createProdutoDto,
      );
      return new CreateProdutoDto().fromProduct(product);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Cliente ja cadastrado');
        }
      }
    }
  }

  async findAll() {
    const products = await this.produtoRepository.buscaProdutos();
    return products.map((el) => new CreateProdutoDto().fromProduct(el));
  }

  async findOne(code: number) {
    const product = await this.produtoRepository.buscaProduto(code);
    console.log(product);
    if (product === null || product === undefined) {
      throw new NotFoundException();
    }
    return new CreateProdutoDto().fromProduct(product);
  }

  async findAllByCategory(categoria: Categoria) {
    const products = await this.produtoRepository.buscaProdutosPorCategoria(
      categoria,
    );

    return products.map((el) => new CreateProdutoDto().fromProduct(el));
  }

  async update(code: number, updateProdutoDto: UpdateProdutoDto) {
    const updatedProduct = await this.produtoRepository.atualizaProduto(
      code,
      updateProdutoDto,
    );
    return new CreateProdutoDto().fromProduct(updatedProduct);
  }

  async remove(code: number) {
    await this.produtoRepository.removeProduto(code);
    return;
  }
}
