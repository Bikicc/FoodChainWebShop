import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { GlobalVar } from 'src/app/globalVar';
import { Restaurant } from 'src/app/interfaces/Restaurant';
import { RestaurantType } from 'src/app/interfaces/RestaurantType';
import { User } from 'src/app/interfaces/User';
import { RestaurantsService } from 'src/app/services/RestaurantsService';
import { ToastMessagesComponent } from 'src/app/toast-messages/toast-messages.component';

@Component({
  selector: 'app-add-new-restaurant',
  templateUrl: './add-new-restaurant.component.html',
  styleUrls: ['./add-new-restaurant.component.scss']
})
export class AddNewRestaurantComponent implements OnInit {
  @ViewChild('name', { static: false })
  formName: NgModel;
  @ViewChild('address', { static: false })
  formAddress: NgModel;
  @ViewChild('phone', { static: false })
  formPhone: NgModel;
  @ViewChild('minOrder', { static: false })
  formMinOrder: NgModel;
  @ViewChild(ToastMessagesComponent, { static: false })
  toastMessages: ToastMessagesComponent;
  @ViewChild('fileUploader', { static: false })
  fileUploader: any;
  restaurantModel: Restaurant = {
    name: '',
    mobileNumber: '',
    address: '',
    minOrderPrice: 30,
    RestaurantTypeId: null,
    active: true,
    restaurantId: null,
    restaurantTypeId: null,
    userId: null
  };

  owners: User[] = [];
  ownersDropDown: MenuItem[] = [];

  restarauntTypes: RestaurantType[] = [];
  restaurantTypeDropdown: MenuItem[] = [];

  subscription: Subscription[] = [];
  readonly formData: FormData = new FormData();
  mobileNumberError: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantsService,
    private translate: TranslateService,
    public globalVar: GlobalVar
  ) { }

  ngOnInit() {
    this.subscription.push(this.activatedRoute.data.subscribe((data: { owners: User[], restaurantTypes: RestaurantType[] }) => {
      this.owners = data.owners;
      this.restaurantModel.userId = data.owners[0].userId;
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
      this.checkMobileNumberFormat() ||
      !this.restaurantModel.userId
    );
  }

  insertRestaurant() {
    if (this.isFormValid()) {
      for (var key in this.restaurantModel) {
        if (this.restaurantModel[key] !== null) {
          this.formData.append(key, this.restaurantModel[key]);
        }
      }

      this.restaurantService.insertRestaurant(this.formData).subscribe(() => {
        this.setRestaurantModelDefault();
        this.resetFormFields();
        this.translate.currentLang === 'hr' ? this.toastMessages.saveChangesSuccess('Restoran uspješno dodan!') : this.toastMessages.saveChangesSuccess('Restaurant has been successfully added!');

      }, err => {
        this.toastMessages.saveChangesFailed(this.translate.instant("DOSLO_DO_POGRESKE"));
      })
    }
  }

  private resetFormFields() {
    this.formName.reset();
    this.formAddress.reset();
    this.formPhone.reset();
    this.formMinOrder.reset();
    this.fileUploader.clear();
  }

  private setRestaurantModelDefault() {
    this.restaurantModel = {
      name: '',
      mobileNumber: '',
      address: '',
      minOrderPrice: null,
      RestaurantTypeId: null,
      active: true,
      restaurantId: null,
      restaurantTypeId: null,
      userId: null
    };
  }

  handleAddressChange(address: any) {
    this.restaurantModel.address = address.name + ', ' + address.vicinity;
  }

  checkMobileNumberFormat(): boolean {
    this.mobileNumberError = !['095', '098', '091', '092', '099'].includes(this.restaurantModel.mobileNumber.split('-')[0]);
    return this.mobileNumberError;
  }

}
