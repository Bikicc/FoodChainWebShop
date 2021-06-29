import { User } from './../interfaces/User';
import { TranslateService } from '@ngx-translate/core';
import { BasketService } from './../services/BasketService';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FavouritesService } from './../services/FavouritesService';
import { Product } from '../interfaces/Product';
import { ComponentCommunicationService } from '../services/ComponentCommunicationService';
import { Subscription } from 'rxjs/internal/Subscription';
import { ToastMessagesComponent } from '../toast-messages/toast-messages.component';
import { ProductService } from '../services/ProductService';
import { GeneralService } from '../services/GeneralService';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
  @ViewChild(ToastMessagesComponent, { static: false })
  toastMessages: ToastMessagesComponent;

  productInfo: Product = null;
  favourites: Product[] = [];
  isFavourite: boolean = null;
  selectedLang: string = '';
  subscription: Subscription[] = [];
  user: User = {} as User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private favouritesService: FavouritesService,
    private basketService: BasketService,
    private dataFromAnotherComponent: ComponentCommunicationService,
    private translate: TranslateService,
    private generalService: GeneralService
  ) { }

  ngOnInit() {
    this.subscription.push(this.activatedRoute.data.subscribe((data: { product: Product, favourites: Product[] }) => {
      this.productInfo = data.product;
      this.productInfo.imageToShow = this.generalService.setBase64ImageToShow(data.product.image as string);
      this.favourites = data.favourites;
      this.checkIsProductInFavourites();
    }, err => {
      console.log(err);
    }));

    this.user = JSON.parse(localStorage.getItem("user"));
    this.selectedLang = this.translate.currentLang;
    this.subscription.push(this.translate.onLangChange.subscribe(() => this.selectedLang = this.translate.currentLang));
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  addToFavourites() {
    let data = {
      userId: this.user.userId,
      productId: this.productInfo.productId
    };

    this.subscription.push(this.favouritesService.postProductToFavourites(data).subscribe(async () => {
      await this.getFavourites();
      this.checkIsProductInFavourites();
    }, err => {
      console.log(err)
    }));
  }

  checkIsProductInFavourites() {
    this.isFavourite = this.favourites.some(x => {
      return x.productId === this.productInfo.productId;
    });
  }

  removeFromFavourites() {
    this.subscription.push(this.favouritesService.deleteFromFavourites(this.user.userId, this.productInfo.productId).subscribe(async () => {
      await this.getFavourites();
      this.checkIsProductInFavourites();
    }, err => {
      console.log(err)
    }));
  }

  getFavourites() {
    return new Promise((resolve, reject) => {
      this.subscription.push(this.favouritesService.getFavouritesForUser(this.user.userId).subscribe((data: Product[]) => {
        this.favourites = data;
        this.checkIsProductInFavourites();
        resolve(null);
      }, err => {
        console.log(err);
        reject();
      }));
    })
  }

  addToBasket() {
    const res = this.basketService.addProductToBasket(this.productInfo);
    if (res && res.error) {
      this.toastMessages.saveChangesFailed(this.translate.instant("ADD_TO_BASKET_ERR"))
    } else {
      this.dataFromAnotherComponent.changeNumberOfProductsByOne(true);
    }
  }
}


