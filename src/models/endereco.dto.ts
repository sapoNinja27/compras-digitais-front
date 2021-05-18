import { CidadeDTO } from "./cidade.dto";

export interface EnderecoDTO{
    id: string;
    logradouro:string;
    numero:number;
    complemento: string;
    bairro:string;
    cep:string;
    cidade:CidadeDTO;
}