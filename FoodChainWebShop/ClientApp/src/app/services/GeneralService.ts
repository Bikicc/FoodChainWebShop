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

    public getUserDataLocale(): User {
        let user: User = JSON.parse(localStorage.getItem("user") || null);
        return user;
    }

    public groupArrOfObjectByKey(arrOfObj: any[], keyGetter: Function) {
        const map = new Map();
        arrOfObj.forEach((item) => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return map;
    }

    convertBase64ToBlob(base64String: string): Blob {
        const byteCharacters = atob(base64String);

        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        const blob = new Blob([byteArray], { type: 'contentType' });

        return blob;
    }


}