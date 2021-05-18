import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Cart } from 'src/models/cart';
import { CartItem } from 'src/models/cart-item';
import { CartService } from 'src/services/cart-service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {
  carrinho:Cart=this.cartService.getCarrinho();
  total:number=0;
  constructor(public cartService:CartService,
  public router: Router,
  public menu:MenuController) { }
  atualizarTotal(){
    this.total=0;
    this.carrinho.itens.forEach(item => {
      let preco=+item.produto.preco*item.quantidade;
      this.total=this.total+preco;
    });
  }
  ionViewWillEnter(){
    this.carrinho=this.cartService.getCarrinhoLimpo();
    this.atualizarTotal()
  }
  atualizar(){
    this.carrinho=this.cartService.getCarrinhoLimpo();
    this.atualizarTotal()
  }
  ngOnInit() {
  }
  continuarComprando(){
    this.router.navigateByUrl("/categorias"); 
  }
  adicionarItem(cartItem:CartItem){
    this.cartService.adicionar(cartItem);
    this.carrinho=this.cartService.getCarrinho();
    this.atualizarTotal()
  }
  removerItem(cartItem:CartItem){
    this.cartService.remover(cartItem);
    this.carrinho=this.cartService.getCarrinho();
    this.atualizarTotal()
  }
  removerTudo(cartItem:CartItem){
    this.cartService.removerTodos(cartItem);
    this.carrinho=this.cartService.getCarrinho();
    this.atualizarTotal()
  }
  esvaziarCarrinho(){
    this.cartService.esvaziarCarrinho();
    this.carrinho=this.cartService.getCarrinho();
    this.atualizarTotal()
  }
  finalizarCompra(){
    this.menu.enable(false);
    this.router.navigateByUrl("/pick-adress"); 
  }
  carrinhoVazio():boolean{
    if(this.carrinho.itens[0]==null){
      return true;
    }
    return false;
  }
}
