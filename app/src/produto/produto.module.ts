import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { ProdutoRepository } from './repository/produto.repository';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Module({
  controllers: [ProdutoController],
  providers: [
    ProdutoService,
    PrismaService,
    {
      provide: 'IProdutoRepository',
      useClass: ProdutoRepository,
    },
  ],
})
export class ProdutoModule { }
