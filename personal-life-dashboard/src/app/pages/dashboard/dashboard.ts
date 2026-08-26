import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user';

interface DashboardModule {
  name: string;
  description: string;
  route: string;
  enabled: boolean;
}

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  modules: DashboardModule[] = [

    {
      name: 'Habit Tracker',
      description: 'Pratite svoje navike.',
      route: '/habit-tracker',
      enabled: true
    },

    {
      name: 'Sleep Tracker',
      description: 'Pratite vrijeme spavanja.',
      route: '/sleep-tracker',
      enabled: true
    },

    {
      name: 'Study Planner',
      description: 'Organizujte vrijeme za učenje.',
      route: '/study-planner',
      enabled: true
    },

    {
      name: 'Fitness Planner',
      description: 'Pratite fizičke aktivnosti.',
      route: '/fitness-planner',
      enabled: true
    },

    {
      name: 'Task Planner',
      description: 'Organizujte zadatke i projekte.',
      route: '/task-planner',
      enabled: true
    },

    {
      name: 'Meal Planner',
      description: 'Planirajte svoje obroke.',
      route: '/meal-planner',
      enabled: true
    },

    {
      name: 'Mood Tracker',
      description: 'Pratite svoje raspoloženje.',
      route: '/mood-tracker',
      enabled: true
    },

    {
      name: 'Calendar Tracker',
      description: 'Organizujte događaje.',
      route: '/calendar-tracker',
      enabled: true
    },

    {
      name: 'Finance Tracker',
      description: 'Pratite prihode i troškove.',
      route: '/finance-tracker',
      enabled: true
    },

    {
      name: 'Gratitude Journal',
      description: 'Zapišite na čemu ste zahvalni.',
      route: '/gratitude-journal',
      enabled: true
    },

    {
      name: 'Daily Reflection',
      description: 'Analizirajte svoj dan.',
      route: '/daily-reflection',
      enabled: true
    },

    {
      name: 'Water Intake',
      description: 'Pratite unos vode.',
      route: '/water-intake',
      enabled: true
    }

  ];

  constructor(
    private userService: UserService
  ) {

    this.loadModules();

  }


  getStorageKey(): string {

    const email =
      this.userService.getUserKey();

    return 'dashboardModules_' + email;

  }


  toggleModule(module: DashboardModule) {

    module.enabled =
      !module.enabled;

    this.saveModules();

  }


  saveModules() {

    const enabledModules =
      this.modules.map(module => ({
        name: module.name,
        enabled: module.enabled
      }));

    localStorage.setItem(
      this.getStorageKey(),
      JSON.stringify(enabledModules)
    );

  }


  loadModules() {

    const savedModules =
      localStorage.getItem(
        this.getStorageKey()
      );

    if (!savedModules) {
      return;
    }

    try {

      const saved =
        JSON.parse(savedModules);

      if (!Array.isArray(saved)) {
        return;
      }

      this.modules.forEach(module => {

        const savedModule =
          saved.find(
            (item: any) =>
              item.name === module.name
          );

        if (savedModule) {

          module.enabled =
            savedModule.enabled;

        }

      });

    } catch {

      console.log(
        'Greška pri učitavanju dashboard modula.'
      );

    }

  }

}