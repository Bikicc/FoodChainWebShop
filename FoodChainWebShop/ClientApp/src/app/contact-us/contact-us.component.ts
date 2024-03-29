import { User } from './../interfaces/User';
import { TranslateService } from '@ngx-translate/core';
import { EmailService } from './../services/EmailService';
import { Email } from './../interfaces/Email';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastMessagesComponent } from '../toast-messages/toast-messages.component';
import { Subscription } from 'rxjs/internal/Subscription';
import { GeneralService } from '../services/GeneralService';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  @ViewChild(ToastMessagesComponent, { static: false })
  toastMessages: ToastMessagesComponent;
  
  ourEmailAdress: string = '';
  emailData: Email = {
    from: '',
    subject: '',
    content: ''
  } as Email;
  buttonDisabled: boolean = true;
  subjectError: boolean = false;
  contentError: boolean = false;
  emailError: boolean = false;
  loading: boolean = false;
  subscription: Subscription[] = [];
  user: User = {} as User;


  constructor(
    private emailService: EmailService,
    private translate: TranslateService,
    private generalService: GeneralService) { }

  ngOnInit() {
    this.ourEmailAdress = 'fastfoodchain123@gmail.com';
    this.user = this.generalService.getUserDataLocale();
    if (this.user) {
      this.emailData.from = this.user.email;
    }

  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  sendEmail() {
    if (!this.buttonDisabled) {
      this.loading = true;
     this.subscription.push(this.emailService.sendEmail(this.emailData).subscribe(() => {
      if (this.user) {
        this.emailData = {
          from: this.user.email,
          subject: '',
          content: ''
        } as Email;
      } else {
        this.emailData = {
          from: '',
          subject: '',
          content: ''
        } as Email;
      }
        this.loading = false;
        this.translate.currentLang === 'hr' ? this.toastMessages.saveChangesSuccess('Vaš E-mail je poslan!') : this.toastMessages.saveChangesSuccess('Your E-mail has been sent!');
      }, (err: string) => {
        this.loading = false;
        this.toastMessages.saveChangesFailed(this.translate.instant("DOSLO_DO_POGRESKE"));
        console.log(err);
      }));
    }
  }

  checkSubject() {
    this.subjectError = this.emailData.subject.length < 1 ? true : false;
  }

  checkContent() {
    this.contentError = this.emailData.content.length < 1 ? true : false;
  }

  checkEmail() {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.emailError = reg.test(String(this.emailData.from).toLowerCase()) ? false : true;
  }

  checkButton() {
    if (this.emailData.subject.length > 0 && this.emailData.content.length > 0 && this.emailError === false) {
      this.buttonDisabled = false;
    } else {
      this.buttonDisabled = true;
    }
  }

}
