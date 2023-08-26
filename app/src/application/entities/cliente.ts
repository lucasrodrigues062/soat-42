export class Cliente {
  private id?: number;
  private email: string;
  private nome: string;
  private telefone: string;
  private cpf: string;

  constructor(
    id: number,
    email: string,
    name: string,
    phone: string,
    cpf: string,
  ) {
    this.id = id;
    this.email = email;
    this.nome = name;
    this.telefone = phone;
    this.cpf = cpf;
  }

  public getId() {
    return this.id;
  }

  public getEmail() {
    return this.email;
  }

  public getNome() {
    return this.nome;
  }

  public getTelefone() {
    return this.telefone;
  }

  public getCpf() {
    return this.cpf;
  }

  public setId(id: number) {
    this.id = id;
  }

  public setEmail(email: string) {
    this.email = email;
  }

  public setNome(nome: string) {
    this.nome = nome;
  }

  public setTelefone(telefone: string) {
    this.telefone = telefone;
  }

  public setCpf(cpf: string) {
    this.cpf = cpf;
  }
}
