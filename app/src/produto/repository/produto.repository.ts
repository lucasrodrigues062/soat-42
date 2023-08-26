import { IProdutoRepository } from './produto.interface';
import { Categoria } from '../dto/categoria-enum';
import { Inject } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

export class ProdutoRepository implements IProdutoRepository {
    constructor(@Inject(PrismaService) private readonly db: PrismaService) { }

    criaProduto(createProdutoDto) {
        return this.db.product.create({
            data: {
                name: createProdutoDto.nome,
                category: createProdutoDto.categoria,
                price: createProdutoDto.preco,
                description: createProdutoDto.descricao,
            },
        });
    }

    buscaProduto(code) {
        return this.db.product.findFirst({ where: { id: code } });
    }

    buscaProdutos() {
        return this.db.product.findMany();
    }

    buscaProdutosPorCategoria(categoria: Categoria) {
        return this.db.product.findMany({
            where: { category: categoria },
        });
    }

    atualizaProduto(code, updateProdutoDto) {
        return this.db.product.update({
            where: { id: code },
            data: {
                price: updateProdutoDto.preco,
                name: updateProdutoDto.nome,
                description: updateProdutoDto.descricao,
                category: updateProdutoDto.categoria,
            },
        });
    }

    removeProduto() { }
}
