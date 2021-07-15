import { ProductService } from './ProductService';
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { catchError } from 'rxjs/operators';
import { empty } from 'rxjs';
import { RestaurantsService } from './RestaurantsService';

@Injectable({

    providedIn: 'root'

})

export class RestaurantInfoResolverService implements Resolve<any> {
    constructor(
        private restaurantService: RestaurantsService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.restaurantService.getRestaurantInfo(Number(route.params.restaurantId)).pipe(
            catchError((error) => {
                console.log(error);
                return empty();
            })
        );
    }

}

