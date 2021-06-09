import { Product } from './../interfaces/Product';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class BasketService {
    constructor() { }

    addProductToBasket(product: Product) {
        let currProducts = JSON.parse(localStorage.getItem('basketProducts')) || [];
        //Provjera da li svi produkti dolaze iz istog restorana i ukoliko nisu ispisujemo poruku
        if (currProducts.some(p => p.restaurantId !== product.restaurantId)) {
            return {
                error: true
            }
        } else {
            let existentProduct = currProducts.find((item: Product) => {
                return item.productId === product.productId
            })
    
            if (existentProduct) {
                currProducts.forEach((item: Product) => {
                    item.productId === existentProduct.productId ? item.quantity++ : null
                })
    
                localStorage.setItem('basketProducts', JSON.stringify(currProducts));
            } else {
                product.quantity = 1;
                currProducts.push(product);
                localStorage.setItem('basketProducts', JSON.stringify(currProducts));
            }
        }
    }

    getProductsFromBasket() {
        return JSON.parse(localStorage.getItem('basketProducts')) || [];
    }

    increaseProductQuantity(productId: number) {
        let currProducts = JSON.parse(localStorage.getItem('basketProducts')) || [];

        currProducts.forEach((item: Product) => {
            item.productId === productId ? item.quantity++ : null
        });

        localStorage.setItem('basketProducts', JSON.stringify(currProducts));

        return JSON.parse(localStorage.getItem('basketProducts')) || [];
    }

    decraseProductQuantity(productId: number) {
        let currProducts = JSON.parse(localStorage.getItem('basketProducts')) || [];

        currProducts.forEach((item: Product, index: number, object: any) => {
            if (item.productId === productId) {
                item.quantity > 1 ? item.quantity-- : object.splice(index, 1);
            }
        });

        localStorage.setItem('basketProducts', JSON.stringify(currProducts));

        return JSON.parse(localStorage.getItem('basketProducts')) || [];
    }

    removeProductFromBasket(productId: number) {
        let currProducts = JSON.parse(localStorage.getItem('basketProducts')) || [];

        currProducts = currProducts.filter((product: Product) => {
            return product.productId !== productId;
        });

        localStorage.setItem('basketProducts', JSON.stringify(currProducts));

        return JSON.parse(localStorage.getItem('basketProducts')) || [];

    }

    removeAllProductsFromBasket() {
        localStorage.removeItem('basketProducts');

        return JSON.parse(localStorage.getItem('basketProducts')) || [];
    }

    getNumberOfProductsInBasket() {
        let currProducts: Product[] = JSON.parse(localStorage.getItem('basketProducts')) || [];

        return currProducts.map(el => el.quantity).reduce((acc, current) => {
            return acc + current;
        }, 0);
    }
}