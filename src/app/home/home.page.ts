import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController} from '@ionic/angular';
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
     public menu: MenuController,
     public auth: AuthService,
     private router: Router) { }

  ionViewDidLeave() {
    this.menu.enable(true);
  }
  ionViewDidEnter() {
    if(this.auth.checkUser()){
      this.auth.refreshToken()
        .subscribe(response=>{
          this.auth.successfulLogin(response.headers.get("Authorization"))
          this.router.navigateByUrl("/categorias");
        })
    }
  }
  ngOnInit() {
    this.menu.enable(false);
    this.home = this.activatedRoute.snapshot.paramMap.get('id');
  }
  login(){
    this.auth.authenticate(this.creds)
      .subscribe(response=>{
        this.auth.successfulLogin(response.headers.get("Authorization"))
        this.router.navigateByUrl("/categorias");
      })
  }
  signup(){
    this.router.navigateByUrl("/signup"); 
  }
}
