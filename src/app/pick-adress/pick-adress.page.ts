import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { ClienteService } from 'src/services/domain/cliente.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-pick-adress',
  templateUrl: './pick-adress.page.html',
  styleUrls: ['./pick-adress.page.scss'],
})
export class PickAdressPage implements OnInit {

  enderecos : EnderecoDTO[];
  enderecoEsc : EnderecoDTO;
    constructor(public storage: StorageService,
      public clienteService: ClienteService,
      public router: Router,
      public menu:MenuController ) { }
  goBack(){
    this.menu.enable(true);
    this.router.navigateByUrl("/carrinho"); 
  }
 ngOnInit() {
    let localUser=this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
      .subscribe(response =>{
      this.enderecos=response['enderecos'];
    },
      error=>{})
    }
  }
  change(end:EnderecoDTO){
    this.enderecoEsc=end;
  }
  pagamento(){

  }
  checkValid():boolean{
    if(this.enderecoEsc==null){
      return true;
    }else{
      return false;
    }
  }
}
