import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ErrorHandlerService } from "./errorHandlerService";
import { Config } from "../config";
import { ComponentCommunicationService } from './ComponentCommunicationService';
import { User } from 'oidc-client';
import { GeneralService } from './GeneralService';

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
        private dataFromAnotherComponent: ComponentCommunicationService,
        private generalService: GeneralService
    ) {
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

    registerUserAdmin(body: any) {
        return this.http
            .post(this.config.API_URL + 'auth/admin/createUser', body, { headers: this.headersOption })
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
        if (this.generalService.getUserDataLocale()) {
            localStorage.removeItem("userToken");
            this.router.navigate(["/"]);
            this.dataFromAnotherComponent.userLoginStatus(false);
        }
    }

    getOwners() {
        return this.http
            .get<User[]>(this.config.API_URL + 'owners')
            .pipe(
                retry(this.config.APIRetryCount),
                catchError(this.errorHandler.errorHandler));
    }

    updateUserData(userData: any) {
        return this.http
            .put(this.config.API_URL + 'user', userData, { headers: this.headersOption })
            .pipe(
                retry(this.config.APIRetryCount),
                catchError(this.errorHandler.errorHandler));
    }
}