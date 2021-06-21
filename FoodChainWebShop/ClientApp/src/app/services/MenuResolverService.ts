import { CategoryService } from './CategoryService';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { catchError } from 'rxjs/operators';
import { empty } from 'rxjs';

@Injectable({

    providedIn: 'root'

})

export class MenuResolverService implements Resolve<any> {
    constructor(private categoryService: CategoryService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.categoryService.category_SelectAllWithProducts(Number(route.params.restaurantId)).pipe(
            catchError((error) => {
                console.log(error);
                return empty();
            })
        );
    }
}