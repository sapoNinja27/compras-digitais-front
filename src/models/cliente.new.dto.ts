export interface ClienteNewDTO {
    nome: string,
    email: string,
    cpfOuCnpj:string,
    tipo:number,
    senha:string,
    logradouro:string,
    numero:string,
    complemento:string,
    bairro:string,
    cep:string,
	telefone1 : string,
	telefone2? : string[2],
	cidadeId: string,
    estado:string,
    imageUrl?: string
}