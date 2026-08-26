# WP Projekat 2

## Personal Life Management & IPI Akademija

Web projekat razvijen u okviru predmeta **Web programiranje**. Projekat povezuje postojeću web stranicu **IPI Akademija** sa novom Angular aplikacijom **Personal Life Dashboard**.

Korisnik se može registrovati, prijaviti i koristiti personalizovani dashboard sa različitim trackerima, statistikama i Student Fun Zone modulima.

---

## Struktura projekta

Projekat se sastoji od dva glavna dijela:

### 1. IPI Akademija

`WP_Projekat2/`

Početna web stranica IPI Akademije izrađena korištenjem:

* HTML
* CSS
* JavaScript

Sadrži:

* Početnu stranicu
* Navigaciju
* Kontakt stranicu
* Raspored
* Popis
* Login/Register
* Student Fun Zone
* Bingo
* Kviz
* Whiteboard
* Kanban
* Vision Board

Postojeća stranica je proširena tako da omogućava povezivanje sa Angular aplikacijom nakon prijave korisnika.

---

### 2. Personal Life Dashboard

`personal-life-dashboard/`

Angular aplikacija koja predstavlja personalni dashboard korisnika.

Korisnik nakon registracije i prijave dobija pristup svojim trackerima, statistikama i dodatnim modulima.

## Registracija i prijava

Registracija omogućava unos:

* Ime
* E-mail
* Password
* Izbor teme

Za autentifikaciju korisnika koristi se **Firebase Authentication**.

Nakon uspješne prijave korisnik može pristupiti svom dashboardu.

---

## Personal Life Dashboard moduli

Dashboard koristi clickable cards za pristup različitim modulima:

* Habit Tracker
* Sleep Tracker
* Study Planner
* Fitness Planner
* Task Planner
* Meal Planner
* Mood Tracker
* Calendar Tracker
* Finance Tracker
* Gratitude Journal
* Daily Reflection
* Water Intake

Svi moduli su napravljeni kao Angular komponente.

Podaci se čuvaju odvojeno za korisnika.

---

## Student Fun Zone

Angular verzija Student Fun Zone sadrži:

* Bingo
* Quiz
* Whiteboard
* Kanban
* Vision Board

Ranije izrađene JavaScript funkcionalnosti su prilagođene i implementirane kao Angular komponente.

---

## Statistika

Aplikacija sadrži posebnu stranicu **Statistics** koja omogućava pregled korisničkih podataka i napretka.

Statistika uključuje:

* Bar chart za sate spavanja
* Line chart za vrijeme učenja
* Pie chart za podatke
* Poređenje napretka sedmica/mjesec
* Filter po danima

Za prikaz grafikona koristi se **Chart.js**.

Aplikacija također koristi jednostavnu logiku za generisanje AI-like uvida na osnovu korisničkih podataka.

---

## Personalizacija tema

Korisnik može odabrati temu aplikacije.

Implementirane teme uključuju:

* Green
* Blue
* Dark

Teme se dinamički učitavaju i primjenjuju na Angular aplikaciju.

---

## Firebase

Za backend funkcionalnosti koristi se Firebase.

Implementirano je:

* Firebase Authentication
* Cloud Firestore

Firebase se koristi za autentifikaciju i rad sa podacima aplikacije.

---

## Zaštita stranica

Angular aplikacija uključuje zaštitu korisničkih stranica.

Dashboard, Profile, Statistics i moduli namijenjeni prijavljenim korisnicima ne trebaju biti dostupni neprijavljenim korisnicima.

---

## Navigacija

Aplikacija omogućava jednostavno kretanje između:

* Dashboarda
* Profile stranice
* Statistics stranice
* Student Fun Zone modula
* Ostalih dashboard modula

Korisnik se može vratiti na Dashboard iz modula.

---

## Tehnologije

### Frontend

* HTML5
* CSS3
* JavaScript
* TypeScript
* Angular

### Biblioteke i alati

* Chart.js
* Firebase
* AngularFire
* npm
* Git
* GitHub
* Visual Studio Code

---

## Pokretanje Angular aplikacije

Prvo je potrebno instalirati dependencies:

```bash
npm install
```

Zatim pokrenuti razvojni server:

```bash
ng serve
```

Aplikacija će biti dostupna na:

```text
http://localhost:4200/
```

---

## Firebase konfiguracija

Angular aplikacija je povezana sa Firebase projektom putem Firebase konfiguracije.

Za korištenje vlastitog Firebase projekta potrebno je podesiti Firebase web aplikaciju, Authentication i Cloud Firestore.

---

## GitHub

Repository sadrži kompletan projekat:

```text
WP_Projekat2/
│
├── README.md
│
├── WP_Projekat2/
│   ├── index.html
│   ├── StudentFunZone.html
│   ├── bingo.html
│   ├── kviz/
│   ├── whiteboard/
│   ├── kanbanboard/
│   ├── visionboard/
│   └── ...
│
└── personal-life-dashboard/
    ├── angular.json
    ├── package.json
    ├── src/
    ├── public/
    └── ...
```

## Autor

Elmir Hanić

Projekat izrađen u okviru predmeta **Web programiranje**.
