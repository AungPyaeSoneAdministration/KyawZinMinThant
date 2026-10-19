(function () {
    'use strict';

    /* ---------------- Language (English / Myanmar) ---------------- */
    var LANG = 'en';
    try {
        if (localStorage.getItem('pj-lang') === 'mm' || localStorage.getItem('buddyEduLang') === 'my') LANG = 'mm';
    } catch (e) {}

    var STR = {
        en: {
            brandTitle: 'Buddy Learning',
            brandSub: 'HTML · CSS · JS · TypeScript · Next.js',
            navBuddy: 'Buddy Edu',
            navPlans: 'Study Plans',
            themeAria: 'Toggle dark mode',
            langAria: 'Switch language',
            langCode: 'EN',
            eyebrow: 'Open source · Offline · No build tools',
            heroTitle: 'Learn Full Stack <span class="grad">by building</span>',
            heroLead: 'Five complete courses — HTML, CSS, JavaScript, TypeScript and Next.js — paired with fifty interactive browser projects. Everything runs straight from a file, with no installs or dependencies.',
            ctaStart: 'Start with JavaScript',
            ctaProjects: 'Browse projects',
            statLessons: 'Lessons',
            statProjects: 'Projects',
            statDeps: 'Dependencies',
            searchPh: 'Search sections…  (press /)',
            empty: 'No sections match your search.',
            ready: 'Ready',
            soon: 'Soon',
            plan: 'Plan',
            plansEyebrow: 'Study Plans',
            plansTitle: '8-Week <span class="grad">Study Plans</span>',
            plansDesc: 'Follow a structured plan for every course — modules, checklists and schedules that stay in sync with the lessons.',
            footer: 'Built for learning — add new pages to <code>main.js</code> and they appear here automatically.'
        },
        mm: {
            brandTitle: 'Buddy Learning',
            brandSub: 'HTML · CSS · JS · TypeScript · Next.js',
            navBuddy: 'Buddy Edu',
            navPlans: 'လေ့လာရေးအစီအစဉ်များ',
            themeAria: 'အမှောင်/အလင်း ပြောင်းရန်',
            langAria: 'ဘာသာစကား ပြောင်းရန်',
            langCode: 'မြန်မာ',
            eyebrow: 'အခမဲ့ · အော့ဖ်လိုင်း · Install မလို',
            heroTitle: 'ဖူးလ်စတက် ဝဘ်ဖွံ့ဖြိုးရေး <span class="grad">တည်ဆောက်ပြီး သင်ယူပါ</span>',
            heroLead: 'သင်ခန်းစာ ၅ ခုစလုံး — HTML, CSS, JavaScript, TypeScript နှင့် Next.js — တိုက်ရိုက်အလုပ်လုပ်နိုင်သော စီမံကိန်း 50 ခုနှင့်အတူ လေ့လာပါ။ Install လုပ်စရာ မလိုဘဲ ဖိုင်အဖြစ် တိုက်ရိုက်ဖွင့်နိုင်ပါသည်။',
            ctaStart: 'JavaScript ဖြင့် စတင်ရန်',
            ctaProjects: 'စီမံကိန်းများ ကြည့်ရန်',
            statLessons: 'သင်ခန်းစာ',
            statProjects: 'စီမံကိန်း',
            statDeps: 'မှီခိုမှု',
            searchPh: 'အပိုင်းများ ရှာရန်…  (/ နှိပ်ပါ)',
            empty: 'သင်ရှာသောအပိုင်း မတွေ့ပါ။',
            ready: 'အသင့်',
            soon: 'မကြာမီ',
            plan: 'အစီအစဉ်',
            plansEyebrow: 'လေ့လာရေးအစီအစဉ်များ',
            plansTitle: 'ပတ် ၈ ပတ်စီ <span class="grad">လေ့လာရေးအစီအစဉ်များ</span>',
            plansDesc: 'သင်တန်းတိုင်းအတွက် စနစ်တကျ အစီအစဉ် — မော်ဂျူးများ၊ ချက်လျက်စာရင်းများနှင့် အချိန်ဇယားများဖြင့်။',
            footer: 'လေ့လာရေးအတွက် တည်ဆောက်ထားပါသည် — <code>main.js</code> ထဲတွင် စာမျက်နှာအသစ် ထည့်ပါက ဤနေရာတွင် အလိုအလျောက် ပေါ်လာပါမည်။'
        }
    };

    function tr(k) { return (STR[LANG] && STR[LANG][k]) || STR.en[k] || k; }

    var SECTIONS = [
        {
            id: 'course',
            kicker: 'Full course',
            title: 'JavaScript Course',
            desc: 'A structured 100-lesson path from the basics through operators, strings, arrays, objects, functions, the DOM and modern ES features.',
            tags: ['Course', '100 lessons', 'Beginner to Advanced'],
            meta: '100 lessons',
            href: 'JS/index.html',
            status: 'ready',
            icon: 'book',
            mm: {
                kicker: 'သင်ခန်းစာအပြည့်အစုံ',
                title: 'JavaScript သင်ခန်းစာ',
                desc: 'အခြေခာမှ အဆင့်မြင့်အထိ — operators, strings, arrays, objects, functions, DOM နှင့် modern ES features များပါဝင်သော သင်ခန်းစာ 100 ခု။',
                tags: ['သင်ခန်းစာ', 'သင်ခန်းစာ 100 ခု', 'အခြေခာမှ အဆင့်မြင့်'],
                meta: 'သင်ခန်းစာ 100 ခု'
            }
        },
        {
            id: 'projects',
            kicker: 'Practice',
            title: '50 Mini Projects',
            desc: 'Fifty hands-on browser projects — games, converters, timers and UI widgets — each in a single file you can read and tweak.',
            tags: ['Projects', 'Interactive', 'Offline'],
            meta: '50 projects',
            href: 'JS/JavascriptMiniProject.html',
            status: 'ready',
            icon: 'grid',
            mm: {
                kicker: 'လက်တွေ့လေ့ကျင့်ခန်း',
                title: 'မိုက်ခရို စီမံကိန်း 50 ခု',
                desc: 'လက်တွေ့ စမ်းသပ်နိုင်သော စီမံကိန်း 50 ခု — ဂိမ်းများ, converter များ, timer များနှင့် UI widgets များ — ဖိုင်တစ်ခုတည်းဖြင့် ဖတ်၍ ပြင်ဆင်နိုင်ပါသည်။',
                tags: ['စီမံကိန်း', 'အပြန်အလှန်အကျိုးပြု', 'အော့ဖ်လိုင်း'],
                meta: 'စီမံကိန်း 50 ခု'
            }
        },
        {
            id: 'html',
            kicker: 'Full course',
            title: 'HTML Course',
            desc: 'Fifty lessons covering structure, text, links, media, tables, forms, the document head, accessibility and modern HTML.',
            tags: ['Course', '50 lessons', 'Markup'],
            meta: '50 lessons',
            href: 'HTML/index.html',
            status: 'ready',
            icon: 'code',
            mm: {
                kicker: 'သင်ခန်းစာအပြည့်အစုံ',
                title: 'HTML သင်ခန်းစာ',
                desc: 'ဖွဲ့စည်းပုံ၊ စာသား၊ links၊ media၊ ဇယားများ၊ form များ၊ document head၊ accessibility နှင့် modern HTML တို့ကို သင်ခန်းစာ 50 ခုဖြင့် လေ့လာပါ။',
                tags: ['သင်ခန်းစာ', 'သင်ခန်းစာ 50 ခု', 'Markup'],
                meta: 'သင်ခန်းစာ 50 ခု'
            }
        },
        {
            id: 'css',
            kicker: 'Full course',
            title: 'CSS Course',
            desc: 'Fifty lessons on selectors, the box model, Flexbox, Grid, responsive design, animation and modern CSS variables.',
            tags: ['Course', '50 lessons', 'Styling'],
            meta: '50 lessons',
            href: 'CSS/index.html',
            status: 'ready',
            icon: 'brush',
            mm: {
                kicker: 'သင်ခန်းစာအပြည့်အစုံ',
                title: 'CSS သင်ခန်းစာ',
                desc: 'selectors၊ box model၊ Flexbox၊ Grid၊ responsive design၊ animation နှင့် CSS variables များကို သင်ခန်းစာ 50 ခုဖြင့် လေ့လာပါ။',
                tags: ['သင်ခန်းစာ', 'သင်ခန်းစာ 50 ခု', 'Styling'],
                meta: 'သင်ခန်းစာ 50 ခု'
            }
        },
        {
            id: 'ts',
            kicker: 'Full course',
            title: 'TypeScript Course',
            desc: 'Fifty lessons on static types, interfaces, unions, narrowing, generics, classes, modules and the tooling that makes JavaScript safer at scale.',
            tags: ['Course', '50 lessons', 'Types'],
            meta: '50 lessons',
            href: 'TS/index.html',
            status: 'ready',
            icon: 'braces',
            mm: {
                kicker: 'သင်ခန်းစာအပြည့်အစုံ',
                title: 'TypeScript သင်ခန်းစာ',
                desc: 'Static types၊ interfaces၊ unions၊ generics၊ classes၊ modules နှင့် tooling များကို သင်ခန်းစာ 50 ခုဖြင့် လေ့လာပါ။',
                tags: ['သင်ခန်းစာ', 'သင်ခန်းစာ 50 ခု', 'Types'],
                meta: 'သင်ခန်းစာ 50 ခု'
            }
        },
        {
            id: 'next',
            kicker: 'Full course',
            title: 'Next.js Course',
            desc: 'Fifty lessons on the App Router, layouts, server components, data fetching, server actions, APIs, caching, auth and deploying production apps.',
            tags: ['Course', '50 lessons', 'React Framework'],
            meta: '50 lessons',
            href: 'NEXT/index.html',
            status: 'ready',
            icon: 'layers',
            mm: {
                kicker: 'သင်ခန်းစာအပြည့်အစုံ',
                title: 'Next.js သင်ခန်းစာ',
                desc: 'App Router၊ layouts၊ server components၊ data fetching၊ server actions၊ APIs၊ caching၊ auth နှင့် production deploy များကို သင်ခန်းစာ 50 ခုဖြင့် လေ့လာပါ။',
                tags: ['သင်ခန်းစာ', 'သင်ခန်းစာ 50 ခု', 'React Framework'],
                meta: 'သင်ခန်းစာ 50 ခု'
            }
        }
    ];

    /* Study plans — mirrored from the Buddy Edu plan section */
    var PLANS = [
        {
            id: 'plan-html',
            kicker: 'Plan · HTML',
            title: 'HTML Study Plan',
            desc: 'Ten modules, a week-by-week schedule and a checklist so every finished topic is tracked in your browser.',
            tags: ['8-week plan', 'Checklist', 'Projects'],
            meta: '10 modules',
            href: '../CoursePlan/HTML/index.html',
            icon: 'code',
            badgeKey: 'plan',
            grad: ['#ea580c', '#c2410c'],
            mm: {
                kicker: 'အစီအစဉ် · HTML',
                title: 'HTML လေ့လာရေးအစီအစဉ်',
                desc: 'မော်ဂျူး ၁၀ ခု၊ ပတ်အလိုက် အချိန်ဇယားနှင့် ပြီးဆုံးခေါင်းစဉ်တိုင်း မှတ်နိုင်သော ချက်လျက်စာရင်း။',
                tags: ['ပတ် ၈ အစီအစဉ်', 'ချက်လျက်စာရင်း', 'ပရောဂျက်'],
                meta: 'မော်ဂျူး ၁၀ ခု'
            }
        },
        {
            id: 'plan-css',
            kicker: 'Plan · CSS',
            title: 'CSS Study Plan',
            desc: 'From selectors to Grid and animation — a structured outline with practice tasks for every module.',
            tags: ['8-week plan', 'Checklist', 'Responsive'],
            meta: '10 modules',
            href: '../CoursePlan/CSS/index.html',
            icon: 'brush',
            badgeKey: 'plan',
            grad: ['#7c3aed', '#5b21b6'],
            mm: {
                kicker: 'အစီအစဉ် · CSS',
                title: 'CSS လေ့လာရေးအစီအစဉ်',
                desc: 'selector မှ Grid နှင့် animation အထိ — မော်ဂျူးတိုင်းအတွက် လေ့ကျင့်ခန်းများပါသော အစီအစဉ်။',
                tags: ['ပတ် ၈ အစီအစဉ်', 'ချက်လျက်စာရင်း', 'Responsive'],
                meta: 'မော်ဂျူး ၁၀ ခု'
            }
        },
        {
            id: 'plan-js',
            kicker: 'Plan · JavaScript',
            title: 'JavaScript Study Plan',
            desc: 'Variables, functions, the DOM and async code — paired with the 100-lesson course and mini projects.',
            tags: ['8-week plan', 'Checklist', 'Projects'],
            meta: '10 modules',
            href: '../CoursePlan/JavaScript/index.html',
            icon: 'braces',
            badgeKey: 'plan',
            grad: ['#2563eb', '#1d4ed8'],
            mm: {
                kicker: 'အစီအစဉ် · JavaScript',
                title: 'JavaScript လေ့လာရေးအစီအစဉ်',
                desc: 'Variable၊ function၊ DOM နှင့် async code — သင်ခန်းစာ ၁၀၀ နှင့် စီမံကိန်းများနှင့်အတူ။',
                tags: ['ပတ် ၈ အစီအစဉ်', 'ချက်လျက်စာရင်း', 'ပရောဂျက်'],
                meta: 'မော်ဂျူး ၁၀ ခု'
            }
        },
        {
            id: 'plan-node',
            kicker: 'Plan · Node.js',
            title: 'Node.js Study Plan',
            desc: 'Server-side JavaScript, modules, Express, REST APIs and databases, planned out week by week.',
            tags: ['8-week plan', 'Checklist', 'Backend'],
            meta: '10 modules',
            href: '../CoursePlan/Node/index.html',
            icon: 'layers',
            badgeKey: 'plan',
            grad: ['#16a34a', '#15803d'],
            mm: {
                kicker: 'အစီအစဉ် · Node.js',
                title: 'Node.js လေ့လာရေးအစီအစဉ်',
                desc: 'Server-side JavaScript၊ module များ၊ Express၊ REST API နှင့် database များကို ပတ်အလိုက် အစီအစဉ်ဖြင့်။',
                tags: ['ပတ် ၈ အစီအစဉ်', 'ချက်လျက်စာရင်း', 'Backend'],
                meta: 'မော်ဂျူး ၁၀ ခု'
            }
        },
        {
            id: 'plan-react',
            kicker: 'Plan · React',
            title: 'React Study Plan',
            desc: 'Components, props, state, hooks and routing — a complete outline that pairs with the Next.js lessons.',
            tags: ['8-week plan', 'Checklist', 'Projects'],
            meta: '10 modules',
            href: '../CoursePlan/React/index.html',
            icon: 'grid',
            badgeKey: 'plan',
            grad: ['#0f766e', '#115e59'],
            mm: {
                kicker: 'အစီအစဉ် · React',
                title: 'React လေ့လာရေးအစီအစဉ်',
                desc: 'Component၊ props၊ state၊ hook များနှင့် routing — Next.js သင်ခန်းစာများနှင့် တွဲဖက်အစီအစဉ်။',
                tags: ['ပတ် ၈ အစီအစဉ်', 'ချက်လျက်စာရင်း', 'ပရောဂျက်'],
                meta: 'မော်ဂျူး ၁၀ ခု'
            }
        }
    ];

    var ICONS = {
        book: '<path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z"/><path d="M6 3v16"/>',
        grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
        code: '<path d="M8 6 3 12l5 6"/><path d="M16 6l5 6-5 6"/>',
        brush: '<path d="M4 21c3 0 5-1.2 5-4.2 0-2-2-2.2-2-4.3a4 4 0 0 1 8 0c0 2-2 2.3-2 4.3 0 3 2 4.2 5 4.2"/><circle cx="12" cy="7" r="1"/>',
        braces: '<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/>',
        layers: '<path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>'
    };

    var THEME_KEY = 'mp-theme';
    var grid = document.getElementById('grid');
    var planGrid = document.getElementById('planGrid');
    var searchInput = document.getElementById('search');
    var countEl = document.getElementById('count');
    var emptyEl = document.getElementById('empty');
    var themeBtn = document.getElementById('themeBtn');
    var themeIcon = document.getElementById('themeIcon');
    var langBtn = document.getElementById('langBtn');
    var langLabel = document.getElementById('langLabel');

    var SUN = '<circle cx="12" cy="12" r="4.2"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
    var MOON = '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>';

    function svg(paths, cls) {
        return '<svg' + (cls ? ' class="' + cls + '"' : '') +
            ' viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"' +
            ' stroke-linecap="round" stroke-linejoin="round">' + paths + '</svg>';
    }

    function L(item) { return (LANG === 'mm' && item.mm) ? item.mm : item; }

    function makeCard(item) {
        var loc = L(item);
        var el = document.createElement('a');
        el.className = 'section-card';
        el.href = item.href;

        var head = document.createElement('div');
        head.className = 'card-top';
        var icon = document.createElement('span');
        icon.className = 'card-icon';
        icon.innerHTML = svg(ICONS[item.icon] || ICONS.code);
        if (item.grad) icon.style.background = 'linear-gradient(135deg, ' + item.grad[0] + ', ' + item.grad[1] + ')';
        head.appendChild(icon);
        var titleWrap = document.createElement('div');
        titleWrap.innerHTML =
            '<div class="kicker"></div><h3></h3>';
        titleWrap.querySelector('.kicker').textContent = loc.kicker;
        titleWrap.querySelector('h3').textContent = loc.title;
        head.appendChild(titleWrap);

        var desc = document.createElement('p');
        desc.className = 'desc';
        desc.textContent = loc.desc;

        var tags = document.createElement('div');
        tags.className = 'tags';
        loc.tags.forEach(function (t) {
            var s = document.createElement('span');
            s.className = 'tag';
            s.textContent = t;
            tags.appendChild(s);
        });

        var foot = document.createElement('div');
        foot.className = 'card-foot';
        var meta = document.createElement('span');
        meta.className = 'meta';
        meta.textContent = loc.meta;
        var badge = document.createElement('span');
        badge.className = 'badge';
        badge.textContent = item.badgeKey ? tr(item.badgeKey) : tr('ready');
        var arrow = document.createElement('span');
        arrow.className = 'arrow';
        arrow.setAttribute('aria-hidden', 'true');
        arrow.innerHTML = svg('<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>');
        var right = document.createElement('span');
        right.style.cssText = 'display:flex;align-items:center;gap:8px';
        right.appendChild(badge);
        right.appendChild(arrow);
        right.querySelector('svg').style.width = '16px';
        right.querySelector('svg').style.height = '16px';
        right.querySelector('svg').style.color = 'var(--primary)';
        foot.appendChild(meta);
        foot.appendChild(right);

        el.appendChild(head);
        el.appendChild(desc);
        el.appendChild(tags);
        el.appendChild(foot);
        return el;
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        themeBtn.setAttribute('aria-pressed', theme === 'dark');
        themeIcon.innerHTML = (theme === 'dark') ? MOON : SUN;
        try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
    }

    function currentTheme() {
        return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    }

    function matches(item, q) {
        if (!q) return true;
        var en = item.title + ' ' + item.kicker + ' ' + item.desc + ' ' + item.tags.join(' ') + ' ' + item.meta;
        var mm = item.mm ? (item.mm.title + ' ' + item.mm.kicker + ' ' + item.mm.desc + ' ' + item.mm.tags.join(' ') + ' ' + item.mm.meta) : '';
        return (en + ' ' + mm).toLowerCase().indexOf(q) !== -1;
    }

    function render(filter) {
        var q = (filter || '').trim().toLowerCase();
        grid.innerHTML = '';
        var shown = SECTIONS.filter(function (s) { return matches(s, q); });
        shown.forEach(function (s) { grid.appendChild(makeCard(s)); });

        emptyEl.hidden = shown.length !== 0;

        countEl.innerHTML = '';
        var b = document.createElement('b');
        b.textContent = shown.length;
        countEl.appendChild(b);
        countEl.appendChild(document.createTextNode(LANG === 'mm'
            ? ' / ' + SECTIONS.length + ' ခု ပြထားသည်'
            : ' of ' + SECTIONS.length + ' shown'));
        if (!q) {
            countEl.appendChild(document.createTextNode(' \u00b7 '));
            var rb = document.createElement('b');
            rb.textContent = shown.length;
            countEl.appendChild(rb);
            countEl.appendChild(document.createTextNode(LANG === 'mm' ? ' ခု အသင့်' : ' ready'));
        }
    }

    function renderPlans() {
        if (!planGrid) return;
        planGrid.innerHTML = '';
        PLANS.forEach(function (p) { planGrid.appendChild(makeCard(p)); });
    }

    function applyLang() {
        document.documentElement.setAttribute('lang', LANG === 'mm' ? 'my' : 'en');
        langLabel.textContent = tr('langCode');
        var i, els;
        els = document.querySelectorAll('[data-i18n]');
        for (i = 0; i < els.length; i++) els[i].textContent = tr(els[i].getAttribute('data-i18n'));
        els = document.querySelectorAll('[data-i18n-html]');
        for (i = 0; i < els.length; i++) els[i].innerHTML = tr(els[i].getAttribute('data-i18n-html'));
        els = document.querySelectorAll('[data-i18n-ph]');
        for (i = 0; i < els.length; i++) els[i].placeholder = tr(els[i].getAttribute('data-i18n-ph'));
        els = document.querySelectorAll('[data-i18n-title]');
        for (i = 0; i < els.length; i++) els[i].title = tr(els[i].getAttribute('data-i18n-title'));
        els = document.querySelectorAll('[data-i18n-aria]');
        for (i = 0; i < els.length; i++) els[i].setAttribute('aria-label', tr(els[i].getAttribute('data-i18n-aria')));
        render(searchInput.value);
        renderPlans();
    }

    /* theme */
    themeIcon.innerHTML = (currentTheme() === 'dark') ? MOON : SUN;
    themeBtn.addEventListener('click', function () {
        applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
    });

    /* language */
    langBtn.addEventListener('click', function () {
        LANG = LANG === 'mm' ? 'en' : 'mm';
        try {
            localStorage.setItem('pj-lang', LANG);
            localStorage.setItem('buddyEduLang', LANG === 'mm' ? 'my' : 'en');
        } catch (e) {}
        applyLang();
    });

    /* search */
    searchInput.addEventListener('input', function (e) {
        render(e.target.value);
    });
    document.addEventListener('keydown', function (e) {
        var tag = (e.target && e.target.tagName) || '';
        if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
            e.preventDefault();
            searchInput.focus();
        }
        if (e.key === 'Escape' && document.activeElement === searchInput) {
            searchInput.value = '';
            render('');
        }
    });

    applyLang();
})();
