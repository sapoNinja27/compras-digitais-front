import { Component } from '@angular/core';
import { AuthInterceptorProvider } from 'src/interceptors/auth-interceptor';
import { AuthService } from 'src/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public auth: AuthService){ }
  public appPages = [
    { title: 'Perfil', url: '/profile', icon: 'person-circle' },
    { title: 'Categorias', url: '/categorias', icon: 'newspaper' },
    { title: 'Sair', url: '/home', icon: 'log-out'}
  ];
  testButton(title){
    if(title=="Sair"){
      //adicionar um this.menu.then=> funcao pra fechar primeiro para evitar o conflito de abertura de menu durante a navegaçao _before(),mas funciona so trocando 
      //o nav controller por router e adicionando o menu.enable false no ngInit
      //usar o menu.close aqui faz ele navegar pra pagina home e fazer o auto reload antes de fechar o menu, oq acarreta em um usuario fantasma logado
      this.auth.logout();
    }
  }
}
