import { ErrorHandlerService } from './errorHandlerService';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Config } from "../config";

@Injectable()
export class CategoryService {
    constructor(
        private config: Config,
        private http: HttpClient,
        private errorHandler: ErrorHandlerService
    ) { }

    category_SelectAllWithoutProducts() {
        return this.http
            .get(this.config.API_URL + 'categories')
            .pipe(
                retry(this.config.APIRetryCount),
                catchError(this.errorHandler.errorHandler));
    }

    category_SelectAllWithProducts(restaurantId: number) {
        return this.http
            .get(this.config.API_URL + 'category/products/' + restaurantId)
            .pipe(
                retry(this.config.APIRetryCount),
                catchError(this.errorHandler.errorHandler));
    }

    category_SelectById(categoryId: number) {
        return this.http
            .get(this.config.API_URL + 'category/' + categoryId)
            .pipe(
                retry(this.config.APIRetryCount),
                catchError(this.errorHandler.errorHandler));
    }
}