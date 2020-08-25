import { UserService } from './../services/UserService';
import { User } from './../interfaces/User';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  userToRegister: User = { Username: '', Email: '', PasswordPlain: '' };
  usernameError: boolean = false;
  passwordError: boolean = false;
  emailError: boolean = false;
  buttonDisabled: boolean = true;
  usernameTaken: string = '';
  emailTaken: string = '';
  loading: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {

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
    this.emailError = reg.test(String(this.userToRegister.Email).toLowerCase()) ? false : true;
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
      this.userService.registerUser(this.userToRegister).subscribe(() => {
        this.loading = false;
        this.router.navigate(["login"]);
      }, (err: HttpErrorResponse) => {
        if (err.error.errorId === 1) {
          this.usernameTaken = err.error.errorMessage;
          return;
        }

        if (err.error.errorId === 2) {
          this.emailTaken = err.error.errorMessage;
          return;
        }
      })
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
