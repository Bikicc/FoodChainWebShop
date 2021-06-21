import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RestaurantWithRating } from '../interfaces/RestaurantsWithRating';
import { RestaurantType } from '../interfaces/RestaurantType';
import { RestaurantsService } from '../services/RestaurantsService';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
  subscription: Subscription[] = [];
  restaurants: RestaurantWithRating[];
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscription.push(this.activatedRoute.data.subscribe((data: { restaurants: RestaurantWithRating[], restaurantTypes: RestaurantType[] }) => {
     this.restaurants = data.restaurants;
    }, err => {
      console.log(err);
    }));
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  navigateToRestaurant(restaurantId: number) {
    this.router.navigateByUrl("menu/" + restaurantId);
  }

}
