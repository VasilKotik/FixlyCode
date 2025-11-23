// --- КОНФІГУРАЦІЯ API ---
const apiKey = "AIzaSyA5oYnLJnxuXThSkqk5kfbaQ3mw0XspcxQ"; 

const MODEL_NAME = "gemini-2.5-flash-preview-09-2025";
const getApiUrl = () => `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`;

const TRANSLATIONS = {
    uk: {
        langName: "Українська", modeDebug: "Виправити", modeOptimize: "Оптимізувати", modeExplain: "Пояснити", inputLabel: "Вхідний Код", outputLabel: "Рішення та Аналіз", clearBtn: "Очистити", runBtn: "Запуск", copyBtn: "Копіювати", analysisHeader: "Аналіз", changesHeader: "Що було зроблено:", emptyTitle: "Готовий до роботи", emptyDesc: "Вставте код та оберіть дію.", loading: "ШІ аналізує...", placeholder: "// Вставте сюди код...", clearHistory: "Очистити історію", historyEmpty: "Історія порожня", confirmClear: "Ви впевнені?", errorKey: "Помилка ключа API", errorEmpty: "Введіть код"
    },
    en: {
        langName: "English", modeDebug: "Fix Code", modeOptimize: "Optimize", modeExplain: "Explain", inputLabel: "Input Code", outputLabel: "Solution & Analysis", clearBtn: "Clear", runBtn: "Run", copyBtn: "Copy", analysisHeader: "Analysis", changesHeader: "Key Changes:", emptyTitle: "Ready to help", emptyDesc: "Paste code and select an action.", loading: "AI is thinking...", placeholder: "// Paste your code here...", clearHistory: "Clear History", historyEmpty: "History empty", confirmClear: "Are you sure?", errorKey: "API Key Error", errorEmpty: "Please enter code"
    },
    pl: {
        langName: "Polski", modeDebug: "Napraw", modeOptimize: "Optymalizuj", modeExplain: "Wyjaśnij", inputLabel: "Kod Wejściowy", outputLabel: "Rozwiązanie i Analiza", clearBtn: "Wyczyść", runBtn: "Uruchom", copyBtn: "Kopiuj", analysisHeader: "Analiza", changesHeader: "Kluczowe zmiany:", emptyTitle: "Gotowy do pracy", emptyDesc: "Wklej kod i wybierz akcję.", loading: "AI analizuje...", placeholder: "// Wklej tutaj swój kod...", clearHistory: "Wyczyść historię", historyEmpty: "Pusta historia", confirmClear: "Jesteś pewien?", errorKey: "Błąd klucza API", errorEmpty: "Wprowadź kod"
    },
    es: {
        langName: "Español", modeDebug: "Corregir", modeOptimize: "Optimizar", modeExplain: "Explicar", inputLabel: "Código de Entrada", outputLabel: "Solución y Análisis", clearBtn: "Borrar", runBtn: "Ejecutar", copyBtn: "Copiar", analysisHeader: "Análisis", changesHeader: "Cambios clave:", emptyTitle: "Listo para trabajar", emptyDesc: "Pega el código y selecciona una acción.", loading: "IA pensando...", placeholder: "// Pega tu código aquí...", clearHistory: "Borrar historial", historyEmpty: "Historial vacío", confirmClear: "¿Estás seguro?", errorKey: "Error de clave API", errorEmpty: "Por favor, introduce código"
    },
    de: {
        langName: "Deutsch", modeDebug: "Korrigieren", modeOptimize: "Optimieren", modeExplain: "Erklären", inputLabel: "Eingabecode", outputLabel: "Lösung & Analyse", clearBtn: "Löschen", runBtn: "Ausführen", copyBtn: "Kopieren", analysisHeader: "Analyse", changesHeader: "Wichtige Änderungen:", emptyTitle: "Bereit", emptyDesc: "Code einfügen und Aktion wählen.", loading: "KI denkt nach...", placeholder: "// Code hier einfügen...", clearHistory: "Verlauf löschen", historyEmpty: "Verlauf leer", confirmClear: "Sind Sie sicher?", errorKey: "API-Schlüssel Fehler", errorEmpty: "Bitte Code eingeben"
    }
};

let currentMode = 'debug';
let currentLang = localStorage.getItem('codemedic_lang') || 'uk';
let history = JSON.parse(localStorage.getItem('codemedic_history')) || [];

