import { Customer } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { IClienteRepository } from "./cliente.interface";

export class ClienteRepository implements IClienteRepository {

    constructor(private readonly db: PrismaService) { }

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