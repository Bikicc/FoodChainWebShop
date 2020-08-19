import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  orders: any[] = [];

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.setOrders();
    this.getLocation();
  }

  setOrders() {
    this.orders = [
      {
        address: 'Kupreška ulica 88, Split, Croatia', orderTime: '22.08.2018 15:45', total: 145, products: [
          { name: "Big Tasty", price: "35kn", img: "assets/images/login.png", category: 2, quantity: 1 },
          { name: "McChicken", price: "35kn", img: "assets/images/login.png", category: 2, quantity: 1 },
          { name: "Triple take", price: "35kn", img: "assets/images/login.png", category: 2, quantity: 2 },
          { name: "Nasty jon", price: "35kn", img: "assets/images/login.png", category: 3, quantity: 2 },
          { name: "Big Tasty", price: "35kn", img: "assets/images/login.png", category: 2, quantity: 1 },
          { name: "McChicken", price: "35kn", img: "assets/images/login.png", category: 2, quantity: 1 },
          { name: "Triple take", price: "35kn", img: "assets/images/login.png", category: 2, quantity: 1 },
          { name: "Nasty jon", price: "35kn", img: "assets/images/login.png", category: 3, quantity: 1 }
        ]
      },
      {
        address: 'Kupreška ulica 95, Split, Croatia', orderTime: '22.08.2018 12:45', total: 145, products: [
          { name: "Big Tasty", price: "35kn", img: "assets/images/login.png", category: 2, quantity: 1 },
          { name: "McChicken", price: "35kn", img: "assets/images/login.png", category: 2, quantity: 1 },
          { name: "Triple take", price: "35kn", img: "assets/images/login.png", category: 2, quantity: 1 },
          { name: "Nasty jon", price: "35kn", img: "assets/images/login.png", category: 3, quantity: 1 }
        ]
      },
      {
        address: 'Mostarska ulica 88, Split, Croatia', orderTime: '22.08.2018 17:45', total: 145, products: [
          { name: "Big Tasty", price: "35kn", img: "assets/images/login.png", category: 2, quantity: 1 },
          { name: "McChicken", price: "35kn", img: "assets/images/login.png", category: 2, quantity: 1 },
          { name: "Triple take", price: "35kn", img: "assets/images/login.png", category: 2, quantity: 1 },
          { name: "Nasty jon", price: "35kn", img: "assets/images/login.png", category: 3, quantity: 1 }
        ]
      },
    ]
  }

  navigateToProduct(productName: string) {
    productName = productName.split(' ').join('-');
    this.router.navigate(["product/" + 1 + "/" + productName]);
  }

  getLocation(): Promise<any> {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=sdasfaf&key=AIzaSyA_bO8P0wyGbCoqm4P_3yScdd7mVhVBoqc')
      .toPromise()
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }
}
