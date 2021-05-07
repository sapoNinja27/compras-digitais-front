import { Component, OnInit } from '@angular/core';
import { ClienteDTO } from 'src/models/cliente.dto';
import { ClienteService } from 'src/services/domain/cliente.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  cliente : ClienteDTO;
  sourceImg:string;
  constructor(public storage: StorageService,
    public clienteService: ClienteService) { }

  ngOnInit() {
    this.sourceImg="assets/avatar-blank.jpg";
    let localUser=this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
      .subscribe(response =>{
        this.cliente=response;
        console.log(this.cliente)
        //TODO buscar imagem
      },
      error=>{

      })
    }
  }

}
