import { CategoryService } from './CategoryService';
import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { catchError } from 'rxjs/operators';
import { empty } from 'rxjs';

@Injectable({

    providedIn: 'root'

})

export class MenuResolverService implements Resolve<any> {
    constructor(private categoryService: CategoryService) { }

    resolve() {
        return this.categoryService.category_SelectAllWithProducts().pipe(
            catchError((error) => {
                console.log(error);
                return empty();
            })
        );
    }
}