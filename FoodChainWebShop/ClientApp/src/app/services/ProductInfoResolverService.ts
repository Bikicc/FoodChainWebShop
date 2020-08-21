import { FavouritesService } from './FavouritesService';
import { ProductService } from './ProductService';
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { catchError } from 'rxjs/operators';
import { empty } from 'rxjs';

@Injectable({

    providedIn: 'root'

})

export class ProductInfoResolverService implements Resolve<any> {
    constructor(
        private productService: ProductService,
        private favouritesService: FavouritesService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.productService.products_SelectById(Number(route.params.productId)).pipe(
            catchError((error) => {
                console.log(error);
                return empty();
            })
        );
    }

}

