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
        const user =  JSON.parse(localStorage.getItem("user") || null); 
        return this.favouritesService.getFavouritesForUser(user ? user.userId : null).pipe(
            catchError((error) => {
                console.log(error);
                return empty();
            })
        );
    }
}