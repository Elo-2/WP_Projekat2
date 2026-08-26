import { Component } from '@angular/core';
import { UserService } from '../../services/user';

interface FitnessRecord {
  activity: string;
  date: string;
  duration: number;
  intensity: string;
  note: string;
}

@Component({
  selector: 'app-fitness-planner',
  imports: [],
  templateUrl: './fitness-planner.html',
  styleUrl: './fitness-planner.css'
})
export class FitnessPlanner {

  records: FitnessRecord[] = [];

  constructor(private userService: UserService) {
    this.loadRecords();
  }

  addActivity(
    activity: string,
    date: string,
    duration: string,
    intensity: string,
    note: string
  ) {

    if (!activity || !date || !duration || !intensity) {
      alert('Molimo popunite obavezna polja.');
      return;
    }

    const record: FitnessRecord = {
      activity: activity,
      date: date,
      duration: Number(duration),
      intensity: intensity,
      note: note
    };

    this.records.push(record);

    this.saveRecords();

    document.querySelector('form')?.reset();
  }

  deleteActivity(index: number) {

    this.records.splice(index, 1);

    this.saveRecords();
  }

  getTotalMinutes(): number {

    return this.records.reduce(
      (total, record) => total + record.duration,
      0
    );
  }

  getStorageKey(): string {

    return 'fitnessRecords_' +
      this.userService.getUserKey();

  }

  saveRecords() {

    localStorage.setItem(
      this.getStorageKey(),
      JSON.stringify(this.records)
    );
  }

  loadRecords() {

    const savedRecords =
      localStorage.getItem(
        this.getStorageKey()
      );

    if (savedRecords) {
      this.records =
        JSON.parse(savedRecords);
    }
  }

}