import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "src/config/api.config";
import { ProdutoDTO } from "src/models/produto.dto";

@Injectable()
export class ProdutoService{
    constructor(public http: HttpClient){
        
    }
    findByCategoria(id:string){
        return this.http.get(`${API_CONFIG.baseUrl}/produtos?&categorias=${id}`);
    }
    findById(id:string): Observable<ProdutoDTO>{
        return this.http.get <ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${id}`);
    }
}