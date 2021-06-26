import { Email } from './../interfaces/Email';
import { ErrorHandlerService } from './errorHandlerService';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Config } from "../config";
import { Product } from '../interfaces/Product';

@Injectable()
export class ProductService {
    
    private headersOption: HttpHeaders;
    private formDataHeadersOption: HttpHeaders;
    constructor(
        private config: Config,
        private http: HttpClient,
        private errorHandler: ErrorHandlerService
    ) {
        this.headersOption = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.formDataHeadersOption = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });

    }

    // products_SelectAll() {
    //     return this.http
    //         .get(this.config.API_URL + 'products')
    //         .pipe(
    //             retry(this.config.APIRetryCount),
    //             catchError(this.errorHandler.errorHandler));
    // }

    productsSelectById(productId: number) {
        return this.http
            .get(this.config.API_URL + 'product/' + productId)
            .pipe(
                retry(this.config.APIRetryCount),
                catchError(this.errorHandler.errorHandler));
    }

    postProduct(body: FormData) {
        console.log(body);
        return this.http
            .post(this.config.API_URL + 'product/', body)
            .pipe(
                retry(this.config.APIRetryCount),
                catchError(this.errorHandler.errorHandler));
    }

}