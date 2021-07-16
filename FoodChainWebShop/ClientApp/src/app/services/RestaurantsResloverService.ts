import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { catchError } from 'rxjs/operators';
import { empty } from 'rxjs';
import { RestaurantWithRating } from '../interfaces/RestaurantsWithRating';
import { RestaurantsService } from './RestaurantsService';

@Injectable({
    providedIn: 'root'
})

export class RestaurantsResloverService implements Resolve<RestaurantWithRating> {
    constructor(
        private restaurantsService: RestaurantsService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.restaurantsService.getRestaurants().pipe(
            catchError((error) => {
                console.log(error);
                return empty();
            })
        );
    }

}

