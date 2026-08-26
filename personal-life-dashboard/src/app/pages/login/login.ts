import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user';
import { ThemeService } from '../../services/theme';
import { AuthService } from '../../services/auth';
import { UserDataService } from '../../services/user-data';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
    private themeService: ThemeService,
    private authService: AuthService,
    private userDataService: UserDataService
  ) {}

  ngOnInit() {

    /*
     * =========================================
     * LOGIN STRANICA UVIJEK KORISTI DEFAULT TEMU
     * =========================================
     */

    document.body.className = '';

  }

  async login(
    email: string,
    password: string
  ) {

    if (!email || !password) {

      alert(
        'Molimo unesite e-mail i password.'
      );

      return;
    }

    try {

      /*
       * =========================================
       * FIREBASE LOGIN
       * =========================================
       */

      await this.authService.login(
        email,
        password
      );


      /*
       * =========================================
       * TRENUTNI FIREBASE KORISNIK
       * =========================================
       */

      const firebaseUser =
        this.authService.getCurrentUser();


      if (!firebaseUser) {

        alert(
          'Korisnik nije pronađen.'
        );

        return;
      }


      /*
       * =========================================
       * UČITAJ PODATKE IZ FIRESTORE
       * =========================================
       */

      const userData =
        await this.userDataService.getUserData(
          firebaseUser.uid
        );


      if (!userData) {

        alert(
          'Podaci korisnika nisu pronađeni.'
        );

        return;
      }


      /*
       * =========================================
       * KREIRAJ OBJEKAT TRENUTNOG KORISNIKA
       * =========================================
       */

      const user = {

        uid: firebaseUser.uid,

        name: userData['name'],

        email: userData['email'],

        theme: userData['theme']

      };


      /*
       * =========================================
       * SAČUVAJ TRENUTNOG KORISNIKA
       * =========================================
       */

      this.userService.setCurrentUser(user);


      /*
       * =========================================
       * POSTAVI TEMU KORISNIKA
       * =========================================
       */

      this.themeService.setTheme(
        user.theme
      );


      /*
       * =========================================
       * USPJEŠNA PRIJAVA
       * =========================================
       */

     


      /*
       * =========================================
       * PROVJERI DA LI JE ANGULAR U IFRAME-u
       * =========================================
       */

      if (
        window.top &&
        window.top !== window.self
      ) {

        window.top.postMessage({

          type: 'LOGIN_SUCCESS',

          email: user.email,

          name: user.name,

          theme: user.theme

        }, '*');

        return;
      }


      /*
       * =========================================
       * DIREKTNO OTVOREN ANGULAR LOGIN
       * =========================================
       */

      this.router.navigate([
        '/profile'
      ]);

    } catch (error: any) {

      console.error(
        'FIREBASE LOGIN ERROR:',
        error
      );


      /*
       * =========================================
       * FIREBASE GREŠKE
       * =========================================
       */

      if (
        error.code ===
        'auth/invalid-credential'
      ) {

        alert(
          'E-mail ili password nisu tačni.'
        );

      } else if (
        error.code ===
        'auth/user-not-found'
      ) {

        alert(
          'Korisnik sa ovim e-mailom ne postoji.'
        );

      } else if (
        error.code ===
        'auth/wrong-password'
      ) {

        alert(
          'Password nije tačan.'
        );

      } else if (
        error.code ===
        'auth/invalid-email'
      ) {

        alert(
          'Unesite ispravan e-mail.'
        );

      } else {

        alert(
          'Došlo je do greške prilikom prijave.'
        );

      }

    }

  }

}