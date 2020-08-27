import { TranslateService } from '@ngx-translate/core';
import { User } from './../interfaces/User';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './../services/UserService';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastMessagesComponent } from '../toast-messages/toast-messages.component';
import { Subscription } from 'rxjs/internal/Subscription';
import { ComponentCommunicationService } from '../services/ComponentCommunicationService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild(ToastMessagesComponent, { static: false })
  toastMessages: ToastMessagesComponent;

  userCredentials: User = {
    email: '',
    Username: '',
    PasswordPlain: ''
  }
  wrongCredentials: boolean = false;
  subscription: Subscription[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private translate : TranslateService,
    private dataFromAnotherComponent: ComponentCommunicationService ) { }

  ngOnInit() { 
    if (JSON.parse(localStorage.getItem("user") || null)) {
      this.router.navigate(["homepage"]);
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  ngAfterViewInit(): void {
    this.subscription.push(this.route.queryParams
      .subscribe(params => {   
        if (params['fromRegistration']) {
          this.translate.currentLang === 'hr' ? this.toastMessages.saveChangesSuccess("Vaš račun je uspješno kreiran!") : this.toastMessages.saveChangesSuccess("Your account has been created!");
        } 
      }));
  }

  loginUser() {
    this.subscription.push(this.userService.loginUser(this.userCredentials).subscribe((data) => {
      this.wrongCredentials = false;
      localStorage.setItem('user', JSON.stringify(data));
      this.router.navigate(["homepage"]);
      this.dataFromAnotherComponent.userLoginStatus(true);
    }, err => this.wrongCredentials = true));
  }

  resetWrongCredentials() {
    this.wrongCredentials = false;
  }

}
