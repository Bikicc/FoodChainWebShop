import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-component',
  templateUrl: './new-component.component.html',
  styleUrls: ['./new-component.component.scss']
})
export class NewComponentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
    let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
    console.log(decodedJWT)
  }

  playVideo() {
    const video = document.getElementById("myVideo");
  }

}
