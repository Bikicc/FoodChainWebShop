import { Product } from './Product';

export interface Order {
    orderId: number,
    price: number,
    orderTime: string,
    note: string,
    address: string,
    userId: number,
    products: Product[]
}