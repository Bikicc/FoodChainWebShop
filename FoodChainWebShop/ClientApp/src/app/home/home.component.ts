import { GlobalVar } from './../globalVar';
import { Component } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  Images: string[];

  constructor(
    globalVar: GlobalVar) {
    this.Images = globalVar.homeSlideimages
  }

  ngOnInit(): void {
  }

}
