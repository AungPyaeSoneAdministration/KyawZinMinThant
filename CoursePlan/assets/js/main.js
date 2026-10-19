/* ============================================================
   Buddy Edu — shared UI behaviour
   (mobile nav toggle + scroll reveal + footer year)
   ============================================================ */

(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {

        /* Mobile nav */
        var toggle = document.querySelector(".nav-toggle");
        var menu = document.querySelector(".nav-menu");

        if (toggle && menu) {
            toggle.addEventListener("click", function () {
                var open = menu.classList.toggle("open");
                toggle.setAttribute("aria-expanded", open ? "true" : "false");
            });

            menu.querySelectorAll("a").forEach(function (link) {
                link.addEventListener("click", function () {
                    menu.classList.remove("open");
                    toggle.setAttribute("aria-expanded", "false");
                });
            });
        }

        /* Active nav state: current page + section scrollspy */
        var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-links a[href]"));

        if (navLinks.length) {
            var fileLinks = [];
            var hashLinks = [];

            navLinks.forEach(function (a) {
                var href = a.getAttribute("href") || "";
                if (href.charAt(0) === "#") hashLinks.push(a);
                else fileLinks.push(a);
            });

            var fileActive = null;
            fileLinks.forEach(function (a) {
                try {
                    if (new URL(a.getAttribute("href"), location.href).pathname === location.pathname) {
                        if (!fileActive) fileActive = a;
                    }
                } catch (e) { /* unsupported URL */ }
            });

            function setActive(el) {
                navLinks.forEach(function (a) {
                    var on = a === el;
                    a.classList.toggle("active", on);
                    if (on) a.setAttribute("aria-current", a.getAttribute("href").charAt(0) === "#" ? "true" : "page");
                    else a.removeAttribute("aria-current");
                });
            }

            function spy() {
                var current = null;
                hashLinks.forEach(function (a) {
                    var target = document.getElementById(a.getAttribute("href").slice(1));
                    if (target && target.getBoundingClientRect().top <= 130) current = a;
                });
                setActive(current || fileActive);
            }

            var ticking = false;
            window.addEventListener("scroll", function () {
                if (ticking) return;
                ticking = true;
                requestAnimationFrame(function () {
                    spy();
                    ticking = false;
                });
            }, { passive: true });

            hashLinks.forEach(function (a) {
                a.addEventListener("click", function () { setActive(a); });
            });

            window.addEventListener("hashchange", spy);
            spy();
        }

        /* Scroll reveal */
        var revealables = document.querySelectorAll(".fade-up");

        if ("IntersectionObserver" in window && revealables.length) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12 });

            revealables.forEach(function (el) { observer.observe(el); });
        } else {
            revealables.forEach(function (el) { el.classList.add("in-view"); });
        }

        /* Footer year */
        document.querySelectorAll("[data-year]").forEach(function (el) {
            el.textContent = new Date().getFullYear();
        });
    });
})();
