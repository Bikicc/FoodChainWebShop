import { ErrorHandlerService } from './errorHandlerService';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Config } from "../config";
import { RestaurantReview } from '../interfaces/RestaurantReview';

@Injectable()
export class RestaurantReviewService {
    private headersOption: HttpHeaders;

    constructor(
        private config: Config,
        private http: HttpClient,
        private errorHandler: ErrorHandlerService
    ) { 
        this.headersOption = new HttpHeaders({ 'Content-Type': 'application/json' });
    }

    getRestaurantReviews(restaurantId: number) {
        return this.http
            .get(this.config.API_URL + 'RestaurantReviews/' + restaurantId)
            .pipe(
                retry(this.config.APIRetryCount),
                catchError(this.errorHandler.errorHandler));
    }

    insertRestaurantReview(review: RestaurantReview) {
        return this.http
            .post(this.config.API_URL + 'RestaurantReviews', review, { headers: this.headersOption })
            .pipe(
                retry(this.config.APIRetryCount),
                catchError(this.errorHandler.errorHandler));
    }

    updateRestaurantReview(review: RestaurantReview) {
        return this.http
            .put(this.config.API_URL + 'RestaurantReviews', review, { headers: this.headersOption })
            .pipe(
                retry(this.config.APIRetryCount),
                catchError(this.errorHandler.errorHandler));
    }
}