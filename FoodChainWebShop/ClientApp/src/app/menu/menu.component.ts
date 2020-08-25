import { TranslateService } from '@ngx-translate/core';
import { BasketService } from './../services/BasketService';
import { Product } from './../interfaces/Product';
import { Category } from './../interfaces/Category';
import { CategoryService } from './../services/CategoryService';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ComponentCommunicationService } from "../services/ComponentCommunicationService";
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
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
  subscription: Subscription[] = [];


  constructor(
    private dataFromAnotherComponent: ComponentCommunicationService,
    private router: Router,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private basketService: BasketService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.subscription.push(this.activatedRoute.data.subscribe((data: { categories: Category[] }) => {
      this.categories = data.categories;
      this.setDropdownCategories();
      this.translate.onLangChange.subscribe(() => this.setDropdownCategories());
    }, err => {
      console.log(err);
    }));
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  setDropdownCategories() {
    if (this.translate.currentLang === 'hr') {
      this.categoriesDropdown = this.categories.map(category => {
        return { label: category.name_Hr, value: category.categoryId }
      });
    } else {
      this.categoriesDropdown = this.categories.map(category => {
        return { label: category.name_En, value: category.categoryId }
      });
    }

    this.filterProductsBasedOnCategory();
  }


  getMenuItems() {
    this.subscription.push(this.categoryService.category_SelectAllWithProducts().subscribe((data: Category[]) => {
      this.categories = data;
      this.setDropdownCategories();
    }, err => {
      console.log(err);
    }));
  }

  filterProductsBasedOnCategory() {
    this.selectedCategory = this.categories.filter(item => item.categoryId == this.selectedCategoryId)[0];
  }

  increaseProductInABasketNumber() {
    this.dataFromAnotherComponent.changeNumberOfProductsByOne(true);
  }

  addProductToBasket(product: Product) {
    this.basketService.addProductToBasket(product);
  }

  navigateToProduct(productId: number, productName: string) {
    productName = productName.split(' ').join('-');
    this.router.navigate(["product/" + productId + "/" + productName]);
  }
}
