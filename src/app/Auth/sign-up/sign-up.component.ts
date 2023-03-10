import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../Auth-Shared/auth.service';
import { UIService } from '../Auth-Shared/ui.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService, private uiService: UIService) {}
  private loadingSubscription: Subscription;
  isLoading = false;
  maxDate;
  ngOnInit(): void {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      (loading) => {
        this.isLoading = loading;
      }
    );
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
  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }
}
