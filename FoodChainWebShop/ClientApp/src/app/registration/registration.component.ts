import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  name: string;
  showHoveredButtonText: boolean = false;
  constructor() { }

  ngOnInit() {
    this.name = "Filip Bikić";
  }

  // showInitialText() {
  //   if (this.showHoveredButtonText) {
  //     return;
  //   } else {
  //     this.showHoveredButtonText = !this.showHoveredButtonText;
  //   }
  // }

  // showHoveredText() {
  //   if (!this.showHoveredButtonText) {
  //     return;
  //   } else {
  //     this.showHoveredButtonText = !this.showHoveredButtonText;
  //   }
  // }

}
