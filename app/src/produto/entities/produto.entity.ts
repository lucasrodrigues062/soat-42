import { Product } from '@prisma/client';

export class Produto implements Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
}
