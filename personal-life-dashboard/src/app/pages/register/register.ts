import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme';
import { AuthService } from '../../services/auth';
import { UserDataService } from '../../services/user-data';

@Component({
  selector: 'app-register',
  imports: [RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private authService: AuthService,
    private userDataService: UserDataService
  ) {}

  async register(
    name: string,
    email: string,
    password: string,
    theme: string
  ) {

    if (!name || !email || !password) {

      alert('Molimo popunite sva polja.');

      return;
    }

    try {

      /*
       * =========================================
       * FIREBASE REGISTRACIJA
       * =========================================
       */

      await this.authService.register(
        email,
        password
      );


      /*
       * =========================================
       * TRENUTNI FIREBASE KORISNIK
       * =========================================
       */

      const currentUser =
        this.authService.getCurrentUser();


      /*
       * =========================================
       * SAČUVAJ PODATKE U FIRESTORE
       * =========================================
       */

      if (currentUser) {

        await this.userDataService.saveUserData(
          currentUser.uid,
          name,
          email,
          theme
        );

      }


      /*
       * =========================================
       * POSTAVI TEMU
       * =========================================
       */

      this.themeService.setTheme(theme);


      /*
       * =========================================
       * USPJEŠNA REGISTRACIJA
       * =========================================
       */

      alert('Registracija je uspješna!');

      this.router.navigate(['/login']);

    } catch (error: any) {

      /*
       * =========================================
       * FIREBASE GREŠKE
       * =========================================
       */

      if (error.code === 'auth/email-already-in-use') {

        alert(
          'Korisnik sa ovim e-mailom već postoji.'
        );

      } else if (error.code === 'auth/invalid-email') {

        alert(
          'Unesite ispravan e-mail.'
        );

      } else if (error.code === 'auth/weak-password') {

        alert(
          'Password mora imati najmanje 6 znakova.'
        );

      } else {

  console.error('FIREBASE REGISTRATION ERROR:', error);

  alert(
    'GREŠKA: ' +
    (error?.code || 'Nepoznata greška') +
    '\n' +
    (error?.message || '')
  );
}

    }

  }

}