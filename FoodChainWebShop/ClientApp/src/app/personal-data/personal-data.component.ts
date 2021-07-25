import { Component, OnInit } from '@angular/core';
import { GlobalVar } from '../globalVar';
import { User } from '../interfaces/User';
import { GeneralService } from '../services/GeneralService';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {
  userData: User = null;
  errors = {
    emailError: false,
    addressError: false,
    mobileError: false
  }
  buttonDisabled: boolean = false;
  emailTaken: string = '';

  constructor(
    private generalService: GeneralService,
    public globalVar: GlobalVar
  ) { }

  ngOnInit() {
    this.setUserData();
  }

  setUserData(): void {
    this.userData = this.generalService.getUserDataLocale();
  }

  checkEmail(): boolean {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.errors.emailError = reg.test(String(this.userData.email).toLowerCase()) ? false : true;
    return this.errors.emailError;
  }

  checkButton() {
    if (
      this.checkEmail() === false &&
      this.userData.address.length > 0 &&
      this.checkMobileNumber() === false) {
      this.buttonDisabled = false;
    } else {
      this.buttonDisabled = true;
    }
  }

  checkMobileNumber(): boolean {
    if (this.userData.mobileNumber.length === 0) {
      this.errors.mobileError = true;
      return this.errors.mobileError;
    } else {
      const checkRegex = /^\(?([0-9]{3})\)?[- ]?([0-9]{3})[- ]?([0-9]{4})$/;
      if (!this.userData.mobileNumber.match(checkRegex)) {
        this.errors.mobileError = true;
        return this.errors.mobileError;
      } else {
        if (['095', '098', '091', '092', '099'].includes(this.userData.mobileNumber.split('-')[0])) {
          this.errors.mobileError = false;
          return this.errors.mobileError;
        } else {
          this.errors.mobileError = true;
          return this.errors.mobileError;
        }

      }
    }
  }

  checkEmailTaken() {
    if (this.emailTaken.length > 0) {
      this.emailTaken = '';
    }
  }

  checkAddress() {
    if (this.userData.address.length === 0) {
      this.errors.addressError = true;
    } else {
      this.errors.addressError = false;
    }
  }

  handleAddressChange(address: any) {
    this.userData.address = address.name + ', ' + address.vicinity;
  }

  updateUserData(): void {
    if (!this.buttonDisabled) {
      const dataToUpdate = (({ address, email, mobileNumber, userId }) => ({ address, email, mobileNumber, userId }))(this.userData);
      console.log(dataToUpdate);
    } 
  }

}
