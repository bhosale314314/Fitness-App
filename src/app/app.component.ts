import { Component, OnInit } from '@angular/core';
import { AuthService } from './Auth/Auth-Shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}
  title = 'Fitness-App';
  ngOnInit(): void {
    this.authService.initAuthListner();
  }
}
