import { Customer } from '@prisma/client';

import { Inject } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { IClienteRepository } from 'src/application/repositories/cliente.interface';

export class ClienteRepository implements IClienteRepository {
    constructor(@Inject(PrismaService) private readonly db: PrismaService) { }

    criaCliente(customer: Customer): Promise<Customer> {
        return this.db.customer.create({ data: customer });
    }

    buscaPorCPF(cpf: string): Promise<Customer> {
        return this.db.customer.findUnique({
            where: {
                cpf: cpf,
            },
        });
    }
}
