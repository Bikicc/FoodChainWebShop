import { TranslateService } from '@ngx-translate/core';
import { BasketService } from './../services/BasketService';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FavouritesService } from './../services/FavouritesService';
import { Product } from '../interfaces/Product';
import { ComponentCommunicationService } from '../services/ComponentCommunicationService';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
  productInfo: Product = null;
  favourites: Product[] = [];
  isFavourite: boolean = null;
  selectedLang: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private favouritesService: FavouritesService,
    private basketService: BasketService,
    private dataFromAnotherComponent: ComponentCommunicationService,
    private translate: TranslateService
    ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: { product: Product, favourites: Product[] }) => {
      this.productInfo = data.product;
      this.favourites = data.favourites;
      this.checkIsProductInFavourites();
    }, err => {
      console.log(err);
    });

    this.selectedLang = this.translate.currentLang;
    this.translate.onLangChange.subscribe(() => this.selectedLang = this.translate.currentLang);
  }

  addToFavourites() {
    let data = {
      userId: 3,
      productId: this.productInfo.productId
    };

    this.favouritesService.postProductToFavourites(data).subscribe(async () => {
      await this.getFavourites();
      this.checkIsProductInFavourites();
      console.log("added to favourites!")
    }, err => {
      console.log(err)
    })
  }

  checkIsProductInFavourites() {
    this.isFavourite = this.favourites.some(x => {
      return x.productId === this.productInfo.productId;
    });
  }

  removeFromFavourites() {
    this.favouritesService.deleteFromFavourites(3, this.productInfo.productId).subscribe(async () => {
      await this.getFavourites();
      this.checkIsProductInFavourites();
    }, err => {
      console.log(err)
    })
  }

  getFavourites() {
    return new Promise((resolve, reject) => {
      this.favouritesService.getFavouritesForUser(3).subscribe((data: Product[]) => {
        this.favourites = data;
        this.checkIsProductInFavourites();
        resolve();
      }, err => {
        console.log(err);
        reject();
      })
    })
  }

  addToBasket() {
    this.basketService.addProductToBasket(this.productInfo);
    this.dataFromAnotherComponent.changeNumberOfProductsByOne(true);
  }
}


