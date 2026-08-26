import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { Statistics } from './pages/statistics/statistics';
import { Profile } from './pages/profile/profile';

import { HabitTracker } from './modules/habit-tracker/habit-tracker';
import { SleepTracker } from './modules/sleep-tracker/sleep-tracker';
import { StudyPlanner } from './modules/study-planner/study-planner';
import { FitnessPlanner } from './modules/fitness-planner/fitness-planner';
import { TaskPlanner } from './modules/task-planner/task-planner';
import { MealPlanner } from './modules/meal-planner/meal-planner';
import { MoodTracker } from './modules/mood-tracker/mood-tracker';
import { CalendarTracker } from './modules/calendar-tracker/calendar-tracker';
import { FinanceTracker } from './modules/finance-tracker/finance-tracker';
import { GratitudeJournal } from './modules/gratitude-journal/gratitude-journal';
import { DailyReflection } from './modules/daily-reflection/daily-reflection';
import { WaterIntake } from './modules/water-intake/water-intake';

import { Bingo } from './modules/bingo/bingo';
import { Quiz } from './modules/quiz/quiz';
import { Whiteboard } from './modules/whiteboard/whiteboard';
import { Kanban } from './modules/kanban/kanban';
import { VisionBoard } from './modules/vision-board/vision-board';



export const routes: Routes = [

  {
    path: 'login',
    component: Login
  },

  {
    path: 'register',
    component: Register
  },

  {
    path: 'dashboard',
    component: Dashboard
  },

  {
    path: 'profile',
    component: Profile
},

  {
    path: 'statistics',
    component: Statistics
  },


  // =========================
  // PERSONAL LIFE MODULES
  // =========================

  {
    path: 'habit-tracker',
    component: HabitTracker
  },

  {
    path: 'sleep-tracker',
    component: SleepTracker
  },

  {
    path: 'study-planner',
    component: StudyPlanner
  },

  {
    path: 'fitness-planner',
    component: FitnessPlanner
  },

  {
    path: 'task-planner',
    component: TaskPlanner
  },

  {
    path: 'meal-planner',
    component: MealPlanner
  },

  {
    path: 'mood-tracker',
    component: MoodTracker
  },

  {
    path: 'calendar-tracker',
    component: CalendarTracker
  },

  {
    path: 'finance-tracker',
    component: FinanceTracker
  },

  {
    path: 'gratitude-journal',
    component: GratitudeJournal
  },

  {
    path: 'daily-reflection',
    component: DailyReflection
  },

  {
    path: 'water-intake',
    component: WaterIntake
  },


  // =========================
  // STUDENT FUN ZONE
  // =========================

  {
    path: 'bingo',
    component: Bingo
  },

  {
    path: 'quiz',
    component: Quiz
  },

  {
    path: 'whiteboard',
    component: Whiteboard
  },

  {
    path: 'kanban',
    component: Kanban
  },

  {
    path: 'vision-board',
    component: VisionBoard
  },


  // =========================
  // DEFAULT
  // =========================

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }

];