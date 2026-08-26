import { Component } from '@angular/core';
import { UserService } from '../../services/user';

interface WaterRecord {
  date: string;
  amount: number;
}

@Component({
  selector: 'app-water-intake',
  imports: [],
  templateUrl: './water-intake.html',
  styleUrl: './water-intake.css'
})
export class WaterIntake {

  records: WaterRecord[] = [];

  constructor(private userService: UserService) {
    this.loadRecords();
  }

  addWater(
    date: string,
    amount: string
  ) {

    if (!date || !amount) {
      alert('Molimo popunite sva polja.');
      return;
    }

    const record: WaterRecord = {
      date: date,
      amount: Number(amount)
    };

    this.records.push(record);

    this.saveRecords();

    document.querySelector('form')?.reset();
  }

  deleteWater(index: number) {

    this.records.splice(index, 1);

    this.saveRecords();
  }

  getTotalWater(): number {

    return this.records.reduce(
      (total, record) => total + record.amount,
      0
    );
  }

  getAverageWater(): number {

    if (this.records.length === 0) {
      return 0;
    }

    return Number(
      (this.getTotalWater() / this.records.length).toFixed(0)
    );
  }

  getStorageKey(): string {

    return 'waterRecords_' +
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