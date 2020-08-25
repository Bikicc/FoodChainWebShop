import { Component } from '@angular/core';
// import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  //ZAKOMENTIRANO JER JE LOADANJE PODATAKA BRZO I LOSE IZGLEDA, INACE DA JE LOADING TIME VECI PRIKAZA BI SE LOADING SCREEN DOK SE PODACI NE LOADAJU
  // loading: boolean = true;

  // constructor(private router: Router) {
  //   router.events.subscribe((routerEvent: RouterEvent) => {
  //     this.checkRouterEvent(routerEvent);
  //   });
  // }

  // checkRouterEvent(routerEvent: RouterEvent): void {
  //   if (routerEvent instanceof NavigationStart) {
  //     this.loading = true;
  //   }

  //   if (routerEvent instanceof NavigationEnd ||
  //     routerEvent instanceof NavigationCancel ||
  //     routerEvent instanceof NavigationError) {
  //     this.loading = false;
  //   }
  // }
}
