import { EmailService } from './../services/EmailService';
import { Email } from './../interfaces/Email';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/ProductService';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
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


  constructor(private emailService: EmailService) { }

  ngOnInit() {
    this.ourEmailAdress = 'fastfoodchain123@gmail.com'
  }

  sendEmail() {
    if (!this.buttonDisabled) {
      this.emailService.sendEmail(this.emailData).subscribe((data: string[]) => {
        this.emailData = {
          from: '',
          subject: '',
          content: ''
        } as Email;

      }, (err: string) => {
        console.log(err);
      })
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
