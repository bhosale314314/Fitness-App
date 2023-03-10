import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';
import { Exercise } from './exercise.model';
import { map } from 'rxjs';
import { AuthService } from 'src/app/Auth/Auth-Shared/auth.service';
import { UIService } from 'src/app/Auth/Auth-Shared/ui.service';
import { error } from 'console';
@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    private uiService: UIService
  ) {}
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  private availableExercises: Exercise[] = [];

  fetchAvailableExercises() {
    this.uiService.loadingStateChanged.next(true);
    this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc) => {
            return {
              id: doc.payload.doc.id,
              ...(doc.payload.doc.data() as Exercise),
            };
          });
        })
      )
      .subscribe(
        (exerciseList: Exercise[]) => {
          this.uiService.loadingStateChanged.next(false);
          this.availableExercises = exerciseList;
          this.exercisesChanged.next([...this.availableExercises]);
        },
        (error) => {
          this.uiService.loadingStateChanged.next(false);
          this.uiService.showSnackBar(
            'Fetching Exercise is failed,Please try after some time',
            null,
            3000
          );
          this.exercisesChanged.next(null);
        }
      );
  }

  private runningExercises: Exercise;
  startExercise(selectedId: string) {
    this.runningExercises = this.availableExercises.find(
      (x) => x.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercises });
  }

  getRunningExercises() {
    return { ...this.runningExercises };
  }

  completeExercise() {
    this.addDataToDataBase({
      ...this.runningExercises,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercises = null;
    this.exerciseChanged.next(null);
  }
  cancelExercise(progress: number) {
    this.addDataToDataBase({
      ...this.runningExercises,
      duration: this.runningExercises.duration * (progress / 100),
      calories: this.runningExercises.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runningExercises = null;
    this.exerciseChanged.next(null);
  }

  fetchCompletedOrCancelledExercises() {
    this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercise: Exercise[]) => {
        this.finishedExercisesChanged.next(exercise);
      });
  }

  addDataToDataBase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
