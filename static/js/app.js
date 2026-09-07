/* =========================================================
   ASCND SYSTEM // APP.JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    /* =====================================================
       PLAYER RESOURCE BARS
    ====================================================== */

    const resourceBars = document.querySelectorAll(
        ".resource-fill"
    );

    const resourceObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                const bar = entry.target;
                const width = bar.dataset.width;

                setTimeout(() => {
                    bar.style.width = width;
                }, 250);

                resourceObserver.unobserve(bar);

            });

        },
        {
            threshold: 0.5
        }
    );

    resourceBars.forEach((bar) => {
        resourceObserver.observe(bar);
    });


    /* =====================================================
       MECHANIC TABS
    ====================================================== */

    const mechanicTabs =
        document.querySelectorAll(".mechanic-tab");

    const mechanicPanels =
        document.querySelectorAll(".mechanic-panel");


    mechanicTabs.forEach((tab) => {

        tab.addEventListener("click", () => {

            const target = tab.dataset.mechanic;

            mechanicTabs.forEach((item) => {
                item.classList.remove("active");
            });

            mechanicPanels.forEach((panel) => {
                panel.classList.remove("active");
            });

            tab.classList.add("active");

            const targetPanel =
                document.querySelector(
                    `[data-panel="${target}"]`
                );

            if (targetPanel) {
                targetPanel.classList.add("active");
            }

        });

    });


    /* =====================================================
       TESTIMONIAL CAROUSEL
    ====================================================== */

    const reportsTrack =
        document.getElementById("reportsTrack");

    const reports =
        document.querySelectorAll(".report-card");

    const prevButton =
        document.getElementById("prevReport");

    const nextButton =
        document.getElementById("nextReport");

    const dots =
        document.querySelectorAll("#carouselDots button");

    let currentReport = 0;


    function updateReport(index) {

        if (!reportsTrack) {
            return;
        }

        if (index < 0) {
            index = reports.length - 1;
        }

        if (index >= reports.length) {
            index = 0;
        }

        currentReport = index;

        reportsTrack.style.transform =
            `translateX(-${currentReport * 100}%)`;

        dots.forEach((dot, dotIndex) => {

            dot.classList.toggle(
                "active",
                dotIndex === currentReport
            );

        });

    }


    if (prevButton) {

        prevButton.addEventListener(
            "click",
            () => updateReport(currentReport - 1)
        );

    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            () => updateReport(currentReport + 1)
        );

    }


    dots.forEach((dot, index) => {

        dot.addEventListener(
            "click",
            () => updateReport(index)
        );

    });


    /* =====================================================
       AUTO CAROUSEL
    ====================================================== */

    let carouselTimer = setInterval(() => {

        updateReport(currentReport + 1);

    }, 6000);


    function resetCarouselTimer() {

        clearInterval(carouselTimer);

        carouselTimer = setInterval(() => {
            updateReport(currentReport + 1);
        }, 6000);

    }


    if (prevButton) {
        prevButton.addEventListener(
            "click",
            resetCarouselTimer
        );
    }

    if (nextButton) {
        nextButton.addEventListener(
            "click",
            resetCarouselTimer
        );


    }


    /* =====================================================
       WAITLIST FORM
    ====================================================== */

    const waitlistForm =
        document.getElementById("waitlistForm");

    const emailInput =
        document.getElementById("email");

    const formMessage =
        document.getElementById("formMessage");


    if (waitlistForm) {

        waitlistForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();

                const email =
                    emailInput.value.trim();


                if (!email) {

                    showFormMessage(
                        "ENTER A VALID EMAIL ADDRESS.",
                        "error"
                    );

                    return;
                }


                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!emailPattern.test(email)) {

                    showFormMessage(
                        "INVALID EMAIL FORMAT.",
                        "error"
                    );

                    return;
                }


                showFormMessage(
                    "INITIALIZING HUNTER KEY...",
                    ""
                );


                /*
                 * This currently works as a frontend demo.
                 *
                 * Later, connect this to:
                 *
                 * POST /api/waitlist
                 *
                 * using fetch().
                 */


                await new Promise(
                    resolve => setTimeout(resolve, 900)
                );


                showFormMessage(
                    "✓ HUNTER KEY REQUESTED. SYSTEM WILL CONTACT YOU.",
                    "success"
                );


                emailInput.value = "";

            }
        );

    }


    function showFormMessage(message, type) {

        if (!formMessage) {
            return;
        }

        formMessage.textContent = message;

        formMessage.className =
            "form-message";

        if (type) {
            formMessage.classList.add(type);
        }

    }


    /* =====================================================
       MOBILE MENU
    ====================================================== */

    const mobileMenu =
        document.getElementById("mobileMenu");

    const navLinks =
        document.querySelector(".nav-links");


    if (mobileMenu) {

        mobileMenu.addEventListener(
            "click",
            () => {

                navLinks.classList.toggle(
                    "mobile-open"
                );

            }
        );

    }


    /* =====================================================
       HUD MOUSE PARALLAX
    ====================================================== */

    const playerCard =
        document.querySelector(".player-card");

    const heroVisual =
        document.querySelector(".hero-visual");


    if (
        playerCard &&
        heroVisual &&
        window.innerWidth > 900
    ) {

        heroVisual.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    heroVisual.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateY =
                    ((x - centerX) / centerX) * 4;

                const rotateX =
                    ((centerY - y) / centerY) * 4;


                playerCard.style.transform =
                    `rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-4px)`;

            }
        );


        heroVisual.addEventListener(
            "mouseleave",
            () => {

                playerCard.style.transform = "";

            }
        );

    }


    /* =====================================================
       STAT COUNTER EFFECT
    ====================================================== */

    const statNumbers =
        document.querySelectorAll(".stat strong");


    function animateNumber(element) {

        const target =
            parseInt(element.textContent);

        if (isNaN(target)) {
            return;
        }

        let current = 0;

        const duration = 900;

        const startTime = performance.now();


        function tick(currentTime) {

            const progress =
                Math.min(
                    (currentTime - startTime) / duration,
                    1
                );


            const eased =
                1 - Math.pow(1 - progress, 3);


            current =
                Math.floor(target * eased);


            element.textContent = current;


            if (progress < 1) {

                requestAnimationFrame(tick);

            } else {

                element.textContent = target;

            }

        }


        element.textContent = "0";

        requestAnimationFrame(tick);

    }


    const statObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        const stat =
                            entry.target;

                        animateNumber(stat);

                        statObserver.unobserve(stat);

                    }

                });

            },
            {
                threshold: 0.8
            }
        );


    statNumbers.forEach((number) => {
        statObserver.observe(number);
    });


    /* =====================================================
       SMOOTH ANCHOR NAVIGATION
    ====================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(targetId);


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =====================================================
       SYSTEM BOOT MESSAGE
    ====================================================== */

    console.log(`
╔══════════════════════════════════════╗
║          ASCND SYSTEM v2.0           ║
║                                      ║
║  STATUS: ONLINE                      ║
║  CORE: INITIALIZED                   ║
║  HUNTER PROTOCOL: READY              ║
║                                      ║
║  Welcome, Hunter.                    ║
╚══════════════════════════════════════╝
    `);

});