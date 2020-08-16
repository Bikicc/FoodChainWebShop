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

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { I18nModule } from './i18n/i18n.module';
import { FoodMenuService } from './services/foodMenuService';
import { GlobalVar } from './globalVar';
import { ErrorHandlerService } from './services/errorHandlerService';
import { RegistrationComponent } from './registration/registration.component';
import { ImgSliderComponent } from './img-slider/img-slider.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    RegistrationComponent,
    ImgSliderComponent,
    FooterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ButtonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent }
    ]),
    I18nModule,
    ProgressSpinnerModule,
    DropdownModule
  ],
  providers: [
    GlobalVar,
    FoodMenuService,
    Config,
    ErrorHandlerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
