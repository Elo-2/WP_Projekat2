import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  setTheme(theme: string) {

    document.body.className = theme;

    localStorage.setItem('theme', theme);
  }


  loadTheme() {

    const theme = localStorage.getItem('theme');

    if (theme) {

      document.body.className = theme;

    }

  }


  setDefaultTheme() {

    document.body.className = '';

  }

}