import { Injectable } from "@angular/core";
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ErrorHandlerService } from "./errorHandlerService";
import { Config } from "../config";
import { GeneralService } from "./GeneralService";
import { GlobalVar } from "../globalVar";
import { Observable } from "rxjs";
import { Order } from "../interfaces/Order";

@Injectable({

    providedIn: 'root'

})

export class OrderService {
    private headersOption: HttpHeaders;

    constructor(
        private config: Config,
        private http: HttpClient,
        private errorHandler: ErrorHandlerService,
        private generalService: GeneralService,
        private globalVar: GlobalVar) {
        this.headersOption = new HttpHeaders({ 'Content-Type': 'application/json' });
    }

    getOrders(datumOdDo: { datumOd: string, datumDo: string } = null) {
        const user = this.generalService.getUserDataLocale();
        let getReq: string = null;

        switch (this.generalService.getUserRoleId()) {
            case this.globalVar.userRoles.korisnik:
                getReq = this.config.API_URL + 'orders/getOrders/' + user.userId;
                break;

            case this.globalVar.userRoles.vlasnik:
                if (datumOdDo) {
                    getReq = this.config.API_URL + 'orders/getOrders/owner/' + datumOdDo.datumOd + '/' + datumOdDo.datumDo + '/' + user.userId;
                } else {
                    getReq = this.config.API_URL + 'orders/getOrders/owner/' + this.globalVar.todaysDate + '/' + this.globalVar.todaysDate + '/' + user.userId;
                }
                break;

            case this.globalVar.userRoles.admin:
                if (datumOdDo) {
                    getReq = this.config.API_URL + 'orders/getOrders/admin/' + datumOdDo.datumOd + '/' + datumOdDo.datumDo;
                } else {
                    getReq = this.config.API_URL + 'orders/getOrders/admin/' + this.globalVar.todaysDate + '/' + this.globalVar.todaysDate;
                }
                break;

            default:
                getReq = this.config.API_URL + 'orders/getOrders/' + null;
        }
        return this.http
            .get(getReq)
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