import { Injectable } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { User } from "../interfaces/User";

@Injectable()
export class GeneralService {
    constructor(private sanitazer: DomSanitizer) { }

    public setBase64ImageToShow(base64Image: string): SafeResourceUrl {
        return base64Image ? this.sanitazer.bypassSecurityTrustResourceUrl(
            'data:image/jpeg;base64,' + base64Image) : 'assets/images/noPhoto.png';
    }

    public getUserRoleId(): number {
        let user: User = JSON.parse(localStorage.getItem("user") || null);
        if (user) {
            return user.roleId;
        } else {
            return null;
        }
    }


}