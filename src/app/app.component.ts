import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Perfil', url: '/profile', icon: 'person-circle' },
    { title: 'Categorias', url: '/categorias', icon: 'newspaper' },
  ];
  constructor() {}
  
}
