import { TranslateService } from '@ngx-translate/core';
import { BasketService } from './../services/BasketService';
import { Product } from './../interfaces/Product';
import { Category } from './../interfaces/Category';
import { CategoryService } from './../services/CategoryService';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ComponentCommunicationService } from "../services/ComponentCommunicationService";
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ToastMessagesComponent } from '../toast-messages/toast-messages.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ProductService } from '../services/ProductService';
import { GeneralService } from '../services/GeneralService';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @ViewChild(ToastMessagesComponent, { static: false })
  toastMessages: ToastMessagesComponent;

  @Output() myEvent = new EventEmitter();

  categories: Category[] = [];
  selectedCategoryId: number = 1;
  menuItems: Product[] = [];
  message: string;
  categoriesDropdown: any[] = [];
  selectedCategory: Category = null;
  subscription: Subscription[] = [];
  renderHtml: boolean = false;
  //DUMMY DATA
  totalRating: number = 4;
  reviews: any = [{
    userName: 'Filip Bikić',
    rating: 5,
    comment: 'Dobar je maliiii'
  },
  {
    userName: 'Karlo Rešetar',
    rating: 1,
    comment: null
  },
  {
    userName: 'Filip Bikić',
    rating: 5,
    comment: 'Dobar je maliiii'
  },
  {
    userName: 'Filip Bikić',
    rating: 5,
    comment: 'Dobar je maliiii'
  },
  {
    userName: 'Filip Bikić',
    rating: 5,
    comment: 'Dobar je maliiii'
  },
  {
    userName: 'Filip Bikić',
    rating: 5,
    comment: 'Dobar je maliiii'
  }];

  myRating: any = {
    pkReview: null,
    rating: null,
    comment: null
  }

  reviewsStats: any = {
    one: 5,
    two: 15,
    three: 40,
    four: 20,
    five: 45
  }

  constructor(
    private dataFromAnotherComponent: ComponentCommunicationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private basketService: BasketService,
    private translate: TranslateService,
    private generalService: GeneralService
  ) { }

  ngOnInit() {
    this.subscription.push(this.activatedRoute.data.subscribe((data: { categories: Category[] }) => {
      this.categories = data.categories;
      this.categories = this.categories.map(cat => {
        cat.products.forEach(prod => prod.imageToShow = this.generalService.setBase64ImageToShow(prod.image as string));
        return cat;
      });


      this.setDropdownCategories();
      this.translate.onLangChange.subscribe(() => this.setDropdownCategories());
    }, err => {
      console.log(err);
    }));
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.setReviewStats();

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


  // getMenuItems() {
  //   this.subscription.push(this.categoryService.category_SelectAllWithProducts(Number(this.route.params.restaurantId)).subscribe((data: Category[]) => {
  //     this.categories = data;
  //     this.setDropdownCategories();
  //   }, err => {
  //     console.log(err);
  //   }));
  // }

  filterProductsBasedOnCategory() {
    this.selectedCategory = this.categories.filter(item => item.categoryId == this.selectedCategoryId)[0];
  }

  increaseProductInABasketNumber() {
    this.dataFromAnotherComponent.changeNumberOfProductsByOne(true);
  }

  addProductToBasket(product: Product) {
    const res = this.basketService.addProductToBasket(product);
    if (res && res.error) this.toastMessages.saveChangesFailed(this.translate.instant("ADD_TO_BASKET_ERR"))
  }

  navigateToProduct(productId: number, productName: string) {
    productName = productName.split(' ').join('-');
    this.router.navigate(["product/" + productId + "/" + productName]);
  }

  test() {
    const pr: Product = {} as Product;
    pr.restaurantId = 2;
    this.addProductToBasket(pr);
  }

  setReviewStats(): void {
    const elOneStar = document.getElementById('oneStarPrecentage');
    const elTwoStar = document.getElementById('twoStarPrecentage');
    const elThreeStar = document.getElementById('threeStarPrecentage');
    const elFourStar = document.getElementById('fourStarPrecentage');
    const elFiveStar = document.getElementById('fiveStarPrecentage');

    elOneStar.style.width = '30%';
    elTwoStar.style.width = '30%';
    elThreeStar.style.width = '60.54%';
    elFourStar.style.width = '30%';
    elFiveStar.style.width = '30%';


  }

  postComment() {
    console.log("Funkcija za insert komentara")
  }
}
