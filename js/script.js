/* =========================================================
   PORTFOLIO JAVASCRIPT
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const menuToggle =
    document.querySelector(".menu-toggle");

const navLinks =
    document.querySelector(".nav-links");

const navItems =
    document.querySelectorAll(".nav-links a");

const sections =
    document.querySelectorAll("main section");

const currentYear =
    document.querySelector("#current-year");


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            navLinks.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation"
                : "Open navigation"
        );

        menuToggle.textContent =
            isOpen ? "×" : "☰";

    });

}


/* =========================================================
   CLOSE MOBILE MENU
   WHEN A NAV LINK IS CLICKED
========================================================= */

navItems.forEach((link) => {

    link.addEventListener("click", () => {

        if (!navLinks || !menuToggle) {
            return;
        }

        navLinks.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation"
        );

        menuToggle.textContent = "☰";

    });

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const observerOptions = {
    root: null,

    rootMargin: "-35% 0px -55% 0px",

    threshold: 0
};


const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                const currentId =
                    entry.target.getAttribute("id");

                navItems.forEach((link) => {

                    link.classList.remove("active");

                    const linkTarget =
                        link.getAttribute("href");

                    if (
                        linkTarget ===
                        `#${currentId}`
                    ) {

                        link.classList.add("active");

                    }

                });

            });

        },
        observerOptions
    );


sections.forEach((section) => {

    sectionObserver.observe(section);

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".section-heading, " +
        ".about-content, " +
        ".about-card, " +
        ".skill-card, " +
        ".project-card, " +
        ".experience-item, " +
        ".education-card, " +
        ".contact-card"
    );


revealElements.forEach((element) => {

    element.classList.add("reveal");

});


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add(
                    "visible"
                );

                observer.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: 0.12,

            rootMargin:
                "0px 0px -50px 0px"
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================================
   CURRENT YEAR
========================================================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}