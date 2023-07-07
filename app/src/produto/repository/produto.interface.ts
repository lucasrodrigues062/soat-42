import { Product } from "@prisma/client"
import { Categoria } from "../dto/categoria-enum"
import { UpdateProdutoDto } from "../dto/update-produto.dto"
import { CreateProdutoDto } from "../dto/create-produto.dto"

export interface IProdutoRepository {
    criaProduto(createProdutoDto: CreateProdutoDto) : Promise<Product>
    buscaProduto(code: number) : Promise<Product>
    buscaProdutos() : Promise<Product[]>
    buscaProdutosPorCategoria(categoria: Categoria) : Promise<Product[]>
    atualizaProduto(code: number, updateProdutoDto: UpdateProdutoDto) : Promise<Product>
    removeProduto(code: number) : void
}