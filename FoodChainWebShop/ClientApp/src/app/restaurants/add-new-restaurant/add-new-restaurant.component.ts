import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-new-restaurant',
  templateUrl: './add-new-restaurant.component.html',
  styleUrls: ['./add-new-restaurant.component.scss']
})
export class AddNewRestaurantComponent implements OnInit {
  userToRegister: any = {
    Username: '',
    email: '',
    PasswordPlain: '',
    address: '',
    roleId: null,
    mobileNumber: ''
  };
  constructor() { }

  ngOnInit() {
  }

}
