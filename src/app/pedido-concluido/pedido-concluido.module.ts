import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidoConcluidoPageRoutingModule } from './pedido-concluido-routing.module';

import { PedidoConcluidoPage } from './pedido-concluido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoConcluidoPageRoutingModule
  ],
  declarations: [PedidoConcluidoPage]
})
export class PedidoConcluidoPageModule {}
