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
import { GlobalVar } from '../globalVar';
import { ConfirmationService } from 'primeng/api';


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
  ordersGroupByRestaurant: Map<number, any> = null;
  userData: User = null;
  dateRange: { datumOd: Date | string, datumDo: Date | string } = {
    datumOd: (new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))),
    datumDo: (new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000)))
  };
  recap: any = {};

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private orderService: OrderService,
    private generalService: GeneralService,
    private globalVar: GlobalVar,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.subscription.push(this.activatedRoute.data.subscribe((data: { orders: Order[] }) => {
      this.userData = this.generalService.getUserDataLocale();
      this.ordersUnformatted = this.sortByDate(data.orders);
      this.formatDate();
      this.setImageToShow(this.orders);
      if (this.generalService.getUserRoleId() === this.globalVar.userRoles.admin || this.generalService.getUserRoleId() === this.globalVar.userRoles.vlasnik) {
        this.ordersGroupByRestaurant = data.orders.length > 0 ? this.generalService.groupArrOfObjectByKey(this.orders, o => o.orderProduct[0].product.restaurant.restaurantId) : null;
        this.setRecap(this.ordersGroupByRestaurant);
      }
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
    //Ukoliko je ijedan produkt izbrisan ATM ponovna narudzba se ne moze uciniti i o tome obavjestavamo korisnika
    if (this.isAnyOfProductsDeleted(order.orderProduct)) {
      this.toastMessages.saveChangesFailed(this.translate.instant("PRODUKT_IZBRISAN_ERR"));

    } else {
      //Ukoliko se ijedna od cijena promjenila obavjestavamo korisnika o promjenama
      if (order.orderProduct.some((op: any) => op.productPriceATM !== op.product.price)) {
        this.getPriceTotal(order);
        this.selectedOrderToRepeat.priceChanged = true;
        this.selectedOrderToRepeat.orderId = order.orderId;
      } else {
        this.confirmationService.confirm({
          message: this.translate.instant("POTVRDA_PONOVNE_NARUDZBE_CONTENT"),
          accept: () => {
            this.getPriceTotal(order);
            this.confirmOrder(order);          }
      });

      }
    }
  }

  getPriceTotal(order) {
    this.selectedOrderToRepeat.repeatOrderPriceTotal = order.orderProduct.reduce((accumulator, currentValue) => {
      return accumulator + (currentValue.product.price * currentValue.quantity);
    }, 0)
  }

  isAnyOfProductsDeleted(orderProduct: any[]): boolean {
    const len = orderProduct.length;
    
    for (let i = 0; i < len; i++) {
      if (orderProduct[i].product.deleted) return true
    }
    return false;
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
      order.orderProduct.forEach((op: any) => {
        op.imageToShow = this.generalService.setBase64ImageToShow(op.product.image as string);
      });
    });
  }

  public getOrdersOnDateChange() {
    const dates = {
      datumOd: new Date((this.dateRange.datumOd as Date).getTime() + Math.abs((this.dateRange.datumOd as Date).getTimezoneOffset() * 60000)).toISOString().slice(0, -1),
      datumDo: new Date((this.dateRange.datumDo as Date).getTime() + Math.abs((this.dateRange.datumDo as Date).getTimezoneOffset() * 60000)).toISOString().slice(0, -1)
    }
    this.loading = true;

    this.orderService.getOrders(dates).subscribe((data: any[]) => {
      this.loading = false;
      this.ordersUnformatted = this.sortByDate(data);
      this.formatDate();
      this.setImageToShow(this.orders);
      this.ordersGroupByRestaurant = data.length > 0 ? this.generalService.groupArrOfObjectByKey(this.orders, o => o.orderProduct[0].product.restaurant.restaurantId) : null;
      this.setRecap(this.ordersGroupByRestaurant);
    }, err => {
      this.loading = false;
      this.toastMessages.saveChangesFailed(this.translate.instant("DOSLO_DO_POGRESKE"));
    });
  }

  private setRecap(ordersGroupByRestaurant: Map<number, any>): void {
    if (ordersGroupByRestaurant) {
      ordersGroupByRestaurant.forEach((value, key) => {
        this.recap[key] = {
          totalAmount: value.reduce((a,b) => ({price: a.price + b.price})).price,
          numberOfOrders: value.length
        } 
      })
    } else {
      this.recap = {};
    }
  }

}
