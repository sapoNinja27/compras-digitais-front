import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { API_CONFIG } from 'src/config/api.config';
import { CategoriaDTO } from 'src/models/categoria.dto';
import { CategoriaService } from 'src/services/domain/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
  itens:CategoriaDTO[];
  bucketUrl: string =API_CONFIG.bucketBaseUrl;
  constructor(
    public categoriaService : CategoriaService,
    private router: Router) { }

 goCategoria(item : string){
  let navigationExtras: NavigationExtras = {
    queryParams: {
      special: JSON.stringify(item)
    }
  };
    this.router.navigate(['/produtos'],navigationExtras); 
 }
  ngOnInit() {
    this.categoriaService.findAll().subscribe( response=>{
      this.itens=response;
    },
    error=>{});
  }

}
