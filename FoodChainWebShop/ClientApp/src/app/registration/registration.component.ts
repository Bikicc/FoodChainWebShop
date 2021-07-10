import { UserService } from './../services/UserService';
import { User } from './../interfaces/User';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/internal/Subscription';
import { GeneralService } from '../services/GeneralService';
import { GlobalVar } from '../globalVar';
import { SelectItem } from 'primeng/api';
import { ToastMessagesComponent } from '../toast-messages/toast-messages.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  @ViewChild(ToastMessagesComponent, { static: false })
  toastMessages: ToastMessagesComponent;
  
  readonly roles: SelectItem[] = [
    { label: 'Vlasnik', value: 2, icon: 'fa fa-handshake-o' },
    { label: 'Admin', value: 1, icon: 'fa fa-lock' }];

  selectedRole: number = 2;
  roleId: number = null;
  userToRegister: User = {
    Username: '',
    email: '',
    PasswordPlain: '',
    address: '',
    roleId: null,
    mobileNumber: ''
  };
  errors = {
    usernameError: false,
    passwordError: false,
    emailError: false,
    addressError: false,
    mobileError: false
  }
  buttonDisabled: boolean = true;
  usernameTaken: string = '';
  emailTaken: string = '';
  loading: boolean = false;
  subscription: Subscription[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private generalService: GeneralService,
    private globalVar: GlobalVar,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.roleId = this.generalService.getUserRoleId();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  checkUsername() {
    if (this.userToRegister.Username.length < 4) {
      this.errors.usernameError = true;
    } else {
      this.errors.usernameError = false;
    }
  }

  checkPassword() {
    if (this.userToRegister.PasswordPlain.length < 4) {
      this.errors.passwordError = true;
    } else {
      this.errors.passwordError = false;
    }
  }

  checkEmail(): boolean {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.errors.emailError = reg.test(String(this.userToRegister.email).toLowerCase()) ? false : true;
    return this.errors.emailError;
  }

  checkButton() {
    if (
      this.userToRegister.Username.length >= 4 &&
      this.userToRegister.PasswordPlain.length >= 4 &&
      this.checkEmail() === false &&
      this.userToRegister.address.length > 0 &&
      this.checkMobileNumber() === false) {
      this.buttonDisabled = false;
    } else {
      this.buttonDisabled = true;
    }
  }

  submitForm() {
    if (!this.buttonDisabled) {
      if (this.roleId === this.globalVar.userRoles.admin) {
        this.userToRegister.roleId = this.selectedRole;
      } else {
        this.userToRegister.roleId = this.globalVar.userRoles.korisnik;
      }
      this.loading = true;
      this.subscription.push(this.userService.registerUser(this.userToRegister).subscribe(() => {
        this.loading = false;
        //Registraciju mogu vršiti anonimni korisnici i administrator, ako je anoniman roleId je null
        if (this.roleId) {
          this.toastMessages.saveChangesSuccess(this.translate.instant("KORISNIK_USPJESNO_DODAN"))
        } else {
          this.router.navigate(["login"], { queryParams: { fromRegistration: true } });
        }
      }, (err: HttpErrorResponse) => {
        console.log(err.status)
        if (err.error.errorId === 1) {
          this.usernameTaken = err.error.message;
          this.loading = false;
          return;
        }

        if (err.error.errorId === 2) {
          this.emailTaken = err.error.message;
          this.loading = false;
          return;
        }
      }));
    }
  }


  checkUsernameTaken() {
    if (this.usernameTaken.length > 0) {
      this.usernameTaken = '';
    }
  }

  checkEmailTaken() {
    if (this.emailTaken.length > 0) {
      this.emailTaken = '';
    }
  }

  checkAddress() {
    if (this.userToRegister.address.length === 0) {
      this.errors.addressError = true;
    }
  }

  checkMobileNumber(): boolean {
    if (this.userToRegister.mobileNumber.length === 0) {
      this.errors.mobileError = true;
      return this.errors.mobileError;
    } else {
      const checkRegex = /^\(?([0-9]{3})\)?[- ]?([0-9]{3})[- ]?([0-9]{4})$/;
      if (!this.userToRegister.mobileNumber.match(checkRegex)) {
        this.errors.mobileError = true;
        return this.errors.mobileError;
      } else {
        this.errors.mobileError = false;
        return this.errors.mobileError;
      }
    }
  }

}
