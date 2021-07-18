import { Product } from './Product';

export interface Category {
    categoryId: number,
    name_En: string,
    name_Hr: string,
    products?: Product[]
}