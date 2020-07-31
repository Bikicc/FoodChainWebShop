import { Router, NavigationEnd } from '@angular/router';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  constructor(
    public translate: TranslateService,
    private router: Router) { }

  isExpanded = false;
  selectedRoute: string = null;
  selectedLang: string = null;
  subscription: Subscription[] = [];

  ngOnInit(): void {
    this.selectedLang = this.translate.currentLang;
    this.subscription.push(
      this.router.events
        .pipe(filter(Event => Event instanceof NavigationEnd))
        .subscribe((event: any) => {
          this.selectedRoute = event.url;
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

}
