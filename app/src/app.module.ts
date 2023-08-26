import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { FilaModule } from './fila/fila.module';
import { DatabaseModule } from './infra/database/database.module';
import { PrismaService } from './infra/database/prisma/prisma.service';
import { PedidoModule } from './pedido/pedido.module';
import { ProdutoModule } from './produto/produto.module';
import { HttpModule } from './infra/http/http.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProdutoModule,
    PedidoModule,
    FilaModule,
    HttpModule,
    DatabaseModule,
  ],
  providers: [PrismaService],
})
export class AppModule { }
