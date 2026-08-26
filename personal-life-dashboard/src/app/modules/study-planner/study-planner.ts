import { Component } from '@angular/core';
import { UserService } from '../../services/user';

interface StudyRecord {
  subject: string;
  date: string;
  hours: number;
  note: string;
}

@Component({
  selector: 'app-study-planner',
  imports: [],
  templateUrl: './study-planner.html',
  styleUrl: './study-planner.css'
})
export class StudyPlanner {

  records: StudyRecord[] = [];

  constructor(private userService: UserService) {
    this.loadRecords();
  }

  addStudy(
    subject: string,
    date: string,
    hours: string,
    note: string
  ) {

    if (!subject || !date || !hours) {
      alert('Molimo popunite obavezna polja.');
      return;
    }

    const record: StudyRecord = {
      subject: subject,
      date: date,
      hours: Number(hours),
      note: note
    };

    this.records.push(record);

    this.saveRecords();

    document.querySelector('form')?.reset();
  }

  deleteStudy(index: number) {

    this.records.splice(index, 1);

    this.saveRecords();
  }

  getTotalHours(): number {

    return this.records.reduce(
      (total, record) => total + record.hours,
      0
    );
  }

  getStorageKey(): string {

    return 'studyRecords_' +
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