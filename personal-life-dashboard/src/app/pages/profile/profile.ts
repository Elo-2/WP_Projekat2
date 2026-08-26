import { Component } from '@angular/core';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {

  user: any;

  constructor(
    private userService: UserService
  ) {

    this.user =
      this.userService.getCurrentUser();

  }

}