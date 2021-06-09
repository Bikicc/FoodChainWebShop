import { Injectable } from "@angular/core";
import { catchError, map, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ErrorHandlerService } from "./errorHandlerService";
import { Config } from "../config";

@Injectable({

    providedIn: 'root'

})

export class FavouritesService {
    private headersOption: HttpHeaders;

    constructor(
        private config: Config,
        private http: HttpClient,
        private errorHandler: ErrorHandlerService) {
        this.headersOption = new HttpHeaders({ 'Content-Type': 'application/json' });
    }

    getFavouritesForUser(userId: number) {
        return this.http
            .get(this.config.API_URL + 'favourites/' + userId)
            .pipe(
                retry(this.config.APIRetryCount),
                catchError(this.errorHandler.errorHandler)
            );
    }

    postProductToFavourites(body: any) {
        return this.http
            .post(this.config.API_URL + 'favourites', body, { headers: this.headersOption })
            .pipe(
                retry(this.config.APIRetryCount),
                catchError(this.errorHandler.errorHandler)
            );
    }

    deleteFromFavourites(userId: number, productId: number) {
        return this.http
            .delete(this.config.API_URL + 'favourites/' + userId + '/' + productId)
            .pipe(
                retry(this.config.APIRetryCount),
                catchError(this.errorHandler.errorHandler)
            );
    }
}