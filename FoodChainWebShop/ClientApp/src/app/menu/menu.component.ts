import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  categories: any[] = [];
  selectedcategory: string = '';

  constructor() { }

  ngOnInit() {
    this.setDropdownCategories();
    
  }

  setDropdownCategories() {
    this.categories = [
      { label: "Burger", value: 'burger' },
      { label: "Pizza", value: 'pizza' },
      { label: "Tortilla", value: 'tortilla' },
      { label: "Dessert", value: 'dessert' },
      { label: "Drink", value: 'drink' }];
  }

}
