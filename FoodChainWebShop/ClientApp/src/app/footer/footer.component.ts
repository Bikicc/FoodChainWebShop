import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../services/GeneralService';
import { Subscription } from 'rxjs';
import { ComponentCommunicationService } from '../services/ComponentCommunicationService';
import { skip } from 'rxjs/operators'
import { GlobalVar } from '../globalVar';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  roleId: number = null;
  subscription: Subscription[] = [];

  constructor(
    private generalService: GeneralService,
    private dataFromAnotherComponent: ComponentCommunicationService,
    public globalVar: GlobalVar
  ) { }

  ngOnInit() {
    this.roleId = this.generalService.getUserRoleId();

    this.subscription.push(
      this.dataFromAnotherComponent.userLoginStatusSource
        .pipe(skip(1))
        .subscribe(() => {
          this.roleId = this.generalService.getUserRoleId();
        }));
  }

  goToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
