import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "src/config/storage_keys.config";
import { Cart } from "src/models/cart";
import { CartItem } from "src/models/cart-item";
import { LastPage } from "src/models/last.page";
import { LocalUser } from "src/models/local_user";

@Injectable()
export class StorageService{
    getLocalUser() : LocalUser{
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if(usr==null){
            return null;
        }else{
            return JSON.parse(usr);
        }
    }
    setLocalUser(obj: LocalUser) {
        if(obj == null){
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }else{
            localStorage.setItem(STORAGE_KEYS.localUser,JSON.stringify(obj));
        }
    }
    getCarrinho() : Cart{
        let cart = localStorage.getItem(STORAGE_KEYS.cart);
        if(clearTimeout==null){
            return null;
        }else{
            return JSON.parse(cart);
        }
    }
    setCarrinho(obj:Cart){
        if(obj != null){
            localStorage.setItem(STORAGE_KEYS.cart,JSON.stringify(obj));
        }else{
            let newCart:Cart={
                itens:[]
            }
            localStorage.setItem(STORAGE_KEYS.cart,JSON.stringify(newCart));
        }
    }
    addItemCarrinho(obj: CartItem) {
        let cart:Cart={
            itens:[]
        }
        let cartStorage=this.getCarrinho();
        if(cartStorage==null){
            cart.itens.push(obj);
            if(obj != null){
                localStorage.setItem(STORAGE_KEYS.cart,JSON.stringify(cart));
            }
        }else{
            let repetido:boolean=false;
            for(let i=0; i<cartStorage.itens.length;i++){
                if(cartStorage.itens[i].produto.id==obj.produto.id){
                    cartStorage.itens[i].quantidade++;
                    repetido=true;
                }
            }
            cart.itens=cartStorage.itens;
            if(!repetido){
                cart.itens.push(obj);
            }
            if(obj != null){
                localStorage.setItem(STORAGE_KEYS.cart,JSON.stringify(cart));
            }
        }
    }
    removeTodosItemCarrinho(obj: CartItem) {
        let cart:Cart={
            itens:[]
        }
        let cartStorage=this.getCarrinho();
            for(let i=0; i<cartStorage.itens.length;i++){
                if(cartStorage.itens[i].produto.id==obj.produto.id){
                    cartStorage.itens[i].quantidade=0;
                }
            }

            cart=this.removeVazio(cartStorage);
            if(obj != null){
                localStorage.setItem(STORAGE_KEYS.cart,JSON.stringify(cart));
            }
    }
    removeVazio(cartOld: Cart):Cart{
        let cartNew:Cart={
            itens:[]
        }
        cartOld.itens.forEach(cartItem => {
            if(cartItem.quantidade>0){
                cartNew.itens.push(cartItem);
            }
        });
        return cartNew;
    }
    removeItemCarrinho(obj: CartItem) {
        let cart:Cart={
            itens:[]
        }
        let cartStorage=this.getCarrinho();
        let repetido:boolean=false;
            for(let i=0; i<cartStorage.itens.length;i++){
                if(cartStorage.itens[i].produto.id==obj.produto.id){
                    cartStorage.itens[i].quantidade--;
                    if(cartStorage.itens[i].quantidade<0){
                        cartStorage.itens[i].quantidade=0;
                    }
                    repetido=true;
                }
            }
            cart.itens=cartStorage.itens;
            if(obj != null){
                localStorage.setItem(STORAGE_KEYS.cart,JSON.stringify(cart));
            }
    }
    getLastPage() : LastPage{
        let pge = localStorage.getItem(STORAGE_KEYS.lastPage);
        if(pge==null){
            return null;
        }else{
            return JSON.parse(pge);
        }
    }
    setLastPage(obj: LastPage) {
        if(obj == null){
            localStorage.removeItem(STORAGE_KEYS.lastPage);
        }else{
            localStorage.setItem(STORAGE_KEYS.lastPage,JSON.stringify(obj));
        }
    }
}