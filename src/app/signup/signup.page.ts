import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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

  formGroup:FormGroup;
  constructor( public menu: MenuController,
    public estadoService:EstadoService,
    public cidadeService:CidadeService,
    public clienteService:ClienteService,
    public router : Router,
    public formBuilder: FormBuilder) { 
      this.formGroup=this.formBuilder.group({
        nome:['',[
          Validators.required,
          Validators.maxLength(120),
          Validators.minLength(5)
        ]],
        email:['',[
          Validators.required,
          Validators.email
        ]],
        tipo:['',[
          Validators.required
        ]],
        cpfOuCnpj:['',[
          Validators.required,
          Validators.minLength(this.tam),
          Validators.maxLength(this.tam)
        ]],
        senha:['',[
          Validators.required
        ]],
        logradouro:['',[
          Validators.required
        ]],
        numero:['',[
          Validators.required
        ]],
        complemento:['',[]],
        bairro:['',[]],
        cep:['',[
          Validators.required,
          Validators.maxLength(9),
          Validators.minLength(9)
        ]],
        telefone:['',[
          Validators.required
        ]],
        estados:['',[
          Validators.required
        ]],
        cidade:['',[
          Validators.required
        ]],
      })
  }
  tam:number=14;
  estadoSelected:string;
  cidadeSelected:string;
  estados:EstadoDTO;
  cidades:CidadeDTO;
  tipo:string="Cpf";
  campos:string[]=[
  "nome",
  "email",
  "cpfOuCnpj",
  "senha",
  "logradouro",
  "numero",
  "cep",
  "telefone",
  "estado",
  "cidade"
  ];
  dirty:boolean[]=[
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
    ];
    valid:boolean[]=[
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
      ];
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
    this.valid[8]=true;
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
  ionViewDidEnter() {
    this.menu.enable(false);
  }
  signupUser(){
    if(this.tipo="Cpf"){
      this.clienteNewDto.tipo=1;
    }else if(this.tipo="Cnpj"){
      this.clienteNewDto.tipo=2;
    }
    this.clienteNewDto.cpfOuCnpj =  ""+this.clienteNewDto.cpfOuCnpj.replace(/[^0-9]+/g, "");
    this.clienteService.addCliente(this.clienteNewDto)
    .subscribe(response =>{
      this.router.navigateByUrl("/home"); 
    },error=>{
    });
  }
  adicionarCidade(value:string){
    this.valid[9]=true;
    this.clienteNewDto.cidadeId=value;
  }
  goBack(){
    this.router.navigateByUrl("/home"); 
  }
  checkValid():boolean{
    let valid:boolean=true;
    for(let i =0;i<this.valid.length;i++){
      if(!this.valid[i]){
        valid=false;
      }
    }
    return !valid;
  }
  setDirty(campo:string){
    for(let i=0;i<this.campos.length;i++){
      if(this.campos[i]==campo){
        this.dirty[i]=true;
      }
    }
  }
  dadosInvalidos(campo:string):string{
    if(campo=="nome"){
      if(this.dirty[0]){
        if(this.clienteNewDto.nome==""){
          return "Nome não pode estar vazio"
        }else if(this.clienteNewDto.nome.length<5){
          return "Nome tem que ter mais que 5 letras"
        }else if(this.clienteNewDto.nome.length>120){
          return "Nome não pode ter mais que 120 letras"
        }else{
          this.valid[0]=true;
        }
      }
    }else if(campo=="email"){
      if(this.dirty[1]){
        if(this.clienteNewDto.email==""){
          return "Email não pode estar vazio"
        }else if(!this.clienteNewDto.email.includes("@") || this.clienteNewDto.email.charAt(this.clienteNewDto.email.length-1)=="@" ){
          return "Insira um email Valido"
        }else if(!this.clienteNewDto.email.includes(".") || this.clienteNewDto.email.charAt(this.clienteNewDto.email.length-1)=="." ){
          return "Insira um email Valido"
        }else{
          this.valid[1]=true;
        }
      }
    }else if(campo=="cpfOuCnpj"){
      if(this.dirty[2]){
        if(this.clienteNewDto.cpfOuCnpj==""){
          return this.tipo+" não pode estar vazio"
        }else if(this.clienteNewDto.cpfOuCnpj.length<this.tam){
          return this.tipo+" Invalido"
        }else{
          this.valid[2]=true;
        }
      }
    }else if(campo=="senha"){
      if(this.dirty[3]){
        if(this.clienteNewDto.senha==""){
          return "Senha não pode estar vazia"
        }else{
          this.valid[3]=true;
        }
      }
    }else if(campo=="logradouro"){
      if(this.dirty[4]){
        if(this.clienteNewDto.logradouro==""){
          return "Logradouro não pode estar vazio"
        }else{
          this.valid[4]=true;
        }
      }
    }else if(campo=="numero"){
      if(this.dirty[5]){
        if(this.clienteNewDto.numero==""){
          return "Numero não pode estar vazio"
        }else{
          this.valid[5]=true;
        }
      }
    }else if(campo=="cep"){
      if(this.dirty[6]){
        if(this.clienteNewDto.cep==""){
          return "Cep não pode estar vazio"
        }else if(this.clienteNewDto.cep.length<9){
          return "Cep invalido"
        }else{
          this.valid[6]=true;
        }
      }
    }else if(campo=="telefone"){
      if(this.dirty[7]){
        if(this.clienteNewDto.telefone1==""){
          return "Telefone não pode estar vazio"
        }else{
          this.valid[7]=true;
        }
      }
    }
    return ""
  }
}
