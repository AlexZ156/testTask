import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import localStorageHelper from './../localStorageHelper';
import { Product } from './../interfaces';

@Injectable()
export class ProductsService {

  constructor(private http: Http) {}

  filterByName(productsArr: Array<Product>, filterData:any): Promise<any> {
      return new Promise(resolve => {
          if (!filterData.productName) {
              resolve(productsArr);
          }

          resolve(productsArr.filter((product: Product) => {
              return product.name.toUpperCase().indexOf(filterData.productName.toUpperCase()) !== -1;
          }));
      });
  }

  filterByPrice(productsArr: Array<Product>, filterData:any): Promise<any> {
      return new Promise(resolve => {
          if (!filterData.price) {
              resolve(productsArr);
          }

          resolve(productsArr.filter((product: Product) => {
              return product.price >= filterData.price[0] && product.price <= filterData.price[1];
          }));
      });
  }

  filterByBrand(productsArr: Array<Product>, filterData:any): Promise<any> {
      return new Promise(resolve => {
          if (!filterData.brands) {
              resolve(productsArr);
          }

          resolve(productsArr.filter((product: Product) => {
            return filterData.brands.some((brandName: string) => {
              return brandName === product.brand;
            })
          }));
      });
  }

  filterByStok(productsArr: Array<Product>, filterData:any): Promise<any> {
      return new Promise(resolve => {
          if (!filterData.inStock) {
              resolve(productsArr);
          }

          resolve(productsArr.filter((product: Product) => {
            return product.inStock;
          }));
      });
  }

  getProducts(): Promise<any> {
    return new Promise(resolve => {
      this.http
               .get(`./app/static-data/products.json`)
               .map(response => response.json()).subscribe(data => {
                 let cartData = localStorageHelper.getItem('cart') || [];

                 data.forEach((product: Product) => {
                   if (cartData.indexOf(product.id) !== -1) {
                     product.cartActive = true;
                   }
                 });
                 resolve(data);
               });
    })
  }

  getCartProducts(): Promise<any> {
    return new Promise(resolve => {
      this.getProducts().then(products => {
        resolve(products.filter((product: Product) => product.cartActive));
      })
    })
  }

  getSingleProduct(id: number): Promise<any> {
    return this.getProducts()
               .then(products => products.find((product: any) => product.id === id));
  }

  getFilterProducts(productsArr: Array<Product>, filterData: any): Promise<any> {
      let currProductsArr = productsArr.slice();

      return new Promise(resolve => {
          this.filterByName(currProductsArr, filterData)
              .then((arr: any) => {
                  this.filterByPrice(arr, filterData).then((arr: any) => {
                      this.filterByBrand(arr, filterData).then((arr: any) => {
                        this.filterByStok(arr, filterData).then((arr: any) => {
                          resolve(arr);
                        });
                      });
                  })
          });
      });
  }

  addToCart(id: number) {
    let currCart: Array<number> = localStorageHelper.getItem('cart') || [];

    if (currCart.indexOf(id) === -1) {
      currCart.push(id);
      localStorageHelper.setItem('cart', currCart);
    }
  }

  removeFromCart(id: number) {
    let currCart: Array<number> = localStorageHelper.getItem('cart') || [];

    if (currCart.length) {
      let position = currCart.indexOf(id);

      if (position !== -1) {
        currCart.splice(position, 1);
        localStorageHelper.setItem('cart', currCart);
      }
    }
  }

  getCartNumber() {
    return (localStorageHelper.getItem('cart') || []).length;
  }

  buyProducts() {
      /*something will be here*/
  }
}
