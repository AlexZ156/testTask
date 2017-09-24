import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Product, FilterData } from './../interfaces';


class FilterBrandsObj {
    checked: boolean;
    name: string;
}

@Component({
    selector: 'products-filter-component',
    templateUrl: './products-filter.component.html'
})

export class ProductsFilterComponent {
    @Input() products: any;
    @Output() onFilter = new EventEmitter<any>();
    @Output() onClearFilter = new EventEmitter<void>();
    brands: any;
    objectKeys = Object.keys;
    productName: string;
    priceFrom: any;
    priceTo: any;
    inStock: boolean;

    ngOnChanges():void {
        if (this.products) {
            this.brands = this.getBrands();
        }
    }

    getBrands(): any {
        return this.products.reduce((defObj: FilterBrandsObj, obj: Product) => {
            if (!defObj[obj.brand]) {
                defObj[obj.brand] = {
                    checked: false,
                    name: obj.brand
                };
            }

            return defObj;
        }, {});
    }

    doFilter():void {
        let filterObj:FilterData = {};
        let activeBrands: Array<string> = [];

        if (this.priceFrom || this.priceTo) {
            filterObj.price = this.getRange(this.priceFrom, this.priceTo);
        }

        if (this.productName && this.productName.length) {
            filterObj.productName = this.productName
        }

        for (let name in this.brands) {
            if (this.brands[name].checked) {
                activeBrands.push(name);
            }
        }

        if (activeBrands.length) {
            filterObj.brands = activeBrands;
        }

        if (this.inStock) {
            filterObj.inStock = true;
        }

        this.onFilter.emit(filterObj);
    }

    clearFilter():void {
        this.productName = '';
        this.priceFrom = '';
        this.priceTo = '';
        this.inStock = false;
        Object.keys(this.brands).forEach((name:string) => {
            this.brands[name].checked = false;
        });
        this.onClearFilter.emit();
    }

    getRange(from: any, to: any): Array<number> {
        let fromVal: number = parseInt(from, 10);
        let toVal: number = parseInt(to, 10);
        let arr: Array<number> = [];

        if (isNaN(fromVal)) {
            fromVal = -Infinity;
        }

        if (isNaN(toVal)) {
            toVal = Infinity;
        }

        return [fromVal, toVal].sort((a, b) => a - b);
    }
}
