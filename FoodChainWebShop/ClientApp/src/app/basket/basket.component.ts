import { User } from './../interfaces/User';
import { TranslateService } from '@ngx-translate/core';
import { OrderService } from './../services/OrderService';
import { Order } from './../interfaces/Order';
import { BasketService } from './../services/BasketService';
import { Product } from './../interfaces/Product';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentCommunicationService } from '../services/ComponentCommunicationService';
import { forkJoin, Subscription } from 'rxjs';
import { ToastMessagesComponent } from './../toast-messages/toast-messages.component';
import { GeneralService } from '../services/GeneralService';
import { GlobalVar } from '../globalVar';


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

  orderDetails: Order = {} as Order;
  addressError: boolean = false;
  loading: boolean = false;
  subscription: Subscription[] = [];
  user: User = null;

  constructor(
    private basketService: BasketService,
    private dataFromAnotherComponent: ComponentCommunicationService,
    private orderService: OrderService,
    private translate: TranslateService,
    private generalService: GeneralService,
    public globalVar: GlobalVar) { }

  ngOnInit() {
    this.user = this.generalService.getUserDataLocale();

    this.orderDetails.address = this.user && this.user.address;
    this.basketItems = this.basketService.getProductsFromBasket();
    this.basketItems.forEach(item => {
      item.imageToShow = this.generalService.setBase64ImageToShow(item.image as string);
    });

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

  handleAddressChange(address: any) {
    this.orderDetails.address = address.name + ', ' + address.vicinity;
  }

  isFormValid() {
    if (this.orderDetails.address && this.orderDetails.address.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  async makeAnOrder() {
    if (this.isFormValid()) {
      this.orderDetails.price = this.totalAmountToPay;
      if (this.user) {
        this.orderDetails.userId = this.user.userId;
        this.loading = true;
      }
      this.orderDetails.orderTime = (new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1);

      this.subscription.push(this.orderService.postOrder(this.orderDetails).subscribe((orderId: any) => {
        const multipleApiCalls = [];

        this.basketItems.forEach((item: Product) => {
          multipleApiCalls.push(this.orderService.postOrderProducts({ ProductId: item.productId, OrderId: orderId, Quantity: item.quantity, ProductPriceATM: item.price }));
        });

        this.subscription.push(forkJoin(multipleApiCalls).subscribe(() => {
          this.removeAllProductsFromBasket();
          this.orderDetails = {} as Order;
          this.loading = false;
          this.translate.currentLang === 'hr' ? this.toastMessages.saveChangesSuccess('Narudžba je zaprimljena!') : this.toastMessages.saveChangesSuccess('Order has been received!');
        }, err => {
          this.loading = false;
          this.toastMessages.saveChangesFailed(this.translate.instant("DOSLO_DO_POGRESKE"));
        }));
      }, err => {
        this.loading = false;
        this.toastMessages.saveChangesFailed(this.translate.instant("DOSLO_DO_POGRESKE"));
        console.log(err);
      }));
    } 

  }
}
