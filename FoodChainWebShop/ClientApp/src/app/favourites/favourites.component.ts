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
  subscription: Subscription[] = [];

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
    }, err => {
      console.log(err);
    }));
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  navigateToProduct(productName: string, productId: number) {
    productName = productName.split(' ').join('-');
    this.router.navigateByUrl("product/" + productId + '/' + productName);
  }

  getFavourites() {
   this.subscription.push(this.favouritesService.getFavouritesForUser(3).subscribe((data: Product[]) => {
      this.favourites = data;
    }, err => {
      console.log(err)
    }));
  }

  deleteFromFavourites(favouriteId: number) {
   this.subscription.push(this.favouritesService.deleteFromFavourites(3, favouriteId).subscribe(() => {
      this.getFavourites();
    }, err => {
      console.log(err)
    }));
  }

  addToBasket(product: Product) {
    this.basketService.addProductToBasket(product);
    this.dataFromAnotherComponent.changeNumberOfProductsByOne(true);
  }

}
