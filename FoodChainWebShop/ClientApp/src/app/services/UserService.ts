import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ErrorHandlerService } from "./errorHandlerService";
import { Config } from "../config";
import { ComponentCommunicationService } from './ComponentCommunicationService';

@Injectable({

    providedIn: 'root'

})

export class UserService {
    private headersOption: HttpHeaders;

    constructor(
        private config: Config,
        private http: HttpClient,
        private errorHandler: ErrorHandlerService,
        private router: Router,
        private dataFromAnotherComponent: ComponentCommunicationService
        ) {
        this.headersOption = new HttpHeaders({ 'Content-Type': 'application/json' });
    }

    registerUser(body: any) {
        console.log(body)
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

    logOutUser() {
        if (JSON.parse(localStorage.getItem("user")) || null) {
            localStorage.removeItem("user");
            this.router.navigate(["/"]);
            this.dataFromAnotherComponent.userLoginStatus(false);
        }
    }
}