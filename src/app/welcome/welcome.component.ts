import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  bgVariable: boolean = false;
  headerVariable: boolean = false;
  @HostListener('document:scroll')
  onScroll() {
    if (
      document.body.scrollTop > 60 ||
      document.documentElement.scrollTop > 60
    ) {
      this.bgVariable = true;
      this.headerVariable = true;
    } else {
      this.bgVariable = false;
      this.headerVariable = false;
    }
  }
}
