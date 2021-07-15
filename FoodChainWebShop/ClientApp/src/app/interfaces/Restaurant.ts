import { SafeResourceUrl } from "@angular/platform-browser";

export interface Restaurant {
    restaurantId: number, 
    restaurantTypeId: number, 
    userId: number
    name: string,
    image?: ArrayBuffer | File | string,
    imageToShow?: SafeResourceUrl,
    mobileNumber: string,
    address: string,
    minOrderPrice: number,
    RestaurantTypeId: number,
    active: boolean,
    imageFile?: any,
}