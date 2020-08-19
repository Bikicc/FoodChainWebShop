import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  favourites: any;

  constructor() { }

  ngOnInit() {
    this.setFavouritesItems();
  }

  setFavouritesItems() {
    this.favourites = [
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

  removeFromFavourites() {
    console.log("remove from favourites");
  }

  addToBsket() {
    console.log("Add to basket");
  }

}
