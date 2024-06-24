import { Component } from '@angular/core';
import { Sub } from '../models/sub';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css'],
})
export class SubscriptionFormComponent {
  isEmailError: boolean = false;
  isSubscribed: boolean = false;
  constructor(private subService: SubscribersService) {}
  onSubmit(formdata) {
    this.isEmailError = false;
    const subData: Sub = {
      name: formdata.name,
      email: formdata.email,
    };

    this.subService.checkSubs(subData.email).subscribe((val) => {
      if (val.empty) {
        this.subService.addSubs(subData);
        this.isEmailError = false;
        this.isSubscribed = true;
      } else {
        this.isEmailError = true;
      }
    });
  }
}
