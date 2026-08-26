import { Component } from '@angular/core';
import { UserService } from '../../services/user';

interface GratitudeRecord {
  date: string;
  text: string;
}

@Component({
  selector: 'app-gratitude-journal',
  imports: [],
  templateUrl: './gratitude-journal.html',
  styleUrl: './gratitude-journal.css'
})
export class GratitudeJournal {

  entries: GratitudeRecord[] = [];

  constructor(private userService: UserService) {
    this.loadEntries();
  }

  addEntry(
    date: string,
    text: string
  ) {

    if (!date || !text) {
      alert('Molimo popunite sva polja.');
      return;
    }

    const entry: GratitudeRecord = {
      date: date,
      text: text
    };

    this.entries.push(entry);

    this.saveEntries();

    document.querySelector('form')?.reset();
  }

  deleteEntry(index: number) {

    this.entries.splice(index, 1);

    this.saveEntries();
  }

  getStorageKey(): string {

    return 'gratitudeRecords_' +
      this.userService.getUserKey();

  }

  saveEntries() {

    localStorage.setItem(
      this.getStorageKey(),
      JSON.stringify(this.entries)
    );
  }

  loadEntries() {

    const savedEntries =
      localStorage.getItem(
        this.getStorageKey()
      );

    if (savedEntries) {
      this.entries =
        JSON.parse(savedEntries);
    }
  }

}