import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GeneralService } from '../services/GeneralService';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router, private generalService: GeneralService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                if (this.generalService.getUserDataLocale()) {
                    localStorage.removeItem("userToken");
                }
                this.router.navigate(["login"]);
            }

            return throwError(err);
        }))
    }
}