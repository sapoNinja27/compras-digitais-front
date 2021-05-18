import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CartItem } from 'src/models/cart-item';
import { ProdutoDTO } from 'src/models/produto.dto';
import { CartService } from 'src/services/cart-service';
import { ProdutoService } from 'src/services/domain/produto.service';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.page.html',
  styleUrls: ['./produto-detail.page.scss'],
})
export class ProdutoDetailPage implements OnInit {
  prod:ProdutoDTO;
  cat_id:string;
  constructor(
    private route: ActivatedRoute,
    public produtoService: ProdutoService,
    public router : Router,
    public cart: CartService) { }

  ngOnInit() {
    let ids:any;
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        ids = JSON.parse(params.special);
      }
    }); 
    this.cat_id=ids.cat_id;
    this.produtoService.findById(ids.prod_id).subscribe( response=>{
      this.prod=response;
      this.prod.imageUrl="https://rockcontent.com/br/wp-content/uploads/sites/2/2020/09/whatsapp-business-mobile-1024x1024.png";
    },
    error=>{});
  }
  goBack(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.cat_id)
      }
    };
      this.router.navigate(['/produtos'],navigationExtras); 
  }
  adicionarCarrinho(id:string){
    //TODO fazer adicionar ao carrinho
    let newProd:ProdutoDTO={
      id:this.prod.id,
      nome:this.prod.nome,
      preco:this.prod.preco,
      imageUrl:this.prod.imageUrl
    }
    let carItem:CartItem={
      quantidade:1,
      produto:newProd
    }
    this.cart.adicionar(carItem);
    this.router.navigateByUrl('/carrinho'); 
  }
}
