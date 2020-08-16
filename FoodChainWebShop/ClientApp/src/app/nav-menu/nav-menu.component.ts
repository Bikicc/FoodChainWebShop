import { Router, NavigationEnd } from '@angular/router';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  constructor(
    public translate: TranslateService,
    private router: Router) { }

  isExpanded = false;
  selectedRoute: string = null;
  selectedLang: string = null;
  subscription: Subscription[] = [];
  langs: any[] = [];
  numberOfProducts: number = 0;

  ngOnInit(): void {
    this.selectedLang = this.translate.currentLang;
    this.setDropDownLangs();
    this.subscription.push(
      this.router.events
        .pipe(filter(Event => Event instanceof NavigationEnd))
        .subscribe((event: any) => {
          this.selectedRoute = event.url;
          window.scrollTo(0,0);
          if(document.getElementById("overlayNav").style.width === "100%") {
            this.closeOverlayNav();
          }
        }));
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

  changeLang(selectedLang: string) {
    this.selectedLang = selectedLang;
    this.translate.use(selectedLang);
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

}
