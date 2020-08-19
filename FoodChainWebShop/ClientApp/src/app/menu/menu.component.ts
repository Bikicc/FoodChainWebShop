import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ComponentCommunicationService } from "../services/ComponentCommunicationService";
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Output() myEvent = new EventEmitter();

  categories: any[] = [];
  selectedcategory: number = null;
  menuItems: any[] = [];
  message: string;

  constructor(
    private dataFromAnotherComponent: ComponentCommunicationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setDropdownCategories();
    this.setMenuItems();
  }

  setDropdownCategories() {
    this.categories = [
      { label: "Burger", value: 1 },
      { label: "Pizza", value: 2 },
      { label: "Tortilla", value: 3 },
      { label: "Dessert", value: 4 },
      { label: "Drink", value: 5 }];

    this.selectedcategory = 1;
  }

  setMenuItems() {
    this.menuItems = [
      { name: "Big Tasty", price: "35kn", img: "assets/images/login.png", category: 2 },
      { name: "McChicken", price: "35kn", img: "assets/images/login.png", category: 2 },
      { name: "Triple take", price: "35kn", img: "assets/images/login.png", category: 2 },
      { name: "Nasty jon", price: "35kn", img: "assets/images/login.png", category: 3 },
      { name: "Chiliburger", price: "35kn", img: "assets/images/login.png", category: 5 },
      { name: "Cesar salad", price: "35kn", img: "assets/images/login.png", category: 3 },
      { name: "Topli sendvič", price: "35kn", img: "assets/images/login.png", category: 3 },
      { name: "Tost", price: "35kn", img: "assets/images/login.png", category: 3 },
      { name: "Cola", price: "35kn", img: "assets/images/login.png", category: 4 },
      { name: "Fanta", price: "35kn", img: "assets/images/login.png", category: 4 },
      { name: "Nestea", price: "22kn", img: "assets/images/login.png", category: 4 },
      { name: "Cheesburger", price: "12kn", img: "assets/images/login.png", category: 1 },
      { name: "Hamburger", price: "7kn", img: "assets/images/login.png", category: 1 },
    ]
  }

  filterProductsBasedOnCategory() {
    return this.menuItems.filter(item => item.category == this.selectedcategory);
  }

  addToBasket(itemName: string) {
    console.log(itemName);
  }

  increaseProductInABasketNumber() {
    this.dataFromAnotherComponent.changeNumberOfProducts();
  }

  addProductToBasket(product: any) {
    this.dataFromAnotherComponent.addProductToBaket(product);

    // let products: any[] = [
    //   { name: "Big Tasty", price: "35kn", img: "assets/images/login.png", category: 2, quantity: 1 }]

    // let currProducts = JSON.parse(localStorage.getItem('basketProducts')) || [];

    // let existentProduct = currProducts.find(item => {
    //   return item.name === product.name
    // })

    // if (existentProduct) {
    //   localStorage.removeItem('basketProducts');

    //   currProducts.forEach(item => {
    //     item.name === existentProduct.name ? item.quantity++ : null
    //   })

    //   console.log(currProducts)
    //   localStorage.setItem('basketProducts', JSON.stringify(currProducts));
    // } else {
    //   products.push({ name: "Hamburger", price: "35kn", img: "assets/images/login.png", category: 2, quantity: 1 });
    //   localStorage.setItem('basketProducts', JSON.stringify(products));
    // }

    // localStorage.setItem('basketProducts', JSON.stringify(products));

    // console.log(currProducts);

  }

  navigateToProduct(productName: string) {
    this.router.navigateByUrl("product/" + productName);
  }
}
