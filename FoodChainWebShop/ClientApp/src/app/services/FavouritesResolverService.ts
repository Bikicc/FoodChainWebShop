import { FavouritesService } from './FavouritesService';
import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { catchError } from 'rxjs/operators';
import { empty } from 'rxjs';
import { GeneralService } from './GeneralService';
import { GlobalVar } from '../globalVar';

@Injectable({
    providedIn: 'root'
})

export class FavouritesResolverService implements Resolve<any> {
    constructor(
        private favouritesService: FavouritesService,
        private generalService: GeneralService,
        private globalVar: GlobalVar) { }
 
     resolve() {       
        const user =  this.generalService.getUserDataLocale();
        if (user && user.roleId !== this.globalVar.userRoles.korisnik) {
            return [];
        } else {
            return this.favouritesService.getFavouritesForUser(user ? user.userId : null).pipe(
                catchError((error) => {
                    console.log(error);
                    return empty();
                })
            );
        }
    }
}