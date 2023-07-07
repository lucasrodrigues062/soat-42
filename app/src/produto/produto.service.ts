import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Categoria } from './dto/categoria-enum';
import { IProdutoRepository } from './repository/produto.interface';

@Injectable()
export class ProdutoService {
  constructor(@Inject('IProdutoRepository') private readonly produtoRepository: IProdutoRepository) { }

  async create(createProdutoDto: CreateProdutoDto) {
    try {
      const product = await this.produtoRepository.criaProduto(createProdutoDto);
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
    const products = await this.produtoRepository.buscaProdutosPorCategoria(categoria)

    return products.map((el) => new CreateProdutoDto().fromProduct(el));
  }

  async update(code: number, updateProdutoDto: UpdateProdutoDto) {
    const updatedProduct = await this.produtoRepository.atualizaProduto(code, updateProdutoDto)
    return new CreateProdutoDto().fromProduct(updatedProduct);
  }

  async remove(code: number) {
    await this.produtoRepository.removeProduto(code)
    return;
  }
}
