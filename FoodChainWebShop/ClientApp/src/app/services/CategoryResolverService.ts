import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { catchError } from 'rxjs/operators';
import { empty } from 'rxjs';
import { GeneralService } from './GeneralService';
import { GlobalVar } from '../globalVar';
import { CategoryService } from './CategoryService';

@Injectable({
    providedIn: 'root'
})

export class CategoryResolverService implements Resolve<any> {
    constructor(
        private categoryService: CategoryService,
        private generalService: GeneralService,
        private globalVar: GlobalVar) { }

    resolve() {
        return this.categoryService.category_SelectAllWithoutProducts().pipe(
            catchError((error) => {
                console.log(error);
                return empty();
            })
        );
    }
}