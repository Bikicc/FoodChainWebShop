import { OrderService } from './../services/OrderService';
import { Order } from './../interfaces/Order';
import { apiKey } from './../apiKey';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  orders: Order[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private key: apiKey,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: { orders: Order[] }) => {
      this.orders = data.orders;
      this.formatDateTimeHrv();
    }, err => {
      console.log(err);
    })
  }

  navigateToProduct(productName: string, productId: number) {
    productName = productName.split(' ').join('-');
    this.router.navigate(["product/" + productId + "/" + productName]);
  }

  // getLocation(): Promise<any> {
  //   return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=sdasfaf&key=' + this.key.apiKey)
  //     .toPromise()
  //     .then((response) => console.log(response))
  //     .catch((error) => console.log(error));
  // }

  formatDateTimeEng() {
    this.orders.forEach(order => {
      order.orderTime = order.orderTime.split("T").join(" ");
    })
  }

  formatDateTimeHrv() {
    this.orders.forEach(order => {
      let date = order.orderTime.split("T")[0].split("-").reverse().join(".");
      let time = order.orderTime.split("T")[1];
      order.orderTime = date + " " + time;
    })
  }
}
