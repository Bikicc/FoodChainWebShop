import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVar {
    homeSlideimages: string[] = ['assets/images/ThreeBurgerCover.png', 'assets/images/BestBurgerQuality&Prices.jpg', 'assets/images/FastFoodStoresCover.png'];
    PkUser: number = null;
    readonly userRoles = {
        admin: 1,
        vlasnik: 2,
        korisnik: 3
    }

    readonly todaysDate = (new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1);
}
