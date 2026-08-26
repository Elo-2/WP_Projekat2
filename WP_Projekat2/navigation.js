document.addEventListener("DOMContentLoaded", function () {

    const nav = document.querySelector("nav");

    if (!nav) {
        return;
    }


    /* =========================================
       DEFINICIJE TEMA
       ========================================= */

    const themes = {

        green: {
            background: "#27e068",
            color: "#000000"
        },

        blue: {
            background: "#0095ff",
            color: "#000000"
        },

        pink: {
            background: "#ff6599",
            color: "#000000"
        },

        orange: {
            background: "#e65100",
            color: "#000000"
        },

        dark: {
            background: "#222222",
            color: "#ffffff"
        },

        cyberpunk: {
            background: "#12002b",
            color: "#00ffcc"
        }

    };


    /* =========================================
       UZMI TEMU KORISNIKA
       ========================================= */

    function getUserTheme() {

        /*
            1. oldSiteTheme je most između
               Angular aplikacije i starog sajta.
        */

        const oldTheme =
            localStorage.getItem("oldSiteTheme");


        if (oldTheme && themes[oldTheme]) {

            return oldTheme;

        }


        /*
            2. Ako postoji currentUser,
               pokušaj uzeti temu iz njega.
        */

        const currentUser =
            localStorage.getItem("currentUser");


        if (currentUser) {

            try {

                const user =
                    JSON.parse(currentUser);


                if (
                    user &&
                    user.theme &&
                    themes[user.theme]
                ) {

                    return user.theme;

                }

            } catch (error) {

                console.log(
                    "currentUser nije ispravan JSON."
                );

            }

        }


        return null;

    }


    /* =========================================
       UKLONI TEMU
       ========================================= */

    function removeFunZoneTheme() {

        document.body.style.removeProperty(
            "background-color"
        );

        document.body.style.removeProperty(
            "color"
        );


        const contentFrame =
            document.getElementById(
                "contentFrame"
            );


        if (!contentFrame) {
            return;
        }


        try {

            const frameDocument =
                contentFrame.contentDocument;


            if (
                frameDocument &&
                frameDocument.body
            ) {

                frameDocument.body.style.removeProperty(
                    "background-color"
                );

                frameDocument.body.style.removeProperty(
                    "color"
                );


                const oldStyle =
                    frameDocument.getElementById(
                        "userThemeOverride"
                    );


                if (oldStyle) {
                    oldStyle.remove();
                }

            }

        } catch (error) {

            console.log(
                "Nije moguće ukloniti temu iz igre.",
                error
            );

        }

    }


    /* =========================================
       PRIMIJENI TEMU NA IGRU
       ========================================= */

    function applyThemeToGame() {

        const contentFrame =
            document.getElementById(
                "contentFrame"
            );


        if (!contentFrame) {
            return;
        }


        const themeName =
            getUserTheme();


        /*
            Ako nema teme ili korisnik nije prijavljen,
            ništa ne mijenjamo.
        */

        if (
            localStorage.getItem(
                "oldSiteLoggedIn"
            ) !== "true"
            ||
            !themeName
        ) {

            return;

        }


        const selectedTheme =
            themes[themeName];


        if (!selectedTheme) {
            return;
        }


        try {

            const frameDocument =
                contentFrame.contentDocument ||
                contentFrame.contentWindow.document;


            if (
                !frameDocument ||
                !frameDocument.body
            ) {

                return;

            }


            /*
                =====================================
                BODY
                =====================================
            */

            frameDocument.body.style.setProperty(
                "background-color",
                selectedTheme.background,
                "important"
            );

            frameDocument.body.style.setProperty(
                "color",
                selectedTheme.color,
                "important"
            );


            /*
                =====================================
                HTML
                =====================================
            */

            frameDocument.documentElement.style.setProperty(
                "background-color",
                selectedTheme.background,
                "important"
            );


            /*
                =====================================
                CSS OVERRIDE
                =====================================
            */

            let themeStyle =
                frameDocument.getElementById(
                    "userThemeOverride"
                );


            if (!themeStyle) {

                themeStyle =
                    frameDocument.createElement(
                        "style"
                    );

                themeStyle.id =
                    "userThemeOverride";

                frameDocument.head.appendChild(
                    themeStyle
                );

            }


            themeStyle.textContent = `

                html,
                body {
                    background-color:
                        ${selectedTheme.background} !important;

                    color:
                        ${selectedTheme.color} !important;
                }

                body * {
                    color:
                        inherit;
                }

            `;


            /*
                =====================================
                POŠALJI TEMU IGRI
                =====================================
            */

            try {

                contentFrame.contentWindow.postMessage(
                    {
                        type: "USER_THEME",
                        theme: themeName,
                        background:
                            selectedTheme.background,
                        color:
                            selectedTheme.color
                    },
                    "*"
                );

            } catch (error) {

                console.log(
                    "Tema nije poslana igri.",
                    error
                );

            }


            console.log(
                "Tema primijenjena na igru:",
                themeName
            );

        }

        catch (error) {

            console.log(
                "Tema igre nije mogla biti primijenjena.",
                error
            );

        }

    }


    /* =========================================
       PRIMIJENI TEMU NA STUDENT FUN ZONE
       ========================================= */

    function applyFunZoneTheme() {

        const loggedIn =
            localStorage.getItem(
                "oldSiteLoggedIn"
            ) === "true";


        if (!loggedIn) {

            removeFunZoneTheme();

            return;

        }


        const themeName =
            getUserTheme();


        if (!themeName) {

            return;

        }


        const selectedTheme =
            themes[themeName];


        if (!selectedTheme) {

            return;

        }


        /*
            Tema glavne stranice
        */

        document.body.style.setProperty(
            "background-color",
            selectedTheme.background,
            "important"
        );

        document.body.style.setProperty(
            "color",
            selectedTheme.color,
            "important"
        );


        /*
            Tema iframe igre
        */

        applyThemeToGame();

    }


    /* =========================================
       IFRAME ZA ANGULAR
       ========================================= */

    function openAngularFrame(url) {

        let frame =
            document.getElementById(
                "navigationFrame"
            );


        if (!frame) {

            frame =
                document.createElement(
                    "iframe"
                );


            frame.id =
                "navigationFrame";

            frame.title =
                "Sadržaj";

            frame.style.width =
                "100%";

            frame.style.height =
                "750px";

            frame.style.border =
                "none";

            frame.style.display =
                "block";

            frame.style.marginTop =
                "0";

            frame.style.marginBottom =
                "0";

            frame.style.padding =
                "0";

            frame.style.backgroundColor =
                "white";


            const footer =
                document.querySelector(
                    "footer"
                );


            if (footer) {

                footer.parentNode.insertBefore(
                    frame,
                    footer
                );

            }

            else {

                document.body.appendChild(
                    frame
                );

            }

        }


        const articles =
            document.querySelectorAll(
                "article"
            );


        articles.forEach(
            function (article) {

                article.style.display =
                    "none";

            }
        );


        frame.style.display =
            "block";

        frame.src =
            url;


        frame.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    /* =========================================
       ZATVORI ANGULAR IFRAME
       ========================================= */

    function closeAngularFrame() {

        const frame =
            document.getElementById(
                "navigationFrame"
            );


        if (frame) {

            frame.style.display =
                "none";

            frame.src =
                "about:blank";

        }


        const articles =
            document.querySelectorAll(
                "article"
            );


        articles.forEach(
            function (article) {

                article.style.display =
                    "";

            }
        );

    }


    /* =========================================
       PROVJERA LOGIN STATUSA
       ========================================= */

    function isLoggedIn() {

        const oldSiteLoggedIn =
            localStorage.getItem(
                "oldSiteLoggedIn"
            ) === "true";


        const currentUser =
            localStorage.getItem(
                "currentUser"
            );


        const params =
            new URLSearchParams(
                window.location.search
            );


        const loggedParameter =
            params.get("logged");


        if (loggedParameter === "1") {

            localStorage.setItem(
                "oldSiteLoggedIn",
                "true"
            );

            return true;

        }


        return (
            oldSiteLoggedIn ||
            !!currentUser
        );

    }


    /* =========================================
       LINK IGRE
       ========================================= */

    function gameLink(game) {

        return (
            "studentfunzone.html?game=" +
            game +
            "&logged=1"
        );

    }


    /* =========================================
       NEULOGOVANA NAVIGACIJA
       ========================================= */

    function showLoggedOutNavigation() {

        nav.innerHTML = `

            <ul>

                <li>
                    <a href="index.html">
                        O kursevima
                    </a>
                </li>

                <li>
                    <a href="popis.html">
                        Popis kurseva
                    </a>
                </li>

                <li>
                    <a href="raspored.html">
                        Raspored kurseva
                    </a>
                </li>

                <li class="dropdown">

                    <a href="studentfunzone.html">
                        Student Fun Zone
                    </a>

                    <ul class="submenu">

                        <li>
                            <a href="studentfunzone.html?game=bingo">
                                Bingo
                            </a>
                        </li>

                        <li>
                            <a href="studentfunzone.html?game=kviz">
                                Kviz
                            </a>
                        </li>

                        <li>
                            <a href="studentfunzone.html?game=whiteboard">
                                Interaktivni Whiteboard
                            </a>
                        </li>

                        <li>
                            <a href="studentfunzone.html?game=visionboard">
                                Visual Board
                            </a>
                        </li>

                        <li>
                            <a href="studentfunzone.html?game=kanbanboard">
                                Kanban Board
                            </a>
                        </li>

                    </ul>

                </li>

                <li>
                    <a href="#" id="navigationLogin">
                        Login / Register
                    </a>
                </li>

                <li>
                    <a href="kontakt.html">
                        Kontakt
                    </a>
                </li>

            </ul>

        `;


        removeFunZoneTheme();


        const loginLink =
            document.getElementById(
                "navigationLogin"
            );


        if (loginLink) {

            loginLink.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    if (
                        window.parent !== window
                    ) {

                        window.parent.postMessage(
                            {
                                type: "OPEN_LOGIN"
                            },
                            "*"
                        );

                    }

                    else {

                        openAngularFrame(
                            "http://localhost:4200/login"
                        );

                    }

                }
            );

        }

    }


    /* =========================================
       ULOGOVANA NAVIGACIJA
       ========================================= */

    function showLoggedInNavigation() {

        nav.innerHTML = `

            <ul>

                <li>
                    <a href="#" id="navigationProfile">
                        View Profile
                    </a>
                </li>

                <li class="dropdown">

                    <a href="#">
                        Student Fun Zone
                    </a>

                    <ul class="submenu">

                        <li>
                            <a href="${gameLink("bingo")}">
                                Bingo
                            </a>
                        </li>

                        <li>
                            <a href="${gameLink("kviz")}">
                                Kviz
                            </a>
                        </li>

                        <li>
                            <a href="${gameLink("whiteboard")}">
                                Interaktivni Whiteboard
                            </a>
                        </li>

                        <li>
                            <a href="${gameLink("visionboard")}">
                                Visual Board
                            </a>
                        </li>

                        <li>
                            <a href="${gameLink("kanbanboard")}">
                                Kanban Board
                            </a>
                        </li>

                    </ul>

                </li>

                <li>
                    <a href="#" id="navigationDashboard">
                        Dashboard
                    </a>
                </li>

                <li>
                    <a href="#" id="navigationLogout">
                        Logout
                    </a>
                </li>

            </ul>

        `;


        /*
            Primijeni temu odmah.
        */

        applyFunZoneTheme();


        /* =========================================
           VIEW PROFILE
           ========================================= */

        const profile =
            document.getElementById(
                "navigationProfile"
            );


        if (profile) {

            profile.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    if (
                        window.parent !== window
                    ) {

                        window.parent.postMessage(
                            {
                                type: "OPEN_PROFILE"
                            },
                            "*"
                        );

                    }

                    else {

                        openAngularFrame(
                            "http://localhost:4200/profile"
                        );

                    }

                }
            );

        }


        /* =========================================
           DASHBOARD
           ========================================= */

        const dashboard =
            document.getElementById(
                "navigationDashboard"
            );


        if (dashboard) {

            dashboard.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    if (
                        window.parent !== window
                    ) {

                        window.parent.postMessage(
                            {
                                type: "OPEN_DASHBOARD"
                            },
                            "*"
                        );

                    }

                    else {

                        openAngularFrame(
                            "http://localhost:4200/dashboard"
                        );

                    }

                }
            );

        }


        /* =========================================
           LOGOUT
           ========================================= */

        const logout =
            document.getElementById(
                "navigationLogout"
            );


        if (logout) {

            logout.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    localStorage.removeItem(
                        "currentUser"
                    );

                    localStorage.removeItem(
                        "oldSiteLoggedIn"
                    );

                    localStorage.removeItem(
                        "oldSiteTheme"
                    );


                    removeFunZoneTheme();


                    if (
                        window.parent !== window
                    ) {

                        window.parent.postMessage(
                            {
                                type: "LOGOUT"
                            },
                            "*"
                        );

                    }

                    else {

                        showLoggedOutNavigation();

                        closeAngularFrame();

                    }

                }
            );

        }

    }


    /* =========================================
       POČETNA NAVIGACIJA
       ========================================= */

    if (isLoggedIn()) {

        showLoggedInNavigation();

    }

    else {

        showLoggedOutNavigation();

    }


    /* =========================================
       PORUKE
       ========================================= */

    window.addEventListener(
        "message",
        function (event) {

            if (!event.data) {
                return;
            }


            /* =====================================
               USPJEŠAN LOGIN
               ===================================== */

            if (
                event.data.type ===
                "LOGIN_SUCCESS"
            ) {

                localStorage.setItem(
                    "oldSiteLoggedIn",
                    "true"
                );


                /*
                    Ovo je jako važno.

                    Angular mora poslati temu,
                    a mi je ovdje čuvamo za stari
                    sajt i njegove igre.
                */

                if (event.data.theme) {

                    localStorage.setItem(
                        "oldSiteTheme",
                        event.data.theme
                    );

                }


                showLoggedInNavigation();


                setTimeout(
                    function () {

                        openAngularFrame(
                            "http://localhost:4200/profile"
                        );

                    },
                    100
                );

            }


            /* =====================================
               OPEN LOGIN
               ===================================== */

            if (
                event.data.type ===
                "OPEN_LOGIN"
            ) {

                openAngularFrame(
                    "http://localhost:4200/login"
                );

            }


            /* =====================================
               OPEN PROFILE
               ===================================== */

            if (
                event.data.type ===
                "OPEN_PROFILE"
            ) {

                openAngularFrame(
                    "http://localhost:4200/profile"
                );

            }


            /* =====================================
               OPEN DASHBOARD
               ===================================== */

            if (
                event.data.type ===
                "OPEN_DASHBOARD"
            ) {

                openAngularFrame(
                    "http://localhost:4200/dashboard"
                );

            }


            /* =====================================
               LOGOUT
               ===================================== */

            if (
                event.data.type ===
                "LOGOUT"
            ) {

                localStorage.removeItem(
                    "currentUser"
                );

                localStorage.removeItem(
                    "oldSiteLoggedIn"
                );

                localStorage.removeItem(
                    "oldSiteTheme"
                );


                removeFunZoneTheme();


                showLoggedOutNavigation();

                closeAngularFrame();

            }

        }
    );


    /* =========================================
       AKO SE PROMIJENI IFRAME
       ========================================= */

    const contentFrame =
        document.getElementById(
            "contentFrame"
        );


    if (contentFrame) {

        contentFrame.addEventListener(
            "load",
            function () {

                /*
                    Sačekaj da se Bingo/Kviz itd.
                    potpuno učita.
                */

                setTimeout(
                    function () {

                        applyThemeToGame();

                    },
                    100
                );

            }
        );

    }

});