const elements = {
    input: document.getElementById('input-code'),
    outputCode: document.getElementById('output-code'),
    outputExpl: document.getElementById('output-explanation'),
    outputChanges: document.getElementById('output-changes'),
    outputContainer: document.getElementById('output-container'),
    emptyState: document.getElementById('empty-state'),
    loadingOverlay: document.getElementById('loading-overlay'),
    loadingText: document.getElementById('loading-text'),
    runBtn: document.getElementById('run-btn'),
    runBtnText: document.getElementById('run-btn-text'),
    errorMsg: document.getElementById('error-msg'),
    historyList: document.getElementById('history-list'),
    langSelect: document.getElementById('language-select'),
    interfaceLangSelect: document.getElementById('interface-lang'),
    modeBtns: document.querySelectorAll('.mode-btn'),
    copyBtn: document.getElementById('copy-btn'),
    sidebar: document.getElementById('sidebar'),
    changesBlock: document.getElementById('changes-block')
};

document.addEventListener('DOMContentLoaded', () => {
    elements.interfaceLangSelect.value = currentLang;
    updateInterfaceLanguage(currentLang);
    renderHistory();
    setupEventListeners();
});

function setupEventListeners() {
    elements.runBtn.addEventListener('click', runCodeMedic);
    elements.modeBtns.forEach(btn => btn.addEventListener('click', (e) => {
        const target = e.target.closest('.mode-btn'); 
        if(target) setMode(target.dataset.mode);
    }));
    document.getElementById('clear-input-btn').addEventListener('click', () => { elements.input.value = ''; elements.input.focus(); });
    elements.copyBtn.addEventListener('click', copyOutput);
    document.getElementById('clear-history-btn').addEventListener('click', clearHistory);
    document.getElementById('toggle-sidebar').addEventListener('click', () => elements.sidebar.classList.toggle('hidden'));
    elements.interfaceLangSelect.addEventListener('change', (e) => updateInterfaceLanguage(e.target.value));
}

function updateInterfaceLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('codemedic_lang', lang);
    const t = TRANSLATIONS[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.textContent = t[key];
    });
    elements.input.placeholder = t.placeholder;
    setMode(currentMode);
}

function setMode(mode) {
    currentMode = mode;
    const t = TRANSLATIONS[currentLang];
    const modeKeys = { 'debug': 'modeDebug', 'optimize': 'modeOptimize', 'explain': 'modeExplain' };
    elements.modeBtns.forEach(btn => {
        const btnMode = btn.dataset.mode;
        const isSelected = btnMode === mode;
        btn.className = isSelected 
            ? 'mode-btn px-3 py-1.5 rounded text-xs font-bold transition-all flex items-center bg-blue-600 text-white shadow-md transform scale-105'
            : 'mode-btn px-3 py-1.5 rounded text-xs font-bold transition-all flex items-center text-slate-400 hover:text-white hover:bg-slate-700';
    });
    elements.runBtnText.innerText = t[modeKeys[mode]] || t.runBtn;
}

function stripMarkdown(text) {
    return text.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/, '').trim();
}

function safeJSONParse(str) {
    try { return JSON.parse(str); } 
    catch (e) {
        try { return JSON.parse(str.replace(/(?<=:\s*".*?)\n(?=.*?")/g, '\\n')); } 
        catch (e2) { throw new Error("JSON Parse Error"); }
    }
}

async function runCodeMedic() {
    const t = TRANSLATIONS[currentLang];
    const code = elements.input.value.trim();
    if (!code) return showError(t.errorEmpty);
    if (!apiKey || apiKey.includes("ТУТ_ВСТАВТЕ")) return showError("Помилка API ключа");

    const lang = elements.langSelect.value;
    showError(null);
    elements.loadingText.textContent = t.loading;
    elements.loadingOverlay.classList.remove('hidden');

    const roleMap = {
        'debug': { en: "Senior Developer", uk: "Досвідчений розробник", pl: "Doświadczony programista", es: "Desarrollador Senior", de: "Senior Entwickler" },
        'optimize': { en: "Tech Lead", uk: "Tech Lead", pl: "Tech Lead", es: "Líder Técnico", de: "Technischer Leiter" },
        'explain': { en: "Mentor", uk: "Ментор", pl: "Mentor", es: "Mentor", de: "Mentor" }
    };
    const taskMap = {
        'debug': { en: "Fix bugs", uk: "Виправи помилки", pl: "Napraw błędy", es: "Corrige errores", de: "Fehler beheben" },
        'optimize': { en: "Optimize for speed/clean code", uk: "Оптимізуй для швидкодії/чистоти", pl: "Zoptymalizuj pod kątem szybkości", es: "Optimizar velocidad", de: "Optimiere Geschwindigkeit" },
        'explain': { en: "Explain logic", uk: "Поясни логіку", pl: "Wyjaśnij logikę", es: "Explicar lógica", de: "Logik erklären" }
    };

    const targetLangName = TRANSLATIONS[currentLang].langName; 
    const systemPrompt = `
        You are a ${roleMap[currentMode][currentLang] || "Expert"}.
        Task: ${taskMap[currentMode][currentLang] || "Analyze code"} in ${lang}.
        CRITICAL INSTRUCTION: Provide all explanations and comments in ${targetLangName} language.
        OUTPUT FORMAT (JSON Only):
        {
            "fixedCode": "CODE_HERE (Escaped \\n and \")",
            "explanation": "Explanation in ${targetLangName}",
            "changes": ["Point 1 in ${targetLangName}", "Point 2 in ${targetLangName}"]
        }
    `;

    try {
        const response = await fetch(getApiUrl(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: code }] }],
                systemInstruction: { parts: [{ text: systemPrompt }] },
                generationConfig: { responseMimeType: "application/json" }
            })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error?.message || "API Error");

        const result = safeJSONParse(stripMarkdown(data.candidates[0].content.parts[0].text));
        renderOutput(result, lang);
        
        addToHistory({
            mode: currentMode, lang, input: code, output: result,
            timestamp: new Date().toLocaleTimeString(currentLang === 'en' ? 'en-US' : 'uk-UA', {hour: '2-digit', minute:'2-digit'})
        });
    } catch (error) {
        console.error(error);
        showError(`Error: ${error.message}`);
    } finally {
        elements.loadingOverlay.classList.add('hidden');
    }
}

