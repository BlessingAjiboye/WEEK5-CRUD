import { Injectable } from "@angular/core";
import { Product } from "./product.model";
//import { StaticDataSource } from "./static.datasource";
import { RestDataSource } from "./rest.datasource";
@Injectable()
export class ProductRepository {
    private products: Product[] = [];
    private categories: string[] = [];
    constructor(private dataSource: RestDataSource) {
        dataSource.getProducts().subscribe(data => {
            this.products = data;
            this.categories = data.map(p => p.category!)
                .filter((c, index, array) => array.indexOf(c) == index).sort();
        });
    }
    getProducts(category: string = ""): Product[] {
        return this.products
            .filter(p => category == "" || category == p.category);
    }
    getProduct(id: number): Product {
        return(this.products.find(p => p.id == id)!);
    }
    getCategories(): string[] {
        return this.categories;
    }
}
