import { Customer } from "@prisma/client"

export interface IClienteRepository {
    criaCliente(customer: Customer): Promise<Customer>
    buscaPorCPF(cpf: string): Promise<Customer>
}