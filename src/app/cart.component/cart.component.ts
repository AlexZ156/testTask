import 'rxjs/add/operator/switchMap';
import { Component, OnInit }        from '@angular/core';
import { ProductsService } from './../products.component/products.service';
import { Product } from './../interfaces';

@Component({
  selector: 'cart-component',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  products: Array<Product> = [];
  constructor(
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productsService.getCartProducts().then((data: Array<Product>) => {
          this.products = data;
      });
  }

  buy() {
    this.productsService.buyProducts();
  }

  remove(id: number) {
    this.productsService.removeFromCart(id);

    this.products = this.products.filter((product: Product) => {
      return product.id !== id;
    });
  }
}
