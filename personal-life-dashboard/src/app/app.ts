import { Component, signal, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  protected readonly title = signal('personal-life-dashboard');

  constructor(
    private themeService: ThemeService,
    public router: Router
  ) {}

  ngOnInit() {
    this.themeService.loadTheme();
  }

  goBackToDashboard() {
    this.router.navigate(['/dashboard']);
  }

}