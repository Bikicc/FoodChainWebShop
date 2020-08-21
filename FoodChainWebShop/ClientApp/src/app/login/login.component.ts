import { User } from './../interfaces/User';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../services/UserService';
import { Router } from '@angular/router';

// import Swiper from 'swiper';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userCredentials: User = {
    Email: '',
    Username: '',
    PasswordPlain: ''
  }

  constructor(
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {}

  loginUser() {
    this.userService.loginUser(this.userCredentials).subscribe((data) => {
      this.router.navigate(["homepage"]);
    }, err => console.log(err))
  }

}
