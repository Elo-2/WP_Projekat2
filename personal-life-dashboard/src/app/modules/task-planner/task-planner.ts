import { Component } from '@angular/core';
import { UserService } from '../../services/user';

interface TaskRecord {
  title: string;
  date: string;
  priority: string;
  status: string;
  note: string;
}

@Component({
  selector: 'app-task-planner',
  imports: [],
  templateUrl: './task-planner.html',
  styleUrl: './task-planner.css'
})
export class TaskPlanner {

  tasks: TaskRecord[] = [];

  constructor(private userService: UserService) {
    this.loadTasks();
  }

  addTask(
    title: string,
    date: string,
    priority: string,
    note: string
  ) {

    if (!title || !date || !priority) {
      alert('Molimo popunite obavezna polja.');
      return;
    }

    const task: TaskRecord = {
      title: title,
      date: date,
      priority: priority,
      status: 'Na čekanju',
      note: note
    };

    this.tasks.push(task);

    this.saveTasks();

    document.querySelector('form')?.reset();
  }

  changeStatus(index: number) {

    if (this.tasks[index].status === 'Na čekanju') {
      this.tasks[index].status = 'U toku';
    } else if (this.tasks[index].status === 'U toku') {
      this.tasks[index].status = 'Završeno';
    } else {
      this.tasks[index].status = 'Na čekanju';
    }

    this.saveTasks();
  }

  deleteTask(index: number) {

    this.tasks.splice(index, 1);

    this.saveTasks();
  }

  getCompletedTasks(): number {

    return this.tasks.filter(
      task => task.status === 'Završeno'
    ).length;
  }

  getStorageKey(): string {

    return 'taskRecords_' +
      this.userService.getUserKey();

  }

  saveTasks() {

    localStorage.setItem(
      this.getStorageKey(),
      JSON.stringify(this.tasks)
    );
  }

  loadTasks() {

    const savedTasks =
      localStorage.getItem(
        this.getStorageKey()
      );

    if (savedTasks) {
      this.tasks =
        JSON.parse(savedTasks);
    }
  }

}