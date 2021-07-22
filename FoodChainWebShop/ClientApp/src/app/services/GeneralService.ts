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
        const userToken = JSON.parse(localStorage.getItem("userToken") || null);
        const userData = userToken ? JSON.parse(window.atob(userToken.split('.')[1])) : null;

        if (userData) {
            return parseInt(userData.roleId);
        } else {
            return null;
        }
    }

    public getUserDataLocale(): User {
        const userToken = JSON.parse(localStorage.getItem("userToken") || null);
        const userData = userToken ? JSON.parse(window.atob(userToken.split('.')[1])) : null;
        if (userData) {
            userData.roleId = parseInt(userData.roleId);
            userData.userId = parseInt(userData.userId);
        }
        return userData;
    }

    public getUserToken(): string {
        const token = JSON.parse(localStorage.getItem("userToken") || null);
        return token;
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