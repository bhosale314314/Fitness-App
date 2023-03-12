import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Exercise } from '../Shared-Data-Service/exercise.model';
import { TrainingService } from '../Shared-Data-Service/training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css'],
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ExChangedSubscription: Subscription;
  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.ExChangedSubscription =
      this.trainingService.finishedExercisesChanged.subscribe(
        (exercise: Exercise[]) => {
          this.dataSource.data = exercise;
        }
      );
    this.trainingService.fetchCompletedOrCancelledExercises();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnDestroy(): void {
    if (this.ExChangedSubscription) {
      this.ExChangedSubscription.unsubscribe();
    }
  }
}
