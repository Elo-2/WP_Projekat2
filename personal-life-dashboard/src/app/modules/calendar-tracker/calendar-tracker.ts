import { Component } from '@angular/core';
import { UserService } from '../../services/user';

interface CalendarRecord {
  title: string;
  date: string;
  time: string;
  type: string;
  note: string;
}

@Component({
  selector: 'app-calendar-tracker',
  imports: [],
  templateUrl: './calendar-tracker.html',
  styleUrl: './calendar-tracker.css'
})
export class CalendarTracker {

  events: CalendarRecord[] = [];

  constructor(private userService: UserService) {
    this.loadEvents();
  }

  addEvent(
    title: string,
    date: string,
    time: string,
    type: string,
    note: string
  ) {

    if (!title || !date || !type) {
      alert('Molimo popunite obavezna polja.');
      return;
    }

    const event: CalendarRecord = {
      title: title,
      date: date,
      time: time,
      type: type,
      note: note
    };

    this.events.push(event);

    this.saveEvents();

    document.querySelector('form')?.reset();
  }

  deleteEvent(index: number) {

    this.events.splice(index, 1);

    this.saveEvents();
  }

  getStorageKey(): string {

    return 'calendarRecords_' +
      this.userService.getUserKey();

  }

  saveEvents() {

    localStorage.setItem(
      this.getStorageKey(),
      JSON.stringify(this.events)
    );
  }

  loadEvents() {

    const savedEvents =
      localStorage.getItem(
        this.getStorageKey()
      );

    if (savedEvents) {
      this.events =
        JSON.parse(savedEvents);
    }
  }

}