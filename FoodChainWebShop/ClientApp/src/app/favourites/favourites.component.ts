import { User } from './../interfaces/User';
import { BasketService } from './../services/BasketService';
import { Product } from './../interfaces/Product';
import { FavouritesService } from './../services/FavouritesService';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ComponentCommunicationService } from '../services/ComponentCommunicationService';
import { Subscription } from 'rxjs/internal/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { ToastMessagesComponent } from '../toast-messages/toast-messages.component';
import { GeneralService } from '../services/GeneralService';


@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
  @ViewChild(ToastMessagesComponent, { static: false })
  toastMessages: ToastMessagesComponent;

  favourites: any[] = [];
  favouritesGroupedByRestaurant: any = null;
  subscription: Subscription[] = [];
  user: User = {} as User;

  constructor(
    private router: Router,
    private favouritesService: FavouritesService,
    private activatedRoute: ActivatedRoute,
    private basketService: BasketService,
    private dataFromAnotherComponent: ComponentCommunicationService,
    private translate: TranslateService,
    private generalService: GeneralService
  ) { }

  ngOnInit() {
    this.subscription.push(this.activatedRoute.data.subscribe((data: { favourites: any }) => {
      this.setFavourites(data.favourites);
    }, err => {
      console.log(err);
    }));
    this.user = this.generalService.getUserDataLocale();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  navigateToProduct(productName: string, productId: number) {
    productName = productName.split(' ').join('-');
    this.router.navigateByUrl("product/" + productId + '/' + productName);
  }

  getFavourites() {
    this.favouritesGroupedByRestaurant = null;
    this.subscription.push(this.favouritesService.getFavouritesForUser(this.user.userId).subscribe((data: Product[]) => {
      this.setFavourites(data)
    }, err => {
      console.log(err)
    }));
  }

  deleteFromFavourites(favouriteId: number) {
    this.subscription.push(this.favouritesService.deleteFromFavourites(this.user.userId, favouriteId).subscribe(() => {
      this.getFavourites();
    }, err => {
      console.log(err)
    }));
  }

  addToBasket(product: Product) {
    const res = this.basketService.addProductToBasket(product);
    if (res && res.error) {
      this.toastMessages.saveChangesFailed(this.translate.instant("ADD_TO_BASKET_ERR"))
    } else {
      this.dataFromAnotherComponent.changeNumberOfProductsByOne(true);
    }
  }

  private groupByRestaurant(valuesToGroup) {
    const groups = valuesToGroup.reduce((groups, item) => {
      const group = (groups[item.product.restaurant.restaurantId] || []);
      group.push(item.product);
      groups[item.product.restaurant.restaurantId] = group;
      return groups;
    }, {});

    return groups;
  }

  private setFavourites(data: any[]): void {
    this.favourites = data;

    this.favourites.forEach((fav) => {
      fav.product.imageToShow = this.generalService.setBase64ImageToShow(fav.product.image as string);
    });
    
    if (this.favourites && this.favourites.length > 0) this.favouritesGroupedByRestaurant = this.groupByRestaurant(this.favourites);
  }

}
