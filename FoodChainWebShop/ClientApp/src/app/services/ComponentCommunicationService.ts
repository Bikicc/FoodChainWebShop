import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ComponentCommunicationService {

  public numberOfProductsByOne = new BehaviorSubject(null);
  public numberOfProductsByMany = new BehaviorSubject(null);
  public numberOfProductsToZero = new BehaviorSubject(null);

  constructor() { }

  changeNumberOfProductsByOne(increase: boolean) {
    this.numberOfProductsByOne.next(increase);
  }

  changeNumberOfProductsByMany(numberOfProducts: number) {
    this.numberOfProductsByMany.next(numberOfProducts);
  }

  changeNumberOfProductsToZero() {
    this.numberOfProductsToZero.next(null);
  }

}