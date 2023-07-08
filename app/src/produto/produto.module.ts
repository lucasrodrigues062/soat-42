import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { ProdutoRepository } from './repository/produto.repository';

@Module({
  controllers: [ProdutoController],
  providers: [ProdutoService, {
    provide: 'IProdutoRepository',
    useClass: ProdutoRepository,
  }],
})
export class ProdutoModule { }
