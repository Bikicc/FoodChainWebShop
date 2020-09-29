import { TranslateService } from '@ngx-translate/core';
import { OrderService } from './../services/OrderService';
import { Order } from './../interfaces/Order';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  orders: Order[] = [];
  ordersUnformatted: Order[] = [];
  subscription: Subscription[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService
  ) { }

  ngOnInit() {
   this.subscription.push(this.activatedRoute.data.subscribe((data: { orders: Order[] }) => {
      this.ordersUnformatted = data.orders;
      this.formatDate();
      this.subscription.push(this.translate.onLangChange.subscribe(() => this.formatDate()));
    }, err => {
      console.log(err);
    }));
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  navigateToProduct(productName: string, productId: number) {
    productName = productName.split(' ').join('-');
    this.router.navigate(["product/" + productId + "/" + productName]);
  }

  formatDateTimeEng() {
    this.orders.forEach(order => {
      order.orderTime = order.orderTime.split("T").join(" ").split(".")[0];
    })
  }

  formatDateTimeHrv() {
    this.orders.forEach(order => {
      let date = order.orderTime.split("T")[0].split("-").reverse().join(".");
      let time = order.orderTime.split("T")[1].split(".")[0];
      order.orderTime = date + " " + time;
    })
  }

  formatDate() {
    this.orders = JSON.parse(JSON.stringify(this.ordersUnformatted));
    this.translate.currentLang === 'hr' ? this.formatDateTimeHrv() : this.formatDateTimeEng();
  }
}
