/* Buddy Edu — message box (replaces native alert/confirm/prompt)
   Self-contained: injects its own CSS. Drop into <head> and use:
     BuddyBox.confirm(msg)  -> Promise<boolean>
     BuddyBox.alert(msg)    -> Promise<true>       (OK only)
     BuddyBox.toast(msg)    -> transient notice, auto-dismiss
   Buttons auto-localise using BuddyI18n when present. */
(function () {
    "use strict";
    if (window.BuddyBox) return;

    var css = [
        ".bb-overlay{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;",
        "  background:rgba(15,23,42,.55);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);",
        "  opacity:0;animation:bb-fade .18s ease forwards}",
        "@keyframes bb-fade{to{opacity:1}}",
        ".bb-box{width:100%;max-width:420px;background:var(--surface,#fff);color:var(--text,#0f172a);",
        "  border:1px solid var(--border,rgba(15,23,42,.12));border-radius:16px;padding:22px 22px 18px;",
        "  box-shadow:0 24px 60px rgba(15,23,42,.28);transform:translateY(14px) scale(.97);",
        "  animation:bb-pop .2s cubic-bezier(.22,.61,.36,1) forwards}",
        "@keyframes bb-pop{to{transform:none}}",
        ".bb-title{display:flex;align-items:center;gap:10px;font-weight:700;font-size:16px;margin:0 0 8px}",
        ".bb-icon{width:26px;height:26px;flex:0 0 26px;border-radius:50%;display:grid;place-items:center;",
        "  font-size:15px;font-weight:800;background:var(--accent-soft,#fee2e2);color:var(--accent,#dc2626)}",
        ".bb-msg{margin:0;font-size:14px;line-height:1.55;color:var(--text-muted,#475569);opacity:.95}",
        ".bb-actions{display:flex;gap:10px;justify-content:flex-end;margin-top:20px}",
        ".bb-btn{appearance:none;border:1px solid transparent;border-radius:10px;padding:9px 18px;font:inherit;",
        "  font-size:14px;font-weight:600;cursor:pointer;transition:transform .12s ease,filter .12s ease,background .12s ease}",
        ".bb-btn:active{transform:translateY(1px)}",
        ".bb-btn:focus-visible{outline:2px solid var(--accent,#2563eb);outline-offset:2px}",
        ".bb-cancel{background:transparent;color:var(--text-muted,#475569);border-color:var(--border,rgba(15,23,42,.14))}",
        ".bb-cancel:hover{background:var(--surface-2,#f1f5f9)}",
        ".bb-ok{background:var(--accent,#dc2626);color:#fff}",
        ".bb-ok:hover{filter:brightness(1.06)}",
        /* toast */
        ".bb-toast{position:fixed;left:50%;bottom:28px;transform:translate(-50%,20px);z-index:10000;",
        "  background:var(--surface,#0f172a);color:var(--text,#f8fafc);border:1px solid var(--border,rgba(148,163,184,.28));",
        "  padding:11px 18px;border-radius:12px;font-size:14px;font-weight:600;box-shadow:0 16px 40px rgba(0,0,0,.3);",
        "  opacity:0;animation:bb-toast-in .22s ease forwards;max-width:90vw;text-align:center}",
        "@keyframes bb-toast-in{to{opacity:1;transform:translate(-50%,0)}}",
        ".bb-toast.bb-out{animation:bb-toast-out .2s ease forwards}",
        "@keyframes bb-toast-out{to{opacity:0;transform:translate(-50%,16px)}}",
        "@media (prefers-reduced-motion:reduce){.bb-overlay,.bb-box,.bb-toast{animation:none!important;opacity:1!important;transform:none!important}}",
        "html.buddy-pre .bb-overlay{opacity:1}" /* keep box visible even during page enter */
    ].join("\n");

    var style = document.createElement("style");
    style.setAttribute("data-buddy-box", "");
    style.appendChild(document.createTextNode(css));
    (document.head || document.documentElement).appendChild(style);

    var LABELS = {
        en: { ok: "OK", cancel: "Cancel", close: "Close" },
        my: { ok: "အိုကေ", cancel: "ပယ်ဖျက်", close: "ပိတ်ရန်" }
    };

    function lang() {
        try {
            if (window.BuddyI18n && typeof BuddyI18n.getLang === "function") {
                var l = BuddyI18n.getLang();
                if (l === "my" || l === "en") return l;
            }
        } catch (e) {}
        return "en";
    }
    function label(kind) {
        var set = LABELS[lang()] || LABELS.en;
        return set[kind] || LABELS.en[kind];
    }

    function focusables(root) {
        return Array.prototype.filter.call(
            root.querySelectorAll('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'),
            function (el) { return !el.disabled && el.offsetParent !== null; }
        );
    }

    /* Shared dialog core. opts: {title, message, okText, cancelText, showCancel, icon} */
    function dialog(opts) {
        return new Promise(function (resolve) {
            var overlay = document.createElement("div");
            overlay.className = "bb-overlay";
            overlay.setAttribute("role", "alertdialog");
            overlay.setAttribute("aria-modal", "true");

            var box = document.createElement("div");
            box.className = "bb-box";

            var title = document.createElement("h3");
            title.className = "bb-title";
            if (opts.icon !== null) {
                var ic = document.createElement("span");
                ic.className = "bb-icon";
                ic.setAttribute("aria-hidden", "true");
                ic.textContent = opts.icon || "!";
                title.appendChild(ic);
            }
            var tspan = document.createElement("span");
            tspan.textContent = opts.title || "";
            title.appendChild(tspan);

            var msg = document.createElement("p");
            msg.className = "bb-msg";
            msg.textContent = opts.message || "";

            var actions = document.createElement("div");
            actions.className = "bb-actions";

            var cancelBtn, okBtn, done = false;

            function finish(val) {
                if (done) return;
                done = true;
                document.removeEventListener("keydown", onKey, true);
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
                if (document.body) document.body.style.removeProperty("overflow");
                resolve(val);
            }

            function onKey(e) {
                if (e.key === "Escape") { e.preventDefault(); finish(false); }
                else if (e.key === "Enter") { e.preventDefault(); finish(true); }
                else if (e.key === "Tab") {
                    var f = focusables(box);
                    if (!f.length) return;
                    var first = f[0], last = f[f.length - 1];
                    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
                }
            }

            if (opts.showCancel) {
                cancelBtn = document.createElement("button");
                cancelBtn.type = "button";
                cancelBtn.className = "bb-btn bb-cancel";
                cancelBtn.textContent = opts.cancelText || label("cancel");
                cancelBtn.addEventListener("click", function () { finish(false); });
                actions.appendChild(cancelBtn);
            }

            okBtn = document.createElement("button");
            okBtn.type = "button";
            okBtn.className = "bb-btn bb-ok";
            okBtn.textContent = opts.okText || label("ok");
            okBtn.addEventListener("click", function () { finish(opts.showCancel ? true : true); });
            actions.appendChild(okBtn);

            box.appendChild(title);
            box.appendChild(msg);
            box.appendChild(actions);
            overlay.appendChild(box);

            overlay.addEventListener("mousedown", function (e) {
                if (e.target === overlay && opts.showCancel) finish(false);
            });

            document.body.appendChild(overlay);
            document.addEventListener("keydown", onKey, true);
            (okBtn).focus();
        });
    }

    var BuddyBox = {
        confirm: function (message, opts) {
            opts = opts || {};
            return dialog({
                title: opts.title || "",
                message: message,
                showCancel: true,
                okText: opts.okText,
                cancelText: opts.cancelText,
                icon: opts.icon
            });
        },
        alert: function (message, opts) {
            opts = opts || {};
            return dialog({
                title: opts.title || "",
                message: message,
                showCancel: false,
                okText: opts.okText,
                icon: opts.icon
            });
        },
        toast: function (message, ms) {
            var el = document.createElement("div");
            el.className = "bb-toast";
            el.setAttribute("role", "status");
            el.textContent = message;
            document.body.appendChild(el);
            var life = typeof ms === "number" ? ms : 2600;
            setTimeout(function () {
                el.classList.add("bb-out");
                setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 220);
            }, life);
            return el;
        }
    };

    window.BuddyBox = BuddyBox;
})();
