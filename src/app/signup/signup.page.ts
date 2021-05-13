import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CidadeDTO } from 'src/models/cidade.dto';
import { ClienteNewDTO } from 'src/models/cliente.new.dto';
import { EstadoDTO } from 'src/models/estado.dto';
import { CidadeService } from 'src/services/domain/cidade.service';
import { ClienteService } from 'src/services/domain/cliente.service';
import { EstadoService } from 'src/services/domain/estado.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor( public menu: MenuController,
    public estadoService:EstadoService,
    public cidadeService:CidadeService,
    public clienteService:ClienteService) { }
  tam:number=14;
  estadoSelected:string;
  cidadeSelected:string;
  tipo:string="Cpf"
  estados:EstadoDTO;
  cidades:CidadeDTO;
  clienteNewDto:ClienteNewDTO={
    nome:"",
    email:"",
    senha:"",
    cpfOuCnpj:"",
    tipo:1,
    cep:"",
    logradouro:"",
    cidadeId:"",
    numero:"",
    complemento:"",
    estado:"",
    bairro:"",
    telefone1:""

};
  change(i:number){
    this.clienteNewDto.cpfOuCnpj= "";
    if(i==1){
      this.tipo="Cpf";
      this.tam=14;
    }else if(i==2){
      this.tipo="Cnpj";
      this.tam=18;
    }
  }
  formatarCep(value:string){
    this.clienteNewDto.cep ="";
    value =  ""+value.replace(/[^0-9]+/g, "");
    if(value.length>5){
      value=value.substring(0,5)+"-"+value.substring(5);
    }
    this.clienteNewDto.cep=value;
  }
  formatarDoc(value:string){
    this.clienteNewDto.cpfOuCnpj ="";
    value =  ""+value.replace(/[^0-9]+/g, "");
    if(this.tipo=="Cpf"){
      if(value.length>2){
        value=value.substring(0,3)+"."+value.substring(3);
      }
      if(value.length>7){
        value=value.substring(0,7)+"."+value.substring(7);
      }
      if(value.length>11){
        value=value.substring(0,11)+"-"+value.substring(11);
      }
    }else if(this.tipo="Cnpj"){
      if(value.length>1){
        value=value.substring(0,2)+"."+value.substring(2);
      }
      if(value.length>6){
        value=value.substring(0,6)+"."+value.substring(6);
      }
      if(value.length>10){
        value=value.substring(0,10)+"/"+value.substring(10);
      }
      if(value.length>15){
        value=value.substring(0,15)+"-"+value.substring(15);
      }
    }
    this.clienteNewDto.cpfOuCnpj=value;
  }
  ngOnInit() {
    this.estadoService.findAll()
      .subscribe(response =>{
        this.estados=response;
      },
      error=>{})
     
  }
  updateCidades(value:string){
    this.estadoService.findById(value)
      .subscribe(response =>{
        this.clienteNewDto.estado=response.nome;
      },
      error=>{})
    this.cidadeService.findById(value)
    .subscribe(response =>{
      this.cidades=response;
    },
    error=>{})
  }
  ionViewDidLeave() {
    this.menu.enable(true);
  }
  ionViewWillEnter() {
    this.menu.enable(false);
  }
  signupUser(){
    if(this.tipo="Cpf"){
      this.clienteNewDto.tipo=1;
    }else if(this.tipo="Cnpj"){
      this.clienteNewDto.tipo=2;
    }
    this.clienteNewDto.cpfOuCnpj =  ""+this.clienteNewDto.cpfOuCnpj.replace(/[^0-9]+/g, "");
    console.log(this.clienteNewDto)
    this.clienteService.addCliente(this.clienteNewDto)
    .subscribe(response =>{
      console.log("ok")
    },error=>{
    });
  }
  adicionarCidade(value:string){
    console.log(value)
    this.clienteNewDto.cidadeId=value;
  }
}
