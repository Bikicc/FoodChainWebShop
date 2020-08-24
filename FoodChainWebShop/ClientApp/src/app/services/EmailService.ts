import { Email } from './../interfaces/Email';
import { ErrorHandlerService } from './errorHandlerService';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Config } from "../config";

@Injectable()
export class EmailService {
    constructor(
        private config: Config,
        private http: HttpClient,
        private errorHandler: ErrorHandlerService
    ) { }

    sendEmail(data: Email) {
        var formData: any = new FormData();
        formData.append("from", data.from);
        formData.append("subject", data.subject);
        formData.append("content", data.content);


        return this.http
            .post(this.config.API_URL + 'email', formData)
            .pipe(
                retry(this.config.APIRetryCount),
                catchError(this.errorHandler.errorHandler));
    }
}