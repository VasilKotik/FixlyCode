const apiKey = "AIzaSyA5oYnLJnxuXThSkqk5kfbaQ3mw0XspcxQ"; 
const getApiUrl = (model) => `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

// --- DATA: EXTENDED TIPS & FACTS ---
const BASE_TIPS = [
    { title: "DRY: Don't Repeat Yourself", desc: "Принцип програмування, який спрямований на зменшення повторення інформації. Кожна частина знань повинна мати єдине, однозначне представлення в системі. Якщо ви пишете один і той же код двічі — створіть функцію." },
    { title: "KISS: Keep It Simple, Stupid", desc: "Більшість систем працюють найкраще, якщо вони залишаються простими. Уникайте непотрібної складності. Код повинен бути зрозумілим для людини, яка читатиме його через пів року (це можете бути ви!)." },
    { title: "YAGNI: You Aren't Gonna Need It", desc: "Не додавайте функціональність, доки вона дійсно не знадобиться. Спроба передбачити майбутнє часто призводить до написання 'мертвого' коду, який лише ускладнює підтримку." },
    { title: "Коментуйте 'Чому', а не 'Як'", desc: "Код сам по собі показує, 'як' він працює. Коментарі потрібні для пояснення неочевидних рішень, бізнес-логіки або дивних хаків. Не пишіть 'i++ // збільшити i на 1'." },
    { title: "Fail Fast (Швидка відмова)", desc: "Перевіряйте умови помилок на початку функції та одразу повертайте результат/викидайте помилку. Це зменшує вкладеність if/else і робить код лінійним та чистішим." },
    { title: "Async/Await замість Callbacks", desc: "У сучасному JavaScript для асинхронних операцій завжди віддавайте перевагу async/await. Це робить асинхронний код схожим на синхронний, що значно полегшує його розуміння та відлагодження." },
    { title: "Іменування змінних", desc: "Ім'я змінної має чітко відповідати на питання: що тут зберігається? Використовуйте `isUserLoggedIn` замість `flag` або `userActive`. Код читається частіше, ніж пишеться." },
    { title: "Single Responsibility Principle", desc: "Функція або клас повинні робити лише одну річ і робити її добре. Якщо ваша функція називається `processUserDataAndSaveToDbAndSendEmail`, її варто розділити на три." }
];

const FUN_FACTS = [
    "Перший комп'ютерний 'баг' був справжнім метеликом, який застряг у реле комп'ютера Mark II у 1947 році. Грейс Гоппер вклеїла його в журнал.",
    "Python назвали на честь британського комедійного шоу 'Летючий цирк Монті Пайтона', а не на честь змії. Гвідо ван Россум був фанатом шоу.",
    "Назва 'Java' виникла випадково під час кава-брейку. Розробники пили каву сорту Peet's Java. Спочатку мову хотіли назвати Oak (Дуб).",
    "Перший веб-сайт (info.cern.ch) був запущений Тімом Бернерсом-Лі у 1991 році і досі працює. Він описує, що таке World Wide Web.",
    "Javascript був написаний Бренданом Айком всього за 10 днів у травні 1995 року. Спочатку він називався Mocha, потім LiveScript."
];

// --- TRANSLATIONS ---
const TRANSLATIONS = {
    uk: {
        newChatBtn: "Новий чат", donateBtn: "На каву розробнику", runBtn: "Запуск", analysisHeader: "Діагностика", emptyTitle: "FixlyCode", loading: "Аналіз...", errorEmpty: "Введіть код!", clearHistory: "Очистити історію", placeholder: "// Вставте код тут...", tipHeader: "Порада:", langName: "Українська", wishesPlaceholder: "Побажання...", exportBtn: "Експорт в Markdown", scoreTitle: "Рейтинг",
        tipDebug: "Виправити помилки", tipOptimize: "Покращити код", tipExplain: "Пояснити логіку", tipConvert: "Конвертувати мову", tipTest: "Створити тести", tipComplexity: "Аналіз складності",
        welcomeDesc: "Ваш персональний AI-асистент. Виправляйте баги, оптимізуйте код та тестуйте.", startBtn: "Почати роботу", emptyStatePrompt: "Оберіть режим та натисніть Запуск",
        tabHistory: "Історія", tabTips: "Поради AI", tipsHeader: "Поради для Clean Code", historyEmptyTitle: "Історія порожня", historyEmptyDesc: "Тут з'являться ваші останні запити після першого запуску.",
        funFactHeader: "Цікавий факт", funFacts: FUN_FACTS, aiTips: BASE_TIPS,
        // Features
        featDebugTitle: "Розумний Дебаг", featDebugDesc: "Автоматичний пошук та виправлення помилок з поясненням.",
        featOptimizeTitle: "Оптимізація", featOptimizeDesc: "Покращення продуктивності та читабельності коду.",
        featConvertTitle: "Конвертація", featConvertDesc: "Миттєвий переклад коду між мовами (напр. Python → JS).",
        featTestTitle: "AI Тестування", featTestDesc: "Генерація юніт-тестів та перевірка граничних випадків.",
        // Tour
        tourStep1Title: "1. Введіть Код", tourStep1Desc: "Вставте ваш код сюди або почніть писати.",
        tourStep2Title: "2. Оберіть Режим", tourStep2Desc: "Виберіть, що саме ви хочете зробити з кодом: виправити, пояснити, конвертувати...",
        tourStep3Title: "3. Запустіть AI", tourStep3Desc: "Натисніть цю кнопку, і AI проаналізує ваш код за секунди!"
    },
    en: {
        newChatBtn: "New Chat", donateBtn: "Buy me a coffee", runBtn: "Run FixlyCode", analysisHeader: "Diagnostics", emptyTitle: "FixlyCode", loading: "Thinking...", errorEmpty: "Enter code!", clearHistory: "Clear History", placeholder: "// Paste code here...", tipHeader: "Pro Tip:", langName: "English", wishesPlaceholder: "Wishes...", exportBtn: "Export to Markdown", scoreTitle: "Score",
        tipDebug: "Fix Bugs", tipOptimize: "Optimize Code", tipExplain: "Explain Logic", tipConvert: "Convert Language", tipTest: "Generate Tests", tipComplexity: "Analyze Complexity",
        welcomeDesc: "Your AI coding assistant. Fix bugs, optimize code, and test instantly.", startBtn: "Get Started", emptyStatePrompt: "Select mode and click Run",
        tabHistory: "History", tabTips: "AI Tips", tipsHeader: "Tips for Clean Code", historyEmptyTitle: "History Empty", historyEmptyDesc: "Your recent queries will appear here after the first run.",
        funFactHeader: "Fun Fact", funFacts: [
            "The first computer bug was a real moth found in the Mark II computer in 1947.",
            "Python was named after 'Monty Python’s Flying Circus', not the snake.",
            "Programmers use 'Foo' and 'Bar' from the military term FUBAR.",
            "The first website (info.cern.ch) is still online. It launched in 1991.",
            "Javascript was written by Brendan Eich in just 10 days."
        ], aiTips: BASE_TIPS, // Note: Should be translated in full app
        featDebugTitle: "Smart Debug", featDebugDesc: "Auto-detect and fix bugs with explanations.",
        featOptimizeTitle: "Optimization", featOptimizeDesc: "Improve performance and code readability.",
        featConvertTitle: "Conversion", featConvertDesc: "Translate code between languages instantly.",
        featTestTitle: "AI Testing", featTestDesc: "Generate unit tests and check edge cases.",
        tourStep1Title: "1. Input Code", tourStep1Desc: "Paste your code here or start typing.",
        tourStep2Title: "2. Select Mode", tourStep2Desc: "Choose what you want to do: fix, explain, convert...",
        tourStep3Title: "3. Run AI", tourStep3Desc: "Click this button and AI will analyze your code in seconds!"
    },
    pl: { ...BASE_TIPS, langName: "Polski", tabTips: "Wskazówki AI", funFactHeader: "Ciekawostka", runBtn: "Uruchom", welcomeDesc: "Twój asystent AI.", startBtn: "Rozpocznij", donateBtn: "Postaw kawę" },
    de: { ...BASE_TIPS, langName: "Deutsch", tabTips: "KI Tipps", funFactHeader: "Fun Fact", runBtn: "Starten", welcomeDesc: "Dein KI-Assistent.", startBtn: "Loslegen", donateBtn: "Kaffee spendieren" },
    es: { ...BASE_TIPS, langName: "Español", tabTips: "Consejos AI", funFactHeader: "Dato Curioso", runBtn: "Ejecutar", welcomeDesc: "Tu asistente AI.", startBtn: "Empezar", donateBtn: "Invítame un café" },
    ru: { ...BASE_TIPS, langName: "Русский", tabTips: "Советы ИИ", funFactHeader: "Интересный факт", runBtn: "Запуск", welcomeDesc: "Ваш ИИ-помощник.", startBtn: "Начать", donateBtn: "На кофе" }
};

['pl', 'de', 'es', 'ru'].forEach(lang => { TRANSLATIONS[lang] = { ...TRANSLATIONS.uk, ...TRANSLATIONS[lang] }; });

// --- STATE ---
let currentMode = 'debug';
let currentLang = localStorage.getItem('fixly_lang') || 'uk';
let isDark = localStorage.getItem('fixly_theme') !== 'light';
let history = JSON.parse(localStorage.getItem('fixly_history')) || [];
let tooltipTimeout;
let currentSidebarTab = 'history'; 
let currentTourStep = 0; 

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
    
    // Welcome & Tour
    welcomeScreen: document.getElementById('welcome-screen'),
    startBtn: document.getElementById('start-btn'),
    tourOverlay: document.getElementById('tour-overlay'), 
    tourTooltip: document.getElementById('tour-tooltip'), 
    tourTitle: document.getElementById('tour-title'), 
    tourDesc: document.getElementById('tour-desc'), 
    tourNextBtn: document.getElementById('tour-next-btn'), 
    
    // Sidebar
    tabHistoryBtn: document.getElementById('tab-history-btn'),
    tabTipsBtn: document.getElementById('tab-tips-btn'),
    historyContent: document.getElementById('history-content'),
    tipsContent: document.getElementById('tips-content'),
    aiTipsList: document.getElementById('ai-tips-list'),
    funFactText: document.getElementById('fun-fact-text'),
    clearHistoryBtn: document.getElementById('clear-history-btn'), // NEW
    
    // Header
    activeModeDisplay: document.getElementById('active-mode-display'),
    modeIcon: document.getElementById('mode-icon'),
    modeName: document.getElementById('mode-name'),
    
    // Tour Targets
    targetInput: document.getElementById('input-section'),
    targetModes: document.getElementById('mode-buttons-container'),
    targetRun: document.getElementById('run-btn')
};

// --- INITIALIZATION ---
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
    const savedDraft = localStorage.getItem('fixly_draft');
    if(savedDraft) els.input.value = savedDraft;

    els.runBtn.addEventListener('click', runAI);
    els.newChatBtn.addEventListener('click', newChat);
    els.themeToggle.addEventListener('click', toggleTheme);
    els.uiLang.addEventListener('change', (e) => updateTexts(e.target.value));
    els.copyBtn.addEventListener('click', copyCode);
    els.exportBtn.addEventListener('click', exportMarkdown);
    document.getElementById('clear-input-btn').addEventListener('click', () => { els.input.value = ''; els.input.focus(); localStorage.removeItem('fixly_draft'); });
    els.clearHistoryBtn.addEventListener('click', clearHistory); // Updated
    
    els.startBtn.addEventListener('click', () => {
        closeWelcomeScreen();
        const tourSeen = localStorage.getItem('fixly_tour_seen');
        if (!tourSeen) {
            setTimeout(startTour, 600); 
        }
    });
    
    els.tourNextBtn.addEventListener('click', nextTourStep);

    els.toggleSidebarBtn.addEventListener('click', () => {
        if (els.sidebar.classList.contains('hidden')) {
            els.sidebar.classList.remove('hidden');
            els.sidebar.classList.add('flex', 'sidebar-animate-open');
        } else {
            els.sidebar.classList.add('hidden');
            els.sidebar.classList.remove('flex', 'sidebar-animate-open');
        }
    });

    if(els.closeSidebarBtn) {
        els.closeSidebarBtn.addEventListener('click', () => {
            els.sidebar.classList.add('hidden');
            els.sidebar.classList.remove('flex', 'sidebar-animate-open');
        });
    }

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
        els.refreshPreviewBtn.classList.add('animate-spin');
        setTimeout(() => els.refreshPreviewBtn.classList.remove('animate-spin'), 500);
    });
});

// --- TOUR FUNCTIONS ---
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
    if (index >= tourSteps.length) {
        endTour();
        return;
    }
    
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
        
        let top, left;
        
        if (step.pos === 'right') {
            top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
            left = rect.right + 20;
            if (window.innerWidth < 768) { top = rect.bottom + 10; left = rect.left; }
        } else if (step.pos === 'bottom') {
            top = rect.bottom + 20;
            left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        } else if (step.pos === 'top') {
            top = rect.top - tooltipRect.height - 20;
            left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        }

        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) left = window.innerWidth - tooltipRect.width - 10;
        if (top < 10) top = 10;

        els.tourTooltip.style.top = `${top}px`;
        els.tourTooltip.style.left = `${left}px`;
    });
}

function nextTourStep() {
    currentTourStep++;
    showTourStep(currentTourStep);
}

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

function closeWelcomeScreen() {
    localStorage.setItem('fixly_welcome_seen', 'true');
    els.welcomeScreen.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => {
        els.welcomeScreen.classList.add('hidden');
        els.html.classList.remove('overflow-hidden');
    }, 500);
}

function animateScoreCount(targetEl, finalScore) {
    let start = 0;
    const duration = 800;
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        const currentScore = Math.floor(percentage * finalScore);

        targetEl.textContent = currentScore;
        const color = currentScore > 80 ? '#10b981' : currentScore > 50 ? '#ca8a04' : '#dc2626';
        const borderColor = currentScore > 80 ? '#10b981' : currentScore > 50 ? '#facc15' : '#f87171';
        
        targetEl.style.borderColor = borderColor;
        targetEl.style.color = color;

        if (percentage < 1) window.requestAnimationFrame(step);
        else els.scoreText.textContent = finalScore > 80 ? "Excellent" : finalScore > 50 ? "Good" : "Issues";
    }
    els.scoreText.textContent = '...'; 
    window.requestAnimationFrame(step);
}

function showTooltip(e) {
    clearTimeout(tooltipTimeout);
    const btn = e.currentTarget;
    const key = btn.dataset.tooltipKey;
    const text = TRANSLATIONS[currentLang][key] || key;
    els.tooltip.textContent = text;
    els.tooltip.classList.remove('hidden');
    const rect = btn.getBoundingClientRect();
    els.tooltip.style.left = `${rect.left + rect.width / 2}px`;
    els.tooltip.style.top = `${rect.bottom + 8}px`;
    requestAnimationFrame(() => els.tooltip.classList.remove('opacity-0'));
}

function hideTooltip() {
    tooltipTimeout = setTimeout(() => {
        els.tooltip.classList.add('opacity-0');
        setTimeout(() => els.tooltip.classList.add('hidden'), 200);
    }, 50);
}

function toggleTheme() {
    isDark = !isDark;
    if (isDark) els.html.classList.add('dark'); else els.html.classList.remove('dark');
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
    
    const modeMap = {
        'debug': { icon: 'fa-wrench', name: t.tipDebug },
        'optimize': { icon: 'fa-gauge-high', name: t.tipOptimize },
        'explain': { icon: 'fa-book-open', name: t.tipExplain },
        'convert': { icon: 'fa-right-left', name: t.tipConvert },
        'test': { icon: 'fa-vial-virus', name: t.tipTest },
        'complexity': { icon: 'fa-chart-line', name: t.tipComplexity || 'Complexity' }, 
    };

    const activeModeData = modeMap[mode] || { icon: 'fa-layer-group', name: mode };

    els.modeIcon.className = `fa-solid ${activeModeData.icon} text-base`;
    els.modeName.textContent = activeModeData.name;

    els.modeBtns.forEach(btn => {
        const isSelected = btn.dataset.mode === mode;
        btn.classList.toggle('active-mode', isSelected);
        if(!isSelected) btn.className = 'mode-btn';
    });
    els.runBtnText.textContent = t.runBtn;
}

// UPDATED: Switch Sidebar Tab Logic
function switchSidebarTab(tab) {
    currentSidebarTab = tab;
    
    els.tabHistoryBtn.classList.toggle('active-sidebar-tab', tab === 'history');
    els.tabTipsBtn.classList.toggle('active-sidebar-tab', tab === 'tips');
    
    els.historyContent.classList.toggle('hidden', tab !== 'history');
    els.tipsContent.classList.toggle('hidden', tab !== 'tips');

    // Expand width for Tips
    if (tab === 'tips') {
        els.sidebar.classList.remove('w-72');
        els.sidebar.classList.add('md:w-[50vw]', 'z-50'); // Expand to 50% width
        els.aiTipsList.classList.add('grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-4'); // Grid layout
        els.clearHistoryBtn.classList.add('hidden'); // Hide Clear History
    } else {
        els.sidebar.classList.add('w-72');
        els.sidebar.classList.remove('md:w-[50vw]', 'z-50');
        els.aiTipsList.classList.remove('grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-4');
        els.clearHistoryBtn.classList.remove('hidden'); // Show Clear History
    }
}

function populateTips() {
    const availableTips = TRANSLATIONS[currentLang].aiTips || BASE_TIPS;
    // Show all tips in expanded view, or just shuffle and show a few
    const shuffled = [...availableTips].sort(() => 0.5 - Math.random());
    const selectedTips = shuffled.slice(0, 6); // Show more tips (6)

    els.aiTipsList.innerHTML = selectedTips.map(tip => `
        <li class="flex flex-col space-y-2 bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm transition-all hover:shadow-md hover:border-brand-500/50">
            <h5 class="flex items-center text-sm font-bold text-slate-800 dark:text-white">
                <i class="fa-solid fa-circle-check text-brand-500 mr-2 shrink-0"></i> 
                ${tip.title}
            </h5>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">${tip.desc}</p>
        </li>
    `).join('');
}

function loadFunFact() {
    const facts = TRANSLATIONS[currentLang].funFacts || FUN_FACTS;
    const randomIndex = Math.floor(Math.random() * facts.length);
    els.funFactText.textContent = facts[randomIndex];
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
    switch(currentMode) {
        case 'debug': taskDesc = `Fix bugs. Explain why.`; break;
        case 'optimize': taskDesc = `Refactor for Clean Code & Performance. Check for Code Smells.`; break;
        case 'explain': taskDesc = `Explain logic step-by-step.`; break;
        case 'convert': taskDesc = `Convert code. Guess target from context.`; break;
        case 'test': taskDesc = `Generate Unit Tests.`; break;
        case 'complexity': taskDesc = `Analyze Time and Space Complexity (Big O).`; break;
    }
    if(wishes) taskDesc += ` USER WISHES: ${wishes}`;
    taskDesc += " IMPORTANT: If code is missing standard imports, ADD THEM.";

    const systemPrompt = `
        Role: Senior Tech Lead.
        Task: ${taskDesc}
        Context Language: ${lang}.
        Output Language: ${targetLangName}.
        
        JSON OUTPUT ONLY (No Markdown):
        {
            "fixedCode": "STRING (Escaped)",
            "explanation": "STRING",
            "tip": "Pro tip string",
            "score": INTEGER (0-100),
            "smells": ["List of detected bad practices or 'None'"]
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

        const raw = data.candidates[0].content.parts[0].text;
        const clean = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/, '').trim();
        let result = JSON.parse(clean);

        renderOutput(result, lang);
        addToHistory({ mode: currentMode, lang, input: code, output: result, time: new Date().toLocaleTimeString() });

    } catch (error) {
        console.error(error);
        els.errorMsg.textContent = error.message;
        els.errorMsg.classList.remove('hidden');
    } finally {
        els.loadingOverlay.classList.add('hidden');
        els.runBtn.classList.remove('run-btn-glowing');
    }
}

