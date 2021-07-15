import { TranslateService } from '@ngx-translate/core';
import { BasketService } from './../services/BasketService';
import { Product } from './../interfaces/Product';
import { Category } from './../interfaces/Category';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ComponentCommunicationService } from "../services/ComponentCommunicationService";
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ToastMessagesComponent } from '../toast-messages/toast-messages.component';
import { GeneralService } from '../services/GeneralService';
import { RestaurantReview } from '../interfaces/RestaurantReview';
import { User } from '../interfaces/User';
import { RestaurantReviewService } from '../services/RestaurantReviewService';
import { GlobalVar } from '../globalVar';
import { Restaurant } from '../interfaces/Restaurant';
import { Observable } from 'rxjs';

interface StarPrecentage {
  one: string,
  two: string,
  three: string,
  four: string,
  five: string
};

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
  totalRating: number = 0;
  reviews: RestaurantReview[] = [];
  numberOfReviews: number = 0;
  starPrecentage: StarPrecentage = {} as StarPrecentage;
  userData: User = {} as User;
  myReview: { Reviewed: boolean, rating: number, comment: string } = {
    Reviewed: false,
    rating: null,
    comment: null
  }
  loading: boolean = false;
  restaurantInfo: Restaurant = null;
  constructor(
    private dataFromAnotherComponent: ComponentCommunicationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private basketService: BasketService,
    private translate: TranslateService,
    private generalService: GeneralService,
    private route: ActivatedRoute,
    private restaurantReviewService: RestaurantReviewService,
    public globalVar: GlobalVar
  ) { }

  ngOnInit() {
    this.subscription.push(this.activatedRoute.data.subscribe((data: { categories: Category[], reviews: RestaurantReview[], restaurantInfo: any }) => {
      this.categories = data.categories;
      this.reviews = data.reviews;
      this.restaurantInfo = data.restaurantInfo.result;

      this.setUserData();

      this.setMyReview(this.userData);

      this.totalRating = this.calcTotalRating(this.reviews);
      this.numberOfReviews = this.getNumberOfReviews(this.reviews);
      this.setReviewStats(this.reviews);

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

  setReviewStats(reviews: RestaurantReview[]): void {
    const ratingPrecentage = this.calcRatingPrecentage(reviews);
    this.starPrecentage.one = (ratingPrecentage.one + "%");
    this.starPrecentage.two = (ratingPrecentage.two + "%");
    this.starPrecentage.three = (ratingPrecentage.three + "%");
    this.starPrecentage.four = (ratingPrecentage.four + "%");
    this.starPrecentage.five = (ratingPrecentage.five + "%");
  }

  onClickReview() {
    if (this.myReview.Reviewed) {
      this.updateReview();
    } else {
      this.insertReview();
    }
  }

  calcTotalRating(rw: RestaurantReview[]): number {
    const numberOfReviews: number = rw.length;
    const accumulativeScore: number = rw.reduce((acc, curr) => { return acc + curr.rating }, 0);

    return Math.round(accumulativeScore / numberOfReviews * 100) / 100;
  }

  getNumberOfReviews(rw: RestaurantReview[]) {
    return rw.length;
  }

  calcRatingPrecentage(rw: RestaurantReview[]): StarPrecentage {
    const totalNumberOfReviews = rw.length;
    const numberOfOneStar = rw.filter(rw => rw.rating === 1).length;
    const numberOfTwoStar = rw.filter(rw => rw.rating === 2).length;
    const numberOfThreeStar = rw.filter(rw => rw.rating === 3).length;
    const numberOfFourStar = rw.filter(rw => rw.rating === 4).length;
    const numberOfFiveStar = rw.filter(rw => rw.rating === 5).length;

    return {
      one: ((numberOfOneStar / totalNumberOfReviews) * 100).toFixed(2),
      two: ((numberOfTwoStar / totalNumberOfReviews) * 100).toFixed(2),
      three: ((numberOfThreeStar / totalNumberOfReviews) * 100).toFixed(2),
      four: ((numberOfFourStar / totalNumberOfReviews) * 100).toFixed(2),
      five: ((numberOfFiveStar / totalNumberOfReviews) * 100).toFixed(2)
    }

  }

  setMyReview(user: User): void {
    //Provjeravamo da li uopce postoji logirani korisnik
    if (user) {
      //Trazimo da li je ostavia review
      const userReview = this.reviews.find(r => r.userId === user.userId);
      if (userReview) {
        this.myReview = {
          Reviewed: true,
          rating: userReview.rating,
          comment: userReview.comment
        }
      }
    }
  }

  setUserData(): void {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    if (user) {
      this.userData = user;
    } else {
      this.userData = null;
    }
  }

  getReviews(): void {
    this.restaurantReviewService.getRestaurantReviews(Number(this.route.snapshot.params.restaurantId)).subscribe((data: RestaurantReview[]) => {
      this.reviews = data;
      this.setMyReview(this.userData);

      this.totalRating = this.calcTotalRating(this.reviews);
      this.numberOfReviews = this.getNumberOfReviews(this.reviews);
      this.setReviewStats(this.reviews);
    }, err => {
      this.loading = false;
      this.translate.currentLang === 'hr' ? this.toastMessages.saveChangesFailed('Došlo je do pogreške! Pokušajte ponovno.') : this.toastMessages.saveChangesFailed('Error has occured! Please try again.');
      console.log(err);
    })
  }

  insertReview() {
    const reviewData: RestaurantReview = {
      RestaurantId: Number(this.route.snapshot.params.restaurantId),
      comment: this.myReview.comment,
      rating: this.myReview.rating,
      userId: this.userData.userId
    };
    
    this.loading = true;
    
    this.restaurantReviewService.insertRestaurantReview(reviewData).subscribe(() => {
      this.loading = false;
      this.translate.currentLang === 'hr' ? this.toastMessages.saveChangesSuccess('Hvala na ostavljenoj recenziji!') : this.toastMessages.saveChangesSuccess('Thank you for your review!');
      this.getReviews();
    }, err => {
      this.loading = false;
      this.translate.currentLang === 'hr' ? this.toastMessages.saveChangesFailed('Došlo je do pogreške! Pokušajte ponovno.') : this.toastMessages.saveChangesFailed('Error has occured! Please try again.');
      console.log(err);
    })
  }

  updateReview() {
    const reviewData: RestaurantReview = {
      RestaurantId: Number(this.route.snapshot.params.restaurantId),
      comment: this.myReview.comment,
      rating: this.myReview.rating,
      userId: this.userData.userId
    };
    
    this.loading = true;
    
    this.restaurantReviewService.updateRestaurantReview(reviewData).subscribe(() => {
      this.loading = false;
      this.translate.currentLang === 'hr' ? this.toastMessages.saveChangesSuccess('Hvala na ostavljenoj recenziji!') : this.toastMessages.saveChangesSuccess('Thank you for your review!');
      this.getReviews();
    }, err => {
      this.loading = false;
      this.translate.currentLang === 'hr' ? this.toastMessages.saveChangesFailed('Došlo je do pogreške! Pokušajte ponovno.') : this.toastMessages.saveChangesFailed('Error has occured! Please try again.');
      console.log(err);
    })
  }
}
