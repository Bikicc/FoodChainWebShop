import { ErrorHandlerService } from './errorHandlerService';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Config } from "../config";
import { RestaurantWithRating } from '../interfaces/RestaurantsWithRating';
import { Observable } from 'rxjs';

@Injectable()
export class RestaurantsService {
    constructor(
        private config: Config,
        private http: HttpClient,
        private errorHandler: ErrorHandlerService
    ) { }

    restaurants_selectAll(): Observable<RestaurantWithRating> {
        return this.http
            .get<RestaurantWithRating>(this.config.API_URL + 'restaurants')
            .pipe(
                retry(this.config.APIRetryCount),
                catchError(this.errorHandler.errorHandler));
    }
}