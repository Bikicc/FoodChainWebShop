import { EmailService } from './../services/EmailService';
import { OrderService } from './../services/OrderService';
import { Order } from './../interfaces/Order';
import { BasketService } from './../services/BasketService';
import { Product } from './../interfaces/Product';
import { Component, OnInit } from '@angular/core';
import { ComponentCommunicationService } from '../services/ComponentCommunicationService';
import { HttpClient } from '@angular/common/http';
import { apiKey } from '../apiKey';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  basketItems: Product[] = [];
  totalAmountToPay: number = 0;
  // options = {
  //   componentRestrictions: {
  //     country: ['HR']
  //   }
  // }
  orderDetails: Order = {} as Order;
  addressError: boolean = false;

  constructor(
    private basketService: BasketService,
    private dataFromAnotherComponent: ComponentCommunicationService,
    private http: HttpClient,
    private key: apiKey,
    private orderService: OrderService,
    private emailService: EmailService) { }

  ngOnInit() {
    this.basketItems = this.basketService.getProductsFromBasket();
    this.getTotalAmountToPay();
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

  // handleAddressChange(address: any) {
  //   this.orderDetails.address = address.formatted_address;
  //   this.addressError = false;
  // }

  async makeAnOrder() {
    let addressValid: boolean;
    await this.getLocation().then(response => {
      addressValid = response.status === "OK" ? true : false;
    });

    if (addressValid) {
      this.orderDetails.price = this.totalAmountToPay;
      this.orderDetails.userId = 3;
      this.orderDetails.orderTime = (new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1);

      this.orderService.postOrder(this.orderDetails).subscribe((data: any) => {
        const multipleApiCalls = [];

        this.basketItems.forEach((item: Product) => {
          multipleApiCalls.push(this.orderService.postOrderProducts({ ProductId: item.productId, OrderId: data.orderId, Quantity: item.quantity }));
        });

        forkJoin(multipleApiCalls).subscribe(() => {
          this.removeAllProductsFromBasket();
          this.orderDetails = {} as Order;
          this.emailService.sendEmail({from: 'fastFood@gmail.com', content:"Your order is received", subject: "Order successfully received"})
        }, err => {
          console.log(err);
        })
      }, err => {
        console.log(err);
      });
    } else {
      this.addressError = true;
    }

  }
}
