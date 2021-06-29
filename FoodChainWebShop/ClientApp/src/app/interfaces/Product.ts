import { SafeResourceUrl } from "@angular/platform-browser";

export interface Product {
    productId: number,
    name: string,
    price: number,
    description_En: string,
    description_Hr: string,
    calories: number,
    proteins: number,
    carbs: number,
    sugar: number,
    fat: number,
    image: ArrayBuffer | File | string,
    categoryId: number,
    quantity?: number,
    restaurantId: number,
    imageToShow: SafeResourceUrl
}