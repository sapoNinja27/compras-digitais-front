import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoConcluidoPage } from './pedido-concluido.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoConcluidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoConcluidoPageRoutingModule {}
