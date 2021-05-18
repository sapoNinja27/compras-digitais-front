import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/models/cart';
import { CartItem } from 'src/models/cart-item';
import { ProdutoDTO } from 'src/models/produto.dto';
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
  public router: Router) { }
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
  finalizarCompra(){
    //TODO finalizar compra
  }
  carrinhoVazio():boolean{
    if(this.total==0){
      return true;
    }
    return false;
  }
}
