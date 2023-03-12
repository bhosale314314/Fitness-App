import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './Auth-data.model';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from './ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app-reducer';
import * as UI from '../../shared/ui.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  authChange = new Subject<boolean>();
  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private snackBar: MatSnackBar,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {}

  initAuthListner() {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }
  registerUser(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.startLoading());
    this.fireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.store.dispatch(new UI.stopLoading());
        // this.uiService.loadingStateChanged.next(false);
      })
      .catch((error) => {
        this.store.dispatch(new UI.stopLoading());
        // this.uiService.loadingStateChanged.next(false);
        this.snackBar.open(error.message, null, { duration: 3000 });
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.startLoading());
    // this.uiService.loadingStateChanged.next(true);
    this.fireAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.store.dispatch(new UI.stopLoading());
        // this.uiService.loadingStateChanged.next(false);
      })
      .catch((error) => {
        this.store.dispatch(new UI.stopLoading());
        // this.uiService.loadingStateChanged.next(false);
        this.snackBar.open(error.message, null, { duration: 3000 });
      });
  }

  logOut() {
    this.fireAuth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
