import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Cart } from "src/models/cart";
import { CartItem } from "src/models/cart-item";
import { StorageService } from "./storage.service";

@Injectable()
export class CartService{
    jwtHelperService: JwtHelperService  = new JwtHelperService ();
    constructor(
        public http : HttpClient,
        public storage : StorageService){

    }
    adicionar(cartItem:CartItem){
        this.storage.addItemCarrinho(cartItem);
    }
    getCarrinho():Cart{
        return this.storage.getCarrinho();
    }
    remover(cartItem:CartItem){
        this.storage.removeItemCarrinho(cartItem);
    }
    removerTodos(cartItem:CartItem){
        this.storage.removeTodosItemCarrinho(cartItem);
    }
    getCarrinhoLimpo():Cart{
        let cartLimpo=this.storage.getCarrinho();
        this.storage.setCarrinho(this.storage.removeVazio(cartLimpo));
        return this.storage.getCarrinho();
    }
    esvaziarCarrinho(){
        this.storage.setCarrinho(null);
    }
}