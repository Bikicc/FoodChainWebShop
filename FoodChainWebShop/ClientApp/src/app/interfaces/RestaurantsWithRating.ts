interface RestaurantInfo {
    restaurantId: number,
    name: string,
    imageName: string,
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