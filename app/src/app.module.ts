import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ClienteModule } from './cliente/cliente.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProdutoModule } from './produto/produto.module';
import { PedidoModule } from './pedido/pedido.module';
import { FilaModule } from './fila/fila.module';

@Module({
  imports: [
    ClienteModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProdutoModule,
    PedidoModule,
    FilaModule,
  ],

  providers: [],
})
export class AppModule { }
