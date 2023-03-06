import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './Auth-data.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User;
  authChange = new Subject<boolean>();
  constructor(private router: Router) {}

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userID: Math.round(Math.random() * 10000).toString(),
    };
    this.AuthRouting();
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userID: Math.round(Math.random() * 10000).toString(),
    };
    this.AuthRouting();
  }

  logOut() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }
  isAuth() {
    this.user != null;
  }
  private AuthRouting() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
