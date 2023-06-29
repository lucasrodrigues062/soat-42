import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Categoria } from './dto/categoria-enum';

@Injectable()
export class ProdutoService {
  constructor(private readonly db: PrismaService) { }
  async create(createProdutoDto: CreateProdutoDto) {
    try {
      const product = await this.db.product.create({
        data: {
          name: createProdutoDto.nome,
          category: createProdutoDto.categoria,
          price: createProdutoDto.preco,
          description: createProdutoDto.descricao,
        },
      });
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
    const products = await this.db.product.findMany();
    return products.map((el) => new CreateProdutoDto().fromProduct(el));
  }

  async findOne(code: number) {
    const product = await this.db.product.findFirst({ where: { id: code } });
    console.log(product);
    if (product === null || product === undefined) {
      throw new NotFoundException();
    }
    return new CreateProdutoDto().fromProduct(product);
  }

  async findAllByCategory(categoria: Categoria) {
    const products = await this.db.product.findMany({
      where: { category: categoria.toString() },
    });

    return products.map((el) => new CreateProdutoDto().fromProduct(el));
  }

  async update(code: number, updateProdutoDto: UpdateProdutoDto) {
    const oldProduct = await this.findOne(code);
    const updatedProduct = await this.db.product.update({
      where: { id: code },
      data: {
        price: updateProdutoDto.preco
          ? updateProdutoDto.preco
          : oldProduct.preco,
        name: updateProdutoDto.nome ? updateProdutoDto.nome : oldProduct.nome,
        description: updateProdutoDto.descricao
          ? updateProdutoDto.descricao
          : oldProduct.descricao,
        category: updateProdutoDto.categoria
          ? updateProdutoDto.categoria
          : oldProduct.categoria,
      },
    });
    return new CreateProdutoDto().fromProduct(updatedProduct);
  }

  async remove(code: number) {
    await this.db.product.delete({ where: { id: code } });
    return;
  }
}
