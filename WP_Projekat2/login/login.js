// ==========================================
// LOGIN / REGISTER
// ==========================================

const loginSection = document.getElementById("loginSection");
const registerSection = document.getElementById("registerSection");

const registerLink = document.getElementById("registerLink");
const loginBackLink = document.getElementById("loginBackLink");


// ==========================================
// PRELAZAK NA REGISTER
// ==========================================

registerLink.addEventListener("click", function(event) {

    event.preventDefault();

    loginSection.style.display = "none";
    registerSection.style.display = "block";

});


// ==========================================
// POVRATAK NA LOGIN
// ==========================================

loginBackLink.addEventListener("click", function(event) {

    event.preventDefault();

    registerSection.style.display = "none";
    loginSection.style.display = "block";

});


// ==========================================
// REGISTER
// ==========================================

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("registerName").value.trim();

    const email =
        document.getElementById("registerEmail").value.trim();

    const password =
        document.getElementById("registerPassword").value;

    const theme =
        document.getElementById("theme").value;


    // Provjera da li su svi podaci uneseni

    if (!name || !email || !password || !theme) {

        alert("Popunite sva polja.");

        return;
    }


    // Provjera da li korisnik već postoji

    const existingUser =
        JSON.parse(localStorage.getItem("ipiUser"));


    if (existingUser && existingUser.email === email) {

        alert("Korisnik sa ovim e-mailom već postoji.");

        return;
    }


    // Kreiranje korisnika

    const user = {

        name: name,
        email: email,
        password: password,
        theme: theme

    };


    // Spremanje korisnika

    localStorage.setItem(
        "ipiUser",
        JSON.stringify(user)
    );


    alert("Registracija je uspješna! Sada se možete prijaviti.");


    // Prebacivanje na Login

    registerForm.reset();

    registerSection.style.display = "none";
    loginSection.style.display = "block";

});


// ==========================================
// LOGIN
// ==========================================

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;


    // Uzimamo korisnika iz localStorage

    const user =
        JSON.parse(localStorage.getItem("ipiUser"));


    // Ako korisnik nije registrovan

    if (!user) {

        alert("Korisnik ne postoji. Prvo napravite račun.");

        return;
    }


    // Provjera podataka

    if (
        email === user.email &&
        password === user.password
    ) {

        // Spremamo trenutno prijavljenog korisnika

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(user)
        );


        // Šaljemo poruku glavnom index.html

        window.parent.postMessage({

            type: "LOGIN_SUCCESS",

            email: user.email,

            name: user.name,

            theme: user.theme

        }, "*");


    } else {

        alert("Pogrešan e-mail ili password.");

    }

});