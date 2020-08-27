import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs/internal/observable/throwError";


@Injectable()
export class ErrorHandlerService {
    constructor() { }

    /** Error Handling method */
    errorHandler(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
                return throwError(error);
        }
        return throwError(
            'Something bad happened; please try again later.');
    }
}