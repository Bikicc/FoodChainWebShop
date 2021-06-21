import { ErrorHandlerService } from './errorHandlerService';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Config } from "../config";
import { RestaurantWithRating } from '../interfaces/RestaurantsWithRating';
import { Observable } from 'rxjs';
import { RestaurantType } from '../interfaces/RestaurantType';

@Injectable()
export class RestaurantTypeService {
    constructor(
        private config: Config,
        private http: HttpClient,
        private errorHandler: ErrorHandlerService
    ) { }

    restaurantType_selectAll(): Observable<RestaurantType> {
        return this.http
            .get<RestaurantType>(this.config.API_URL + 'restaurantType')
            .pipe(
                retry(this.config.APIRetryCount),
                catchError(this.errorHandler.errorHandler));
    }
}