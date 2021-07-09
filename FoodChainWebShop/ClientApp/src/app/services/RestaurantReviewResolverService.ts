import { RestaurantReviewService } from './RestaurantReviewService';
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { catchError } from 'rxjs/operators';
import { empty } from 'rxjs';

@Injectable({

    providedIn: 'root'

})

export class RestaurantReviewResolverService implements Resolve<any> {
    constructor(
        private restaurantReviewService: RestaurantReviewService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.restaurantReviewService.getRestaurantReviews(Number(route.params.restaurantId)).pipe(
            catchError((error) => {
                console.log(error);
                return empty();
            })
        );
    }

}

