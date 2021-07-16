import { ErrorHandlerService } from './errorHandlerService';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Config } from "../config";
import { RestaurantWithRating } from '../interfaces/RestaurantsWithRating';
import { Observable } from 'rxjs';
import { Restaurant } from '../interfaces/Restaurant';
import { GeneralService } from './GeneralService';
import { GlobalVar } from '../globalVar';

@Injectable()
export class RestaurantsService {
    constructor(
        private config: Config,
        private http: HttpClient,
        private errorHandler: ErrorHandlerService,
        private generalService: GeneralService,
        private globalVar: GlobalVar
    ) { }

    getRestaurants(): Observable<RestaurantWithRating[]> {
        let getReq: string = null;
        const user = this.generalService.getUserDataLocale();

        switch (this.generalService.getUserRoleId()) {
            case this.globalVar.userRoles.korisnik:
                getReq = this.config.API_URL + 'restaurants'
                break;

            case this.globalVar.userRoles.vlasnik:
                getReq = this.config.API_URL + 'restaurants/owner/' + user.userId;
                break;

            case this.globalVar.userRoles.admin:
                getReq = this.config.API_URL + 'restaurants/admin/';
                break;

            default:
                getReq = this.config.API_URL + 'restaurants'
        }

        return this.http
            .get<RestaurantWithRating[]>(getReq)
            .pipe(
                retry(this.config.APIRetryCount),
                catchError(this.errorHandler.errorHandler));
    }

    getRestaurantInfo(resId: number): Observable<Restaurant> {
        return this.http
            .get<Restaurant>(this.config.API_URL + 'restaurants/' + resId)
            .pipe(
                retry(this.config.APIRetryCount),
                catchError(this.errorHandler.errorHandler));
    }

    insertRestaurant(body: FormData) {
        return this.http
            .post(this.config.API_URL + 'restaurants', body)
            .pipe(
                retry(this.config.APIRetryCount),
                catchError(this.errorHandler.errorHandler));
    }

    editRestaurant(body: FormData) {
        return this.http
            .put(this.config.API_URL + 'restaurants', body)
            .pipe(
                retry(this.config.APIRetryCount),
                catchError(this.errorHandler.errorHandler));
    }

    deleteRestaurant(restId: number) {
        return this.http
            .delete(this.config.API_URL + 'restaurants/' + restId)
            .pipe(
                retry(this.config.APIRetryCount),
                catchError(this.errorHandler.errorHandler));
    }

    activateRestaurant(restId: number) {
        return this.http
            .get(this.config.API_URL + 'restaurants/activate/' + restId)
            .pipe(
                retry(this.config.APIRetryCount),
                catchError(this.errorHandler.errorHandler));
    }
}