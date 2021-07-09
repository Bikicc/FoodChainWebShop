import { ErrorInterceptor } from './interceptors/ErrorInterceptor';
import { MessageService } from 'primeng/api';
import { OrderService } from './services/OrderService';
import { FavouritesResolverService } from './services/FavouritesResolverService';
import { FavouritesService } from './services/FavouritesService';
import { ApiKey } from '../apiKey';
import { Config } from './config';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GMapModule } from 'primeng/gmap';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { I18nModule } from './i18n/i18n.module';
import { ProductService } from './services/ProductService';
import { GlobalVar } from './globalVar';
import { ErrorHandlerService } from './services/errorHandlerService';
import { RegistrationComponent } from './registration/registration.component';
import { ImgSliderComponent } from './img-slider/img-slider.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MenuComponent } from './menu/menu.component';
import { ComponentCommunicationService } from './services/ComponentCommunicationService';
import { FavouritesComponent } from './favourites/favourites.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BasketComponent } from './basket/basket.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { OrderHistoryComponent } from './order-history/order-history.component';
import { CategoryService } from './services/CategoryService';
import { MenuResolverService } from './services/MenuResolverService';
import { ProductInfoResolverService } from './services/ProductInfoResolverService';
import { UserService } from './services/UserService';
import { OrderResolverService } from './services/OrderResolverService';
import { BasketService } from './services/BasketService';
import { EmailService } from './services/EmailService';
import { ToastMessagesComponent } from './toast-messages/toast-messages.component';
import { JwtInterceptor } from './interceptors/JwtInterceptor';
import { NewComponentComponent } from './new-component/new-component.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantsService } from './services/RestaurantsService';
import { RestaurantsResloverService } from './services/RestaurantsResloverService';
import { RestaurantTypeService } from './services/RestaurantTypeService';
import { RestaurantTypeResolverService } from './services/RestaurantTypeResolverService';
import { GeneralService } from './services/GeneralService';
import { NoDataComponent } from './no-data/no-data.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    RegistrationComponent,
    ImgSliderComponent,
    FooterComponent,
    LoginComponent,
    AboutUsComponent,
    ContactUsComponent,
    MenuComponent,
    FavouritesComponent,
    ProductInfoComponent,
    PageNotFoundComponent,
    BasketComponent,
    OrderHistoryComponent,
    ToastMessagesComponent,
    NewComponentComponent,
    RestaurantsComponent,
    NoDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ButtonModule,
    BrowserAnimationsModule,
    GMapModule,
    GooglePlaceModule,
    ToastModule,
    InputTextareaModule,
    RouterModule.forRoot([
      { path: 'homepage', component: HomeComponent },
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent },
      { path: 'aboutUs', component: AboutUsComponent },
      { path: 'contactUs', component: ContactUsComponent },
      { path: 'menu/:restaurantId', component: MenuComponent, resolve: { categories: MenuResolverService } },
      { path: 'favourites', component: FavouritesComponent, resolve: { favourites: FavouritesResolverService } },
      { path: 'product/:productId/:productName', component: ProductInfoComponent, resolve: { product: ProductInfoResolverService, favourites: FavouritesResolverService } },
      { path: 'basket', component: BasketComponent },
      { path: 'orderHistory', component: OrderHistoryComponent, resolve: { orders: OrderResolverService } },
      { path: 'kayo', component: NewComponentComponent },
      { path: 'restaurants', component: RestaurantsComponent, resolve: { restaurants: RestaurantsResloverService, restaurantTypes: RestaurantTypeResolverService } },

      { path: '**', component: PageNotFoundComponent }
    ]),
    I18nModule,
    ProgressSpinnerModule,
    DropdownModule,
    CardModule,
    RatingModule,
    FileUploadModule
  ],
  providers: [
    GlobalVar,
    ProductService,
    Config,
    ErrorHandlerService,
    ComponentCommunicationService,
    ApiKey,
    CategoryService,
    UserService,
    FavouritesService,
    OrderService,
    BasketService,
    EmailService,
    MessageService,
    RestaurantsService,
    RestaurantTypeService,
    GeneralService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
