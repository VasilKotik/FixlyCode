const apiKey = "AIzaSyA5oYnLJnxuXThSkqk5kfbaQ3mw0XspcxQ"; 
const getApiUrl = (model) => `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

// --- DATA: LOCARLIZED CONTENT ---
const CONTENT_POOLS = {
    uk: {
        tips: [
            { title: "DRY (Не повторюй себе)", desc: "Уникайте дублювання. Якщо пишете двічі — створіть функцію." },
            { title: "KISS (Будь простішим)", desc: "Найпростіше рішення — часто найкраще. Уникайте складності." },
            { title: "YAGNI (Тобі це не треба)", desc: "Не пишіть код 'на майбутнє'. Реалізуйте лише потрібне зараз." },
            { title: "Коментуйте 'Чому'", desc: "Код показує 'як'. Коментарі мають пояснювати 'чому' ви це зробили." },
            { title: "Fail Fast", desc: "Обробляйте помилки на початку функції, щоб уникнути вкладеності." },
            { title: "Іменування", desc: "Змінні мають бути зрозумілими без контексту (напр. userLoggedIn)." }
        ],
        facts: [
            "Перший комп'ютерний 'баг' був справжнім метеликом у реле комп'ютера Mark II (1947).",
            "Python назвали на честь шоу 'Летючий цирк Монті Пайтона', а не змії.",
            "Перший сайт (info.cern.ch) запущений у 1991 і досі працює.",
            "JavaScript створили всього за 10 днів."
        ]
    },
    en: {
        tips: [
            { title: "DRY (Don't Repeat Yourself)", desc: "Avoid duplication. Write logic once." },
            { title: "KISS (Keep It Simple)", desc: "Simple is better than complex." },
            { title: "YAGNI", desc: "Don't build features you don't need yet." },
            { title: "Comment 'Why'", desc: "Explain the reasoning, not the syntax." },
            { title: "Fail Fast", desc: "Check errors early to keep code flat." },
            { title: "Naming", desc: "Use descriptive variable names." }
        ],
        facts: [
            "The first computer 'bug' was a real moth in 1947.",
            "Python is named after Monty Python, not the snake.",
            "The first website is still online (info.cern.ch).",
            "JavaScript was written in 10 days."
        ]
    }
};

// Заповнюємо інші мови англійською, щоб уникнути помилок
['pl', 'de', 'es', 'ru'].forEach(lang => CONTENT_POOLS[lang] = CONTENT_POOLS.en);

const TRANSLATIONS = {
    uk: {
        newChatBtn: "Новий чат", donateBtn: "На каву розробнику", runBtn: "Запуск", analysisHeader: "Діагностика", emptyTitle: "FixlyCode", loading: "Аналіз...", errorEmpty: "Введіть код!", clearHistory: "Очистити історію", placeholder: "// Вставте код тут...", tipHeader: "Порада:", langName: "Українська", wishesPlaceholder: "Побажання...", exportBtn: "Експорт в Markdown", scoreTitle: "Рейтинг",
        tipDebug: "Виправити помилки", tipOptimize: "Покращити код", tipExplain: "Пояснити логіку", tipConvert: "Конвертувати", tipTest: "Створити тести", 
        welcomeDesc: "Ваш персональний AI-асистент. Виправляйте баги, оптимізуйте код та тестуйте.", startBtn: "Почати роботу", emptyStatePrompt: "Оберіть режим та натисніть Запуск",
        tabHistory: "Історія", tabTips: "Поради AI", tipsHeader: "Поради для Clean Code", historyEmptyTitle: "Історія порожня", historyEmptyDesc: "Тут з'являться ваші запити.",
        funFactHeader: "Цікавий факт",
        featDebugTitle: "Розумний Дебаг", featDebugDesc: "Пошук та виправлення помилок.", featOptimizeTitle: "Оптимізація", featOptimizeDesc: "Покращення швидкодії.", featConvertTitle: "Конвертація", featConvertDesc: "Переклад між мовами.", featTestTitle: "AI Тестування", featTestDesc: "Генерація тестів.",
        tourStep1Title: "1. Введіть Код", tourStep1Desc: "Вставте код сюди.", tourStep2Title: "2. Оберіть Режим", tourStep2Desc: "Виправити, пояснити чи конвертувати?", tourStep3Title: "3. Запустіть AI", tourStep3Desc: "Натисніть для аналізу!"
    },
    en: {
        newChatBtn: "New Chat", donateBtn: "Buy me a coffee", runBtn: "Run FixlyCode", analysisHeader: "Diagnostics", emptyTitle: "FixlyCode", loading: "Thinking...", errorEmpty: "Enter code!", clearHistory: "Clear History", placeholder: "// Paste code here...", tipHeader: "Pro Tip:", langName: "English", wishesPlaceholder: "Wishes...", exportBtn: "Export to Markdown", scoreTitle: "Score",
        tipDebug: "Fix Bugs", tipOptimize: "Optimize", tipExplain: "Explain", tipConvert: "Convert", tipTest: "Tests",
        welcomeDesc: "Your AI coding assistant. Fix bugs, optimize code, and test.", startBtn: "Get Started", emptyStatePrompt: "Select mode and Run",
        tabHistory: "History", tabTips: "AI Tips", tipsHeader: "Clean Code Tips", historyEmptyTitle: "No History", historyEmptyDesc: "Your queries will appear here.",
        funFactHeader: "Fun Fact",
        featDebugTitle: "Smart Debug", featDebugDesc: "Auto-fix bugs.", featOptimizeTitle: "Optimization", featOptimizeDesc: "Improve performance.", featConvertTitle: "Conversion", featConvertDesc: "Translate code.", featTestTitle: "AI Testing", featTestDesc: "Generate tests.",
        tourStep1Title: "1. Input Code", tourStep1Desc: "Paste code here.", tourStep2Title: "2. Select Mode", tourStep2Desc: "Fix, Explain or Convert?", tourStep3Title: "3. Run AI", tourStep3Desc: "Click to analyze!"
    }
};

// Заповнюємо решту мов базою EN
['pl', 'de', 'es', 'ru'].forEach(lang => TRANSLATIONS[lang] = { ...TRANSLATIONS.en, langName: lang.toUpperCase() });

// --- STATE ---
let currentMode = 'debug';
let currentLang = localStorage.getItem('fixly_lang') || 'uk';
let isDark = localStorage.getItem('fixly_theme') !== 'light';
let history = [];
let currentSidebarTab = 'history'; 
let currentTourStep = 0; 

// БЕЗПЕЧНЕ ЗАВАНТАЖЕННЯ ІСТОРІЇ
try {
    history = JSON.parse(localStorage.getItem('fixly_history')) || [];
} catch (e) {
    console.error("History corrupted, resetting.", e);
    history = [];
    localStorage.removeItem('fixly_history');
}

// --- ELEMENTS ---
const els = {
    html: document.documentElement,
    themeToggle: document.getElementById('theme-toggle'),
    input: document.getElementById('input-code'),
    wishes: document.getElementById('custom-wishes'),
    outputCode: document.getElementById('output-code'),
    outputExpl: document.getElementById('output-explanation'),
    outputTip: document.getElementById('output-tip'),
    scoreText: document.getElementById('score-text'),
    scoreCircle: document.getElementById('score-circle'),
    smellsList: document.getElementById('output-smells'),
    smellsSection: document.getElementById('smells-section'),
    outputContainer: document.getElementById('output-container'),
    emptyState: document.getElementById('empty-state'),
    loadingOverlay: document.getElementById('loading-overlay'),
    loadingText: document.getElementById('loading-text'),
    runBtn: document.getElementById('run-btn'),
    runBtnText: document.getElementById('run-btn-text'),
    errorMsg: document.getElementById('error-msg'),
    historyList: document.getElementById('history-list'),
    langSelect: document.getElementById('language-select'),
    uiLang: document.getElementById('interface-lang'),
    modelSelect: document.getElementById('model-select'),
    modeBtns: document.querySelectorAll('.mode-btn'),
    copyBtn: document.getElementById('copy-btn'),
    exportBtn: document.getElementById('export-md-btn'),
    sidebar: document.getElementById('sidebar'),
    toggleSidebarBtn: document.getElementById('toggle-sidebar'),
    closeSidebarBtn: document.getElementById('close-sidebar-btn'),
    newChatBtn: document.getElementById('new-chat-btn'),
    tabCode: document.getElementById('tab-code'),
    tabPreview: document.getElementById('tab-preview'),
    viewCode: document.getElementById('view-code'),
    viewPreview: document.getElementById('view-preview'),
    previewFrame: document.getElementById('preview-frame'),
    refreshPreviewBtn: document.getElementById('refresh-preview-btn'),
    tooltip: document.getElementById('tooltip'),
    welcomeScreen: document.getElementById('welcome-screen'),
    startBtn: document.getElementById('start-btn'),
    tourOverlay: document.getElementById('tour-overlay'), 
    tourTooltip: document.getElementById('tour-tooltip'), 
    tourTitle: document.getElementById('tour-title'), 
    tourDesc: document.getElementById('tour-desc'), 
    tourNextBtn: document.getElementById('tour-next-btn'), 
    tabHistoryBtn: document.getElementById('tab-history-btn'),
    tabTipsBtn: document.getElementById('tab-tips-btn'),
    historyContent: document.getElementById('history-content'),
    tipsContent: document.getElementById('tips-content'),
    aiTipsList: document.getElementById('ai-tips-list'),
    funFactText: document.getElementById('fun-fact-text'),
    clearHistoryBtn: document.getElementById('clear-history-btn'),
    activeModeDisplay: document.getElementById('active-mode-display'),
    modeIcon: document.getElementById('mode-icon'),
    modeName: document.getElementById('mode-name'),
    targetInput: document.getElementById('input-section'),
    targetModes: document.getElementById('mode-buttons-container'),
    targetRun: document.getElementById('run-btn')
};

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
    const welcomeSeen = localStorage.getItem('fixly_welcome_seen');
    if (welcomeSeen === 'true') {
        els.welcomeScreen.classList.add('hidden', 'opacity-0', 'pointer-events-none');
        els.html.classList.remove('overflow-hidden');
    } else {
        els.welcomeScreen.classList.remove('hidden');
        els.html.classList.add('overflow-hidden');
    }

    if (isDark) els.html.classList.add('dark'); else els.html.classList.remove('dark');
    els.uiLang.value = currentLang;
    updateTexts(currentLang);
    
    renderHistory();
    switchSidebarTab(currentSidebarTab); 
    if(localStorage.getItem('fixly_draft')) els.input.value = localStorage.getItem('fixly_draft');

    // 4. Event Listeners
    if (els.startBtn) {
        els.startBtn.addEventListener('click', handleStartClick); // USING NAMED FUNCTION
    }
    
    els.runBtn.addEventListener('click', runAI);
    els.newChatBtn.addEventListener('click', newChat);
    els.themeToggle.addEventListener('click', toggleTheme);
    els.uiLang.addEventListener('change', (e) => updateTexts(e.target.value));
    els.copyBtn.addEventListener('click', copyCode);
    els.exportBtn.addEventListener('click', exportMarkdown);
    document.getElementById('clear-input-btn').addEventListener('click', () => { els.input.value = ''; els.input.focus(); localStorage.removeItem('fixly_draft'); });
    els.clearHistoryBtn.addEventListener('click', clearHistory);
    
    els.tourNextBtn.addEventListener('click', nextTourStep);
    els.toggleSidebarBtn.addEventListener('click', toggleSidebar);
    if(els.closeSidebarBtn) els.closeSidebarBtn.addEventListener('click', toggleSidebar);

    els.input.addEventListener('input', () => localStorage.setItem('fixly_draft', els.input.value));
    document.addEventListener('keydown', (e) => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') runAI(); });
    
    els.modeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.target.closest('.mode-btn');
            if(target) setMode(target.dataset.mode);
        });
        btn.addEventListener('mouseenter', showTooltip);
        btn.addEventListener('mouseleave', hideTooltip);
    });

    els.refreshPreviewBtn.addEventListener('click', () => {
        runPreview();
        const btn = els.refreshPreviewBtn;
        btn.classList.add('animate-spin');
        setTimeout(() => btn.classList.remove('animate-spin'), 500);
    });
});


// --- FIX FOR START BUTTON ---
function handleStartClick() {
    closeWelcomeScreen();
    const tourSeen = localStorage.getItem('fixly_tour_seen');
    if (!tourSeen) {
        setTimeout(startTour, 600); 
    }
}
// --- END FIX ---


function toggleSidebar() {
    if (els.sidebar.classList.contains('hidden')) {
        els.sidebar.classList.remove('hidden');
        els.sidebar.classList.add('flex', 'sidebar-animate-open');
    } else {
        els.sidebar.classList.add('hidden');
        els.sidebar.classList.remove('flex', 'sidebar-animate-open');
    }
}

function closeWelcomeScreen() {
    localStorage.setItem('fixly_welcome_seen', 'true');
    els.welcomeScreen.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => {
        els.welcomeScreen.classList.add('hidden');
        els.html.classList.remove('overflow-hidden');
    }, 500);
}

// --- TOUR ---
const tourSteps = [
    { target: 'targetInput', titleKey: 'tourStep1Title', descKey: 'tourStep1Desc', pos: 'right' },
    { target: 'targetModes', titleKey: 'tourStep2Title', descKey: 'tourStep2Desc', pos: 'bottom' },
    { target: 'targetRun', titleKey: 'tourStep3Title', descKey: 'tourStep3Desc', pos: 'top' }
];

function startTour() {
    currentTourStep = 0;
    els.tourOverlay.classList.remove('hidden');
    requestAnimationFrame(() => els.tourOverlay.classList.remove('opacity-0'));
    showTourStep(0);
}

function showTourStep(index) {
    if (index >= tourSteps.length) return endTour();
    
    const step = tourSteps[index];
    const targetEl = els[step.target];
    const t = TRANSLATIONS[currentLang];

    document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
    targetEl.classList.add('tour-highlight');
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

    els.tourTitle.textContent = t[step.titleKey];
    els.tourDesc.textContent = t[step.descKey];
    els.tourNextBtn.textContent = index === tourSteps.length - 1 ? (currentLang === 'uk' ? 'Готово' : 'Finish') : 'Next';

    els.tourTooltip.classList.remove('hidden');
    requestAnimationFrame(() => {
        els.tourTooltip.classList.remove('opacity-0', 'scale-95');
        const rect = targetEl.getBoundingClientRect();
        const tooltipRect = els.tourTooltip.getBoundingClientRect();
        
        let top = rect.bottom + 15;
        let left = rect.left;
        
        if (step.pos === 'top') top = rect.top - tooltipRect.height - 15;
        if (step.pos === 'right' && window.innerWidth > 768) {
            top = rect.top;
            left = rect.right + 15;
        }

        if (left + tooltipRect.width > window.innerWidth) left = window.innerWidth - tooltipRect.width - 20;
        if (left < 10) left = 10;

        els.tourTooltip.style.top = `${top}px`;
        els.tourTooltip.style.left = `${left}px`;
    });
}

function nextTourStep() { currentTourStep++; showTourStep(currentTourStep); }

function endTour() {
    document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
    els.tourOverlay.classList.add('opacity-0');
    els.tourTooltip.classList.add('opacity-0');
    setTimeout(() => {
        els.tourOverlay.classList.add('hidden');
        els.tourTooltip.classList.add('hidden');
    }, 300);
    localStorage.setItem('fixly_tour_seen', 'true');
}

// --- HELPER FUNCTIONS ---

function animateScoreCount(targetEl, finalScore) {
    let start = 0;
    const duration = 800;
    const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const current = Math.floor(progress * finalScore);
        targetEl.textContent = current;
        targetEl.style.color = current > 80 ? '#10b981' : current > 50 ? '#ca8a04' : '#dc2626';
        targetEl.style.borderColor = targetEl.style.color;
        if (progress < 1) window.requestAnimationFrame(step);
        else els.scoreText.textContent = finalScore > 80 ? "Excellent" : finalScore > 50 ? "Good" : "Issues";
    };
    window.requestAnimationFrame(step);
}

function showTooltip(e) {
    const key = e.currentTarget.dataset.tooltipKey;
    if(!key) return;
    els.tooltip.textContent = TRANSLATIONS[currentLang][key];
    els.tooltip.classList.remove('hidden');
    const rect = e.currentTarget.getBoundingClientRect();
    els.tooltip.style.top = `${rect.bottom + 5}px`;
    els.tooltip.style.left = `${rect.left + rect.width/2}px`;
    els.tooltip.classList.remove('opacity-0');
}

function hideTooltip() {
    els.tooltip.classList.add('opacity-0');
    setTimeout(() => els.tooltip.classList.add('hidden'), 200);
}

function toggleTheme() {
    isDark = !isDark;
    els.html.classList.toggle('dark');
    localStorage.setItem('fixly_theme', isDark ? 'dark' : 'light');
}

function updateTexts(lang) {
    currentLang = lang;
    localStorage.setItem('fixly_lang', lang);
    const t = TRANSLATIONS[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.textContent = t[key];
    });
    els.input.placeholder = t.placeholder;
    els.wishes.placeholder = t.wishesPlaceholder;
    setMode(currentMode);
    populateTips();
    loadFunFact();
}

function setMode(mode) {
    currentMode = mode;
    const t = TRANSLATIONS[currentLang];
    const icons = { debug: 'fa-wrench', optimize: 'fa-gauge-high', explain: 'fa-book-open', convert: 'fa-right-left', test: 'fa-vial-virus' };
    const names = { debug: t.tipDebug, optimize: t.tipOptimize, explain: t.tipExplain, convert: t.tipConvert, test: t.tipTest };
    
    els.modeIcon.className = `fa-solid ${icons[mode] || 'fa-code'} text-base`;
    els.modeName.textContent = names[mode] || mode;

    els.modeBtns.forEach(btn => {
        btn.classList.toggle('active-mode', btn.dataset.mode === mode);
        if(btn.dataset.mode !== mode) btn.className = 'mode-btn';
    });
    els.runBtnText.textContent = t.runBtn;
}

function switchSidebarTab(tab) {
    currentSidebarTab = tab;
    els.tabHistoryBtn.classList.toggle('active-sidebar-tab', tab === 'history');
    els.tabTipsBtn.classList.toggle('active-sidebar-tab', tab === 'tips');
    els.historyContent.classList.toggle('hidden', tab !== 'history');
    els.tipsContent.classList.toggle('hidden', tab !== 'tips');

    if (tab === 'tips') {
        els.sidebar.classList.remove('w-72');
        els.sidebar.classList.add('md:w-[50vw]', 'z-50');
        els.aiTipsList.classList.add('grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-4');
        els.clearHistoryBtn.classList.add('hidden');
    } else {
        els.sidebar.classList.add('w-72');
        els.sidebar.classList.remove('md:w-[50vw]', 'z-50');
        els.aiTipsList.classList.remove('grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-4');
        els.clearHistoryBtn.classList.remove('hidden');
    }
}

function populateTips() {
    const pool = CONTENT_POOLS[currentLang] || CONTENT_POOLS.en;
    const tips = pool.tips.sort(() => 0.5 - Math.random()).slice(0, 6);
    els.aiTipsList.innerHTML = tips.map(tip => `
        <li class="flex flex-col space-y-2 bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md">
            <h5 class="flex items-center text-sm font-bold text-slate-800 dark:text-white">
                <i class="fa-solid fa-circle-check text-brand-500 mr-2"></i> ${tip.title}
            </h5>
            <p class="text-xs text-slate-600 dark:text-slate-400">${tip.desc}</p>
        </li>
    `).join('');
}

function loadFunFact() {
    const pool = CONTENT_POOLS[currentLang] || CONTENT_POOLS.en;
    const fact = pool.facts[Math.floor(Math.random() * pool.facts.length)];
    els.funFactText.textContent = fact;
}

// --- CORE FUNCTIONALITY ---

function switchTab(tab) {
    if (tab === 'code') {
        els.viewCode.classList.remove('hidden'); els.viewPreview.classList.add('hidden');
        els.tabCode.classList.add('bg-white', 'dark:bg-slate-700', 'text-brand-600', 'dark:text-brand-400', 'shadow-sm');
        els.tabCode.classList.remove('text-slate-500');
        els.tabPreview.classList.remove('bg-white', 'dark:bg-slate-700', 'text-brand-600', 'dark:text-brand-400', 'shadow-sm');
    } else {
        els.viewCode.classList.add('hidden'); els.viewPreview.classList.remove('hidden');
        els.tabPreview.classList.add('bg-white', 'dark:bg-slate-700', 'text-brand-600', 'dark:text-brand-400', 'shadow-sm');
        els.tabPreview.classList.remove('text-slate-500');
        els.tabCode.classList.remove('bg-white', 'dark:bg-slate-700', 'text-brand-600', 'dark:text-brand-400', 'shadow-sm');
        runPreview();
    }
}

function runPreview() {
    const code = els.outputCode.textContent;
    const lang = els.langSelect.value;
    const frame = els.previewFrame.contentWindow.document;

    frame.open();

    const baseStyles = `
        <style>
            body { font-family: 'Segoe UI', sans-serif; padding: 20px; color: #333; }
            .console-log { font-family: monospace; background: #f1f5f9; padding: 4px 8px; border-radius: 4px; margin-bottom: 4px; border-left: 3px solid #cbd5e1; font-size: 12px; }
            .console-error { background: #fef2f2; color: #dc2626; border-left-color: #dc2626; }
            .console-warn { background: #fffbeb; color: #d97706; border-left-color: #d97706; }
        </style>
    `;

    const consoleInterceptor = `
        <script>
            const logContainer = document.createElement('div');
            logContainer.style.marginTop = '20px';
            logContainer.style.borderTop = '1px solid #eee';
            logContainer.style.paddingTop = '10px';
            document.body.appendChild(logContainer);

            function appendLog(msg, type) {
                const div = document.createElement('div');
                div.className = 'console-log ' + (type || '');
                div.textContent = '> ' + msg;
                logContainer.appendChild(div);
            }

            const originalLog = console.log;
            const originalErr = console.error;
            const originalWarn = console.warn;

            console.log = (...args) => { originalLog(...args); appendLog(args.join(' ')); };
            console.error = (...args) => { originalErr(...args); appendLog(args.join(' '), 'console-error'); };
            console.warn = (...args) => { originalWarn(...args); appendLog(args.join(' '), 'console-warn'); };
            
            window.onerror = function(message, source, lineno, colno, error) {
                appendLog('Error: ' + message, 'console-error');
            };
        </script>
    `;

    if (lang === 'HTML/CSS') {
        frame.write(code);
    } 
    else if (lang === 'JavaScript') {
        frame.write(`
            <!DOCTYPE html>
            <html>
            <head>${baseStyles}</head>
            <body>
                <h3 style="margin-top:0; color:#64748b; font-size:14px; font-weight:bold; text-transform:uppercase;">JS Console Output</h3>
                <div id="app"></div>
                ${consoleInterceptor}
                <script>
                    try { ${code} } catch(e) { console.error(e.message); }
                </script>
            </body>
            </html>
        `);
    } 
    else {
        frame.write(`<html><body style="font-family:sans-serif; color:#666; padding:20px;"><h3>No Preview for ${lang}</h3></body></html>`);
    }
    frame.close();
}

async function runAI() {
    const t = TRANSLATIONS[currentLang];
    const code = els.input.value.trim();
    const wishes = els.wishes.value.trim();
    
    if (!code) { 
        els.errorMsg.textContent = t.errorEmpty; 
        els.errorMsg.classList.remove('hidden'); 
        els.errorMsg.classList.add('animate-shake');
        setTimeout(() => els.errorMsg.classList.remove('animate-shake'), 300);
        return; 
    }
    els.errorMsg.classList.add('hidden');
    els.loadingText.textContent = t.loading;
    els.loadingOverlay.classList.remove('hidden');
    els.runBtn.classList.add('run-btn-glowing'); 

    const lang = els.langSelect.value;
    const targetLangName = t.langName || "English";
    const selectedModel = els.modelSelect.value;

    let taskDesc = "";
    const taskMap = {
        'debug': 'Fix bugs, explain fixes.',
        'optimize': 'Refactor for Clean Code & Speed.',
        'explain': 'Explain logic simply.',
        'convert': 'Convert code to best practice.',
        'test': 'Generate Unit Tests.',
        'complexity': 'Analyze Big O complexity.'
    };
    taskDesc = taskMap[currentMode];

    if(wishes) taskDesc += ` USER WISHES: ${wishes}`;
    taskDesc += " IMPORTANT: If code is missing standard imports, ADD THEM.";

    const systemPrompt = `
        Role: Senior Tech Lead.
        Task: ${taskDesc}
        Context Language: ${lang}.
        Output Language: ${targetLangName}.
        
        JSON OUTPUT ONLY (No Markdown):
        {
            "fixedCode": "STRING (CODE ONLY)",
            "explanation": "STRING (Markdown ok)",
            "tip": "Short pro tip",
            "score": INTEGER (0-100),
            "smells": ["List issues or 'None'"]
        }
    `;

    try {
        const response = await fetch(getApiUrl(selectedModel), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: code }] }],
                systemInstruction: { parts: [{ text: systemPrompt }] },
                generationConfig: { responseMimeType: "application/json" }
            })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error?.message || response.statusText);

        let rawText = data.candidates[0].content.parts[0].text;
        rawText = rawText.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/, '').trim();
        
        let result;
        try {
            result = JSON.parse(rawText);
        } catch (e) {
            console.warn("JSON Parse failed, attempting repair...", e);
            const fixedText = rawText.replace(/(?<!\\)\n/g, "\\n");
            result = JSON.parse(fixedText);
        }

        renderOutput(result, lang);
        addToHistory({ mode: currentMode, lang, input: code, output: result, time: new Date().toLocaleTimeString() });

    } catch (error) {
        console.error(error);
        els.errorMsg.textContent = "AI Error: " + error.message;
        els.errorMsg.classList.remove('hidden');
    } finally {
        els.loadingOverlay.classList.add('hidden');
        els.runBtn.classList.remove('run-btn-glowing');
    }
}

function renderOutput(data, lang) {
    els.emptyState.classList.add('hidden');
    els.outputContainer.classList.remove('hidden');
    
    els.outputExpl.innerHTML = (data.explanation || "").replace(/\n/g, '<br>');
    els.outputTip.textContent = data.tip || "Code better!";
    animateScoreCount(els.scoreCircle, data.score || 85);

    if(data.smells && data.smells.length && data.smells[0] !== 'None') {
        els.smellsSection.classList.remove('hidden');
        els.smellsList.innerHTML = data.smells.map(s => `<li>• ${s}</li>`).join('');
    } else {
        els.smellsSection.classList.add('hidden');
    }

    const codeBlock = els.outputCode;
    codeBlock.className = 'code-font text-sm';
    codeBlock.textContent = data.fixedCode || "// Error generating code";
    
    const langMap = { 'JavaScript':'javascript', 'Python':'python', 'HTML/CSS':'html', 'Java':'java', 'C++':'cpp', 'PHP':'php', 'SQL':'sql' };
    codeBlock.classList.add(`language-${langMap[lang] || 'plaintext'}`);
    
    if (window.Prism) try { Prism.highlightElement(codeBlock); } catch(e){}

    if (['HTML/CSS', 'JavaScript'].includes(lang)) {
        els.tabPreview.classList.remove('hidden');
        if (currentMode !== 'explain') switchTab('preview');
    } else {
        els.tabPreview.classList.add('hidden');
        if (!els.viewPreview.classList.contains('hidden')) switchTab('code');
    }
}

function exportMarkdown() {
    const md = `# FixlyCode Report\n\n${els.outputExpl.textContent}\n\n\`\`\`\n${els.outputCode.textContent}\n\`\`\``;
    navigator.clipboard.writeText(md);
    els.exportBtn.textContent = "Copied!";
    setTimeout(() => els.exportBtn.innerHTML = `<i class="fa-brands fa-markdown mr-2"></i> ${TRANSLATIONS[currentLang].exportBtn}`, 2000);
}

function newChat() {
    els.input.value = '';
    els.wishes.value = '';
    els.outputContainer.classList.add('hidden');
    els.emptyState.classList.remove('hidden');
    els.tabPreview.classList.add('hidden');
    localStorage.removeItem('fixly_draft');
    switchTab('code');
}

function copyCode() {
    navigator.clipboard.writeText(els.outputCode.textContent);
    els.copyBtn.innerHTML = '<i class="fa-solid fa-check text-brand-500"></i>';
    setTimeout(() => els.copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>', 2000);
}

function addToHistory(item) {
    history.unshift(item);
    if (history.length > 20) history.pop();
    localStorage.setItem('fixly_history', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    els.historyList.innerHTML = '';
    if (!history.length) {
        els.historyList.innerHTML = `<div class="text-center p-4 opacity-70 text-slate-400 text-xs">${TRANSLATIONS[currentLang].historyEmptyDesc}</div>`;
        return;
    }
    history.forEach(item => {
        const div = document.createElement('div');
        div.className = "p-3 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 hover:border-brand-500 cursor-pointer mb-2";
        div.onclick = () => {
            els.input.value = item.input;
            els.langSelect.value = item.lang;
            setMode(item.mode);
            renderOutput(item.output, item.lang);
        };
        div.innerHTML = `<div class="flex justify-between mb-1"><span class="font-mono text-[10px] text-slate-400">${item.time}</span><span class="text-[10px] font-bold text-brand-600">${item.mode}</span></div><div class="text-xs truncate text-slate-500">${item.input.substring(0, 30)}...</div>`;
        els.historyList.appendChild(div);
    });
}

function clearHistory() {
    history = [];
    localStorage.removeItem('fixly_history');
    renderHistory();
}

// UI UTILS
function animateScoreCount(targetEl, finalScore) {
    let start = 0;
    const duration = 800;
    const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const current = Math.floor(progress * finalScore);
        targetEl.textContent = current;
        targetEl.style.color = current > 80 ? '#10b981' : current > 50 ? '#ca8a04' : '#dc2626';
        targetEl.style.borderColor = targetEl.style.color;
        if (progress < 1) window.requestAnimationFrame(step);
        else els.scoreText.textContent = finalScore > 80 ? "Excellent" : finalScore > 50 ? "Good" : "Issues";
    };
    window.requestAnimationFrame(step);
}

function showTooltip(e) {
    const key = e.currentTarget.dataset.tooltipKey;
    if(!key) return;
    els.tooltip.textContent = TRANSLATIONS[currentLang][key];
    els.tooltip.classList.remove('hidden');
    const rect = e.currentTarget.getBoundingClientRect();
    els.tooltip.style.top = `${rect.bottom + 5}px`;
    els.tooltip.style.left = `${rect.left + rect.width/2}px`;
    els.tooltip.classList.remove('opacity-0');
}

function hideTooltip() {
    els.tooltip.classList.add('opacity-0');
    setTimeout(() => els.tooltip.classList.add('hidden'), 200);
}

function toggleTheme() {
    isDark = !isDark;
    els.html.classList.toggle('dark');
    localStorage.setItem('fixly_theme', isDark ? 'dark' : 'light');
}
