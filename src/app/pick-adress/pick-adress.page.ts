import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Cart } from 'src/models/cart';
import { ClienteDTO } from 'src/models/cliente.dto';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { PedidoDTO } from 'src/models/pedido.dto';
import { AuthService } from 'src/services/auth.service';
import { CartService } from 'src/services/cart-service';
import { ClienteService } from 'src/services/domain/cliente.service';
import { PageHelperService } from 'src/services/page.helper.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-pick-adress',
  templateUrl: './pick-adress.page.html',
  styleUrls: ['./pick-adress.page.scss'],
})
export class PickAdressPage implements OnInit {
  cart: Cart=this.cartService.getCarrinho();
  cliente:ClienteDTO;
  pedidoDto:PedidoDTO={
    cliente:{
      id:"0"
    },
    enderecoDeEntrega:{
      id:"0"
    },
    pagamento:{
      numeroDeParcelas:1,
      '@type':null
    },
    itens:[]
  }
  enderecos : EnderecoDTO[];
    constructor(public clienteService: ClienteService,
      public auth:AuthService,
      public pageHelper: PageHelperService,
      public cartService: CartService,
      public router: Router,
      public menu:MenuController ) { }
  goBack(){
    this.pageHelper.setPage(null);
    this.menu.enable(true);
    this.router.navigateByUrl("/carrinho"); 
  }
  ionViewDidEnter() {
    let localUser=this.auth.checkUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
      .subscribe(response =>{
        this.cliente=response;
        this.enderecos=response['enderecos'];
        this.cart.itens.forEach(item => {
          this.pedidoDto.itens.push({
            quantidade:item.quantidade,
            produto:{
              id:item.produto.id
            }
          })
        });
    },
      error=>{})
    }
  }
 ngOnInit() {
    this.pageHelper.setPage({
      url:"/pick-adress"
    });
  }
  change(end:EnderecoDTO){
    this.pedidoDto.enderecoDeEntrega.id=end.id
  }
  pagamento(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.pedidoDto)
      }
    };
      this.router.navigate(['/pagamento'],navigationExtras); 
  }
  checkValid():boolean{
    if(this.pedidoDto.enderecoDeEntrega.id=="0"){
      return true;
    }else{
      return false;
    }
  }
}
