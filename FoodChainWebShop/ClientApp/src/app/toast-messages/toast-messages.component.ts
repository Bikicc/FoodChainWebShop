import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast-messages',
  templateUrl: './toast-messages.component.html',
  styleUrls: ['./toast-messages.component.scss']
})
export class ToastMessagesComponent implements OnInit {
  constructor(
    public messageService: MessageService) { }

  ngOnInit() {
  }

  saveChangesSuccess(message: string) {
    this.messageService.clear();

    this.messageService.add({
      key: 'saveChangesSuccess',
      severity: 'success',
      closable: false,
      summary: message
    });
  }

  saveChangesFailed(message: string) {
    this.messageService.clear();

    this.messageService.add({
      key: 'saveChangesFailed',
      severity: 'Error',
      closable: false,
      summary: message
    });
  }


  warningToast(message: string) {
    this.messageService.clear();

    this.messageService.add({
      key: 'warningToast',
      severity: "warn",
      summary: message,
      closable: false,
    });
  }
}