function renderOutput(data, lang) {
    elements.emptyState.classList.add('hidden');
    elements.outputContainer.classList.remove('hidden');
    elements.copyBtn.classList.remove('hidden');

    elements.outputExpl.innerHTML = data.explanation.replace(/\n/g, '<br>');

    elements.outputChanges.innerHTML = '';
    if (data.changes?.length) {
        data.changes.forEach(change => {
            const li = document.createElement('li');
            li.className = "text-xs text-slate-400 flex items-start";
            li.innerHTML = `<i class="fa-solid fa-check text-green-500 mr-2 mt-0.5"></i> ${change}`;
            elements.outputChanges.appendChild(li);
        });
        elements.changesBlock.classList.remove('hidden');
    } else {
        elements.changesBlock.classList.add('hidden');
    }

    const codeBlock = elements.outputCode;
    codeBlock.className = 'code-font text-sm'; 
    codeBlock.textContent = data.fixedCode;
    
    const prismLangMap = { 'JavaScript': 'javascript', 'Python': 'python', 'Java': 'java', 'HTML/CSS': 'html', 'C++': 'cpp', 'SQL': 'sql', 'PHP': 'php' };
    codeBlock.classList.add(`language-${prismLangMap[lang] || 'clike'}`);

    if (window.Prism) { try { Prism.highlightElement(codeBlock); } catch (e) {} }
}

function showError(msg) {
    elements.errorMsg.innerText = msg || '';
    msg ? elements.errorMsg.classList.remove('hidden') : elements.errorMsg.classList.add('hidden');
}

function copyOutput() {
    navigator.clipboard.writeText(elements.outputCode.textContent);
    const icon = elements.copyBtn.querySelector('i');
    icon.className = "fa-solid fa-check mr-1";
    setTimeout(() => { icon.className = "fa-regular fa-copy mr-1"; }, 2000);
}

function addToHistory(item) {
    history.unshift(item); 
    if (history.length > 15) history.pop(); 
    localStorage.setItem('codemedic_history', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    const t = TRANSLATIONS[currentLang];
    elements.historyList.innerHTML = '';
    if (history.length === 0) {
        elements.historyList.innerHTML = `<div class="text-center text-slate-600 text-sm mt-10 italic">${t.historyEmpty}</div>`;
        return;
    }
    history.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = "p-3 rounded bg-slate-900 border border-slate-800 hover:border-blue-500/50 cursor-pointer transition group";
        div.onclick = () => loadHistoryItem(index);
        const iconMap = { 'debug': 'fa-wrench text-blue-500', 'optimize': 'fa-gauge-high text-green-500', 'explain': 'fa-list-check text-purple-500' };
        div.innerHTML = `
            <div class="flex justify-between items-center mb-1">
                <span class="text-[10px] text-slate-500 font-mono">${item.timestamp}</span>
                <i class="fa-solid ${iconMap[item.mode]} text-xs"></i>
            </div>
            <div class="text-xs font-bold text-slate-300 truncate">${item.lang}</div>
            <div class="text-[10px] text-slate-500 truncate mt-1 opacity-70 group-hover:opacity-100">${item.input.substring(0, 30)}...</div>
        `;
        elements.historyList.appendChild(div);
    });
}

function loadHistoryItem(index) {
    const item = history[index];
    elements.input.value = item.input;
    elements.langSelect.value = item.lang;
    setMode(item.mode);
    renderOutput(item.output, item.lang);
}

function clearHistory() {
    const t = TRANSLATIONS[currentLang];
    if(confirm(t.confirmClear)) {
        history = [];
        localStorage.removeItem('codemedic_history');
        renderHistory();
    }
}
