import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  basketItems: any[] = [];


  constructor() { }

  ngOnInit() {
    this.setBasketItems();
  }

  setBasketItems() {
    this.basketItems = [
      { name: "Big Tasty", price: "35kn", img: "assets/images/login.png", category: 2, quantity: 2 },
      { name: "McChicken", price: "35kn", img: "assets/images/login.png", category: 2, quantity: 2 },
      { name: "Triple take", price: "35kn", img: "assets/images/login.png", category: 2, quantity: 2 },
      { name: "Nasty jon", price: "35kn", img: "assets/images/login.png", category: 3, quantity: 2 },
    ]
  }

  increaseQuantity(product: any) {
    this.basketItems.forEach(item => {
      if (item.name === product.name) {
        item.quantity++;
      }
    })
  }

  decreaseQuantity(product: any) {
    this.basketItems.forEach((item, index, object) => {
      if (item.name === product.name && item.quantity === 1) {
        object.splice(index, 1);
      } else if (item.name === product.name && item.quantity !== 1) {
        item.quantity--;
      }
    })
  }


}
