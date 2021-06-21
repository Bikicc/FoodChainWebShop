import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { catchError } from 'rxjs/operators';
import { empty } from 'rxjs';
import { RestaurantTypeService } from './RestaurantTypeService';
import { RestaurantType } from "../interfaces/RestaurantType";

@Injectable({
    providedIn: 'root'
})

export class RestaurantTypeResolverService implements Resolve<RestaurantType> {
    constructor(
        private restaurantsTypeService: RestaurantTypeService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.restaurantsTypeService.restaurantType_selectAll().pipe(
            catchError((error) => {
                console.log(error);
                return empty();
            })
        );
    }

}

