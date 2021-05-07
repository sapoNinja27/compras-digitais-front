import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { CredenciaisDTO } from 'src/models/credenciais.dto';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public home: string;
  creds : CredenciaisDTO={
    email:"",
    senha:""
  };
  constructor(private activatedRoute: ActivatedRoute,
     public navCtrl: NavController, 
     public menu: MenuController,
     public auth: AuthService) { }

  ionViewWillEnter() {
    this.menu.enable(false);
  }
  ionViewDidLeave() {
    this.menu.enable(true);
  }
  ngOnInit() {
    this.home = this.activatedRoute.snapshot.paramMap.get('id');
  }
  login(){
    this.auth.authenticate(this.creds)
      .subscribe(response=>{
        this.auth.successfulLogin(response.headers.get("Authorization"))
        this.navCtrl.navigateForward("/categorias");
      })
  }
}
