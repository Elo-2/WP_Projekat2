import { Component } from '@angular/core';
import { UserService } from '../../services/user';

interface MealRecord {
  meal: string;
  date: string;
  type: string;
  calories: number;
  note: string;
}

@Component({
  selector: 'app-meal-planner',
  imports: [],
  templateUrl: './meal-planner.html',
  styleUrl: './meal-planner.css'
})
export class MealPlanner {

  meals: MealRecord[] = [];

  constructor(private userService: UserService) {
    this.loadMeals();
  }

  addMeal(
    meal: string,
    date: string,
    type: string,
    calories: string,
    note: string
  ) {

    if (!meal || !date || !type) {
      alert('Molimo popunite obavezna polja.');
      return;
    }

    const record: MealRecord = {
      meal: meal,
      date: date,
      type: type,
      calories: calories ? Number(calories) : 0,
      note: note
    };

    this.meals.push(record);

    this.saveMeals();

    document.querySelector('form')?.reset();
  }

  deleteMeal(index: number) {

    this.meals.splice(index, 1);

    this.saveMeals();
  }

  getTotalCalories(): number {

    return this.meals.reduce(
      (total, meal) => total + meal.calories,
      0
    );
  }

  getStorageKey(): string {

    return 'mealRecords_' +
      this.userService.getUserKey();

  }

  saveMeals() {

    localStorage.setItem(
      this.getStorageKey(),
      JSON.stringify(this.meals)
    );
  }

  loadMeals() {

    const savedMeals =
      localStorage.getItem(
        this.getStorageKey()
      );

    if (savedMeals) {
      this.meals =
        JSON.parse(savedMeals);
    }
  }

}