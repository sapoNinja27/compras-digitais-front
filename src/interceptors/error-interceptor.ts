import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { StorageService } from "src/services/storage.service";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
 
 
@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
 
    constructor(public storage: StorageService,
        public alertCtrl: AlertController,
        private router: Router){ }
 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        return next.handle(req)
                .pipe(
                    catchError(error => {
                       if( !error.status ){
                            error = JSON.parse(error);
                        }
                        let status=error.status;
                        error=error.error;
                        if( !error.status ){
                            error = JSON.parse(error);
                        }
                        error=JSON.stringify(error);
                        let msgs=error.split('"');
                        let msg=""
                        for(let i = 0; i<msgs.length;i++){
                            if(msgs[i] == "message"){
                                msg= msgs[i+2];
                            }
                        }
                        console.log(status+': '+msg);
                        switch(status){
                            case 401: 
                                this.handle401();
                            break;

                            case 403: 
                                this.handle403();
                            break;

                            case 404: 
                                this.handle404();
                            break;

                            default:
                                this.handleDefault(status,msg);
                            break;
                        }
                        return throwError(error);
                    })) as any;
    }
    async handle401(){
        let alert=this.alertCtrl.create({
            header: 'Falha de Autenticação',
            message: 'Email ou senha incorretos',
            backdropDismiss: false,
            buttons:[
                {
                    text:'Tentar novamente'
                }
            ]
        });
        (await alert).present();
    }
    async handle403(){
        let alert=this.alertCtrl.create({
            header: 'Sessão expirada',
            message: 'Faça login novamente para renovar sua sesssão',
            backdropDismiss: false,
            buttons:[
                {
                    text:'Aceitar',
                    handler: () => {
                        this.router.navigateByUrl("/home");
                        this.storage.setLocalUser(null);
                    }
                }
            ]
        });
        (await alert).present();
    }
    async handle404(){
        let alert=this.alertCtrl.create({
            header: 'Serciço indisponivel',
            message: 'Voce esta tentando acessar algo que não existe ou nao esta disponivel no momento, por favor tente mais tarde',
            backdropDismiss: false,
            buttons:[
                {
                    text:'Aceitar',
                    handler: () => {
                        this.router.navigateByUrl("/profile");
                    }
                }
            ]
        });
        (await alert).present();
    }
    async handleDefault(status,msg){
        let alert=this.alertCtrl.create({
            header: 'Algum erro ocorreu',
            message: status+': '+ msg,
            backdropDismiss: false,
            buttons:[
                {
                    text:'Aceitar'
                }
            ]
        });
        (await alert).present();
    }
 
}
 
 
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
