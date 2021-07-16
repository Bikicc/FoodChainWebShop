import { TranslateService } from '@ngx-translate/core';
import { OrderService } from './../services/OrderService';
import { Order } from './../interfaces/Order';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from '../interfaces/User';
import { forkJoin } from 'rxjs';
import { ToastMessagesComponent } from '../toast-messages/toast-messages.component';
import { Product } from '../interfaces/Product';
import { GeneralService } from '../services/GeneralService';


@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  @ViewChild(ToastMessagesComponent, { static: false })
  toastMessages: ToastMessagesComponent;

  loading: boolean = false;
  orders: Order[] = [];
  ordersUnformatted: Order[] = [];
  subscription: Subscription[] = [];
  selectedOrderToRepeat: any = {
    repeatOrderPriceTotal: 0,
    priceChanged: false,
    orderId: null
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private orderService: OrderService,
    private generalService: GeneralService
  ) { }

  ngOnInit() {
    this.subscription.push(this.activatedRoute.data.subscribe((data: { orders: Order[] }) => {
      this.ordersUnformatted = this.sortByDate(data.orders);
      console.log(this.ordersUnformatted);
      this.formatDate();
      console.log(this.orders)
      this.setImageToShow(this.orders);
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

  repeatOrder(order: any) {
    //Ukoliko se ijedna od cijena promjenila obavjestavamo korisnika o promjenama
    if (order.orderProduct.some((op: any) => op.productPriceATM !== op.product.price)) {
      this.getPriceTotal(order);
      this.selectedOrderToRepeat.priceChanged = true;
      this.selectedOrderToRepeat.orderId = order.orderId;
    } else {
      this.getPriceTotal(order);
      this.confirmOrder(order)
    }
  }

  getPriceTotal(order) {
    this.selectedOrderToRepeat.repeatOrderPriceTotal = order.orderProduct.reduce((accumulator, currentValue) => {
      return accumulator + (currentValue.product.price * currentValue.quantity);
    }, 0)
  }

  rejectOrder() {
    this.selectedOrderToRepeat.repeatOrderPriceTotal = 0;
    this.selectedOrderToRepeat.priceChanged = false;
    this.selectedOrderToRepeat.orderId = null;
  }

  confirmOrder(order: any) {
    this.loading = true;

    let orderDetails: any = {
      address: order.address,
      note: order.note,
      userId: order.userId,
      orderTime: (new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1),
      price: this.selectedOrderToRepeat.repeatOrderPriceTotal
    };

    this.subscription.push(this.orderService.postOrder(orderDetails).subscribe((orderId: number) => {
      const multipleApiCalls = [];

      order.orderProduct.forEach((item: any) => {
        multipleApiCalls.push(this.orderService.postOrderProducts({ ProductId: item.productId, OrderId: orderId, Quantity: item.quantity, ProductPriceATM: item.product.price }));
      });

      this.subscription.push(forkJoin(multipleApiCalls).subscribe(() => {
        this.toastMessages.saveChangesSuccess(this.translate.instant("NARUDZBA_ZAPRIMLJENA"));
        this.rejectOrder();
        this.getOrdersForUser();
      }, err => {
        this.rejectOrder();
        this.loading = false;
        this.toastMessages.saveChangesFailed(this.translate.instant("DOSLO_DO_POGRESKE"));
        console.log(err);
      }));
    }, err => {
      this.rejectOrder();
      this.loading = false;
      this.toastMessages.saveChangesFailed(this.translate.instant("DOSLO_DO_POGRESKE"));
      console.log(err);
    }));
  }

  getOrdersForUser() {
    this.subscription.push(this.orderService.getOrders().subscribe((orders: Order[]) => {
      this.ordersUnformatted = this.sortByDate(orders);
      this.formatDate();
      this.setImageToShow(this.orders);
      this.loading = false;
    }, err => {
      this.loading = false;
      console.error(err)
      this.toastMessages.saveChangesFailed(this.translate.instant("OSVJEZAVANJE_PODATAKA_NEUSPJEH"));
    },
      () => { }));
  }

  private sortByDate(dataToSort: any[]) {
    return dataToSort.sort(function (a, b) {
      var aOrderTime = new Date(a.orderTime);
      var bOrderTime = new Date(b.orderTime);
      return (bOrderTime as any) - (aOrderTime as any);
    });
  }

  private setImageToShow(orders: Order[]): void {
    orders.forEach((order: Order) => {
      order.orderProduct.forEach((product: Product) => product.imageToShow = this.generalService.setBase64ImageToShow(product.image as string));
    });
  }
}
