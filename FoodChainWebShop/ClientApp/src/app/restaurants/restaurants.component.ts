import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
  restaurants: RestaurantWithRating[] = [];
  restaurantTypes: RestaurantType[] = [];
  restaurantTypesDropdown: any[] = [];
  selectedRestaurantTypeId: number = 1;
  filteredRestaurants: RestaurantWithRating[] = [];
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.subscription.push(this.activatedRoute.data.subscribe((data: { restaurants: RestaurantWithRating[], restaurantTypes: RestaurantType[] }) => {
      this.restaurants = data.restaurants;
      this.restaurantTypes = data.restaurantTypes;
      console.log(this.restaurants)
      this.setDropdownRestaurantTypes();
      this.translate.onLangChange.subscribe(() => this.setDropdownRestaurantTypes());
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

  setDropdownRestaurantTypes() {
    if (this.translate.currentLang === 'hr') {
      this.restaurantTypesDropdown = this.restaurantTypes.map(type => {
        return { label: type.name_Hr, value: type.restaurantTypeId }
      });
    } else {
      this.restaurantTypesDropdown = this.restaurantTypes.map(type => {
        return { label: type.name_En, value: type.restaurantTypeId }
      });
    }

    this.filterRestaurantsBasedOnType();
  }

  public filterRestaurantsBasedOnType() {
    this.filteredRestaurants = this.restaurants.filter(item => item.restaurant.restaurantTypeId == this.selectedRestaurantTypeId);
  }

}
