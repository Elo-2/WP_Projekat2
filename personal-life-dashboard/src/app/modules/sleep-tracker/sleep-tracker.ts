import { Component } from '@angular/core';
import { UserService } from '../../services/user';

interface SleepRecord {
  date: string;
  bedtime: string;
  wakeTime: string;
  hours: number;
  quality: number;
}

@Component({
  selector: 'app-sleep-tracker',
  imports: [],
  templateUrl: './sleep-tracker.html',
  styleUrl: './sleep-tracker.css'
})
export class SleepTracker {

  records: SleepRecord[] = [];

  constructor(private userService: UserService) {
    this.loadRecords();
  }

  addRecord(
    date: string,
    bedtime: string,
    wakeTime: string,
    quality: string
  ) {

    if (!date || !bedtime || !wakeTime || !quality) {
      alert('Molimo popunite sva polja.');
      return;
    }

    const hours = this.calculateHours(
      bedtime,
      wakeTime
    );

    const record: SleepRecord = {
      date: date,
      bedtime: bedtime,
      wakeTime: wakeTime,
      hours: hours,
      quality: Number(quality)
    };

    this.records.push(record);

    this.saveRecords();

    document.querySelector('form')?.reset();
  }

  calculateHours(
    bedtime: string,
    wakeTime: string
  ): number {

    const start = new Date(
      `2000-01-01T${bedtime}`
    );

    let end = new Date(
      `2000-01-01T${wakeTime}`
    );

    if (end <= start) {
      end.setDate(end.getDate() + 1);
    }

    const difference =
      end.getTime() - start.getTime();

    const hours =
      difference / (1000 * 60 * 60);

    return Math.round(hours * 10) / 10;
  }

  deleteRecord(index: number) {

    this.records.splice(index, 1);

    this.saveRecords();
  }

  getStorageKey(): string {

    return 'sleepRecords_' +
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