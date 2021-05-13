import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "src/config/api.config";
import { CidadeDTO } from "src/models/cidade.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class CidadeService {
    constructor(public http: HttpClient,
        public storage : StorageService) {

    }
    findById(id: string): Observable<CidadeDTO> {
       return this.http.get<CidadeDTO>(`${API_CONFIG.baseUrl}/estados/${id}/cidades`);
    }
}