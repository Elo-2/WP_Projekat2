import { Component } from '@angular/core';
import { UserService } from '../../services/user';

interface FinanceRecord {
  description: string;
  date: string;
  type: string;
  amount: number;
}

@Component({
  selector: 'app-finance-tracker',
  imports: [],
  templateUrl: './finance-tracker.html',
  styleUrl: './finance-tracker.css'
})
export class FinanceTracker {

  records: FinanceRecord[] = [];

  constructor(private userService: UserService) {
    this.loadRecords();
  }

  addRecord(
    description: string,
    date: string,
    type: string,
    amount: string
  ) {

    if (!description || !date || !type || !amount) {
      alert('Molimo popunite sva obavezna polja.');
      return;
    }

    const record: FinanceRecord = {
      description: description,
      date: date,
      type: type,
      amount: Number(amount)
    };

    this.records.push(record);

    this.saveRecords();

    document.querySelector('form')?.reset();
  }

  deleteRecord(index: number) {

    this.records.splice(index, 1);

    this.saveRecords();
  }

  getIncome(): number {

    return this.records
      .filter(record => record.type === 'Prihod')
      .reduce(
        (total, record) => total + record.amount,
        0
      );
  }

  getExpenses(): number {

    return this.records
      .filter(record => record.type === 'Trošak')
      .reduce(
        (total, record) => total + record.amount,
        0
      );
  }

  getBalance(): number {

    return this.getIncome() - this.getExpenses();
  }

  getStorageKey(): string {

    return 'financeRecords_' +
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