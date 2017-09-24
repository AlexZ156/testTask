import 'rxjs/add/operator/switchMap';
import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { ProductsService } from './../products.component/products.service';

import { Product } from './../interfaces';

@Component({
  selector: 'singel-product-component',
  templateUrl: './singel-product-component.html',
  styleUrls: ['./singel-product-component.css']
})

export class SingelProductComponent implements OnInit {
  product: Product;
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
  	this.route.paramMap
      .switchMap((params: ParamMap) => {
        return this.productsService.getSingleProduct(+params.get('id'));
      })
      .subscribe((product: Product) => this.product = product);
  }

  addToCart() {
    this.productsService.addToCart(this.product.id);
  }
}
