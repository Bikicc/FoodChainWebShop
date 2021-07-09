import { User } from './User';

export interface RestaurantReview {
    userId: number,
    User?: User,
    RestaurantId: number,
    rating: number,
    comment: string
}