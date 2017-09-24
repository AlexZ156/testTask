export class Product {
    name: string;
    id: number;
    description: string;
    price: number;
    brand: string;
    inStock: boolean;
    img: string;
    cartActive?: boolean;
}

export class FilterData {
    price?: Array<number>;
    productName?: string;
    brands?: Array<string>;
    inStock?: boolean;
}


