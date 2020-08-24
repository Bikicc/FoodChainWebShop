import { ErrorHandlerService } from './errorHandlerService';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Config } from "../config";

@Injectable()
export class ProductService {
    constructor(
        private config: Config,
        private http: HttpClient,
        private errorHandler: ErrorHandlerService
    ) { }

    products_SelectAll() {
        return this.http
            .get(this.config.API_URL + 'product')
            .pipe(
                retry(this.config.APIRetryCount),
                catchError(this.errorHandler.errorHandler));
    }

    products_SelectById(productId: number) {
        return this.http
            .get(this.config.API_URL + 'product/' + productId)
            .pipe(
                retry(this.config.APIRetryCount),
                catchError(this.errorHandler.errorHandler));
    }

    // postmanTest() {
    //     var formData: any = new FormData();
    //     formData.append("from", "marijo.bikic123@gmail.com");
    //     formData.append("subject", "test api from client");
    //     formData.append("content","test post api from client");


    //     return this.http
    //         .post(this.config.API_URL + 'weatherforecast', formData)
    //         .pipe(
    //             retry(this.config.APIRetryCount),
    //             catchError(this.errorHandler.errorHandler));
    // }
}