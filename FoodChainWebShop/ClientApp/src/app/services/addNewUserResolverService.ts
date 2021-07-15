import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { catchError } from 'rxjs/operators';
import { empty } from 'rxjs';
import { UserService } from './UserService';
import { User } from "oidc-client";

@Injectable({
    providedIn: 'root'
})

export class addNewUserResolverService implements Resolve<User[]> {
    constructor(private userService: UserService) { }
 
     resolve() {       
        return this.userService.getOwners().pipe(
            catchError((error) => {
                console.log(error);
                return empty();
            })
        );
    }
}