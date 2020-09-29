import { User } from './../interfaces/User';
import { TranslateService } from '@ngx-translate/core';
import { OrderService } from './../services/OrderService';
import { Order } from './../interfaces/Order';
import { BasketService } from './../services/BasketService';
import { Product } from './../interfaces/Product';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentCommunicationService } from '../services/ComponentCommunicationService';
import { HttpClient } from '@angular/common/http';
import { ApiKey } from '../../apiKey';
import { forkJoin, Subscription } from 'rxjs';
import { ToastMessagesComponent } from './../toast-messages/toast-messages.component';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  @ViewChild(ToastMessagesComponent, { static: false })
  toastMessages: ToastMessagesComponent;

  basketItems: Product[] = [];
  totalAmountToPay: number = 0;
  options = {
    componentRestrictions: {
      country: ['HR']
    }
  }
  orderDetails: Order = {} as Order;
  addressError: boolean = false;
  loading: boolean = false;
  subscription: Subscription[] = [];


  constructor(
    private basketService: BasketService,
    private dataFromAnotherComponent: ComponentCommunicationService,
    private http: HttpClient,
    private key: ApiKey,
    private orderService: OrderService,
    private translate: TranslateService) { }

  ngOnInit() {
    this.basketItems = this.basketService.getProductsFromBasket();
    this.getTotalAmountToPay();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  increaseQuantity(productId: number) {
    this.basketItems = this.basketService.increaseProductQuantity(productId);
    this.dataFromAnotherComponent.changeNumberOfProductsByOne(true);
    this.getTotalAmountToPay();
  }

  decreaseQuantity(productId: number) {
    this.basketItems = this.basketService.decraseProductQuantity(productId);
    this.dataFromAnotherComponent.changeNumberOfProductsByOne(false);
    this.getTotalAmountToPay();
  }

  removeProductFromBasket(product: Product) {
    this.basketItems = this.basketService.removeProductFromBasket(product.productId);
    this.dataFromAnotherComponent.changeNumberOfProductsByMany(product.quantity);
    this.getTotalAmountToPay();
  }

  removeAllProductsFromBasket() {
    this.basketItems = this.basketService.removeAllProductsFromBasket();
    this.dataFromAnotherComponent.changeNumberOfProductsToZero();
    this.totalAmountToPay = 0;
  }

  getTotalAmountToPay() {
    this.totalAmountToPay = 0;
    if (this.basketItems.length > 0) {
      this.basketItems.forEach(item => {
        this.totalAmountToPay += (item.quantity * item.price);
      });
    }
  }

  getLocation(): Promise<any> {
    const address = this.orderDetails.address;
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + this.key.apiKey)
      .toPromise()
      .catch((error) => console.log(error));
  }

  handleAddressChange(address: any) {
    this.orderDetails.address = address.formatted_address;
    this.addressError = false;
  }

  async makeAnOrder() {
    let addressValid: boolean;
    await this.getLocation().then(response => {
      addressValid = response.status === "OK" ? true : false;
    });

    if (addressValid) {
      this.orderDetails.price = this.totalAmountToPay;
      let user: User = JSON.parse(localStorage.getItem("user") || null);
      if (user) {
        this.orderDetails.userId = user.userId;
        this.loading = true;
      }
      this.orderDetails.orderTime = (new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1);

      this.subscription.push(this.orderService.postOrder(this.orderDetails).subscribe((data: any) => {
        const multipleApiCalls = [];

        this.basketItems.forEach((item: Product) => {
          multipleApiCalls.push(this.orderService.postOrderProducts({ ProductId: item.productId, OrderId: data.orderId, Quantity: item.quantity }));
        });

        this.subscription.push(forkJoin(multipleApiCalls).subscribe(() => {
          this.removeAllProductsFromBasket();
          this.orderDetails = {} as Order;
          this.loading = false;
          this.translate.currentLang === 'hr' ? this.toastMessages.saveChangesSuccess('Narudžba je zaprimljena!') : this.toastMessages.saveChangesSuccess('Order has been received!');
        }, err => {
          this.loading = false;
          this.translate.currentLang === 'hr' ? this.toastMessages.saveChangesFailed('Došlo je do pogreške! Pokušajte ponovno.') : this.toastMessages.saveChangesFailed('Error has occured! Please try again.');
          console.log(err);
        }));
      }, err => {
        this.loading = false;
        this.translate.currentLang === 'hr' ? this.toastMessages.saveChangesFailed('Došlo je do pogreške! Pokušajte ponovno.') : this.toastMessages.saveChangesFailed('Error has occured! Please try again.');
        console.log(err);
      }));
    } else {
      this.addressError = true;
    }

  }
}
