import { Injectable } from "@angular/core";
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ErrorHandlerService } from "./errorHandlerService";
import { Config } from "../config";

@Injectable({

    providedIn: 'root'

})

export class OrderService {
    private headersOption: HttpHeaders;

    constructor(
        private config: Config,
        private http: HttpClient,
        private errorHandler: ErrorHandlerService) {
        this.headersOption = new HttpHeaders({ 'Content-Type': 'application/json' });
    }

    getOrdersForUser(userId: number) {
        return this.http
            .get(this.config.API_URL + 'orders/getOrders/' + userId)
            .pipe(
                retry(this.config.APIRetryCount),
                catchError(this.errorHandler.errorHandler)
            );
    }

    postOrder(body: any) {
        return this.http
            .post(this.config.API_URL + 'orders/order', body, { headers: this.headersOption })
            .pipe(
                retry(this.config.APIRetryCount),
                catchError(this.errorHandler.errorHandler)
            );
    }

    postOrderProducts(body: any) {
        return this.http
            .post(this.config.API_URL + 'orders/orderProducts', body, { headers: this.headersOption })
            .pipe(
                retry(this.config.APIRetryCount),
                catchError(this.errorHandler.errorHandler)
            );
    }
}