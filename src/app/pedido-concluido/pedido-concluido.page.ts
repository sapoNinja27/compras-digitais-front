import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidoDTO } from 'src/models/pedido.dto';

@Component({
  selector: 'app-pedido-concluido',
  templateUrl: './pedido-concluido.page.html',
  styleUrls: ['./pedido-concluido.page.scss'],
})
export class PedidoConcluidoPage implements OnInit {
  codigo:string;
  constructor(
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.codigo = JSON.parse(params.special);
      }
    });
  }

}
