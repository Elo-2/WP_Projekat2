import { Component } from '@angular/core';
import { UserService } from '../../services/user';

interface MoodRecord {
  date: string;
  mood: string;
  score: number;
  note: string;
}

@Component({
  selector: 'app-mood-tracker',
  imports: [],
  templateUrl: './mood-tracker.html',
  styleUrl: './mood-tracker.css'
})
export class MoodTracker {

  moods: MoodRecord[] = [];

  constructor(private userService: UserService) {
    this.loadMoods();
  }

  addMood(
    date: string,
    mood: string,
    score: string,
    note: string
  ) {

    if (!date || !mood || !score) {
      alert('Molimo popunite obavezna polja.');
      return;
    }

    const record: MoodRecord = {
      date: date,
      mood: mood,
      score: Number(score),
      note: note
    };

    this.moods.push(record);

    this.saveMoods();

    document.querySelector('form')?.reset();
  }

  deleteMood(index: number) {

    this.moods.splice(index, 1);

    this.saveMoods();
  }

  getAverageMood(): number {

    if (this.moods.length === 0) {
      return 0;
    }

    const total = this.moods.reduce(
      (sum, mood) => sum + mood.score,
      0
    );

    return Number(
      (total / this.moods.length).toFixed(1)
    );
  }

  getStorageKey(): string {

    return 'moodRecords_' +
      this.userService.getUserKey();

  }

  saveMoods() {

    localStorage.setItem(
      this.getStorageKey(),
      JSON.stringify(this.moods)
    );
  }

  loadMoods() {

    const savedMoods =
      localStorage.getItem(
        this.getStorageKey()
      );

    if (savedMoods) {
      this.moods =
        JSON.parse(savedMoods);
    }
  }

}