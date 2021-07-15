import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { GlobalVar } from '../globalVar';
import { RestaurantWithRating } from '../interfaces/RestaurantsWithRating';
import { RestaurantType } from '../interfaces/RestaurantType';
import { User } from '../interfaces/User';
import { GeneralService } from '../services/GeneralService';
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
  roleId: number = null;
  userData: User = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private generalService: GeneralService,
    public globalVar: GlobalVar
  ) { }

  ngOnInit() {
    this.subscription.push(this.activatedRoute.data.subscribe((data: { restaurants: RestaurantWithRating[], restaurantTypes: RestaurantType[] }) => {
      this.restaurants = this.setRestaurantImageToShow(data.restaurants);
      this.restaurantTypes = data.restaurantTypes;
      this.setUserData();
      
      this.setDropdownRestaurantTypes();
      this.translate.onLangChange.subscribe(() => this.setDropdownRestaurantTypes());
      this.roleId = this.generalService.getUserRoleId();
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
  
  navigateToEditRestaurant(restaurantId: number) {
    window.event.stopPropagation(); //Kako se ne bi okinia onClick od parent diva
    this.router.navigateByUrl("editRestaurant/" + restaurantId);
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

  public navigateToAddNewRestaurant(): void {
    this.router.navigateByUrl("addNewRestaurant");
  }

  private setRestaurantImageToShow(restaurants: RestaurantWithRating[]): RestaurantWithRating[] {
    return restaurants.map(res => {
      res.restaurant.imageToShow = this.generalService.setBase64ImageToShow(res.restaurant.image as string);
      return res;
    });;
  }

  private setUserData(): void {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    if (user) {
      this.userData = user;
    } else {
      this.userData = null;
    }
  }

}
