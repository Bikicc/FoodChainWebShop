import { Injectable } from "@angular/core";
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ErrorHandlerService } from "./errorHandlerService";
import { Config } from "../config";

@Injectable({

    providedIn: 'root'

})

export class UserService {
    private headersOption: HttpHeaders;

    constructor(
        private config: Config,
        private http: HttpClient,
        private errorHandler: ErrorHandlerService) {
        this.headersOption = new HttpHeaders({ 'Content-Type': 'application/json' });
    }

    registerUser(body: any) {
        return this.http
            .post(this.config.API_URL + 'auth/createUser', body, { headers: this.headersOption })
            .pipe(
                retry(this.config.APIRetryCount),
                catchError(this.errorHandler.errorHandler)
            );
    }

    loginUser(body: any) {
        return this.http
            .post(this.config.API_URL + 'auth/loginUser', body, { headers: this.headersOption })
            .pipe(
                retry(this.config.APIRetryCount),
                catchError(this.errorHandler.errorHandler)
            );
    }
}