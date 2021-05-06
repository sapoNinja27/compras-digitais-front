import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public home: string;

  constructor(private activatedRoute: ActivatedRoute, public navCtrl: NavController, public menu: MenuController) { }

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
    this.navCtrl.navigateForward("/categorias");
  }
}
