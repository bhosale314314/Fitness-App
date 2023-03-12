import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Auth/Auth-Shared/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService) {}
  @Output() onCloseToggle = new EventEmitter<void>();
  isAuth = false;
  AuthSubscription: Subscription;
  ngOnInit() {
    this.AuthSubscription = this.authService.authChange.subscribe(
      (authStatus) => {
        this.isAuth = authStatus;
      }
    );
  }

  onClose() {
    this.onCloseToggle.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logOut();
  }

  ngOnDestroy(): void {
    if (this.AuthSubscription) {
      this.AuthSubscription.unsubscribe();
    }
  }
}
