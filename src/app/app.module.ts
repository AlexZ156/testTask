import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { RouterModule }   from '@angular/router'
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { ProductsComponent } from './products.component/products.component';
import { ProductsService } from './products.component/products.service';
import { ProductsFilterComponent } from './products-filter.component/products-filter.component';
import { SingelProductComponent } from './singel-product.component/singel-product.component';
import { CartComponent } from './cart.component/cart.component';

@NgModule({
  imports:      [
      BrowserModule,
      FormsModule,
      HttpModule,
      RouterModule.forRoot([
      {
        path: '',
        component: ProductsComponent
      },
      {
        path: 'products/:id',
        component: SingelProductComponent
      },
      {
        path: 'cart',
        component: CartComponent
      }
    ])
  ],
  providers: [
    ProductsService
  ],
  declarations: [
      AppComponent,
      ProductsComponent,
      ProductsFilterComponent,
      SingelProductComponent,
      CartComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
