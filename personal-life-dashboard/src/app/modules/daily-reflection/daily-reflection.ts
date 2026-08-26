import { Component } from '@angular/core';
import { UserService } from '../../services/user';

interface ReflectionRecord {
  date: string;
  rating: number;
  text: string;
}

@Component({
  selector: 'app-daily-reflection',
  imports: [],
  templateUrl: './daily-reflection.html',
  styleUrl: './daily-reflection.css'
})
export class DailyReflection {

  reflections: ReflectionRecord[] = [];

  constructor(private userService: UserService) {
    this.loadReflections();
  }

  addReflection(
    date: string,
    rating: string,
    text: string
  ) {

    if (!date || !rating || !text) {
      alert('Molimo popunite sva polja.');
      return;
    }

    const reflection: ReflectionRecord = {
      date: date,
      rating: Number(rating),
      text: text
    };

    this.reflections.push(reflection);

    this.saveReflections();

    document.querySelector('form')?.reset();
  }

  deleteReflection(index: number) {

    this.reflections.splice(index, 1);

    this.saveReflections();
  }

  getAverageRating(): number {

    if (this.reflections.length === 0) {
      return 0;
    }

    const total = this.reflections.reduce(
      (sum, reflection) => sum + reflection.rating,
      0
    );

    return Number(
      (total / this.reflections.length).toFixed(1)
    );
  }

  getStorageKey(): string {

    return 'dailyReflectionRecords_' +
      this.userService.getUserKey();

  }

  saveReflections() {

    localStorage.setItem(
      this.getStorageKey(),
      JSON.stringify(this.reflections)
    );
  }

  loadReflections() {

    const savedReflections =
      localStorage.getItem(
        this.getStorageKey()
      );

    if (savedReflections) {
      this.reflections =
        JSON.parse(savedReflections);
    }
  }

}