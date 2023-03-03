import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    // MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    MatButtonModule,

    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    // MatDatepickerModule,
  ],
})
export class MaterialModule {}