function renderOutput(data, lang) {
    els.emptyState.classList.add('hidden');
    els.outputContainer.classList.remove('hidden');
    
    els.outputExpl.innerHTML = data.explanation.replace(/\n/g, '<br>');
    els.outputTip.textContent = data.tip || "Write clean code!";
    
    animateScoreCount(els.scoreCircle, data.score || 85);

    if(data.smells && data.smells.length > 0 && data.smells[0] !== 'None') {
        els.smellsSection.classList.remove('hidden');
        els.smellsList.innerHTML = data.smells.map(s => `<li>• ${s}</li>`).join('');
    } else {
        els.smellsSection.classList.add('hidden');
    }

    const codeBlock = els.outputCode;
    codeBlock.className = 'code-font text-sm';
    codeBlock.textContent = data.fixedCode;
    codeBlock.classList.add(`language-${{'JavaScript':'javascript','Python':'python','HTML/CSS':'html'}[lang]||'clike'}`);
    
    if (window.Prism) Prism.highlightElement(codeBlock);

    if (['HTML/CSS', 'JavaScript'].includes(lang)) {
        els.tabPreview.classList.remove('hidden');
        if (currentMode !== 'explain') switchTab('preview');
    } else {
        els.tabPreview.classList.add('hidden');
        if (!els.viewPreview.classList.contains('hidden')) switchTab('code');
    }
}

