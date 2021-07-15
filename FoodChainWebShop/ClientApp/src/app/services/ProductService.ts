import { ErrorHandlerService } from './errorHandlerService';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Config } from "../config";
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class ProductService {

    private headersOption: HttpHeaders;
    constructor(
        private config: Config,
        private http: HttpClient,
        private errorHandler: ErrorHandlerService,
        private sanitazer: DomSanitizer
    ) {
        this.headersOption = new HttpHeaders({ 'Content-Type': 'application/json' });
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
        return this.http
            .post(this.config.API_URL + 'product/', body)
            .pipe(
                retry(this.config.APIRetryCount),
                catchError(this.errorHandler.errorHandler));
    }
}