import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "src/config/api.config";
import { CredenciaisDTO } from "src/models/credenciais.dto";
import { LocalUser } from "src/models/local_user";
import { StorageService } from "./storage.service";
import { JwtHelperService  } from '@auth0/angular-jwt';

@Injectable()
export class AuthService{
    jwtHelperService: JwtHelperService  = new JwtHelperService ();
    constructor(
        public http : HttpClient,
        public storage : StorageService){

    }
    authenticate(creds : CredenciaisDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`, 
            creds,
            {
                observe: 'response',
                responseType: 'text'
            });
    }
    successfulLogin(authorizationValue:string){
        let tok = authorizationValue.substring(7);
        let user: LocalUser ={
            token:tok,
            email: this.jwtHelperService.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
    }
    logout(){
        this.storage.setLocalUser(null);
    }

}