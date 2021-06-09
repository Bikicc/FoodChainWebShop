import { User } from './../interfaces/User';
import { BasketService } from './../services/BasketService';
import { Product } from './../interfaces/Product';
import { FavouritesService } from './../services/FavouritesService';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ComponentCommunicationService } from '../services/ComponentCommunicationService';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  favourites: Product[] = [];
  favouritesGroupedByRestaurant: any = null;
  subscription: Subscription[] = [];
  user: User = {} as User;

  constructor(
    private router: Router,
    private favouritesService: FavouritesService,
    private activatedRoute: ActivatedRoute,
    private basketService: BasketService,
    private dataFromAnotherComponent: ComponentCommunicationService,
  ) { }

  ngOnInit() {
    this.subscription.push(this.activatedRoute.data.subscribe((data: { favourites: Product[] }) => {
      this.favourites = data.favourites;
      if (this.favourites && this.favourites.length > 0) this.favouritesGroupedByRestaurant = this.groupByRestaurant(this.favourites);
    }, err => {
      console.log(err);
    }));
    this.user = JSON.parse(localStorage.getItem("user"));
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
      this.favourites = data;
      if (this.favourites && this.favourites.length > 0) this.favouritesGroupedByRestaurant = this.groupByRestaurant(this.favourites);
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
    this.basketService.addProductToBasket(product);
    this.dataFromAnotherComponent.changeNumberOfProductsByOne(true);
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

}
