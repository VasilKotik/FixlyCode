const apiKey = "AIzaSyA5oYnLJnxuXThSkqk5kfbaQ3mw0XspcxQ"; 
const getApiUrl = (model) => `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

const TRANSLATIONS = {
    uk: {
        newChatBtn: "Новий чат", donateBtn: "Підтримати", inputLabel: "Вхідний Код", tabCode: "Код", tabPreview: "Перегляд", runBtn: "Запуск", analysisHeader: "Діагностика", emptyTitle: "FixlyCode", emptyDesc: "Вставте код для аналізу.", loading: "Аналіз...", errorEmpty: "Введіть код!", clearHistory: "Очистити", placeholder: "// Вставте код тут...", tipHeader: "AI Порада:", langName: "Українська", wishesPlaceholder: "Побажання до ШІ...", exportBtn: "Експорт в Markdown", scoreTitle: "Рейтинг",
        tipDebug: "Виправити помилки", tipOptimize: "Покращити код", tipExplain: "Пояснити логіку", tipConvert: "Конвертувати", tipTest: "Створити тести", tipDocs: "Документація", tipBigO: "Аналіз складності",
        welcomeDesc: "Ваш персональний AI-асистент. Виправляйте баги, оптимізуйте код, конвертуйте мови та тестуйте проекти.", startBtn: "Почати роботу",
        emptyStatePrompt: "Оберіть режим (наприклад, \"Виправити помилки\") у верхній панелі, вставте свій код ліворуч, і натисніть \"Запуск\"!"
    },
    en: {
        newChatBtn: "New Chat", donateBtn: "Donate", inputLabel: "Input Code", tabCode: "Code", tabPreview: "Preview", runBtn: "Run FixlyCode", analysisHeader: "Diagnostics", emptyTitle: "FixlyCode", emptyDesc: "Paste code to start.", loading: "Thinking...", errorEmpty: "Enter code!", clearHistory: "Clear", placeholder: "// Paste code here...", tipHeader: "Pro Tip:", langName: "English", wishesPlaceholder: "Wishes to AI...", exportBtn: "Export to Markdown", scoreTitle: "Score",
        tipDebug: "Fix Bugs", tipOptimize: "Optimize Code", tipExplain: "Explain Logic", tipConvert: "Convert Language", tipTest: "Generate Tests", tipDocs: "Generate Docs", tipBigO: "Analyze Complexity",
        welcomeDesc: "Your personal AI coding assistant. Fix bugs, optimize code, convert languages, and test projects instantly.", startBtn: "Get Started",
        emptyStatePrompt: "Select a mode (e.g., \"Fix Bugs\") in the top bar, paste your code on the left, and click \"Run\"!"
    },
    ru: {
        newChatBtn: "Новый чат", donateBtn: "Поддержать", inputLabel: "Входной Код", tabCode: "Код", tabPreview: "Просмотр", runBtn: "Запуск", analysisHeader: "Диагностика", emptyTitle: "FixlyCode", emptyDesc: "Вставьте код.", loading: "Анализ...", errorEmpty: "Введите код!", clearHistory: "Очистить", placeholder: "// Код сюда...", tipHeader: "Совет:", langName: "Русский", wishesPlaceholder: "Пожелания к ИИ...", exportBtn: "Экспорт в Markdown", scoreTitle: "Рейтинг",
        tipDebug: "Исправить ошибки", tipOptimize: "Улучшить код", tipExplain: "Объяснить логику", tipConvert: "Конвертировать", tipTest: "Создать тесты", tipDocs: "Документация", tipBigO: "Анализ сложности",
        welcomeDesc: "Ваш персональный ИИ-помощник. Исправляйте баги, оптимизируйте код и конвертируйте языки.", startBtn: "Начать работу",
        emptyStatePrompt: "Выберите режим (например, \"Исправить ошибки\") в верхней панели, вставьте свой код слева, и нажмите \"Запуск\"!"
    },
    pl: {
        newChatBtn: "Nowy czat", donateBtn: "Wsparcie", inputLabel: "Kod wejściowy", tabCode: "Kod", tabPreview: "Podgląd", runBtn: "Uruchom", analysisHeader: "Diagnostyka", emptyTitle: "FixlyCode", emptyDesc: "Wklej kod.", loading: "Analizuję...", errorEmpty: "Wpisz kod!", clearHistory: "Wyczyść", placeholder: "// Kod tutaj...", tipHeader: "Porada:", langName: "Polski", wishesPlaceholder: "Życzenia...", exportBtn: "Eksportuj Markdown", scoreTitle: "Wynik",
        tipDebug: "Napraw błędy", tipOptimize: "Optymalizuj", tipExplain: "Wyjaśnij", tipConvert: "Konwertuj", tipTest: "Generuj testy", tipDocs: "Dokumentacja", tipBigO: "Złożoność",
        welcomeDesc: "Twój osobisty asystent AI. Naprawiaj błędy, optymalizuj kod i konwertuj języki.", startBtn: "Rozpocznij",
        emptyStatePrompt: "Wybierz tryb (np. „Napraw błędy”) na górnym pasku, wklej swój kod po lewej stronie i kliknij „Uruchom”!"
    },
    es: {
        newChatBtn: "Nuevo Chat", donateBtn: "Donar", inputLabel: "Código", tabCode: "Código", tabPreview: "Vista Previa", runBtn: "Ejecutar", analysisHeader: "Diagnóstico", emptyTitle: "FixlyCode", emptyDesc: "Pega el código.", loading: "Analizando...", errorEmpty: "¡Código!", clearHistory: "Borrar", placeholder: "// Código aquí...", tipHeader: "Consejo:", langName: "Español", wishesPlaceholder: "Deseos...", exportBtn: "Exportar Markdown", scoreTitle: "Puntaje",
        tipDebug: "Corregir errores", tipOptimize: "Optimizar", tipExplain: "Explicar", tipConvert: "Convertir", tipTest: "Generar pruebas", tipDocs: "Documentación", tipBigO: "Complejidad",
        welcomeDesc: "Tu asistente de código AI. Corrige errores, optimiza código y convierte lenguajes.", startBtn: "Empezar",
        emptyStatePrompt: "Selecciona un modo (p. ej., \"Corregir errores\") en la barra superior, pega tu código a la izquierda y haz clic en \"Ejecutar\"!"
    },
    de: {
        newChatBtn: "Neuer Chat", donateBtn: "Spenden", inputLabel: "Eingabe", tabCode: "Code", tabPreview: "Vorschau", runBtn: "Starten", analysisHeader: "Diagnose", emptyTitle: "FixlyCode", emptyDesc: "Code einfügen.", loading: "Analysieren...", errorEmpty: "Code eingeben!", clearHistory: "Löschen", placeholder: "// Code hier...", tipHeader: "Tipp:", langName: "Deutsch", wishesPlaceholder: "Wünsche...", exportBtn: "Markdown Export", scoreTitle: "Bewertung",
        tipDebug: "Fehler beheben", tipOptimize: "Optimieren", tipExplain: "Erklären", tipConvert: "Konvertieren", tipTest: "Tests erstellen", tipDocs: "Dokumentation", tipBigO: "Komplexität",
        welcomeDesc: "Dein persönlicher KI-Assistent. Fehler beheben, Code optimieren und Sprachen konvertieren.", startBtn: "Loslegen",
        emptyStatePrompt: "Wählen Sie einen Modus (z. B. „Fehler beheben“) in der oberen Leiste, fügen Sie Ihren Code links ein und klicken Sie auf „Starten“!"
    }
};

let currentMode = 'debug';
let currentLang = localStorage.getItem('fixly_lang') || 'uk';
let isDark = localStorage.getItem('fixly_theme') !== 'light';
let history = JSON.parse(localStorage.getItem('fixly_history')) || [];
let tooltipTimeout;

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
    tooltip: document.getElementById('tooltip'),
    welcomeScreen: document.getElementById('welcome-screen'),
    startBtn: document.getElementById('start-btn')
};

document.addEventListener('DOMContentLoaded', () => {
    // ЛОГІКА ВІТАЛЬНОГО ЕКРАНА (ОДНОРАЗОВА ПОЯВА)
    const welcomeSeen = localStorage.getItem('fixly_welcome_seen');
    if (welcomeSeen === 'true') {
        els.welcomeScreen.classList.add('hidden');
    }

    if (isDark) els.html.classList.add('dark'); else els.html.classList.remove('dark');
    els.uiLang.value = currentLang;
    updateTexts(currentLang);
    renderHistory();
    
    const savedDraft = localStorage.getItem('fixly_draft');
    if(savedDraft) els.input.value = savedDraft;

    els.runBtn.addEventListener('click', runAI);
    els.newChatBtn.addEventListener('click', newChat);
    els.themeToggle.addEventListener('click', toggleTheme);
    els.uiLang.addEventListener('change', (e) => updateTexts(e.target.value));
    els.copyBtn.addEventListener('click', copyCode);
    els.exportBtn.addEventListener('click', exportMarkdown);
    document.getElementById('clear-input-btn').addEventListener('click', () => { els.input.value = ''; els.input.focus(); localStorage.removeItem('fixly_draft'); });
    document.getElementById('clear-history-btn').addEventListener('click', clearHistory);
    
    // SIDEBAR TOGGLE LOGIC (З АНІМАЦІЄЮ)
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

    // WELCOME SCREEN LOGIC
    els.startBtn.addEventListener('click', closeWelcomeScreen);

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
});

// ФУНКЦІЯ АНІМАЦІЇ ЛІЧИЛЬНИКА РЕЙТИНГУ
function animateScoreCount(targetEl, finalScore) {
    let start = 0;
    const duration = 800; // Тривалість анімації
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        const currentScore = Math.floor(percentage * finalScore);

        targetEl.textContent = currentScore;
        
        // Оновлення кольору під час лічби
        const color = currentScore > 80 ? '#10b981' : currentScore > 50 ? '#ca8a04' : '#dc2626';
        const borderColor = currentScore > 80 ? '#10b981' : currentScore > 50 ? '#facc15' : '#f87171';
        
        targetEl.style.borderColor = borderColor;
        targetEl.style.color = color;

        if (percentage < 1) {
            window.requestAnimationFrame(step);
        } else {
            // Встановлюємо фінальний текстовий опис
            els.scoreText.textContent = finalScore > 80 ? "Excellent" : finalScore > 50 ? "Good" : "Needs Work";
        }
    }
    
    // Скидаємо текст для чистого старту анімації
    els.scoreText.textContent = '...'; 
    window.requestAnimationFrame(step);
}


function closeWelcomeScreen() {
    // ЗАПАМ'ЯТАТИ, ЩО КОРИСТУВАЧ НАТИСНУВ "ПОЧАТИ"
    localStorage.setItem('fixly_welcome_seen', 'true');

    els.welcomeScreen.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => {
        els.welcomeScreen.classList.add('hidden');
    }, 500);
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
}

function setMode(mode) {
    currentMode = mode;
    els.modeBtns.forEach(btn => {
        const isSelected = btn.dataset.mode === mode;
        btn.classList.toggle('active-mode', isSelected);
        if(!isSelected) btn.className = 'mode-btn';
    });
    els.runBtnText.textContent = TRANSLATIONS[currentLang].runBtn;
}

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
    if (lang === 'HTML/CSS') frame.write(code);
    else if (lang === 'JavaScript') frame.write(`<html><body><script>try{${code}}catch(e){document.body.innerHTML='<h3 style="color:red">JS Error:</h3>'+e.message}</script></body></html>`);
    else frame.write(`<html><body style="padding:20px;color:#666;"><h3>No Preview for ${lang}</h3></body></html>`);
    frame.close();
}

async function runAI() {
    const t = TRANSLATIONS[currentLang];
    const code = els.input.value.trim();
    const wishes = els.wishes.value.trim();
    
    if (!code) { 
        els.errorMsg.textContent = t.errorEmpty; 
        els.errorMsg.classList.remove('hidden'); 
        
        // ДОДАНО: Анімація тряски для помилки
        els.errorMsg.classList.add('animate-shake');
        setTimeout(() => { 
            els.errorMsg.classList.remove('animate-shake');
        }, 300);
        
        return; 
    }
    els.errorMsg.classList.add('hidden');
    els.loadingText.textContent = t.loading;
    els.loadingOverlay.classList.remove('hidden');

    const lang = els.langSelect.value;
    const targetLangName = TRANSLATIONS[currentLang].langName || "English";
    const selectedModel = els.modelSelect.value;

    let taskDesc = "";
    switch(currentMode) {
        case 'debug': taskDesc = `Fix bugs. Explain why.`; break;
        case 'optimize': taskDesc = `Refactor for Clean Code & Performance. Check for Code Smells.`; break;
        case 'explain': taskDesc = `Explain logic step-by-step.`; break;
        case 'convert': taskDesc = `Convert code. Guess target from context.`; break;
        case 'test': taskDesc = `Generate Unit Tests.`; break;
        case 'docs': taskDesc = `Generate JSDoc/Docstrings documentation.`; break;
        case 'complexity': taskDesc = `Analyze Time and Space Complexity (Big O).`; break;
    }
    if(wishes) taskDesc += ` USER WISHES: ${wishes}`;

    taskDesc += " IMPORTANT: If code is missing standard imports (like React, useState, pandas), ADD THEM.";

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
        
        if (!response.ok) {
            if (response.status === 403) throw new Error(t.error403);
            const errorBody = data.error?.message || response.statusText;
            throw new Error(`${t.errorAPI} (${errorBody})`);
        }

        const raw = data.candidates[0].content.parts[0].text;
        const clean = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/, '').trim();
        let result;
        try { result = JSON.parse(clean); } 
        catch(e) { result = JSON.parse(clean.replace(/(?<=:\s*".*?)\n(?=.*?")/g, '\\n')); }

        renderOutput(result, lang);
        addToHistory({ mode: currentMode, lang, input: code, output: result, time: new Date().toLocaleTimeString() });

    } catch (error) {
        console.error(error);
        els.errorMsg.textContent = error.message;
        els.errorMsg.classList.remove('hidden');
    } finally {
        els.loadingOverlay.classList.add('hidden');
    }
}

function renderOutput(data, lang) {
    els.emptyState.classList.add('hidden');
    els.outputContainer.classList.remove('hidden');
    
    els.outputExpl.innerHTML = data.explanation.replace(/\n/g, '<br>');
    els.outputTip.textContent = data.tip || "Write clean code!";
    
    const score = data.score || 85;
    
    // ВИКЛИК АНІМАЦІЇ ЛІЧИЛЬНИКА (ЗАМІСТЬ СТАТИЧНОГО ПРИСВОЄННЯ)
    animateScoreCount(els.scoreCircle, score);

    if(data.smells && data.smells.length > 0 && data.smells[0] !== 'None') {
        els.smellsSection.classList.remove('hidden');
        els.smellsList.innerHTML = data.smells.map(s => `<li>• ${s}</li>`).join('');
    } else {
        els.smellsSection.classList.add('hidden');
    }

    const codeBlock = els.outputCode;
    codeBlock.className = 'code-font text-sm';
    codeBlock.textContent = data.fixedCode;
    codeBlock.classList.add(`language-${{'JavaScript':'javascript','Python':'python','HTML/CSS':'html','C++':'cpp'}[lang]||'clike'}`);
    
    if (window.Prism) Prism.highlightElement(codeBlock);

    if (lang === 'HTML/CSS' || lang === 'JavaScript') {
        els.tabPreview.classList.remove('hidden');
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

    let md = `# ${title}\n\n`;
    md += `## Діагностика (Score: ${score}/100)\n\n`;
    md += `${expl}\n\n`;
    
    const smells = Array.from(els.smellsList.querySelectorAll('li')).map(li => li.textContent).join('\n');
    if(smells) {
        md += `## Виявлені проблеми (Code Smells)\n\n`;
        md += `\`\`\`text\n${smells}\n\`\`\`\n\n`;
    }
    
    md += `## Виправлений Код (${lang})\n\n`;
    md += `\`\`\`${lang.toLowerCase()}\n${code}\n\`\`\`\n`;

    navigator.clipboard.writeText(md).then(() => {
        els.exportBtn.innerHTML = '<i class="fa-solid fa-check mr-3"></i> Copied!';
        setTimeout(() => els.exportBtn.innerHTML = `<i class="fa-brands fa-markdown text-lg mr-3"></i> <span data-i18n="exportBtn">Експорт в Markdown</span>`, 2000);
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
        // ДОДАНО: Фіктивні елементи історії для заповнення простору
        const dummyHistory = [
            { mode: 'debug', lang: 'JavaScript', input: '// Example: Fix simple array loop' },
            { mode: 'optimize', lang: 'Python', input: '# Example: Optimize recursive function' },
            { mode: 'convert', lang: 'Java', input: '// Example: Convert Java to Python' }
        ];

        dummyHistory.forEach(item => {
            const div = document.createElement('div');
            // Стилізація для демонстрації (не клікабельні, прозоріші)
            div.className = "p-3 rounded-lg bg-gray-100 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800/50 transition opacity-60 pointer-events-none"; 
            div.innerHTML = `
                <div class="flex justify-between items-center mb-1">
                    <span class="text-[10px] text-slate-400 font-mono">--:--</span>
                    <span class="text-[10px] font-bold bg-gray-200 dark:bg-slate-700 text-slate-500 px-2 py-0.5 rounded">${item.mode}</span>
                </div>
                <div class="text-[10px] text-slate-500 dark:text-slate-500 truncate opacity-80">${item.input}</div>
            `;
            els.historyList.appendChild(div);
        });
        
        const placeholderText = document.createElement('p');
        placeholderText.className = 'text-center text-[10px] text-slate-500 dark:text-slate-600 mt-4';
        placeholderText.textContent = 'Ваша історія з’явиться тут.';
        els.historyList.appendChild(placeholderText);
        
        return;
    }
    
    // Оригінальна логіка рендерингу історії
    history.forEach((item, index) => {
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
