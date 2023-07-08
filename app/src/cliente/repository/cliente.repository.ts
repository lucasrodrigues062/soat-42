import { Customer } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { IClienteRepository } from "./cliente.interface";
import { Inject } from "@nestjs/common";

export class ClienteRepository implements IClienteRepository {

    constructor(@Inject(PrismaService) private readonly db: PrismaService) { }

    criaCliente(customer: Customer) {
        return this.db.customer.create({ data: customer })
    }

    buscaPorCPF(cpf: string) {
        return this.db.customer.findUnique({
            where: {
                cpf: cpf,
            },
        });
    }

}