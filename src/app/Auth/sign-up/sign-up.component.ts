import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../Auth-Shared/auth.service';
import { UIService } from '../Auth-Shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app-reducer';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {}
  private loadingSubscription: Subscription;
  isLoading$: Observable<boolean>;
  maxDate;
  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
    //   (loading) => {
    //     this.isLoading = loading;
    //   }
    // );
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }
  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password,
    });
    form.reset();
    alert('Successfully Registered!!😜');
  }
  // ngOnDestroy(): void {
  //   if (this.loadingSubscription) {
  //     this.loadingSubscription.unsubscribe();
  //   }
  // }
}
