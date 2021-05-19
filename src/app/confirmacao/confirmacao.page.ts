import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Cart } from 'src/models/cart';
import { ClienteDTO } from 'src/models/cliente.dto';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { PedidoDTO } from 'src/models/pedido.dto';
import { AuthService } from 'src/services/auth.service';
import { CartService } from 'src/services/cart-service';
import { ClienteService } from 'src/services/domain/cliente.service';
import { PedidoService } from 'src/services/domain/pedido.service';
import { PageHelperService } from 'src/services/page.helper.service';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.page.html',
  styleUrls: ['./confirmacao.page.scss'],
})
export class ConfirmacaoPage implements OnInit {
  pedidoDto:PedidoDTO;
  carrinho:Cart=this.cartService.getCarrinho();
  total:number=0;
  cliente:ClienteDTO;
  end:EnderecoDTO;
  ends:EnderecoDTO[];
  pagamento={
    tipo:"",
    parcelas:1
  }
  atualizarTotal(){
    this.total=0;
    this.carrinho.itens.forEach(item => {
      let preco=+item.produto.preco*item.quantidade;
      this.total=this.total+preco;
    });
  }
  constructor(
    private route: ActivatedRoute,
    public router:Router,
    public cartService: CartService,
    public auth:AuthService,
    public clienteService:ClienteService,
    public pedidoService: PedidoService,
    public menu: MenuController,
    public pageHelper: PageHelperService) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.pedidoDto = JSON.parse(params.special);
      }
    }); 
    if(this.pedidoDto.pagamento['@type']=="pagamentoComBoleto"){
      this.pagamento.tipo="Pagamento com boleto"
    }else if(this.pedidoDto.pagamento['@type']=="pagamentoComCartao"){
      this.pagamento.tipo="Pagamento com cartão"
      this.pagamento.parcelas=this.pedidoDto.pagamento.numeroDeParcelas
    }
    this.atualizarTotal();
    let localUser=this.auth.checkUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
      .subscribe(response =>{
        this.cliente=response;
        this.ends=response['enderecos'];
        this.ends.forEach(endereco => {
          if(endereco.id==this.pedidoDto.enderecoDeEntrega.id){
            this.end=endereco;
          }
        });
    },
      error=>{})
    }
  }
  confirmar(){
    this.pedidoDto.cliente.id=this.cliente.id;
    this.pedidoService.insert(this.pedidoDto)
    .subscribe(response =>{
      this.menu.enable(true);
      this.pageHelper.setPage(null);
      this.cartService.esvaziarCarrinho();
      let navigationExtras: NavigationExtras = {
        queryParams: {
          special: JSON.stringify(this.extractId(response.headers.get('Location')))
        }
      };
      
      this.router.navigate(['/pedido-concluido'],navigationExtras); 

    },error=>{
    });
  }
  private extractId(location:string):string{
      let str=location.split("pedidos/");
      return str[1];
  }
  goBack(){
    this.router.navigateByUrl("/carrinho"); 
  }
}
