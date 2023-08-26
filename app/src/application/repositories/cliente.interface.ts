import { Customer } from '@prisma/client';

export abstract class IClienteRepository {
    abstract criaCliente(customer: Customer): Promise<Customer>;
    abstract buscaPorCPF(cpf: string): Promise<Customer>;
}
