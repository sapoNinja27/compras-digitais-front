import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { CategoriaDTO } from 'src/models/categoria.dto';
import { ProdutoDTO } from 'src/models/produto.dto';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { ProdutoService } from 'src/services/domain/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {
  itens:ProdutoDTO;
  cat:CategoriaDTO;
  bucketUrl: string ="https://rockcontent.com/br/wp-content/uploads/sites/2/2020/09/whatsapp-business-mobile-1024x1024.png";
  constructor(
    private route: ActivatedRoute,
    public produtoService: ProdutoService,
    public categoriaService: CategoriaService,
    public router : Router,
    public loadingCtrl:LoadingController
  ) { }

  ngOnInit() {
    let id:any;
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        id = JSON.parse(params.special);
      }
    });
    this.categoriaService.findById(id).subscribe( response=>{
      this.cat=response;
    },
    error=>{});
    this.produtoService.findByCategoria(id).subscribe( response=>{
      this.itens=response['content'];
    },
    error=>{});
  }
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await loading.present();
  }
  goProduto(id:string){
    let ext={
      prod_id:id,
      cat_id:this.cat.id
    }
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(ext)
      }
    };
      this.router.navigate(['/produto-detail'],navigationExtras); 
  }
  goBack(){
    this.router.navigateByUrl("/categorias"); 
  }
}
