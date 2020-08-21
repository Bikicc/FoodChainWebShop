import { FavouritesService } from './FavouritesService';
import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { catchError } from 'rxjs/operators';
import { empty } from 'rxjs';

@Injectable({

    providedIn: 'root'

})

export class FavouritesResolverService implements Resolve<any> {
    constructor(private favouritesService: FavouritesService) { }

    resolve() {
        return this.favouritesService.getFavouritesForUser(3).pipe(
            catchError((error) => {
                console.log(error);
                return empty();
            })
        );
    }
}