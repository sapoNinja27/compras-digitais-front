import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { PedidoDTO } from 'src/models/pedido.dto';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
})
export class PagamentoPage implements OnInit {
  formaDePagamento:number=0;
  qntParcelas:number;
  parcelas:number[]=[1,2,3,4,5,6,7,8,9,10];
  pedidoDto:PedidoDTO;
  constructor(
    private route: ActivatedRoute,
    public router: Router) { }


  ionViewDidEnter() {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.pedidoDto = JSON.parse(params.special);
      }
    }); 
  }

  ngOnInit() {
    
  }
  change(num){
    this.formaDePagamento=num;
    if(num==1){
      this.pedidoDto.pagamento['@type']="pagamentoComCartao"
    }else if(num==2){
      this.pedidoDto.pagamento['@type']="pagamentoComBoleto"
    }
  }
  boleto(){
    if(this.formaDePagamento==2){
      return false
    }
    return true;
  }
  confirmar(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.pedidoDto)
      }
    };
      this.router.navigate(['/confirmacao'],navigationExtras); 
  }
  checkValid(){
    if(this.formaDePagamento==0){
      return true;
    }
    return false;
  }
  updateParcelas(num){
    console.log(num)
    this.pedidoDto.pagamento.numeroDeParcelas=num;
  }
  goBack(){
    this.router.navigateByUrl("/pick-adress"); 
  }
}
