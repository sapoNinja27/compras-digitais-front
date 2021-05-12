import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { stringify } from 'json5';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor( public menu: MenuController) { }
  tipo:string= "Cpf";
  tam:number=14;
  cpfOuCnpjInput:String="";
  cep:String="";

  change(i:number){
    this.cpfOuCnpjInput= "";
    if(i==1){
      this.tipo="Cpf";
      this.tam=14;
    }else if(i==2){
      this.tipo="Cnpj";
      this.tam=18;
    }
  }
  formatarCep(value:string){
    this.cep ="";
    value =  ""+value.replace(/[^0-9]+/g, "");
    if(value.length>5){
      value=value.substring(0,5)+"-"+value.substring(5);
    }
    this.cep=value;
  }
  formatar(value:string){
    this.cpfOuCnpjInput ="";
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
      // 30.522.343/0001-87
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
    this.cpfOuCnpjInput=value;
  }
  ngOnInit() {
  }
  ionViewDidLeave() {
    this.menu.enable(true);
  }
  ionViewWillEnter() {
    this.menu.enable(false);
  }
}
