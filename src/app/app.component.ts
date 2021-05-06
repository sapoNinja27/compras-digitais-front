import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Categorias', url: '/categorias', icon: 'newspaper' },
    { title: 'aafs', url: '/fgjs', icon: 'newspaper' },
    { title: 'adf', url: '/jdj', icon: 'newspaper' },
  ];
  constructor() {}
  
}
