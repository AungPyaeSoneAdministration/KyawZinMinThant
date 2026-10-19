/* Buddy Edu — page enter/leave transitions
   Self-contained: injects its own CSS, animates top-level content on load,
   and fades out before internal link navigation. Respects reduced-motion.
   Load this in <head> (synchronous, no defer) to avoid a flash of content. */
(function () {
    "use strict";

    if (window.__buddyTransitions) return;
    window.__buddyTransitions = true;

    var reduced = window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- Inject CSS ---------- */
    var css = [
        "@keyframes buddy-in{",
        "  from{opacity:0;transform:translateY(18px)}",
        "  to{opacity:1;transform:none}",
        "}",
        "@keyframes buddy-out{",
        "  from{opacity:1;transform:none}",
        "  to{opacity:0;transform:translateY(-12px)}",
        "}",
        /* Hide content while the boot class is on <html> (prevents FOUC). */
        ".buddy-pre body > *:not(script):not(style):not(noscript):not(link):not(template){opacity:0 !important}",
        ".buddy-in{animation:buddy-in .6s cubic-bezier(.22,.61,.36,1) both}",
        ".buddy-leave{animation:buddy-out .25s ease-in both !important;pointer-events:none !important}",
        "body.page-leaving{pointer-events:none}",
        "@media (prefers-reduced-motion:reduce){",
        "  .buddy-pre body > *{opacity:1 !important}",
        "  .buddy-in,.buddy-leave{animation:none !important}",
        "}"
    ].join("\n");

    var style = document.createElement("style");
    style.setAttribute("data-buddy-transitions", "");
    style.appendChild(document.createTextNode(css));
    (document.head || document.documentElement).appendChild(style);

    /* No animations for reduced-motion users — leave everything visible. */
    if (reduced) return;

    /* Hide content immediately (script runs in <head>, before <body> renders). */
    document.documentElement.classList.add("buddy-pre");

    function onReady(fn) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", fn);
        } else {
            fn();
        }
    }

    /* Top-level content nodes worth animating (skips hidden/decorative ones). */
    function contentNodes() {
        var out = [];
        var kids = document.body ? document.body.children : [];
        for (var i = 0; i < kids.length; i++) {
            var el = kids[i];
            var tag = el.tagName;
            if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT" ||
                tag === "LINK" || tag === "TEMPLATE") continue;
            if (el.classList.contains("backdrop")) continue;
            var cs = window.getComputedStyle(el);
            if (cs.display === "none" || cs.visibility === "hidden") continue;
            out.push(el);
        }
        return out;
    }

    var animated = [];

    function enter() {
        animated = contentNodes();
        for (var i = 0; i < animated.length; i++) {
            animated[i].style.animationDelay = (i * 70) + "ms";
            animated[i].classList.add("buddy-in");
        }
        /* Remove the hide-class in the same frame so the animation (which
           starts at opacity 0) takes over with no flash. */
        document.documentElement.classList.remove("buddy-pre");
    }

    onReady(enter);

    /* Safety net: never leave content hidden if something above failed. */
    setTimeout(function () {
        document.documentElement.classList.remove("buddy-pre");
    }, 2500);

    /* ---------- Leave: fade out, then navigate ---------- */
    var leaving = false;

    function sameOrigin(url) {
        try {
            var u = new URL(url, location.href);
            /* On file:// both origins are the string "null" — treat as internal. */
            if (location.protocol === "file:") return u.protocol === "file:";
            return u.origin === location.origin;
        } catch (e) {
            return false;
        }
    }

    function shouldAnimate(anchor) {
        if (!anchor) return false;
        if (anchor.target && anchor.target !== "_self") return false;
        if (anchor.hasAttribute("download")) return false;
        if (anchor.hasAttribute("data-no-transition")) return false;
        var href = anchor.getAttribute("href");
        if (!href || href.charAt(0) === "#") return false;
        if (/^(mailto:|tel:|javascript:)/i.test(href)) return false;
        if (!sameOrigin(href)) return false;
        return true;
    }

    document.addEventListener("click", function (e) {
        if (leaving || e.defaultPrevented) return;
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

        var el = e.target;
        var anchor = (el && el.closest) ? el.closest("a[href]") : null;
        if (!shouldAnimate(anchor)) return;

        e.preventDefault();
        leaving = true;

        var dest = anchor.href;
        var nodes = animated.length ? animated : contentNodes();
        document.body.classList.add("page-leaving");
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].style.animationDelay = "0ms";
            nodes[i].classList.remove("buddy-in");
            nodes[i].classList.add("buddy-leave");
        }

        setTimeout(function () { location.href = dest; }, 250);
    }, true);

    /* Restore cleanly if the page is restored from bfcache. */
    window.addEventListener("pageshow", function (e) {
        if (!e.persisted) return;
        leaving = false;
        document.documentElement.classList.remove("buddy-pre");
        if (document.body) document.body.classList.remove("page-leaving");
        for (var i = 0; i < animated.length; i++) {
            animated[i].classList.remove("buddy-leave");
            animated[i].classList.add("buddy-in");
        }
    });
})();
