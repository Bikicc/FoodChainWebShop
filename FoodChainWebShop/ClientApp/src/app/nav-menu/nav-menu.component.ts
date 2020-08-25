import { UserService } from './../services/UserService';
import { BasketService } from './../services/BasketService';
import { Router, NavigationEnd } from '@angular/router';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { filter, skip } from 'rxjs/operators'
import { Subscription } from 'rxjs';
import { ComponentCommunicationService } from "../services/ComponentCommunicationService";
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {

  constructor(
    private translate: TranslateService,
    private router: Router,
    private dataFromAnotherComponent: ComponentCommunicationService,
    private basketService: BasketService,
    private userService: UserService) { }

  isExpanded = false;
  selectedRoute: string = null;
  selectedLang: string = null;
  subscription: Subscription[] = [];
  langs: any[] = [];
  numberOfProducts: number = 0;
  message: string;
  userLoginStatus: boolean = false;

  ngOnInit(): void {
    this.selectedLang = this.translate.currentLang;
    this.setDropDownLangs();
    this.numberOfProducts = this.basketService.getNumberOfProductsInBasket();
    this.subscription.push(
      this.router.events
        .pipe(filter(Event => Event instanceof NavigationEnd))
        .subscribe((event: any) => {
          this.selectedRoute = event.url;
          window.scrollTo(0, 0);
          if (document.getElementById("overlayNav").style.width === "100%") {
            this.closeOverlayNav();
          }
        }));

    this.subscription.push(
      this.dataFromAnotherComponent.numberOfProductsByOne
        .pipe(skip(1))
        .subscribe((increase: boolean) => increase ? this.increaseBasketNumber() : this.decreaseBasketNumber()));

    this.subscription.push(
      this.dataFromAnotherComponent.numberOfProductsByMany
        .pipe(skip(1))
        .subscribe((numberOfProducts: number) => this.decreaseBasketNumberByMany(numberOfProducts)));

    this.subscription.push(
      this.dataFromAnotherComponent.numberOfProductsToZero
        .pipe(skip(1))
        .subscribe(() => this.setBasketNumberToZero()));

    this.subscription.push(
      this.dataFromAnotherComponent.userLoginStatusSource
        .pipe(skip(1))
        .subscribe((status: boolean) => this.setUserLoginStatus(status)))

  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  changeLang() {
    this.translate.use(this.selectedLang);
  }

  setDropDownLangs() {
    this.langs = [
      { label: "English", value: "en" },
      { label: "Croatian", value: "hr" }
    ]
  }

  openOverlayNav() {
    document.getElementById("overlayNav").style.width = "100%";
  }

  closeOverlayNav() {
    document.getElementById("overlayNav").style.width = "0%";
  }

  increaseBasketNumber() {
    this.numberOfProducts++;
  }

  decreaseBasketNumber() {
    this.numberOfProducts--;
  }

  navigateToBasket() {
    this.router.navigateByUrl("basket");
  }

  decreaseBasketNumberByMany(numberToRemove: number) {
    this.numberOfProducts = this.numberOfProducts - numberToRemove;
  }

  setBasketNumberToZero() {
    this.numberOfProducts = 0;
  }

  setUserLoginStatus(logedIn: boolean) {
    this.userLoginStatus = logedIn;
  }

  logOutUser() {
    this.userService.logOutUser();
  }
}
