import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/models/cart';
import { CartService } from 'src/services/cart-service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {
  itens:Cart=this.cartService.getCarrinho();
  total:number=0;
  constructor(public cartService:CartService) { }
  atualizarTotal(){
    this.itens.itens.forEach(item => {
      console.log(this.total)
      let preco=+item.produto.preco*item.quantidade;
      this.total=this.total+preco;
    });
  }
  ngOnInit() {
    this.atualizarTotal()
  }
  adicionarItem(){

  }
  removarItem(){
    
  }
  finalizarCompra(){
    //TODO finalizar compra
  }
}
