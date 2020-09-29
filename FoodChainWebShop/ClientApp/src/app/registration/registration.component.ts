import { UserService } from './../services/UserService';
import { User } from './../interfaces/User';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {  
  userToRegister: User = { Username: '', email: '', PasswordPlain: '' };
  usernameError: boolean = false;
  passwordError: boolean = false;
  emailError: boolean = false;
  buttonDisabled: boolean = true;
  usernameTaken: string = '';
  emailTaken: string = '';
  loading: boolean = false;
  subscription: Subscription[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  checkUsername() {
    if (this.userToRegister.Username.length < 4) {
      this.usernameError = true;
    } else {
      this.usernameError = false;
    }
  }

  checkPassword() {
    if (this.userToRegister.PasswordPlain.length < 4) {
      this.passwordError = true;
    } else {
      this.passwordError = false;
    }
  }

  checkEmail() {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.emailError = reg.test(String(this.userToRegister.email).toLowerCase()) ? false : true;
  }

  checkButton() {
    if (this.userToRegister.Username.length >= 4 && this.userToRegister.PasswordPlain.length >= 4 && this.emailError === false) {
      this.buttonDisabled = false;
    } else {
      this.buttonDisabled = true;
    }
  }

  submitForm() {
    if (!this.buttonDisabled) {
      this.loading = true;
     this.subscription.push(this.userService.registerUser(this.userToRegister).subscribe(() => {
        this.loading = false;
        this.router.navigate(["login"], {queryParams: {fromRegistration: true}});
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

}
