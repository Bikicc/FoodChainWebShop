import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { GlobalVar } from '../globalVar';
import { Restaurant } from '../interfaces/Restaurant';
import { RestaurantWithRating } from '../interfaces/RestaurantsWithRating';
import { RestaurantType } from '../interfaces/RestaurantType';
import { User } from '../interfaces/User';
import { GeneralService } from '../services/GeneralService';
import { RestaurantsService } from '../services/RestaurantsService';
import { ToastMessagesComponent } from '../toast-messages/toast-messages.component';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
  @ViewChild(ToastMessagesComponent, { static: false })
  toastMessages: ToastMessagesComponent;

  subscription: Subscription[] = [];
  restaurants: RestaurantWithRating[] = [];
  restaurantTypes: RestaurantType[] = [];
  restaurantTypesDropdown: any[] = [];
  selectedRestaurantTypeId: number = 1;
  filteredRestaurants: RestaurantWithRating[] = [];
  roleId: number = null;
  //Admin rest data
  activeRestaurants: RestaurantWithRating[] = [];
  inactiveRestaurants: RestaurantWithRating[] = [];
  filteredActiveRestaurants: RestaurantWithRating[] = [];
  filteredInactiveRestaurants: RestaurantWithRating[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private generalService: GeneralService,
    public globalVar: GlobalVar,
    private restaurantService: RestaurantsService
  ) { }

  ngOnInit() {
    this.subscription.push(this.activatedRoute.data.subscribe((data: { restaurants: RestaurantWithRating[], restaurantTypes: RestaurantType[] }) => {
      this.roleId = this.generalService.getUserRoleId();

      this.restaurants = this.setRestaurantImageToShow(data.restaurants);
      if (this.roleId === this.globalVar.userRoles.admin) this.setAdminRestaurantsView(this.restaurants);
      this.restaurantTypes = data.restaurantTypes;

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
    if (this.roleId === this.globalVar.userRoles.admin) {
      this.filteredActiveRestaurants = this.activeRestaurants.filter(item => item.restaurant.restaurantTypeId == this.selectedRestaurantTypeId);
      this.filteredInactiveRestaurants = this.inactiveRestaurants.filter(item => item.restaurant.restaurantTypeId == this.selectedRestaurantTypeId);
    }
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

  public deleteRestaurant(restId: number) {
    window.event.stopPropagation(); //Kako se ne bi okinia onClick od parent diva

    this.restaurantService.deleteRestaurant(restId).subscribe((data) => {
      this.translate.currentLang === 'hr' ? this.toastMessages.saveChangesSuccess('Restoran uspješno deaktiviran!') : this.toastMessages.saveChangesSuccess('Restaurant has been deactivated successfully!');
      this.getRestaurantsAfterActivationDeletion();
    }, err => {
      this.translate.currentLang === 'hr' ? this.toastMessages.saveChangesFailed('Došlo je do pogreške! Molimo pokušajte ponovno.') : this.toastMessages.saveChangesFailed('Error has occured! Please try again.');
    });
  }

  public activateRestaurant(restId: number) {
    window.event.stopPropagation(); //Kako se ne bi okinia onClick od parent diva

    this.restaurantService.activateRestaurant(restId).subscribe((data) => {
      this.translate.currentLang === 'hr' ? this.toastMessages.saveChangesSuccess('Restoran uspješno aktiviran!') : this.toastMessages.saveChangesSuccess('Restaurant has been activated successfully!');
      this.getRestaurantsAfterActivationDeletion();
    }, err => {
      this.translate.currentLang === 'hr' ? this.toastMessages.saveChangesFailed('Došlo je do pogreške! Molimo pokušajte ponovno.') : this.toastMessages.saveChangesFailed('Error has occured! Please try again.');
    });
  }

  private setAdminRestaurantsView(rest: RestaurantWithRating[]) {
    this.activeRestaurants = rest.filter(r => r.restaurant.active === true);
    this.inactiveRestaurants = rest.filter(r => r.restaurant.active === false);

  }

  private getRestaurantsAfterActivationDeletion() {
    this.restaurantService.getRestaurants().subscribe((data) => {
      this.restaurants = this.setRestaurantImageToShow(data);
      this.setAdminRestaurantsView(this.restaurants);
      this.filterRestaurantsBasedOnType();
    }, err => {
      this.translate.currentLang === 'hr' ? this.toastMessages.saveChangesFailed('Došlo je do pogreške! Molimo pokušajte ponovno.') : this.toastMessages.saveChangesFailed('Error has occured! Please try again.');
    });
  }

}
