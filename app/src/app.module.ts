import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ClienteModule } from './cliente/cliente.module';
import { ProdutoModule } from './produto/produto.module';
import { PedidoModule } from './pedido/pedido.module';
import { FilaModule } from './fila/fila.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ClienteModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProdutoModule,
    PedidoModule,
    FilaModule,
  ],
  providers: [PrismaService],
})
export class AppModule { }
