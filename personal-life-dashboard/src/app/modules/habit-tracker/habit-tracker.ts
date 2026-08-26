import { Component } from '@angular/core';
import { UserService } from '../../services/user';

interface Habit {
  name: string;
  completed: boolean;
}

@Component({
  selector: 'app-habit-tracker',
  imports: [],
  templateUrl: './habit-tracker.html',
  styleUrl: './habit-tracker.css'
})
export class HabitTracker {

  habits: Habit[] = [];

  constructor(private userService: UserService) {
  this.loadHabits();
}

  addHabit(name: string) {

    if (!name.trim()) {
      return;
    }

    const newHabit: Habit = {
      name: name.trim(),
      completed: false
    };

    this.habits.push(newHabit);

    this.saveHabits();
  }

  toggleHabit(index: number) {

    this.habits[index].completed =
      !this.habits[index].completed;

    this.saveHabits();
  }

  deleteHabit(index: number) {

    this.habits.splice(index, 1);
    
    this.saveHabits();
  }

  getCompletionPercentage(): number {

    if (this.habits.length === 0) {
      return 0;
    }

    const completed = this.habits.filter(
      habit => habit.completed
    ).length;

    return Math.round(
      (completed / this.habits.length) * 100
    );
  }

  getStorageKey(): string {
  return 'habits_' + this.userService.getUserKey();
}

  saveHabits() {

    localStorage.setItem(
  this.getStorageKey(),
  JSON.stringify(this.habits)
);
  }

  loadHabits() {

    const savedHabits =
  localStorage.getItem(this.getStorageKey());

    if (savedHabits) {

      this.habits =
        JSON.parse(savedHabits);

    }
  }

}