function exportMarkdown() {
    const score = els.scoreCircle.textContent;
    const lang = els.langSelect.value;
    const title = `FixlyCode Report (${lang} - Score: ${score}/100)`;
    const expl = els.outputExpl.textContent;
    const code = els.outputCode.textContent;

    let md = `# ${title}\n\n## Діагностика\n${expl}\n\n## Код\n\`\`\`${lang.toLowerCase()}\n${code}\n\`\`\``;

    navigator.clipboard.writeText(md).then(() => {
        els.exportBtn.innerHTML = '<i class="fa-solid fa-check mr-3"></i> Copied!';
        setTimeout(() => els.exportBtn.innerHTML = `<i class="fa-brands fa-markdown text-lg mr-3"></i> <span data-i18n="exportBtn">Експорт</span>`, 2000);
    });
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
    
    if (history.length === 0) {
        const t = TRANSLATIONS[currentLang];
        
        const emptyState = document.createElement('div');
        emptyState.className = 'text-center p-4 space-y-3 mt-4 opacity-70';
        emptyState.innerHTML = `
            <i class="fa-solid fa-file-invoice text-3xl text-slate-400"></i>
            <h4 class="text-xs font-bold text-slate-500">${t.historyEmptyTitle}</h4>
            <p class="text-[10px] text-slate-400 leading-relaxed">${t.historyEmptyDesc}</p>
        `;
        els.historyList.appendChild(emptyState);
        return;
    }
    
    history.forEach((item) => {
        const div = document.createElement('div');
        div.className = "p-3 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 hover:border-brand-500 cursor-pointer transition group";
        div.onclick = () => {
            els.input.value = item.input;
            els.langSelect.value = item.lang;
            setMode(item.mode);
            renderOutput(item.output, item.lang);
        };
        div.innerHTML = `
            <div class="flex justify-between items-center mb-1">
                <span class="text-[10px] text-slate-400 font-mono">${item.time}</span>
                <span class="text-[10px] font-bold bg-brand-100 dark:bg-slate-800 text-brand-600 dark:text-brand-400 px-2 py-0.5 rounded">${item.mode}</span>
            </div>
            <div class="text-[10px] text-slate-500 dark:text-slate-400 truncate opacity-80 group-hover:opacity-100">${item.input.substring(0, 30)}...</div>
        `;
        els.historyList.appendChild(div);
    });
}

function clearHistory() {
    if(confirm('Очистити історію?')) {
        history = [];
        localStorage.removeItem('fixly_history');
        renderHistory();
    }
}
