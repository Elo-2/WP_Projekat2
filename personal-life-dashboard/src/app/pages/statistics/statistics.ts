import {
  Component,
  AfterViewInit,
  OnDestroy
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js/auto';
import { UserService } from '../../services/user';


interface SleepRecord {
  date: string;
  bedtime: string;
  wakeTime: string;
  hours: number;
  quality: number;
}

interface StudyRecord {
  subject: string;
  date: string;
  hours: number;
  note: string;
}

interface FitnessRecord {
  activity: string;
  date: string;
  duration: number;
  intensity: string;
  note: string;
}

interface TaskRecord {
  title: string;
  date: string;
  priority: string;
  status: string;
  note: string;
}


@Component({
  selector: 'app-statistics',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css'
})
export class Statistics
  implements AfterViewInit, OnDestroy {


  /* =========================================
     UKUPNE STATISTIKE
     ========================================= */

  habitCompletion = 0;

  totalSleepHours = 0;

  totalStudyHours = 0;

  totalFitnessMinutes = 0;

  totalCalories = 0;

  averageMood = 0;

  totalEvents = 0;

  totalIncome = 0;

  totalExpenses = 0;

  balance = 0;

  totalGratitudeEntries = 0;

  averageReflection = 0;

  totalWater = 0;

  averageWater = 0;

  completedTasks = 0;


  /* =========================================
     STATISTIKE ODABRANOG PERIODA
     ========================================= */

  periodSleepHours = 0;

  periodStudyHours = 0;

  periodFitnessMinutes = 0;

  periodCompletedTasks = 0;


  /* =========================================
     PODACI
     ========================================= */

  sleepRecords: SleepRecord[] = [];

  studyRecords: StudyRecord[] = [];

  fitnessRecords: FitnessRecord[] = [];

  taskRecords: TaskRecord[] = [];


  /* =========================================
     FILTER
     ========================================= */

  selectedPeriod:
    'day' |
    'week' |
    'month' = 'week';

  selectedDate: string = this.getToday();


  /* =========================================
     POREĐENJE
     ========================================= */

  currentSleep = 0;

  comparisonSleep = 0;

  sleepDifference = 0;

  sleepChangePercent = 0;


  currentStudy = 0;

  comparisonStudy = 0;

  studyDifference = 0;

  studyChangePercent = 0;


  currentFitness = 0;

  comparisonFitness = 0;

  fitnessDifference = 0;

  fitnessChangePercent = 0;


  currentCompletedTasks = 0;

  comparisonCompletedTasks = 0;

  taskDifference = 0;

  taskChangePercent = 0;


  /* =========================================
     AI INSIGHTS
     ========================================= */

  insights: string[] = [];


  /* =========================================
     CHARTS
     ========================================= */

  sleepChart: Chart | null = null;

  studyChart: Chart | null = null;

  taskChart: Chart | null = null;


  constructor(
    private userService: UserService
  ) {

    this.loadStatistics();

  }


  /* =========================================
     AFTER VIEW INIT
     ========================================= */

  ngAfterViewInit(): void {

    setTimeout(() => {

      this.updateStatistics();

    }, 100);

  }


  /* =========================================
     DESTROY
     ========================================= */

  ngOnDestroy(): void {

    this.destroyCharts();

  }


  /* =========================================
     STORAGE KEY
     ========================================= */

  getStorageKey(key: string): string {

    return key + '_' +
      this.userService.getUserKey();

  }


  /* =========================================
     UČITAVANJE
     ========================================= */

  loadStatistics(): void {

    this.loadHabits();

    this.loadSleep();

    this.loadStudy();

    this.loadFitness();

    this.loadMeals();

    this.loadMood();

    this.loadCalendar();

    this.loadFinance();

    this.loadGratitude();

    this.loadReflection();

    this.loadWater();

    this.loadTasks();

  }


  /* =========================================
     HABITS
     ========================================= */

  loadHabits(): void {

    const data =
      localStorage.getItem(
        this.getStorageKey('habits')
      );

    if (!data) {
      return;
    }

    try {

      const habits = JSON.parse(data);

      if (
        !Array.isArray(habits) ||
        habits.length === 0
      ) {
        return;
      }

      const completed =
        habits.filter(
          (habit: any) =>
            habit.completed
        ).length;

      this.habitCompletion =
        Math.round(
          (completed / habits.length) * 100
        );

    } catch {

      console.log(
        'Greška pri učitavanju navika.'
      );

    }

  }


  /* =========================================
     SLEEP
     ========================================= */

  loadSleep(): void {

    const data =
      localStorage.getItem(
        this.getStorageKey('sleepRecords')
      );

    if (!data) {
      return;
    }

    try {

      const records = JSON.parse(data);

      if (!Array.isArray(records)) {
        return;
      }

      this.sleepRecords = records;

      this.totalSleepHours =
        Number(
          records
            .reduce(
              (
                total: number,
                record: SleepRecord
              ) =>
                total +
                Number(record.hours || 0),
              0
            )
            .toFixed(1)
        );

    } catch {

      console.log(
        'Greška pri učitavanju spavanja.'
      );

    }

  }


  /* =========================================
     STUDY
     ========================================= */

  loadStudy(): void {

    const data =
      localStorage.getItem(
        this.getStorageKey('studyRecords')
      );

    if (!data) {
      return;
    }

    try {

      const records = JSON.parse(data);

      if (!Array.isArray(records)) {
        return;
      }

      this.studyRecords = records;

      this.totalStudyHours =
        Number(
          records
            .reduce(
              (
                total: number,
                record: StudyRecord
              ) =>
                total +
                Number(record.hours || 0),
              0
            )
            .toFixed(1)
        );

    } catch {

      console.log(
        'Greška pri učitavanju učenja.'
      );

    }

  }


  /* =========================================
     FITNESS
     ========================================= */

  loadFitness(): void {

    const data =
      localStorage.getItem(
        this.getStorageKey('fitnessRecords')
      );

    if (!data) {
      return;
    }

    try {

      const records = JSON.parse(data);

      if (!Array.isArray(records)) {
        return;
      }

      this.fitnessRecords = records;

      this.totalFitnessMinutes =
        records.reduce(
          (
            total: number,
            record: FitnessRecord
          ) =>
            total +
            Number(record.duration || 0),
          0
        );

    } catch {

      console.log(
        'Greška pri učitavanju fitness podataka.'
      );

    }

  }


  /* =========================================
     MEALS
     ========================================= */

  loadMeals(): void {

    const data =
      localStorage.getItem(
        this.getStorageKey('mealRecords')
      );

    if (!data) {
      return;
    }

    try {

      const meals = JSON.parse(data);

      if (!Array.isArray(meals)) {
        return;
      }

      this.totalCalories =
        meals.reduce(
          (
            total: number,
            meal: any
          ) =>
            total +
            Number(meal.calories || 0),
          0
        );

    } catch {

      console.log(
        'Greška pri učitavanju obroka.'
      );

    }

  }


  /* =========================================
     MOOD
     ========================================= */

  loadMood(): void {

    const data =
      localStorage.getItem(
        this.getStorageKey('moodRecords')
      );

    if (!data) {
      return;
    }

    try {

      const moods = JSON.parse(data);

      if (
        !Array.isArray(moods) ||
        moods.length === 0
      ) {
        return;
      }

      const total =
        moods.reduce(
          (
            sum: number,
            mood: any
          ) =>
            sum +
            Number(mood.score || 0),
          0
        );

      this.averageMood =
        Number(
          (
            total / moods.length
          ).toFixed(1)
        );

    } catch {

      console.log(
        'Greška pri učitavanju raspoloženja.'
      );

    }

  }


  /* =========================================
     CALENDAR
     ========================================= */

  loadCalendar(): void {

    const data =
      localStorage.getItem(
        this.getStorageKey('calendarRecords')
      );

    if (!data) {
      return;
    }

    try {

      const events = JSON.parse(data);

      if (!Array.isArray(events)) {
        return;
      }

      this.totalEvents =
        events.length;

    } catch {

      console.log(
        'Greška pri učitavanju kalendara.'
      );

    }

  }


  /* =========================================
     FINANCE
     ========================================= */

  loadFinance(): void {

    const data =
      localStorage.getItem(
        this.getStorageKey('financeRecords')
      );

    if (!data) {
      return;
    }

    try {

      const records = JSON.parse(data);

      if (!Array.isArray(records)) {
        return;
      }

      this.totalIncome =
        records
          .filter(
            (record: any) =>
              record.type === 'Prihod'
          )
          .reduce(
            (
              total: number,
              record: any
            ) =>
              total +
              Number(record.amount || 0),
            0
          );

      this.totalExpenses =
        records
          .filter(
            (record: any) =>
              record.type === 'Trošak'
          )
          .reduce(
            (
              total: number,
              record: any
            ) =>
              total +
              Number(record.amount || 0),
            0
          );

      this.balance =
        this.totalIncome -
        this.totalExpenses;

    } catch {

      console.log(
        'Greška pri učitavanju finansija.'
      );

    }

  }


  /* =========================================
     GRATITUDE
     ========================================= */

  loadGratitude(): void {

    const data =
      localStorage.getItem(
        this.getStorageKey(
          'gratitudeRecords'
        )
      );

    if (!data) {
      return;
    }

    try {

      const entries = JSON.parse(data);

      if (!Array.isArray(entries)) {
        return;
      }

      this.totalGratitudeEntries =
        entries.length;

    } catch {

      console.log(
        'Greška pri učitavanju zahvalnosti.'
      );

    }

  }


  /* =========================================
     REFLECTION
     ========================================= */

  loadReflection(): void {

    const data =
      localStorage.getItem(
        this.getStorageKey(
          'dailyReflectionRecords'
        )
      );

    if (!data) {
      return;
    }

    try {

      const reflections =
        JSON.parse(data);

      if (
        !Array.isArray(reflections) ||
        reflections.length === 0
      ) {
        return;
      }

      const total =
        reflections.reduce(
          (
            sum: number,
            reflection: any
          ) =>
            sum +
            Number(
              reflection.rating || 0
            ),
          0
        );

      this.averageReflection =
        Number(
          (
            total / reflections.length
          ).toFixed(1)
        );

    } catch {

      console.log(
        'Greška pri učitavanju refleksije.'
      );

    }

  }


  /* =========================================
     WATER
     ========================================= */

  loadWater(): void {

    const data =
      localStorage.getItem(
        this.getStorageKey(
          'waterRecords'
        )
      );

    if (!data) {
      return;
    }

    try {

      const records = JSON.parse(data);

      if (!Array.isArray(records)) {
        return;
      }

      this.totalWater =
        records.reduce(
          (
            total: number,
            record: any
          ) =>
            total +
            Number(record.amount || 0),
          0
        );

      if (records.length > 0) {

        this.averageWater =
          Math.round(
            this.totalWater /
            records.length
          );

      }

    } catch {

      console.log(
        'Greška pri učitavanju vode.'
      );

    }

  }


  /* =========================================
     TASKS
     ========================================= */

  loadTasks(): void {

    const data =
      localStorage.getItem(
        this.getStorageKey(
          'taskRecords'
        )
      );

    if (!data) {
      return;
    }

    try {

      const tasks = JSON.parse(data);

      if (!Array.isArray(tasks)) {
        return;
      }

      this.taskRecords = tasks;

      this.completedTasks =
        tasks.filter(
          (task: TaskRecord) =>
            task.status === 'Završeno'
        ).length;

    } catch {

      console.log(
        'Greška pri učitavanju zadataka.'
      );

    }

  }


  /* =========================================
     TODAY
     ========================================= */

  getToday(): string {

    const date = new Date();

    return this.formatDate(date);

  }


  /* =========================================
     FILTER CHANGE
     ========================================= */

  onFilterChange(): void {

    this.updateStatistics();

  }


  /* =========================================
     UPDATE
     ========================================= */

  updateStatistics(): void {

    this.destroyCharts();

    this.calculatePeriodStatistics();

    this.createSleepChart();

    this.createStudyChart();

    this.createTaskChart();

    this.calculateComparison();

    this.generateInsights();

  }


  /* =========================================
     PERIOD STATISTICS
     ========================================= */

  calculatePeriodStatistics(): void {

    const dates =
      this.getFilterDates();

    this.periodSleepHours =
      this.getSleepTotal(dates);

    this.periodStudyHours =
      this.getStudyTotal(dates);

    this.periodFitnessMinutes =
      this.getFitnessTotal(dates);

    this.periodCompletedTasks =
      this.getCompletedTasksTotal(dates);

  }


  /* =========================================
     WEEK DATES
     ========================================= */

  getWeekDates(
    dateString: string
  ): string[] {

    const selected =
      this.parseDate(dateString);

    const day =
      selected.getDay();

    const difference =
      day === 0
        ? -6
        : 1 - day;

    const monday =
      new Date(selected);

    monday.setDate(
      selected.getDate() +
      difference
    );

    const dates: string[] = [];

    for (
      let i = 0;
      i < 7;
      i++
    ) {

      const date =
        new Date(monday);

      date.setDate(
        monday.getDate() + i
      );

      dates.push(
        this.formatDate(date)
      );

    }

    return dates;

  }


  /* =========================================
     MONTH DATES
     ========================================= */

  getMonthDates(
    dateString: string
  ): string[] {

    const date =
      this.parseDate(dateString);

    const year =
      date.getFullYear();

    const month =
      date.getMonth();

    const days =
      new Date(
        year,
        month + 1,
        0
      ).getDate();

    const dates: string[] = [];

    for (
      let i = 1;
      i <= days;
      i++
    ) {

      const current =
        new Date(
          year,
          month,
          i
        );

      dates.push(
        this.formatDate(current)
      );

    }

    return dates;

  }


  /* =========================================
     FILTER DATES
     ========================================= */

  getFilterDates(): string[] {

    if (
      this.selectedPeriod === 'day'
    ) {

      return [
        this.selectedDate
      ];

    }

    if (
      this.selectedPeriod === 'week'
    ) {

      return this.getWeekDates(
        this.selectedDate
      );

    }

    return this.getMonthDates(
      this.selectedDate
    );

  }


  /* =========================================
     SLEEP CHART
     ========================================= */

  createSleepChart(): void {

    const canvas =
      document.getElementById(
        'sleepChart'
      ) as HTMLCanvasElement | null;

    if (!canvas) {
      return;
    }

    const dates =
      this.getFilterDates();

    const values =
      dates.map(
        date =>
          this.getSleepTotal([date])
      );

    this.sleepChart =
      new Chart(
        canvas,
        {
          type: 'bar',

          data: {

            labels:
              this.formatChartLabels(
                dates
              ),

            datasets: [

              {
                label:
                  'Sati spavanja',

                data:
                  values,

                borderWidth: 1

              }

            ]

          },

          options: {

            responsive: true,

            maintainAspectRatio: false,

            scales: {

              y: {

                beginAtZero: true,

                title: {

                  display: true,

                  text: 'Sati'

                }

              }

            }

          }

        }
      );

  }


  /* =========================================
     STUDY CHART
     ========================================= */

  createStudyChart(): void {

    const canvas =
      document.getElementById(
        'studyChart'
      ) as HTMLCanvasElement | null;

    if (!canvas) {
      return;
    }

    const dates =
      this.getFilterDates();

    const values =
      dates.map(
        date =>
          this.getStudyTotal([date])
      );

    this.studyChart =
      new Chart(
        canvas,
        {
          type: 'line',

          data: {

            labels:
              this.formatChartLabels(
                dates
              ),

            datasets: [

              {
                label:
                  'Vrijeme učenja',

                data:
                  values,

                borderWidth: 3,

                tension: 0.3,

                fill: false

              }

            ]

          },

          options: {

            responsive: true,

            maintainAspectRatio: false,

            scales: {

              y: {

                beginAtZero: true,

                title: {

                  display: true,

                  text:
                    'Sati učenja'

                }

              }

            }

          }

        }
      );

  }


  /* =========================================
     TASK PIE CHART
     ========================================= */

  createTaskChart(): void {

    const canvas =
      document.getElementById(
        'taskChart'
      ) as HTMLCanvasElement | null;

    if (!canvas) {
      return;
    }

    const dates =
      this.getFilterDates();

    const filteredTasks =
      this.taskRecords.filter(
        task =>
          dates.includes(task.date)
      );

    const completed =
      filteredTasks.filter(
        task =>
          task.status === 'Završeno'
      ).length;

    const inProgress =
      filteredTasks.filter(
        task =>
          task.status === 'U toku'
      ).length;

    const pending =
      filteredTasks.filter(
        task =>
          task.status === 'Na čekanju'
      ).length;

    this.taskChart =
      new Chart(
        canvas,
        {
          type: 'pie',

          data: {

            labels: [
              'Završeno',
              'U toku',
              'Na čekanju'
            ],

            datasets: [

              {

                data: [
                  completed,
                  inProgress,
                  pending
                ],

                borderWidth: 1

              }

            ]

          },

          options: {

            responsive: true,

            maintainAspectRatio: false

          }

        }
      );

  }


  /* =========================================
     COMPARISON
     ========================================= */

  calculateComparison(): void {

    const currentDates =
      this.getFilterDates();

    const previousDates =
      this.getPreviousPeriodDates();


    this.currentSleep =
      this.getSleepTotal(
        currentDates
      );

    this.comparisonSleep =
      this.getSleepTotal(
        previousDates
      );

    this.sleepDifference =
      Number(
        (
          this.currentSleep -
          this.comparisonSleep
        ).toFixed(1)
      );

    this.sleepChangePercent =
      this.calculatePercentageChange(
        this.currentSleep,
        this.comparisonSleep
      );


    this.currentStudy =
      this.getStudyTotal(
        currentDates
      );

    this.comparisonStudy =
      this.getStudyTotal(
        previousDates
      );

    this.studyDifference =
      Number(
        (
          this.currentStudy -
          this.comparisonStudy
        ).toFixed(1)
      );

    this.studyChangePercent =
      this.calculatePercentageChange(
        this.currentStudy,
        this.comparisonStudy
      );


    this.currentFitness =
      this.getFitnessTotal(
        currentDates
      );

    this.comparisonFitness =
      this.getFitnessTotal(
        previousDates
      );

    this.fitnessDifference =
      Number(
        (
          this.currentFitness -
          this.comparisonFitness
        ).toFixed(1)
      );

    this.fitnessChangePercent =
      this.calculatePercentageChange(
        this.currentFitness,
        this.comparisonFitness
      );


    this.currentCompletedTasks =
      this.getCompletedTasksTotal(
        currentDates
      );

    this.comparisonCompletedTasks =
      this.getCompletedTasksTotal(
        previousDates
      );

    this.taskDifference =
      this.currentCompletedTasks -
      this.comparisonCompletedTasks;

    this.taskChangePercent =
      this.calculatePercentageChange(
        this.currentCompletedTasks,
        this.comparisonCompletedTasks
      );

  }


  /* =========================================
     PERCENTAGE CHANGE
     ========================================= */

  calculatePercentageChange(
    current: number,
    previous: number
  ): number {

    if (previous === 0) {

      if (current === 0) {
        return 0;
      }

      return 100;

    }

    return Number(
      (
        (
          (current - previous) /
          previous
        ) * 100
      ).toFixed(1)
    );

  }


  /* =========================================
     PREVIOUS PERIOD
     ========================================= */

  getPreviousPeriodDates(): string[] {

    const selected =
      this.parseDate(
        this.selectedDate
      );


    if (
      this.selectedPeriod === 'day'
    ) {

      selected.setDate(
        selected.getDate() - 1
      );

      return [
        this.formatDate(selected)
      ];

    }


    if (
      this.selectedPeriod === 'week'
    ) {

      selected.setDate(
        selected.getDate() - 7
      );

      return this.getWeekDates(
        this.formatDate(selected)
      );

    }


    selected.setMonth(
      selected.getMonth() - 1
    );

    return this.getMonthDates(
      this.formatDate(selected)
    );

  }


  /* =========================================
     SLEEP TOTAL
     ========================================= */

  getSleepTotal(
    dates: string[]
  ): number {

    return Number(
      this.sleepRecords
        .filter(
          record =>
            dates.includes(
              record.date
            )
        )
        .reduce(
          (
            total,
            record
          ) =>
            total +
            Number(
              record.hours || 0
            ),
          0
        )
        .toFixed(1)
    );

  }


  /* =========================================
     STUDY TOTAL
     ========================================= */

  getStudyTotal(
    dates: string[]
  ): number {

    return Number(
      this.studyRecords
        .filter(
          record =>
            dates.includes(
              record.date
            )
        )
        .reduce(
          (
            total,
            record
          ) =>
            total +
            Number(
              record.hours || 0
            ),
          0
        )
        .toFixed(1)
    );

  }


  /* =========================================
     FITNESS TOTAL
     ========================================= */

  getFitnessTotal(
    dates: string[]
  ): number {

    return Number(
      this.fitnessRecords
        .filter(
          record =>
            dates.includes(
              record.date
            )
        )
        .reduce(
          (
            total,
            record
          ) =>
            total +
            Number(
              record.duration || 0
            ),
          0
        )
        .toFixed(1)
    );

  }


  /* =========================================
     COMPLETED TASKS
     ========================================= */

  getCompletedTasksTotal(
    dates: string[]
  ): number {

    return this.taskRecords
      .filter(
        task =>
          dates.includes(task.date) &&
          task.status === 'Završeno'
      )
      .length;

  }


  /* =========================================
     AI INSIGHTS
     ========================================= */

  generateInsights(): void {

    this.insights = [];

    const dates =
      this.getFilterDates();


    /* SPAVANJE */

    const sleepRecords =
      this.sleepRecords.filter(
        record =>
          dates.includes(
            record.date
          )
      );

    const sleepTotal =
      this.getSleepTotal(dates);

    const averageSleep =
      sleepRecords.length > 0
        ? sleepTotal /
          sleepRecords.length
        : 0;


    if (
      averageSleep > 0 &&
      averageSleep < 6
    ) {

      this.insights.push(
        `Prosječno spavanje u odabranom periodu je ${averageSleep.toFixed(1)} sati. Pokušajte poboljšati raspored spavanja.`
      );

    }
    else if (
      averageSleep >= 8
    ) {

      this.insights.push(
        `Odlično! Prosječno spavanje u odabranom periodu je ${averageSleep.toFixed(1)} sati.`
      );

    }
    else if (
      averageSleep > 0
    ) {

      this.insights.push(
        `Prosječno spavanje u odabranom periodu je ${averageSleep.toFixed(1)} sati.`
      );

    }


    /* UČENJE */

    if (
      this.periodStudyHours >= 3
    ) {

      this.insights.push(
        `Dobro napredujete sa učenjem. U odabranom periodu učili ste ${this.periodStudyHours.toFixed(1)} sati.`
      );

    }
    else if (
      this.periodStudyHours > 0
    ) {

      this.insights.push(
        `U odabranom periodu učili ste ${this.periodStudyHours.toFixed(1)} sati. Pokušajte povećati vrijeme učenja.`
      );

    }


    /* TASKOVI */

    const totalTasks =
      this.taskRecords.filter(
        task =>
          dates.includes(
            task.date
          )
      ).length;


    if (
      totalTasks > 0
    ) {

      const percentage =
        (
          this.periodCompletedTasks /
          totalTasks
        ) * 100;


      if (
        percentage >= 80
      ) {

        this.insights.push(
          `Odličan napredak! Završili ste ${percentage.toFixed(0)}% zadataka u odabranom periodu.`
        );

      }
      else if (
        percentage < 50
      ) {

        this.insights.push(
          `Završili ste ${percentage.toFixed(0)}% zadataka. Pokušajte bolje rasporediti prioritete.`
        );

      }
      else {

        this.insights.push(
          `Završili ste ${percentage.toFixed(0)}% zadataka u odabranom periodu.`
        );

      }

    }


    /* FITNESS */

    if (
      this.periodFitnessMinutes >= 150
    ) {

      this.insights.push(
        `Odlično! U odabranom periodu ostvarili ste ${this.periodFitnessMinutes} minuta fizičke aktivnosti.`
      );

    }
    else if (
      this.periodFitnessMinutes > 0
    ) {

      this.insights.push(
        `U odabranom periodu ostvarili ste ${this.periodFitnessMinutes} minuta aktivnosti.`
      );

    }


    /* POREĐENJE */

    if (
      this.sleepDifference > 0
    ) {

      this.insights.push(
        `Vrijeme spavanja je veće za ${this.sleepDifference.toFixed(1)} sati u odnosu na prethodni period.`
      );

    }
    else if (
      this.sleepDifference < 0
    ) {

      this.insights.push(
        `Vrijeme spavanja je manje za ${Math.abs(this.sleepDifference).toFixed(1)} sati u odnosu na prethodni period.`
      );

    }


    if (
      this.studyDifference > 0
    ) {

      this.insights.push(
        `Učenje je povećano za ${this.studyDifference.toFixed(1)} sati u odnosu na prethodni period.`
      );

    }
    else if (
      this.studyDifference < 0
    ) {

      this.insights.push(
        `Učenje je smanjeno za ${Math.abs(this.studyDifference).toFixed(1)} sati u odnosu na prethodni period.`
      );

    }


    /* VODA */

    if (
      this.averageWater > 0 &&
      this.averageWater < 1500
    ) {

      this.insights.push(
        'Prosječan unos vode je relativno nizak. Pokušajte unositi više vode tokom dana.'
      );

    }


    /* NEMA PODATAKA */

    if (
      this.insights.length === 0
    ) {

      this.insights.push(
        'Za odabrani period nema dovoljno podataka za generisanje uvida. Dodajte podatke u trackere.'
      );

    }

  }


  /* =========================================
     CHART LABELS
     ========================================= */

  formatChartLabels(
    dates: string[]
  ): string[] {

    return dates.map(
      date => {

        const parts =
          date.split('-');

        if (
          parts.length !== 3
        ) {
          return date;
        }

        if (
          this.selectedPeriod === 'day'
        ) {

          return (
            parts[2] +
            '.' +
            parts[1] +
            '.' +
            parts[0]
          );

        }

        return (
          parts[2] +
          '.' +
          parts[1] +
          '.'
        );

      }
    );

  }


  /* =========================================
     DATE PARSE
     ========================================= */

  parseDate(
    dateString: string
  ): Date {

    const parts =
      dateString.split('-');

    return new Date(
      Number(parts[0]),
      Number(parts[1]) - 1,
      Number(parts[2])
    );

  }


  /* =========================================
     DATE FORMAT
     ========================================= */

  formatDate(
    date: Date
  ): string {

    const year =
      date.getFullYear();

    const month =
      String(
        date.getMonth() + 1
      ).padStart(2, '0');

    const day =
      String(
        date.getDate()
      ).padStart(2, '0');

    return (
      year +
      '-' +
      month +
      '-' +
      day
    );

  }


  getAbsoluteNumber(value: number): number {

  return Math.abs(value);

}

  /* =========================================
     CHART DESTROY
     ========================================= */

  destroyCharts(): void {

    if (this.sleepChart) {

      this.sleepChart.destroy();

      this.sleepChart = null;

    }

    if (this.studyChart) {

      this.studyChart.destroy();

      this.studyChart = null;

    }

    if (this.taskChart) {

      this.taskChart.destroy();

      this.taskChart = null;

    }

  }

}