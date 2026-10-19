/* ============================================================
   Buddy Edu — i18n engine (English / မြန်မာ)
   ------------------------------------------------------------
   Usage in a page:
     1. Add data-i18n="key" to any element (text is replaced).
        data-i18n-attr="placeholder:key2,aria-label:key3"
        data-i18n-html="key"  -> inject as HTML (for <span> inside headings)
     2. Define:  const I18N = { en: {...}, my: {...} };
     3. BuddyI18n.init(I18N) runs the switcher.

   Buttons in the navbar:  <button class="lang-btn" data-set-lang="en">EN</button>
   ============================================================ */

(function () {
    "use strict";

    var LANG_KEY = "buddyEduLang";
    var SHARED_LANG_KEY = "pj-lang"; /* shared with the Learning section */
    var currentLang = "en";
    var dict = { en: {}, my: {} };

    function storageGet(key) {
        try { return localStorage.getItem(key); } catch (e) { return null; }
    }

    function storageSet(key, value) {
        try { localStorage.setItem(key, value); } catch (e) { /* private mode */ }
    }

    function getLang() {
        var saved = storageGet(LANG_KEY);
        if (saved !== "en" && saved !== "my") {
            var shared = storageGet(SHARED_LANG_KEY);
            if (shared === "mm") saved = "my";
            else if (shared === "en") saved = "en";
        }
        if (saved === "en" || saved === "my") return saved;

        var nav = (navigator.language || "en").toLowerCase();
        return nav.indexOf("my") === 0 ? "my" : "en";
    }

    function t(key, vars) {
        var table = dict[currentLang] || {};
        var fallback = dict.en || {};
        var text = table[key];

        if (typeof text !== "string") text = fallback[key];
        if (typeof text !== "string") return key;

        if (vars) {
            Object.keys(vars).forEach(function (name) {
                text = text.split("{" + name + "}").join(vars[name]);
            });
        }
        return text;
    }

    function translateElement(el) {
        var key = el.getAttribute("data-i18n");
        if (key) {
            var value = t(key);
            if (el.hasAttribute("data-i18n-html")) {
                el.innerHTML = value;
            } else {
                el.textContent = value;
            }
        }

        var attrSpec = el.getAttribute("data-i18n-attr");
        if (attrSpec) {
            attrSpec.split(",").forEach(function (pair) {
                var bits = pair.split(":");
                if (bits.length === 2) {
                    el.setAttribute(bits[0].trim(), t(bits[1].trim()));
                }
            });
        }

        if (el.hasAttribute("data-i18n-placeholder")) {
            el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
        }
    }

    function apply() {
        document.documentElement.lang = currentLang === "my" ? "my" : "en";
        document.documentElement.setAttribute("data-lang", currentLang);

        document.querySelectorAll("[data-i18n], [data-i18n-attr], [data-i18n-placeholder]")
            .forEach(translateElement);

        document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
            btn.classList.toggle("active", btn.getAttribute("data-set-lang") === currentLang);
            btn.setAttribute("aria-pressed", btn.getAttribute("data-set-lang") === currentLang ? "true" : "false");
        });

        document.title = t("__title__") !== "__title__" ? t("__title__") : document.title;

        // Let page scripts react (e.g. re-render dynamic lists)
        document.dispatchEvent(new CustomEvent("buddy:langchange", { detail: { lang: currentLang } }));
    }

    function setLang(lang) {
        if (lang !== "en" && lang !== "my") return;
        currentLang = lang;
        storageSet(LANG_KEY, lang);
        storageSet(SHARED_LANG_KEY, lang === "my" ? "mm" : "en");
        apply();
    }

    function init(pageDict) {
        if (pageDict) {
            ["en", "my"].forEach(function (code) {
                if (pageDict[code]) Object.assign(dict[code], pageDict[code]);
            });
        }
        currentLang = getLang();

        document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
            btn.addEventListener("click", function () {
                setLang(btn.getAttribute("data-set-lang"));
            });
        });

        apply();
    }

    window.BuddyI18n = { init: init, t: t, setLang: setLang, getLang: getLang, apply: apply };
})();
