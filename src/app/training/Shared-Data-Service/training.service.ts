import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Exercise } from './exercise.model';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  constructor() {}
  exerciseChanged = new Subject<Exercise>();
  private exercises: Exercise[] = [];
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 120 },
    { id: 'touch-toes', name: 'Touch-toes', duration: 60, calories: 150 },
    { id: 'side-lunges', name: 'Side-lunges', duration: 90, calories: 130 },
    { id: 'burpess', name: 'Burpess', duration: 120, calories: 180 },
  ];

  getAvailableExercises() {
    return this.availableExercises.slice();
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
    this.exercises.push({
      ...this.runningExercises,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercises = null;
    this.exerciseChanged.next(null);
  }
  cancelExercise(progress: number) {
    this.exercises.push({
      ...this.runningExercises,
      duration: this.runningExercises.duration * (progress / 100),
      calories: this.runningExercises.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runningExercises = null;
    this.exerciseChanged.next(null);
  }

  getCompletedOrCancelledExercises() {
    return this.exercises.slice();
  }
}
