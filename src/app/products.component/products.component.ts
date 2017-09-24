import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { Location }                 from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';



@Component({
  selector: 'products-component',
  templateUrl: './products-component.html',
  styleUrls: ['./products-component.css']
})


export class ProductsComponent {
    defaultRroducts: any;
    currentProduct: any;
    cartNumber: number;
    constructor(
        private productsService: ProductsService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location
    ) {
        this.cartNumber = this.productsService.getCartNumber();
    }

    ngOnInit(): void {
        this.productsService.getProducts().then((data) => {
            this.defaultRroducts = data;
            this.currentProduct = this.defaultRroducts;
        });
    }

    onFilter(data: any) {
        this.productsService.getFilterProducts(this.defaultRroducts, data).then((resultData: any) => {
            this.currentProduct = resultData;
        });
    }

    onClearFilter() {
        this.currentProduct = this.defaultRroducts;
    }

    goToProduct(product: any) {
        this.router.navigate(['/products', product.id]);
    }

    addToCart(product: any) {
        this.productsService.addToCart(product.id);
        product.cartActive = true;
        this.cartNumber = this.productsService.getCartNumber();
    }
}
