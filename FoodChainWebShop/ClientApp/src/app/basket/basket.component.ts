import { BasketService } from './../services/BasketService';
import { Product } from './../interfaces/Product';
import { Component, OnInit } from '@angular/core';
import { ComponentCommunicationService } from '../services/ComponentCommunicationService';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  basketItems: Product[] = [];


  constructor(
    private basketService: BasketService,
    private dataFromAnotherComponent: ComponentCommunicationService) { }

  ngOnInit() {
    this.basketItems = this.basketService.getProductsFromBasket();
  }

  increaseQuantity(productId: number) {
    this.basketItems = this.basketService.increaseProductQuantity(productId);
    this.dataFromAnotherComponent.changeNumberOfProductsByOne(true);
  }

  decreaseQuantity(productId: number) {
    this.basketItems = this.basketService.decraseProductQuantity(productId);
    this.dataFromAnotherComponent.changeNumberOfProductsByOne(false);
  }

  removeProductFromBasket(product: Product) {
    this.basketItems = this.basketService.removeProductFromBasket(product.productId);
    this.dataFromAnotherComponent.changeNumberOfProductsByMany(product.quantity);
  }

  removeAllProductsFromBasket() {
    this.basketItems = this.basketService.removeAllProductsFromBasket();
    this.dataFromAnotherComponent.changeNumberOfProductsToZero();
  }
}
