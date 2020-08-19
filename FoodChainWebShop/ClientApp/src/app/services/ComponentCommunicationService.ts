import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ComponentCommunicationService {

  public numberOfProductsSource = new BehaviorSubject(null);
  public productsInBasket = new BehaviorSubject(null);

  constructor() { }

  changeNumberOfProducts() {
    this.numberOfProductsSource.next(null);
  }

  addProductToBaket(product: any) {
    this.productsInBasket.next(product);
  }

}