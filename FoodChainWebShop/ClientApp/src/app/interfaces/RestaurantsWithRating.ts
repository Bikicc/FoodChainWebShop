import { SafeResourceUrl } from "@angular/platform-browser";

interface RestaurantInfo {
    restaurantId: number,
    name: string,
    image: ArrayBuffer | File | string,
    imageToShow: SafeResourceUrl
    mobileNumber: string,
    address: string,
    minOrderPrice: number,
    userId: number,
    restaurantTypeId: number
}

export interface RestaurantWithRating {
    restaurant: RestaurantInfo,
    rating: number
}