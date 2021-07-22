import { Config } from './../config';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralService } from '../services/GeneralService';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private config: Config,
        private generalService: GeneralService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.generalService.getUserToken();
        const isLoggedIn = token ? true : false;
        const isApiUrl = request.url.startsWith(this.config.API_URL);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request);
    }
}