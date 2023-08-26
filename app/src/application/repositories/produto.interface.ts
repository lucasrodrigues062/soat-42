import { Product } from '@prisma/client';
import { Categoria } from '../../infra/http/dtos/produto/categoria-enum';
import { CreateProdutoDto } from 'src/infra/http/dtos/produto/create-produto.dto';
import { UpdateProdutoDto } from 'src/infra/http/dtos/produto/update-produto.dto';

export abstract class IProdutoRepository {
    abstract criaProduto(createProdutoDto: CreateProdutoDto): Promise<Product>;
    abstract buscaProduto(code: number): Promise<Product>;
    abstract buscaProdutos(): Promise<Product[]>;
    abstract buscaProdutosPorCategoria(categoria: Categoria): Promise<Product[]>;
    abstract atualizaProduto(
        code: number,
        updateProdutoDto: UpdateProdutoDto,
    ): Promise<Product>;
    abstract removeProduto(code: number): void;
}
