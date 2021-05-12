export interface ClienteDTO {
    id: string,
    nome: string,
    email: string,
    senha:string,
    cpfOuCnpj:string,
    tipo:string,
    logradouro:string,
	private String numero;
	private String complemento;
	private String bairro;@NotEmpty(message = "Preenchimento obrigatório")
	private String cep;
    private String telefone1;
	private String telefone2;
	private String telefone3;
	
	private Integer cidadeId;
    estado:string,
    imageUrl?: string
}