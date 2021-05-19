import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';
import { LastPage } from "src/models/last.page";
import { StorageService } from "./storage.service";

@Injectable()
export class PageHelperService{
    jwtHelperService: JwtHelperService  = new JwtHelperService ();
    constructor(
        public http : HttpClient,
        public storage : StorageService){

    }
    setPage(page:LastPage){
        this.storage.setLastPage(page);
    }
    getPage():LastPage{
        return this.storage.getLastPage();
    }
}