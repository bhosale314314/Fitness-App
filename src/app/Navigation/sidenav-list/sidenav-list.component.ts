import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent {
  @Output() onCloseToggle = new EventEmitter<void>();

  onClose() {
    this.onCloseToggle.emit();
  }
}
