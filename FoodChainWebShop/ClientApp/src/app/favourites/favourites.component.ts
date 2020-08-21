import { Product } from './../interfaces/Product';
import { FavouritesService } from './../services/FavouritesService';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  favourites: Product[] = [];

  constructor(
    private router: Router,
    private favouritesService: FavouritesService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: { favourites: Product[] }) => {
      this.favourites = data.favourites;
    }, err => {
      console.log(err);
    });
  }

  removeFromFavourites() {
    console.log("remove from favourites");
  }

  addToBsket() {
    console.log("Add to basket");
  }

  navigateToProduct(productName: string, productId: number) {
    productName = productName.split(' ').join('-');
    this.router.navigateByUrl("product/" + productId + '/' + productName);
  }

  getFavourites() {
    this.favouritesService.getFavouritesForUser(3).subscribe((data: Product[]) => {
      this.favourites = data;
    }, err => {
      console.log(err)
    })
  }

  deleteFromFavourites(favouriteId: number) {
    this.favouritesService.deleteFromFavourites(3, favouriteId).subscribe(() => {
      this.getFavourites();
    }, err => {
      console.log(err)
    })
  }

}
