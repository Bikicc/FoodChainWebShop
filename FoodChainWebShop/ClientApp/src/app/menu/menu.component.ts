import { Product } from './../interfaces/Product';
import { Category } from './../interfaces/Category';
import { CategoryService } from './../services/CategoryService';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ComponentCommunicationService } from "../services/ComponentCommunicationService";
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Output() myEvent = new EventEmitter();

  categories: Category[] = [];
  selectedCategoryId: number = 1;
  menuItems: Product[] = [];
  message: string;
  categoriesDropdown: any[] = [];
  selectedCategory: Category = null;

  constructor(
    private dataFromAnotherComponent: ComponentCommunicationService,
    private router: Router,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: { categories: Category[] }) => {
      this.categories = data.categories;
      this.setDropdownCategories();
    }, err => {
      console.log(err);
    })
  }

  setDropdownCategories() {
    this.categoriesDropdown = this.categories.map(category => {
      return { label: category.name_Hr, value: category.categoryId }
    });

    this.filterProductsBasedOnCategory();
  }


  getMenuItems() {
    this.categoryService.category_SelectAllWithProducts().subscribe((data: Category[]) => {
      this.categories = data;
      this.setDropdownCategories();
    }, err => {
      console.log(err);
    })
  }

  filterProductsBasedOnCategory() {
    this.selectedCategory = this.categories.filter(item => item.categoryId == this.selectedCategoryId)[0];
  }

  addToBasket(itemName: string) {
    console.log(itemName);
  }

  increaseProductInABasketNumber() {
    this.dataFromAnotherComponent.changeNumberOfProducts();
  }

  addProductToBasket(product: any) {
    this.dataFromAnotherComponent.addProductToBaket(product);

    // let products: any[] = [
    //   { name: "Big Tasty", price: "35kn", img: "assets/images/login.png", category: 2, quantity: 1 }]

    // let currProducts = JSON.parse(localStorage.getItem('basketProducts')) || [];

    // let existentProduct = currProducts.find(item => {
    //   return item.name === product.name
    // })

    // if (existentProduct) {
    //   localStorage.removeItem('basketProducts');

    //   currProducts.forEach(item => {
    //     item.name === existentProduct.name ? item.quantity++ : null
    //   })

    //   console.log(currProducts)
    //   localStorage.setItem('basketProducts', JSON.stringify(currProducts));
    // } else {
    //   products.push({ name: "Hamburger", price: "35kn", img: "assets/images/login.png", category: 2, quantity: 1 });
    //   localStorage.setItem('basketProducts', JSON.stringify(products));
    // }

    // localStorage.setItem('basketProducts', JSON.stringify(products));

    // console.log(currProducts);

  }

  navigateToProduct(productId: number, productName: string) {
    productName = productName.split(' ').join('-');
    this.router.navigate(["product/" + productId + "/" + productName]);
  }
}
