import { OrderService } from './OrderService';
import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { catchError } from 'rxjs/operators';
import { empty } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class OrderResolverService implements Resolve<any> {
    constructor(private orderService: OrderService) { }

    resolve() {
        return this.orderService.getOrdersForUser(3).pipe(
            catchError((error) => {
                console.log(error);
                return empty();
            })
        );
    }
}