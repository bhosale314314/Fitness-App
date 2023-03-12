import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Auth/Auth-Shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService) {}
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth = false;
  AuthSubscription: Subscription;
  ngOnInit() {
    this.AuthSubscription = this.authService.authChange.subscribe(
      (authStatus) => {
        this.isAuth = authStatus;
      }
    );
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
  onLogout() {
    this.authService.logOut();
  }

  ngOnDestroy(): void {
    if (this.AuthSubscription) {
      this.AuthSubscription.unsubscribe();
    }
  }
}
