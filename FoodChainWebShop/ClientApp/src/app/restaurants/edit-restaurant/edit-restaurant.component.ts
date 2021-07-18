import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Restaurant } from 'src/app/interfaces/Restaurant';
import { RestaurantType } from 'src/app/interfaces/RestaurantType';
import { User } from 'src/app/interfaces/User';
import { RestaurantsService } from 'src/app/services/RestaurantsService';
import { ToastMessagesComponent } from 'src/app/toast-messages/toast-messages.component';
import { Location } from '@angular/common';
import { GeneralService } from 'src/app/services/GeneralService';
@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.scss']
})
export class EditRestaurantComponent implements OnInit {
  @ViewChild(ToastMessagesComponent, { static: false })
  toastMessages: ToastMessagesComponent;


  restaurantModel: Restaurant = null;

  owners: User[] = [];
  ownersDropDown: MenuItem[] = [];

  restarauntTypes: RestaurantType[] = [];
  restaurantTypeDropdown: MenuItem[] = [];

  subscription: Subscription[] = [];
  readonly formData: FormData = new FormData();

  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantsService,
    private translate: TranslateService,
    private location: Location,
    private generalService: GeneralService
  ) { }

  ngOnInit() {
    this.subscription.push(this.activatedRoute.data.subscribe((data: { owners: User[], restaurantTypes: RestaurantType[], restaurantInfo: any }) => {
      this.owners = data.owners;
      this.restaurantModel = this.setRestaurantImageToShow(data.restaurantInfo.result);
      this.restaurantModel.userId = data.owners[0].userId;
      this.restaurantModel.image && this.formData.append("imageFile", this.generalService.convertBase64ToBlob(this.restaurantModel.image as string));

      this.setDropDownOwners(data.owners);
      this.restarauntTypes = data.restaurantTypes;
      this.restaurantModel.RestaurantTypeId = data.restaurantTypes[0].restaurantTypeId;
      this.setDropdownRestaurantTypes(data.restaurantTypes);
    }, err => {
      console.log(err);
    }));
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  setDropDownOwners(owners: User[]) {
    this.ownersDropDown = owners.map(owner => {
      return {
        label: owner.username,
        value: owner.userId
      }
    })
  }

  setDropdownRestaurantTypes(resTypes: RestaurantType[]) {
    this.restaurantTypeDropdown = resTypes.map(res => {
      return {
        label: this.translate.currentLang === 'hr' ? res.name_Hr : res.name_En,
        value: res.restaurantTypeId
      }
    });
  }

  myUploader(event: any) {
    this.formData.delete("imageFile");
    this.formData.append("imageFile", event.files[0]);
  }

  isFormValid(): boolean {
    return !(
      !this.restaurantModel.name ||
      !this.restaurantModel.address ||
      !this.restaurantModel.minOrderPrice ||
      !this.restaurantModel.mobileNumber.match(/^\(?([0-9]{3})\)?[- ]?([0-9]{3})[- ]?([0-9]{4})$/) ||
      !this.restaurantModel.userId
    );
  }

  editRestaurant() {
    const dataToUpload = (({ RestaurantTypeId, userId, active, address, minOrderPrice, mobileNumber, name, restaurantId, restaurantTypeId }) => ({ RestaurantTypeId, userId, active, address, minOrderPrice, mobileNumber, name, restaurantId, restaurantTypeId }))(this.restaurantModel);


    if (this.isFormValid()) {
      for (var key in dataToUpload) {
        this.formData.append(key, this.restaurantModel[key]);
      }

      this.restaurantService.editRestaurant(this.formData).subscribe(() => {
        this.translate.currentLang === 'hr' ? this.toastMessages.saveChangesSuccess('Restoran uspješno uređen!') : this.toastMessages.saveChangesSuccess('Restaurant has been successfully edited!');
        this.location.back();
      }, err => {
        this.translate.currentLang === 'hr' ? this.toastMessages.saveChangesFailed('Došlo je do pogreške! Molimo pokušajte ponovno.') : this.toastMessages.saveChangesFailed('Error has occured! Please try again.');
      })
    }
  }

  private setRestaurantImageToShow(restaurant: Restaurant): Restaurant {
    restaurant.imageToShow = this.generalService.setBase64ImageToShow(restaurant.image as string);
    return restaurant;
  }

}
