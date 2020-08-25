import { TranslateService } from '@ngx-translate/core';
import { EmailService } from './../services/EmailService';
import { Email } from './../interfaces/Email';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastMessagesComponent } from '../toast-messages/toast-messages.component';
import { Subscription } from 'rxjs/internal/Subscription';

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



  constructor(
    private emailService: EmailService,
    private translate: TranslateService) { }

  ngOnInit() {
    this.ourEmailAdress = 'fastfoodchain123@gmail.com'
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  sendEmail() {
    if (!this.buttonDisabled) {
      this.loading = true;
     this.subscription.push(this.emailService.sendEmail(this.emailData).subscribe(() => {
        this.emailData = {
          from: '',
          subject: '',
          content: ''
        } as Email;
        this.loading = false;
        this.translate.currentLang === 'hr' ? this.toastMessages.saveChangesSuccess('Vaš E-mail je poslan!') : this.toastMessages.saveChangesSuccess('Your E-mail has been sent!');
      }, (err: string) => {
        this.loading = false;
        this.translate.currentLang === 'hr' ? this.toastMessages.saveChangesFailed('Došlo je do pogreške! Pokušajte ponovno.') : this.toastMessages.saveChangesSuccess('Error has occured! Please try again.');
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
