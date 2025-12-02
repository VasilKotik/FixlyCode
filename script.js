const API_CONFIG = {
    useServer: true
};
const MODEL_CONFIG = {
    'gemini-2.5-flash': { provider: 'google', supportsJson: true, verified: true },
    'qwen/qwen3-coder:free': { provider: 'openrouter', supportsJson: true, verified: false },
    'openai/gpt-oss-20b:free': { provider: 'openrouter', supportsJson: true, verified: false },
    'x-ai/grok-4.1-fast:free': { provider: 'openrouter', supportsJson: true, verified: false },
    'tngtech/deepseek-r1t2-chimera:free': { provider: 'openrouter', supportsJson: true, verified: false }
};

const FALLBACK_MODELS = {
    'google': 'gemini-2.5-flash',
    'openrouter': 'qwen/qwen3-coder:free'
};
const CONTENT_POOLS = {
    uk: {
        tips: [
            { title: "DRY", desc: "Не повторюй код двічі." }, { title: "KISS", desc: "Будь простішим." },
            { title: "YAGNI", desc: "Роби лише те, що треба." }, { title: "Fail Fast", desc: "Перевіряй помилки відразу." },
            { title: "Naming", desc: "Називай змінні зрозуміло." }, { title: "Comments", desc: "Пояснюй 'Чому', а не 'Як'." }
        ],
        facts: ["Перший баг був метеликом.", "Python назвали на честь коміків.", "JS зробили за 10 днів.", "Linux працює на тостері."]
    },
    en: {
        tips: [
            { title: "DRY", desc: "Don't Repeat Yourself." }, { title: "KISS", desc: "Keep It Simple." },
            { title: "YAGNI", desc: "You Aren't Gonna Need It." }, { title: "Fail Fast", desc: "Check errors immediately." },
            { title: "Naming", desc: "Name variables clearly." }, { title: "Comments", desc: "Explain 'Why', not 'How'." }
        ],
        facts: ["First bug was a moth.", "Python named after comedians.", "JS made in 10 days.", "Linux runs on toasters."]
    },
    pl: {
        tips: [
            { title: "DRY", desc: "Nie powtarzaj kodu." }, { title: "KISS", desc: "Bądź prosty." },
            { title: "YAGNI", desc: "Rób tylko to, czego potrzebujesz." }, { title: "Fail Fast", desc: "Sprawdzaj błędy od razu." },
            { title: "Naming", desc: "Nazywaj zmienne jasno." }, { title: "Comments", desc: "Wyjaśniaj 'Dlaczego', nie 'Jak'." }
        ],
        facts: ["Pierwszy błąd był ćmą.", "Python nazwany od komików.", "JS zrobiony w 10 dni.", "Linux działa na tosterach."]
    },
    de: {
        tips: [
            { title: "DRY", desc: "Wiederhole Code nicht." }, { title: "KISS", desc: "Halte es einfach." },
            { title: "YAGNI", desc: "Mache nur das Nötige." }, { title: "Fail Fast", desc: "Prüfe Fehler sofort." },
            { title: "Naming", desc: "Benenne Variablen klar." }, { title: "Comments", desc: "Erkläre 'Warum', nicht 'Wie'." }
        ],
        facts: ["Erster Fehler war eine Motte.", "Python nach Komikern benannt.", "JS in 10 Tagen gemacht.", "Linux läuft auf Toastern."]
    },
    es: {
        tips: [
            { title: "DRY", desc: "No repitas código." }, { title: "KISS", desc: "Mantenlo simple." },
            { title: "YAGNI", desc: "Solo haz lo necesario." }, { title: "Fail Fast", desc: "Verifica errores inmediatamente." },
            { title: "Naming", desc: "Nombra variables claramente." }, { title: "Comments", desc: "Explica 'Por qué', no 'Cómo'." }
        ],
        facts: ["El primer bug fue una polilla.", "Python nombrado por cómicos.", "JS hecho en 10 días.", "Linux funciona en tostadoras."]
    },
    ru: {
        tips: [
            { title: "DRY", desc: "Не повторяй код дважды." }, { title: "KISS", desc: "Будь проще." },
            { title: "YAGNI", desc: "Делай только то, что нужно." }, { title: "Fail Fast", desc: "Проверяй ошибки сразу." },
            { title: "Naming", desc: "Называй переменные понятно." }, { title: "Comments", desc: "Объясняй 'Почему', а не 'Как'." }
        ],
        facts: ["Первый баг был мотыльком.", "Python назван в честь комиков.", "JS сделан за 10 дней.", "Linux работает на тостерах."]
    }
};

const TRANSLATIONS = {
    uk: {
        newChatBtn: "Новий чат", donateBtn: "На каву", runBtn: "Запуск", analysisHeader: "Аналіз", emptyTitle: "FixlyCode", loading: "Аналіз...", errorEmpty: "Введіть код!", clearHistory: "Очистити", clearHistoryConfirm: "Очистити всю історію?", placeholder: "// Вставте код тут...", tipHeader: "Порада:", langName: "Українська", wishesPlaceholder: "Додаткові побажання...", exportBtn: "Експорт MD", scoreTitle: "Оцінка", analysisTimeLabel: "Час аналізу:", aiDisclaimer: "Штучний інтелект може помилятися. Будь ласка, перевіряйте інформацію та код перед використанням.",
        tipDebug: "Виправити", tipOptimize: "Оптимізувати", tipExplain: "Пояснити", tipReview: "Огляд", tipSecurity: "Безпека", tipRefactor: "Рефакторинг", tipDocument: "Документація", tipConvert: "Конвертувати", tipFormat: "Форматувати", tipTest: "Міркування",
        convertFrom: "З:", convertTo: "В:",
        languageMismatchTitle: "Невідповідність мови", languageMismatchMessage: "Код виглядає як інша мова. Змінити мову програмування?", continueAnyway: "Продовжити все одно",
        tipFormatCode: "Форматувати код", tipUploadFile: "Завантажити файл", tipDownloadFile: "Зберегти файл", tipVersionHistory: "Історія версій", tipCopyCode: "Копіювати код", tipClearEditor: "Очистити редактор",
        formatCode: "Форматувати", uploadFile: "Завантажити", downloadFile: "Зберегти", copyCode: "Копіювати", clearEditor: "Очистити",
        clearConfirm: "Очистити редактор?",
        clearConfirmTitle: "Очистити редактор?",
        clearConfirmMessage: "Весь код буде видалено. Цю дію неможливо скасувати.",
        clearHistoryConfirmTitle: "Очистити історію?",
        clearHistoryConfirmMessage: "Всі збережені чати будуть видалені. Цю дію неможливо скасувати.",
        newFileTitle: "Новий файл", fileName: "Назва", fileType: "Тип", cancel: "Скасувати", create: "Створити",
        versionHistory: "Історія версій", close: "Закрити", restoreVersion: "Відновити", noVersions: "Немає версій",
        changeLanguageConfirm: "Змінити мову?",
        changeLanguageConfirmTitle: "Змінити мову?",
        changeLanguageConfirmMessage: "Розширення файлу буде оновлено автоматично.",
        changeLanguage: "Змінити",
        deleteChatConfirmTitle: "Видалити чат?",
        deleteChatConfirmMessage: "Цю дію неможливо скасувати.",
        deleteChat: "Видалити", 
        welcomeDesc: "Ваш персональний AI-асистент для роботи з кодом. Виправляйте помилки, оптимізуйте, конвертуйте мови та тестуйте код за допомогою штучного інтелекту.", startBtn: "Почати", startTutorialBtn: "Навчання", skipBtn: "Пропустити", nextTour: "Далі", finishTour: "Готово", emptyStatePrompt: "Оберіть режим та натисніть Запуск",
        featureDebug: "Виправлення", featureDebugDesc: "Знайдіть та виправте помилки автоматично", featureOptimize: "Оптимізація", featureOptimizeDesc: "Покращте продуктивність та якість коду", featureExplain: "Пояснення", featureExplainDesc: "Детально зрозумійте логіку коду", featureConvert: "Конвертація", featureConvertDesc: "Конвертуйте між мовами програмування", featureTest: "Міркування", featureTestDesc: "Подивіться на процес мислення AI крок за кроком", featureSecurity: "Безпека", featureSecurityDesc: "Знайдіть вразливості та проблеми безпеки", featureMultiLang: "6 Мов", featureMultiCodeLang: "30+ Мов Програмування", featureFast: "Швидко та Безкоштовно",
        tabHistory: "Історія", tabTips: "Поради", historyEmptyDesc: "Тут з'являться ваші запити.", funFactHeader: "Цікавий факт",
        tourStep1Title: "1. Введіть код", tourStep1Desc: "Вставте код у текстове поле.", tourStep2Title: "2. Оберіть мову", tourStep2Desc: "Виберіть мову програмування.", tourStep3Title: "3. Оберіть режим", tourStep3Desc: "Що має зробити AI (виправити, оптимізувати, пояснити).", tourStep4Title: "4. Запустіть", tourStep4Desc: "Натисніть Запуск для аналізу!"
    },
    en: {
        newChatBtn: "New Chat", donateBtn: "Buy coffee", runBtn: "Run", analysisHeader: "Analysis", emptyTitle: "FixlyCode", loading: "Thinking...", errorEmpty: "Enter code!", clearHistory: "Clear", clearHistoryConfirm: "Clear all history?", placeholder: "// Paste code here...", langName: "English", wishesPlaceholder: "Additional wishes...", exportBtn: "Export MD", scoreTitle: "Score", analysisTimeLabel: "Analysis time:", aiDisclaimer: "Artificial intelligence may make mistakes. Please verify information and code before use.",
        tipDebug: "Fix", tipOptimize: "Optimize", tipExplain: "Explain", tipReview: "Review", tipSecurity: "Security", tipRefactor: "Refactor", tipDocument: "Document", tipConvert: "Convert", tipFormat: "Format", tipTest: "Reasoning",
        convertFrom: "From:", convertTo: "To:",
        languageMismatchTitle: "Language Mismatch", languageMismatchMessage: "Code appears to be a different language. Change programming language?", continueAnyway: "Continue Anyway",
        tipFormatCode: "Format code", tipUploadFile: "Upload file", tipDownloadFile: "Save file", tipVersionHistory: "Version history", tipCopyCode: "Copy code", tipClearEditor: "Clear editor",
        formatCode: "Format", uploadFile: "Upload", downloadFile: "Download", copyCode: "Copy", clearEditor: "Clear",
        clearConfirm: "Clear editor?",
        clearConfirmTitle: "Clear Editor?",
        clearConfirmMessage: "All code will be deleted. This action cannot be undone.",
        clearHistoryConfirmTitle: "Clear History?",
        clearHistoryConfirmMessage: "All saved chats will be deleted. This action cannot be undone.",
        newFileTitle: "New File", fileName: "Name", fileType: "Type", cancel: "Cancel", create: "Create",
        versionHistory: "Version History", close: "Close", restoreVersion: "Restore", noVersions: "No versions",
        changeLanguageConfirm: "Change language?",
        changeLanguageConfirmTitle: "Change Language?",
        changeLanguageConfirmMessage: "File extension will be updated automatically.",
        changeLanguage: "Change",
        deleteChatConfirmTitle: "Delete Chat?",
        deleteChatConfirmMessage: "This action cannot be undone.",
        deleteChat: "Delete",
        welcomeDesc: "Your personal AI coding assistant. Fix bugs, optimize, convert languages, and test code with artificial intelligence.", startBtn: "Start", startTutorialBtn: "Tutorial", skipBtn: "Skip", nextTour: "Next", finishTour: "Done", emptyStatePrompt: "Ready to code.",
        featureDebug: "Debug & Fix", featureDebugDesc: "Find and fix bugs automatically", featureOptimize: "Optimize", featureOptimizeDesc: "Improve performance and code quality", featureExplain: "Explain", featureExplainDesc: "Understand code logic in detail", featureConvert: "Convert", featureConvertDesc: "Convert between programming languages", featureTest: "Reasoning", featureTestDesc: "See AI's step-by-step thinking process", featureSecurity: "Security", featureSecurityDesc: "Find vulnerabilities and security issues", featureMultiLang: "6 Languages", featureMultiCodeLang: "30+ Programming Languages", featureFast: "Fast & Free",
        tabHistory: "History", tabTips: "Tips", historyEmptyDesc: "No history yet.", funFactHeader: "Fun Fact",
        tourStep1Title: "1. Enter code", tourStep1Desc: "Paste code in the text area.", tourStep2Title: "2. Select language", tourStep2Desc: "Choose programming language.", tourStep3Title: "3. Choose mode", tourStep3Desc: "What AI should do (fix, optimize, explain).", tourStep4Title: "4. Run", tourStep4Desc: "Click Run to start analysis!"
    },
    pl: {
        newChatBtn: "Nowy czat", donateBtn: "Kawa", runBtn: "Uruchom", analysisHeader: "Analiza", emptyTitle: "FixlyCode", loading: "Analizowanie...", errorEmpty: "Wprowadź kod!", clearHistory: "Wyczyść", clearHistoryConfirm: "Wyczyścić historię?", placeholder: "// Wklej kod tutaj...", tipHeader: "Wskazówka:", langName: "Polski", wishesPlaceholder: "Dodatkowe życzenia...", exportBtn: "Eksportuj MD", scoreTitle: "Ocena", analysisTimeLabel: "Czas analizy:", aiDisclaimer: "Sztuczna inteligencja może popełniać błędy. Proszę sprawdzić informacje i kod przed użyciem.",
        formatCode: "Formatuj", uploadFile: "Wgraj", downloadFile: "Pobierz", copyCode: "Kopiuj", clearEditor: "Wyczyść",
        clearConfirm: "Wyczyścić edytor?",
        clearConfirmTitle: "Wyczyścić edytor?",
        clearConfirmMessage: "Cały kod zostanie usunięty. Tej akcji nie można cofnąć.",
        clearHistoryConfirmTitle: "Wyczyścić historię?",
        clearHistoryConfirmMessage: "Wszystkie czaty zostaną usunięte. Tej akcji nie można cofnąć.",
        newFileTitle: "Nowy plik", fileName: "Nazwa", fileType: "Typ", cancel: "Anuluj", create: "Utwórz",
        versionHistory: "Historia wersji", close: "Zamknij", restoreVersion: "Przywróć", noVersions: "Brak wersji",
        changeLanguageConfirm: "Zmienić język?",
        changeLanguageConfirmTitle: "Zmienić język?",
        changeLanguageConfirmMessage: "Rozszerzenie pliku zostanie zaktualizowane automatycznie.",
        changeLanguage: "Zmienić",
        deleteChatConfirmTitle: "Usunąć czat?",
        deleteChatConfirmMessage: "Tej akcji nie można cofnąć.",
        deleteChat: "Usunąć",
        tipDebug: "Napraw", tipOptimize: "Optymalizuj", tipExplain: "Wyjaśnij", tipReview: "Przegląd", tipSecurity: "Bezpieczeństwo", tipRefactor: "Refaktoryzuj", tipDocument: "Dokumentacja", tipConvert: "Konwertuj", tipFormat: "Formatuj", tipTest: "Rozumowanie",
        convertFrom: "Z:", convertTo: "Do:",
        languageMismatchTitle: "Niezgodność języka", languageMismatchMessage: "Kod wygląda na inny język. Zmienić język programowania?", continueAnyway: "Kontynuuj mimo to",
        tipFormatCode: "Formatuj kod", tipUploadFile: "Wgraj plik", tipDownloadFile: "Zapisz plik", tipVersionHistory: "Historia wersji", tipCopyCode: "Kopiuj kod", tipClearEditor: "Wyczyść edytor",
        welcomeDesc: "Twój osobisty asystent AI do kodowania. Naprawiaj błędy, optymalizuj, konwertuj języki i testuj kod za pomocą sztucznej inteligencji.", startBtn: "Start", startTutorialBtn: "Samouczek", skipBtn: "Pomiń", nextTour: "Dalej", finishTour: "Gotowe", emptyStatePrompt: "Gotowy do kodowania.",
        featureDebug: "Debugowanie", featureDebugDesc: "Znajdź i napraw błędy automatycznie", featureOptimize: "Optymalizacja", featureOptimizeDesc: "Popraw wydajność i jakość kodu", featureExplain: "Wyjaśnienie", featureExplainDesc: "Zrozum logikę kodu szczegółowo", featureConvert: "Konwersja", featureConvertDesc: "Konwertuj między językami programowania", featureTest: "Rozumowanie", featureTestDesc: "Zobacz proces myślenia AI krok po kroku", featureSecurity: "Bezpieczeństwo", featureSecurityDesc: "Znajdź luki i problemy bezpieczeństwa", featureMultiLang: "6 Języków", featureMultiCodeLang: "30+ Języków Programowania", featureFast: "Szybko i Za Darmo",
        tabHistory: "Historia", tabTips: "Wskazówki", historyEmptyDesc: "Brak historii.", funFactHeader: "Ciekawostka",
        tourStep1Title: "1. Wprowadź kod", tourStep1Desc: "Wklej kod w obszarze tekstowym.", tourStep2Title: "2. Wybierz język", tourStep2Desc: "Wybierz język programowania.", tourStep3Title: "3. Wybierz tryb", tourStep3Desc: "Co AI ma zrobić (naprawić, zoptymalizować, wyjaśnić).", tourStep4Title: "4. Uruchom", tourStep4Desc: "Kliknij Uruchom, aby rozpocząć analizę!"
    },
    de: {
        newChatBtn: "Neuer Chat", donateBtn: "Kaffee", runBtn: "Ausführen", analysisHeader: "Analyse", emptyTitle: "FixlyCode", loading: "Analysiere...", errorEmpty: "Code eingeben!", clearHistory: "Löschen", clearHistoryConfirm: "Verlauf löschen?", placeholder: "// Code hier einfügen...", tipHeader: "Tipp:", langName: "Deutsch", wishesPlaceholder: "Zusätzliche Wünsche...", exportBtn: "Export MD", scoreTitle: "Bewertung", analysisTimeLabel: "Analysezeit:", aiDisclaimer: "Künstliche Intelligenz kann Fehler machen. Bitte überprüfen Sie Informationen und Code vor der Verwendung.",
        formatCode: "Formatieren", uploadFile: "Hochladen", downloadFile: "Herunterladen", copyCode: "Kopieren", clearEditor: "Löschen",
        clearConfirm: "Editor löschen?",
        clearConfirmTitle: "Editor löschen?",
        clearConfirmMessage: "Der gesamte Code wird gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.",
        clearHistoryConfirmTitle: "Verlauf löschen?",
        clearHistoryConfirmMessage: "Alle Chats werden gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.",
        newFileTitle: "Neue Datei", fileName: "Name", fileType: "Typ", cancel: "Abbrechen", create: "Erstellen",
        versionHistory: "Versionsverlauf", close: "Schließen", restoreVersion: "Wiederherstellen", noVersions: "Keine Versionen",
        changeLanguageConfirm: "Sprache ändern?",
        changeLanguageConfirmTitle: "Sprache ändern?",
        changeLanguageConfirmMessage: "Die Dateierweiterung wird automatisch aktualisiert.",
        changeLanguage: "Ändern",
        deleteChatConfirmTitle: "Chat löschen?",
        deleteChatConfirmMessage: "Diese Aktion kann nicht rückgängig gemacht werden.",
        deleteChat: "Löschen",
        tipDebug: "Beheben", tipOptimize: "Optimieren", tipExplain: "Erklären", tipReview: "Prüfen", tipSecurity: "Sicherheit", tipRefactor: "Refaktorieren", tipDocument: "Dokumentieren", tipConvert: "Konvertieren", tipFormat: "Formatieren", tipTest: "Argumentation",
        convertFrom: "Von:", convertTo: "Nach:",
        languageMismatchTitle: "Sprachkonflikt", languageMismatchMessage: "Der Code scheint eine andere Sprache zu sein. Programmiersprache ändern?", continueAnyway: "Trotzdem fortfahren",
        tipFormatCode: "Code formatieren", tipUploadFile: "Datei hochladen", tipDownloadFile: "Datei speichern", tipVersionHistory: "Versionsverlauf", tipCopyCode: "Code kopieren", tipClearEditor: "Editor löschen",
        welcomeDesc: "Ihr persönlicher KI-Code-Assistent. Beheben Sie Fehler, optimieren Sie, konvertieren Sie Sprachen und testen Sie Code mit künstlicher Intelligenz.", startBtn: "Start", startTutorialBtn: "Tutorial", skipBtn: "Überspringen", nextTour: "Weiter", finishTour: "Fertig", emptyStatePrompt: "Bereit zum Codieren.",
        featureDebug: "Debuggen", featureDebugDesc: "Fehler automatisch finden und beheben", featureOptimize: "Optimieren", featureOptimizeDesc: "Leistung und Codequalität verbessern", featureExplain: "Erklären", featureExplainDesc: "Code-Logik im Detail verstehen", featureConvert: "Konvertieren", featureConvertDesc: "Zwischen Programmiersprachen konvertieren", featureTest: "Argumentation", featureTestDesc: "Sehen Sie den Denkprozess der KI Schritt für Schritt", featureSecurity: "Sicherheit", featureSecurityDesc: "Schwachstellen und Sicherheitsprobleme finden", featureMultiLang: "6 Sprachen", featureMultiCodeLang: "30+ Programmiersprachen", featureFast: "Schnell & Kostenlos",
        tabHistory: "Verlauf", tabTips: "Tipps", historyEmptyDesc: "Kein Verlauf.", funFactHeader: "Fun Fact",
        tourStep1Title: "1. Code eingeben", tourStep1Desc: "Code in das Textfeld einfügen.", tourStep2Title: "2. Sprache wählen", tourStep2Desc: "Programmiersprache wählen.", tourStep3Title: "3. Modus wählen", tourStep3Desc: "Was die KI tun soll (beheben, optimieren, erklären).", tourStep4Title: "4. Ausführen", tourStep4Desc: "Auf Ausführen klicken, um die Analyse zu starten!"
    },
    es: {
        newChatBtn: "Nuevo chat", donateBtn: "Café", runBtn: "Ejecutar", analysisHeader: "Análisis", emptyTitle: "FixlyCode", loading: "Analizando...", errorEmpty: "¡Ingresa código!", clearHistory: "Limpiar", clearHistoryConfirm: "¿Limpiar historial?", placeholder: "// Pega el código aquí...", tipHeader: "Consejo:", langName: "Español", wishesPlaceholder: "Deseos adicionales...", exportBtn: "Exportar MD", scoreTitle: "Puntuación", analysisTimeLabel: "Tiempo de análisis:", aiDisclaimer: "La inteligencia artificial puede cometer errores. Por favor, verifique la información y el código antes de usar.",
        formatCode: "Formatear", uploadFile: "Subir", downloadFile: "Descargar", copyCode: "Copiar", clearEditor: "Limpiar",
        clearConfirm: "¿Limpiar editor?",
        clearConfirmTitle: "¿Limpiar editor?",
        clearConfirmMessage: "Todo el código será eliminado. Esta acción no se puede deshacer.",
        clearHistoryConfirmTitle: "¿Limpiar historial?",
        clearHistoryConfirmMessage: "Todos los chats serán eliminados. Esta acción no se puede deshacer.",
        newFileTitle: "Nuevo archivo", fileName: "Nombre", fileType: "Tipo", cancel: "Cancelar", create: "Crear",
        versionHistory: "Historial de versiones", close: "Cerrar", restoreVersion: "Restaurar", noVersions: "Sin versiones",
        changeLanguageConfirm: "¿Cambiar idioma?",
        changeLanguageConfirmTitle: "¿Cambiar idioma?",
        changeLanguageConfirmMessage: "La extensión del archivo se actualizará automáticamente.",
        changeLanguage: "Cambiar",
        deleteChatConfirmTitle: "¿Eliminar chat?",
        deleteChatConfirmMessage: "Esta acción no se puede deshacer.",
        deleteChat: "Eliminar",
        tipDebug: "Corregir", tipOptimize: "Optimizar", tipExplain: "Explicar", tipReview: "Revisar", tipSecurity: "Seguridad", tipRefactor: "Refactorizar", tipDocument: "Documentar", tipConvert: "Convertir", tipFormat: "Formatear", tipTest: "Razonamiento",
        convertFrom: "De:", convertTo: "A:",
        languageMismatchTitle: "Conflicto de idioma", languageMismatchMessage: "El código parece ser otro lenguaje. ¿Cambiar el lenguaje de programación?", continueAnyway: "Continuar de todos modos",
        tipFormatCode: "Formatear código", tipUploadFile: "Subir archivo", tipDownloadFile: "Guardar archivo", tipVersionHistory: "Historial de versiones", tipCopyCode: "Copiar código", tipClearEditor: "Limpiar editor",
        welcomeDesc: "Tu asistente personal de código con IA. Corrige errores, optimiza, convierte lenguajes y prueba código con inteligencia artificial.", startBtn: "Iniciar", startTutorialBtn: "Tutorial", skipBtn: "Omitir", nextTour: "Siguiente", finishTour: "Listo", emptyStatePrompt: "Listo para codificar.",
        featureDebug: "Depurar", featureDebugDesc: "Encuentra y corrige errores automáticamente", featureOptimize: "Optimizar", featureOptimizeDesc: "Mejora el rendimiento y calidad del código", featureExplain: "Explicar", featureExplainDesc: "Entiende la lógica del código en detalle", featureConvert: "Convertir", featureConvertDesc: "Convierte entre lenguajes de programación", featureTest: "Razonamiento", featureTestDesc: "Ve el proceso de pensamiento de la IA paso a paso", featureSecurity: "Seguridad", featureSecurityDesc: "Encuentra vulnerabilidades y problemas de seguridad", featureMultiLang: "6 Idiomas", featureMultiCodeLang: "30+ Lenguajes de Programación", featureFast: "Rápido y Gratis",
        tabHistory: "Historial", tabTips: "Consejos", historyEmptyDesc: "Sin historial.", funFactHeader: "Dato curioso",
        tourStep1Title: "1. Ingresa código", tourStep1Desc: "Pega código en el área de texto.", tourStep2Title: "2. Selecciona idioma", tourStep2Desc: "Elige lenguaje de programación.", tourStep3Title: "3. Elige modo", tourStep3Desc: "Qué debe hacer la IA (corregir, optimizar, explicar).", tourStep4Title: "4. Ejecutar", tourStep4Desc: "¡Haz clic en Ejecutar para comenzar el análisis!"
    },
    ru: {
        newChatBtn: "Новый чат", donateBtn: "Кофе", runBtn: "Запуск", analysisHeader: "Анализ", emptyTitle: "FixlyCode", loading: "Анализ...", errorEmpty: "Введите код!", clearHistory: "Очистить", clearHistoryConfirm: "Очистить историю?", placeholder: "// Вставьте код здесь...", tipHeader: "Совет:", langName: "Русский", wishesPlaceholder: "Дополнительные пожелания...", exportBtn: "Экспорт MD", scoreTitle: "Оценка", analysisTimeLabel: "Время анализа:", aiDisclaimer: "Искусственный интеллект может ошибаться. Пожалуйста, проверяйте информацию и код перед использованием.",
        formatCode: "Форматировать", uploadFile: "Загрузить", downloadFile: "Сохранить", copyCode: "Копировать", clearEditor: "Очистить",
        clearConfirm: "Очистить редактор?",
        clearConfirmTitle: "Очистить редактор?",
        clearConfirmMessage: "Весь код будет удален. Это действие нельзя отменить.",
        clearHistoryConfirmTitle: "Очистить историю?",
        clearHistoryConfirmMessage: "Все чаты будут удалены. Это действие нельзя отменить.",
        newFileTitle: "Новый файл", fileName: "Имя", fileType: "Тип", cancel: "Отмена", create: "Создать",
        versionHistory: "История версий", close: "Закрыть", restoreVersion: "Восстановить", noVersions: "Нет версий",
        changeLanguageConfirm: "Изменить язык?",
        changeLanguageConfirmTitle: "Изменить язык?",
        changeLanguageConfirmMessage: "Расширение файла будет обновлено автоматически.",
        changeLanguage: "Изменить",
        deleteChatConfirmTitle: "Удалить чат?",
        deleteChatConfirmMessage: "Это действие нельзя отменить.",
        deleteChat: "Удалить",
        tipDebug: "Исправить", tipOptimize: "Оптимизировать", tipExplain: "Объяснить", tipReview: "Обзор", tipSecurity: "Безопасность", tipRefactor: "Рефакторинг", tipDocument: "Документация", tipConvert: "Конвертировать", tipFormat: "Форматировать", tipTest: "Рассуждение",
        convertFrom: "Из:", convertTo: "В:",
        languageMismatchTitle: "Несоответствие языка", languageMismatchMessage: "Код выглядит как другой язык. Изменить язык программирования?", continueAnyway: "Продолжить всё равно",
        tipFormatCode: "Форматировать код", tipUploadFile: "Загрузить файл", tipDownloadFile: "Сохранить файл", tipVersionHistory: "История версий", tipCopyCode: "Копировать код", tipClearEditor: "Очистить редактор",
        welcomeDesc: "Ваш персональный AI-ассистент для работы с кодом. Исправляйте ошибки, оптимизируйте, конвертируйте языки и тестируйте код с помощью искусственного интеллекта.", startBtn: "Начать", startTutorialBtn: "Обучение", skipBtn: "Пропустить", nextTour: "Далее", finishTour: "Готово", emptyStatePrompt: "Выберите режим и нажмите Запуск",
        featureDebug: "Исправление", featureDebugDesc: "Найдите и исправьте ошибки автоматически", featureOptimize: "Оптимизация", featureOptimizeDesc: "Улучшите производительность и качество кода", featureExplain: "Объяснение", featureExplainDesc: "Детально поймите логику кода", featureConvert: "Конвертация", featureConvertDesc: "Конвертируйте между языками программирования", featureTest: "Рассуждение", featureTestDesc: "Посмотрите на процесс мышления AI пошагово", featureSecurity: "Безопасность", featureSecurityDesc: "Найдите уязвимости и проблемы безопасности", featureMultiLang: "6 Языков", featureMultiCodeLang: "30+ Языков Программирования", featureFast: "Быстро и Бесплатно",
        tabHistory: "История", tabTips: "Советы", historyEmptyDesc: "Здесь появятся ваши запросы.", funFactHeader: "Интересный факт",
        tourStep1Title: "1. Введите код", tourStep1Desc: "Вставьте код в текстовое поле.", tourStep2Title: "2. Выберите язык", tourStep2Desc: "Выберите язык программирования.", tourStep3Title: "3. Выберите режим", tourStep3Desc: "Что должен сделать AI (исправить, оптимизировать, объяснить).", tourStep4Title: "4. Запустите", tourStep4Desc: "Нажмите Запуск, чтобы начать анализ!"
    }
};

let currentMode = 'debug';
let currentLang = localStorage.getItem('fixly_lang') || 'en';
let isDark = localStorage.getItem('fixly_theme') !== 'light';
let history = [];
let currentChatId = null; // Track current active chat
let currentTourStep = 0; 
let tooltipHideTimeout; 
let typingInterval; 
let saveTimeout; // For debounce

// File management
let files = {};
let activeFile = null;
let fileVersions = {}; // { filename: [{ content, timestamp }] }

// Initialize files from localStorage
try {
    const savedFiles = localStorage.getItem('fixly_files');
    if (savedFiles) {
        files = JSON.parse(savedFiles);
    }
    const savedVersions = localStorage.getItem('fixly_file_versions');
    if (savedVersions) {
        fileVersions = JSON.parse(savedVersions);
    }
} catch (e) {
    files = {};
    fileVersions = {};
}

const RATE_LIMIT = {
    maxRequests: 10, // Maximum requests per window
    windowMs: 60000, // 1 minute window
    requests: [] // Track request timestamps
};

const CACHE_CONFIG = {
    maxSize: 50,
    ttl: 3600000
};
let responseCache = new Map();


try { 
    history = JSON.parse(localStorage.getItem('fixly_history')) || []; 
    // Migrate old format to new format
    history = history.map(item => {
        // If it's old format (has input/output directly), convert to new format
        if (item.input && !item.messages) {
            return {
                id: item.id || Date.now().toString() + Math.random().toString(36).substr(2, 9),
                messages: [{
                    input: item.input,
                    output: item.output,
                    mode: item.mode,
                    lang: item.lang,
                    time: item.time || new Date().toLocaleTimeString(),
                    timestamp: Date.now()
                }],
                versions: item.versions || [],
                createdAt: item.createdAt || Date.now(),
                lastActivity: item.lastActivity || Date.now(),
                lastMessage: item.input ? item.input.substring(0, 50) : '',
                firstMode: item.mode,
                firstLang: item.lang
            };
        }
        // Ensure new format items have all required fields
        if (!item.id) {
            item.id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        }
        if (!item.messages) {
            item.messages = [];
        }
        if (!item.versions) {
            item.versions = [];
        }
        if (!item.createdAt) {
            item.createdAt = Date.now();
        }
        if (!item.lastActivity) {
            item.lastActivity = Date.now();
        }
        return item;
    });
    // Save updated history back
    try {
        localStorage.setItem('fixly_history', JSON.stringify(history));
    } catch (e) {
    }
} catch (e) { history = []; }
try { 
    const cached = localStorage.getItem('fixly_cache');
    if (cached) {
        const parsed = JSON.parse(cached);
        const now = Date.now();
        // Filter expired entries
        for (const [key, value] of Object.entries(parsed)) {
            if (now - value.timestamp < CACHE_CONFIG.ttl) {
                responseCache.set(key, value);
            }
        }
    }
} catch (e) { responseCache = new Map(); }

const els = {
    html: document.documentElement,
    themeToggle: document.getElementById('theme-toggle'),
    input: document.getElementById('input-code'),
    lineNumbers: document.getElementById('line-numbers'),
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
    analysisTimer: document.getElementById('analysis-timer'),
    timerText: document.getElementById('timer-text'),
    aiDisclaimer: document.getElementById('ai-disclaimer'),
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
    historyContent: document.getElementById('history-content'),
    clearHistoryBtn: document.getElementById('clear-history-btn'),
    activeModeDisplay: document.getElementById('active-mode-display'),
    modeIcon: document.getElementById('mode-icon'),
    modeName: document.getElementById('mode-name'),
    targetInput: document.getElementById('input-code'),
    targetLang: document.getElementById('language-select'),
    targetModes: document.getElementById('mode-buttons-container'),
    targetRun: document.getElementById('run-btn'),
    helpBtn: document.getElementById('help-btn'),
    startTutorialBtn: document.getElementById('start-tutorial-btn'),
    skipBtn: document.getElementById('skip-btn'),
    fileTabsContainer: document.getElementById('file-tabs-container'),
    fileTabs: document.getElementById('file-tabs'),
    newFileBtn: document.getElementById('new-file-btn'),
    newFileDialog: document.getElementById('new-file-dialog'),
    newFileDialogContent: document.getElementById('new-file-dialog-content'),
    newFileName: document.getElementById('new-file-name'),
    newFileType: document.getElementById('new-file-type'),
    newFileCreate: document.getElementById('new-file-create'),
    newFileCancel: document.getElementById('new-file-cancel'),
    formatCodeBtn: document.getElementById('format-code-btn'),
    uploadFileBtn: document.getElementById('upload-file-btn'),
    downloadFileBtn: document.getElementById('download-file-btn'),
    copyInputBtn: document.getElementById('copy-input-btn'),
    fileUploadInput: document.getElementById('file-upload-input'),
    versionHistoryDialog: document.getElementById('version-history-dialog'),
    versionHistoryDialogContent: document.getElementById('version-history-dialog-content'),
    versionHistoryList: document.getElementById('version-history-list'),
    versionHistoryClose: document.getElementById('version-history-close'),
    versionHistoryBtn: document.getElementById('version-history-btn'),
    clearConfirmDialog: document.getElementById('clear-confirm-dialog'),
    clearConfirmDialogContent: document.getElementById('clear-confirm-dialog-content'),
    clearConfirmCancel: document.getElementById('clear-confirm-cancel'),
    clearConfirmOk: document.getElementById('clear-confirm-ok'),
    changeLanguageDialog: document.getElementById('change-language-confirm-dialog'),
    changeLanguageDialogContent: document.getElementById('change-language-confirm-dialog-content'),
    changeLanguageMessage: document.getElementById('change-language-confirm-message'),
    changeLanguageCancel: document.getElementById('change-language-confirm-cancel'),
    changeLanguageOk: document.getElementById('change-language-confirm-ok'),
    deleteChatDialog: document.getElementById('delete-chat-confirm-dialog'),
    deleteChatDialogContent: document.getElementById('delete-chat-confirm-dialog-content'),
    deleteChatCancel: document.getElementById('delete-chat-confirm-cancel'),
    deleteChatOk: document.getElementById('delete-chat-confirm-ok'),
    clearHistoryConfirmDialog: document.getElementById('clear-history-confirm-dialog'),
    clearHistoryConfirmDialogContent: document.getElementById('clear-history-confirm-dialog-content'),
    clearHistoryConfirmCancel: document.getElementById('clear-history-confirm-cancel'),
    clearHistoryConfirmOk: document.getElementById('clear-history-confirm-ok'),
    convertPanel: document.getElementById('convert-panel'),
    convertFromLang: document.getElementById('convert-from-lang'),
    convertToLang: document.getElementById('convert-to-lang'),
    languageMismatchDialog: document.getElementById('language-mismatch-dialog'),
    languageMismatchDialogContent: document.getElementById('language-mismatch-dialog-content'),
    languageMismatchMessage: document.getElementById('language-mismatch-message'),
    languageMismatchCancel: document.getElementById('language-mismatch-cancel'),
    languageMismatchContinue: document.getElementById('language-mismatch-continue'),
    languageMismatchChange: document.getElementById('language-mismatch-change'),
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toast-message'),
    toastClose: document.getElementById('toast-close')
};

document.addEventListener('DOMContentLoaded', () => {
    const welcomeSeen = localStorage.getItem('fixly_welcome_seen');
    if (welcomeSeen === 'true') {
        if (els.welcomeScreen) els.welcomeScreen.classList.add('hidden', 'opacity-0', 'pointer-events-none');
        els.html.classList.remove('overflow-hidden');
    } else {
        if (els.welcomeScreen) els.welcomeScreen.classList.remove('hidden');
        els.html.classList.add('overflow-hidden');
    }
    if (isDark) els.html.classList.add('dark'); else els.html.classList.remove('dark');
    if (!TRANSLATIONS[currentLang]) currentLang = 'en';
    if (els.uiLang) els.uiLang.value = currentLang;
    updateTexts(currentLang);
    renderHistory(); 
    
    if(localStorage.getItem('fixly_draft')) {
        els.input.value = localStorage.getItem('fixly_draft');
        updateLineNumbers();
    }
    
    if (els.startBtn) els.startBtn.addEventListener('click', () => { closeWelcomeScreen(); if (!localStorage.getItem('fixly_tour_seen')) setTimeout(startTour, 600); });
    if (els.startTutorialBtn) els.startTutorialBtn.addEventListener('click', () => { closeWelcomeScreen(); setTimeout(startTour, 600); });
    if (els.skipBtn) els.skipBtn.addEventListener('click', () => { closeWelcomeScreen(); });
    if (els.helpBtn) els.helpBtn.addEventListener('click', () => { startTour(); });
    if (els.runBtn) els.runBtn.addEventListener('click', runAI);
    if (els.newChatBtn) els.newChatBtn.addEventListener('click', newChat);
    if (els.themeToggle) els.themeToggle.addEventListener('click', toggleTheme);
    if (els.uiLang) els.uiLang.addEventListener('change', (e) => updateTexts(e.target.value));
    if (els.copyBtn) els.copyBtn.addEventListener('click', copyCode);
    if (els.exportBtn) els.exportBtn.addEventListener('click', exportMarkdown);
    const clearInputBtnEl = document.getElementById('clear-input-btn');
    if (clearInputBtnEl) {
        clearInputBtnEl.addEventListener('click', showClearConfirmDialog);
    }
    if (els.clearConfirmCancel) {
        els.clearConfirmCancel.addEventListener('click', closeClearConfirmDialog);
    }
    if (els.clearConfirmOk) {
        els.clearConfirmOk.addEventListener('click', () => {
            clearInput();
            closeClearConfirmDialog();
        });
    }
    if (els.clearConfirmDialog) {
        els.clearConfirmDialog.addEventListener('click', (e) => {
            if (e.target === els.clearConfirmDialog) {
                closeClearConfirmDialog();
            }
        });
    }
    if (els.clearHistoryBtn) els.clearHistoryBtn.addEventListener('click', showClearHistoryConfirmDialog);
    if (els.clearHistoryConfirmCancel) {
        els.clearHistoryConfirmCancel.addEventListener('click', closeClearHistoryConfirmDialog);
    }
    if (els.clearHistoryConfirmOk) {
        els.clearHistoryConfirmOk.addEventListener('click', () => {
            clearHistory();
            closeClearHistoryConfirmDialog();
        });
    }
    if (els.clearHistoryConfirmDialog) {
        els.clearHistoryConfirmDialog.addEventListener('click', (e) => {
            if (e.target === els.clearHistoryConfirmDialog) {
                closeClearHistoryConfirmDialog();
            }
        });
    }
    
    // Change language dialog handlers
    if (els.changeLanguageCancel) {
        els.changeLanguageCancel.addEventListener('click', closeChangeLanguageDialog);
    }
    if (els.changeLanguageOk) {
        els.changeLanguageOk.addEventListener('click', () => {
            if (pendingLanguageChange && activeFile) {
                renameFileWithExtension(activeFile, pendingLanguageChange);
                els.langSelect.value = pendingLanguageChange;
            }
            closeChangeLanguageDialog();
        });
    }
    if (els.changeLanguageDialog) {
        els.changeLanguageDialog.addEventListener('click', (e) => {
            if (e.target === els.changeLanguageDialog) {
                closeChangeLanguageDialog();
            }
        });
    }
    
    // Delete chat dialog handlers
    if (els.deleteChatCancel) {
        els.deleteChatCancel.addEventListener('click', closeDeleteChatDialog);
    }
    if (els.deleteChatOk) {
        els.deleteChatOk.addEventListener('click', () => {
            if (pendingDeleteChatIndex !== null) {
                deleteHistoryItem(pendingDeleteChatIndex);
                pendingDeleteChatIndex = null;
            }
            closeDeleteChatDialog();
        });
    }
    if (els.deleteChatDialog) {
        els.deleteChatDialog.addEventListener('click', (e) => {
            if (e.target === els.deleteChatDialog) {
                closeDeleteChatDialog();
            }
        });
    }
    
    // Language mismatch dialog handlers
    if (els.languageMismatchCancel) {
        els.languageMismatchCancel.addEventListener('click', closeLanguageMismatchDialog);
    }
    if (els.languageMismatchContinue) {
        els.languageMismatchContinue.addEventListener('click', () => {
            closeLanguageMismatchDialog();
            // Continue with AI execution anyway
            setTimeout(() => {
                runAI();
            }, 300);
        });
    }
    if (els.languageMismatchChange) {
        els.languageMismatchChange.addEventListener('click', () => {
            if (pendingDetectedLanguage) {
                els.langSelect.value = pendingDetectedLanguage;
                if (activeFile && files[activeFile]) {
                    files[activeFile].language = pendingDetectedLanguage;
                    saveFiles();
                }
                closeLanguageMismatchDialog();
                // Automatically run AI after language change
                setTimeout(() => {
                    runAI();
                }, 300);
            }
        });
    }
    if (els.languageMismatchDialog) {
        els.languageMismatchDialog.addEventListener('click', (e) => {
            if (e.target === els.languageMismatchDialog) {
                closeLanguageMismatchDialog();
            }
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (els.clearConfirmDialog && !els.clearConfirmDialog.classList.contains('hidden')) {
                closeClearConfirmDialog();
            }
            if (els.clearHistoryConfirmDialog && !els.clearHistoryConfirmDialog.classList.contains('hidden')) {
                closeClearHistoryConfirmDialog();
            }
            if (els.changeLanguageDialog && !els.changeLanguageDialog.classList.contains('hidden')) {
                closeChangeLanguageDialog();
            }
            if (els.deleteChatDialog && !els.deleteChatDialog.classList.contains('hidden')) {
                closeDeleteChatDialog();
            }
            if (els.languageMismatchDialog && !els.languageMismatchDialog.classList.contains('hidden')) {
                closeLanguageMismatchDialog();
            }
        }
    });
    if (els.tourNextBtn) els.tourNextBtn.addEventListener('click', nextTourStep);
    if (els.toggleSidebarBtn) els.toggleSidebarBtn.addEventListener('click', toggleSidebar);
    if(els.closeSidebarBtn) els.closeSidebarBtn.addEventListener('click', toggleSidebar);
    
    
    if (els.input && els.lineNumbers) {
        els.input.addEventListener('scroll', () => { els.lineNumbers.scrollTop = els.input.scrollTop; });
    }
    if (els.input) {
        els.input.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Enter to run
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                runAI();
            }
            // Tab for indentation
            if (e.key === 'Tab') {
                e.preventDefault();
                const s = els.input.selectionStart;
                const end = els.input.selectionEnd;
                els.input.value = els.input.value.substring(0, s) + "    " + els.input.value.substring(end);
                els.input.selectionStart = els.input.selectionEnd = s + 4;
                updateLineNumbers();
            }
            if (e.key === 'Escape' && e.target === els.input) {
                if (els.input.value.trim() === '') {
                    els.input.blur();
                }
            }
        });
        
        let resizeObserver;
        if (window.ResizeObserver) {
            resizeObserver = new ResizeObserver(() => {
                updateLineNumbers();
            });
            resizeObserver.observe(els.input);
        }
    }
    if (els.modeBtns && els.modeBtns.length > 0) {
        els.modeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => { const t = e.target.closest('.mode-btn'); if(t) setMode(t.dataset.mode); });
            btn.addEventListener('mouseenter', showTooltip);
            btn.addEventListener('mouseleave', hideTooltip);
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setMode(btn.dataset.mode);
                }
            });
        });
    }
    if (els.refreshPreviewBtn) {
        els.refreshPreviewBtn.addEventListener('click', () => { runPreview(); els.refreshPreviewBtn.classList.add('animate-spin'); setTimeout(() => els.refreshPreviewBtn.classList.remove('animate-spin'), 500); });
    }
    
    // New file management
    if (els.newFileBtn) els.newFileBtn.addEventListener('click', showNewFileDialog);
    if (els.newFileCreate) els.newFileCreate.addEventListener('click', createNewFile);
    if (els.newFileCancel) els.newFileCancel.addEventListener('click', closeNewFileDialog);
    
    // Toolbar buttons with error handling
    if (els.formatCodeBtn) {
        els.formatCodeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            formatCode();
        });
        els.formatCodeBtn.addEventListener('mouseenter', showTooltip);
        els.formatCodeBtn.addEventListener('mouseleave', hideTooltip);
    }
    if (els.uploadFileBtn && els.fileUploadInput) {
        els.uploadFileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            els.fileUploadInput.click();
        });
        els.uploadFileBtn.addEventListener('mouseenter', showTooltip);
        els.uploadFileBtn.addEventListener('mouseleave', hideTooltip);
    }
    if (els.downloadFileBtn) {
        els.downloadFileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            downloadCurrentFile();
        });
        els.downloadFileBtn.addEventListener('mouseenter', showTooltip);
        els.downloadFileBtn.addEventListener('mouseleave', hideTooltip);
    }
    if (els.copyInputBtn) {
        els.copyInputBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            copyInputCode();
        });
        els.copyInputBtn.addEventListener('mouseenter', showTooltip);
        els.copyInputBtn.addEventListener('mouseleave', hideTooltip);
    }
    if (els.versionHistoryBtn) {
        els.versionHistoryBtn.addEventListener('mouseenter', showTooltip);
        els.versionHistoryBtn.addEventListener('mouseleave', hideTooltip);
    }
    if (clearInputBtnEl) {
        clearInputBtnEl.addEventListener('mouseenter', showTooltip);
        clearInputBtnEl.addEventListener('mouseleave', hideTooltip);
    }
    if (els.fileUploadInput) {
        els.fileUploadInput.addEventListener('change', handleFileUpload);
    }
    if (els.versionHistoryClose) els.versionHistoryClose.addEventListener('click', closeVersionHistory);
    if (els.versionHistoryBtn) els.versionHistoryBtn.addEventListener('click', showVersionHistory);
    
    // Initialize files
    if (Object.keys(files).length === 0) {
        createFile('New File', '', 'JavaScript');
    } else {
        renderFileTabs();
        const firstFile = Object.keys(files)[0];
        openFile(firstFile);
    }
    
    if (els.langSelect) {
        els.langSelect.addEventListener('change', handleLanguageChange);
    }
    
    setInterval(saveCurrentVersion, 30000); // Every 30 seconds
});

function updateLineNumbers() {
    if (!els.lineNumbers || !els.input) return;
    const lines = els.input.value.split('\n').length;
    els.lineNumbers.innerHTML = Array(lines).fill(0).map((_, i) => i + 1).join('<br>');
}

function typeWriter(el, txt, spd = 10) { 
    if (!el) return;
    if (typingInterval) clearInterval(typingInterval); 
    el.innerHTML = ''; 
    el.classList.add('typing-cursor'); 
    let i = 0; 
    const chars = txt.replace(/\n/g, '<br>').split(/(<[^>]*>|.)/g).filter(Boolean); 
    typingInterval = setInterval(() => { 
        if (i < chars.length) { 
            el.innerHTML += chars[i]; 
            i++; 
        } else { 
            clearInterval(typingInterval); 
            el.classList.remove('typing-cursor'); 
            typingInterval = null;
        } 
    }, spd); 
}

function closeWelcomeScreen() { localStorage.setItem('fixly_welcome_seen', 'true'); els.welcomeScreen.classList.add('opacity-0', 'pointer-events-none'); setTimeout(() => { els.welcomeScreen.classList.add('hidden'); els.html.classList.remove('overflow-hidden'); }, 500); }

function checkRateLimit() {
    const now = Date.now();
    RATE_LIMIT.requests = RATE_LIMIT.requests.filter(timestamp => now - timestamp < RATE_LIMIT.windowMs);
    
    if (RATE_LIMIT.requests.length >= RATE_LIMIT.maxRequests) {
        return false;
    }
    
    RATE_LIMIT.requests.push(now);
    return true;
}

function generateCacheKey(code, mode, lang, model, wishes) {
    return `${mode}_${lang}_${model}_${wishes}_${code.substring(0, 100).replace(/\s/g, '')}`;
}

function getCachedResponse(key) {
    const cached = responseCache.get(key);
    if (!cached) return null;
    
    const now = Date.now();
    if (now - cached.timestamp > CACHE_CONFIG.ttl) {
        responseCache.delete(key);
        return null;
    }
    
    return cached.data;
}

function setCachedResponse(key, data) {
    // Limit cache size
    if (responseCache.size >= CACHE_CONFIG.maxSize) {
        // Remove oldest entry
        const firstKey = responseCache.keys().next().value;
        responseCache.delete(firstKey);
    }
    
    responseCache.set(key, {
        data: data,
        timestamp: Date.now()
    });
    
    // Persist to localStorage (async, don't block)
    setTimeout(() => {
        try {
            const cacheObj = {};
            responseCache.forEach((value, key) => {
                cacheObj[key] = value;
            });
            localStorage.setItem('fixly_cache', JSON.stringify(cacheObj));
        } catch (e) {
        }
    }, 0);
}

// Detect programming language from code content
function detectCodeLanguage(code) {
    if (!code || code.trim().length < 10) return null;
    
    const codeLower = code.toLowerCase();
    const codeLines = code.split('\n').slice(0, 20).join('\n').toLowerCase();
    
    // C++ / C
    if (code.includes('#include') || code.includes('using namespace') || 
        code.includes('std::') || code.includes('cout') || code.includes('cin') ||
        (code.includes('int main') && (code.includes('{') || code.includes(';')))) {
        if (code.includes('class') && (code.includes('public:') || code.includes('private:'))) {
            return 'C++';
        }
        return 'C';
    }
    
    // Java
    if (code.includes('public class') || code.includes('public static void main') ||
        code.includes('System.out.println') || code.includes('import java.')) {
        return 'Java';
    }
    
    // C#
    if (code.includes('using System') || code.includes('namespace ') ||
        code.includes('Console.WriteLine') || code.includes('public class') && code.includes('static void Main')) {
        return 'C#';
    }
    
    // Python
    if (code.includes('def ') || code.includes('import ') && (code.includes('print(') || code.includes('if __name__')) ||
        code.includes('elif ') || code.includes('except ') || code.includes('lambda ') ||
        (codeLines.match(/^\s*(def|class|import|from|if|for|while|try|except)\s/))) {
        return 'Python';
    }
    
    // JavaScript / TypeScript
    if (code.includes('function ') || code.includes('const ') || code.includes('let ') ||
        code.includes('var ') || code.includes('=>') || code.includes('console.log') ||
        code.includes('document.') || code.includes('require(') || code.includes('module.exports')) {
        if (code.includes(':') && (code.includes('interface ') || code.includes('type ') || 
            code.includes('enum ') || code.match(/:\s*(string|number|boolean|any|void)/))) {
            return 'TypeScript';
        }
        if (code.includes('import ') && code.includes('from ') && code.includes("'") || code.includes('export ')) {
            return 'JavaScript';
        }
        return 'JavaScript';
    }
    
    // Go
    if (code.includes('package ') || code.includes('func main()') ||
        code.includes('import (') || code.includes('fmt.Println')) {
        return 'Go';
    }
    
    // Rust
    if (code.includes('fn main()') || code.includes('use ') ||
        code.includes('println!') || code.includes('let mut ') || code.includes('&str')) {
        return 'Rust';
    }
    
    // PHP
    if (code.includes('<?php') || code.includes('<?=') ||
        code.includes('$_') || code.includes('->') && code.includes('$')) {
        return 'PHP';
    }
    
    // Ruby
    if (code.includes('def ') && code.includes('end') ||
        code.includes('puts ') || code.includes('require ') ||
        code.match(/^\s*(class|module|def)\s+\w+/)) {
        return 'Ruby';
    }
    
    // Swift
    if (code.includes('func ') && code.includes('->') ||
        code.includes('import Swift') || code.includes('var ') && code.includes(':') ||
        code.includes('let ') && code.includes(':')) {
        return 'Swift';
    }
    
    // Kotlin
    if (code.includes('fun ') || code.includes('val ') || code.includes('var ') && code.includes(':') ||
        code.includes('println(') && code.includes('fun main')) {
        return 'Kotlin';
    }
    
    // HTML/CSS
    if (code.includes('<!DOCTYPE') || code.includes('<html') || code.includes('<div') ||
        code.includes('</') || (code.includes('<') && code.includes('>'))) {
        if (code.includes('{') && code.includes('}') && (code.includes('color:') || code.includes('margin:'))) {
            return 'HTML/CSS';
        }
        return 'HTML/CSS';
    }
    
    // SQL
    if (code.match(/\b(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|FROM|WHERE|JOIN)\b/i)) {
        return 'SQL';
    }
    
    // Shell/Bash
    if (code.startsWith('#!/bin/') || code.includes('#!/usr/bin/') ||
        code.match(/^\s*(if|for|while|case)\s+\[/) || code.includes('$(') || code.includes('`')) {
        return 'Shell/Bash';
    }
    
    return null;
}

async function runAI() {
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    const code = els.input.value.trim();
    const wishes = els.wishes.value.trim();
    
    if (!code) { 
        els.errorMsg.textContent = t.errorEmpty; 
        els.errorMsg.classList.remove('hidden'); 
        els.errorMsg.classList.add('animate-shake'); 
        setTimeout(() => els.errorMsg.classList.remove('animate-shake'), 300); 
        return; 
    }
    
    // Detect code language and check if it matches selected language
    // Skip detection in convert mode (user explicitly chooses languages)
    if (currentMode !== 'convert') {
        const detectedLang = detectCodeLanguage(code);
        const selectedLang = els.langSelect.value;
        
        if (detectedLang && detectedLang !== selectedLang) {
            // Show dialog to suggest language change
            showLanguageMismatchDialog(detectedLang, selectedLang);
            return;
        }
    }
    
    if (!checkRateLimit()) {
        const remaining = Math.ceil((RATE_LIMIT.windowMs - (Date.now() - RATE_LIMIT.requests[0])) / 1000);
        els.errorMsg.textContent = `Rate limit exceeded. Please wait ${remaining} seconds.`;
        els.errorMsg.classList.remove('hidden');
        els.errorMsg.classList.add('animate-shake');
        setTimeout(() => els.errorMsg.classList.remove('animate-shake'), 300);
        return;
    }
    
    const selectedModel = els.modelSelect.value;
    const lang = els.langSelect.value; // Programming language (JavaScript, Python, etc.)
    const responseLang = currentLang; // Interface language for AI response (uk, en, ru, etc.)
    const cacheKey = generateCacheKey(code, currentMode, responseLang, selectedModel, wishes);
    const cached = getCachedResponse(cacheKey);
    
    // Start analysis timer
    const analysisStartTime = Date.now();
    let timerInterval;
    
    if (cached) {
        renderOutput(cached, lang, 0); // 0 for cached (instant)
        addToHistory({ mode: currentMode, lang: responseLang, input: code, output: cached, time: new Date().toLocaleTimeString() });
        return;
    }
    
    els.errorMsg.classList.add('hidden');
    els.loadingText.textContent = t.loading;
    els.loadingOverlay.classList.remove('hidden');
    els.runBtn.classList.add('run-btn-glowing');
    els.runBtn.setAttribute('aria-busy', 'true');
    els.runBtn.disabled = true;
    
    // Hide timer and disclaimer initially
    if (els.analysisTimer) els.analysisTimer.classList.add('hidden');
    if (els.aiDisclaimer) els.aiDisclaimer.classList.add('hidden');
    
    // Start analysis timer
    if (els.analysisTimer && els.timerText) {
        timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - analysisStartTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            const timeString = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
            if (els.timerText) {
                const timerLabel = t.analysisTimeLabel || 'Analysis time:';
                els.timerText.textContent = `${timerLabel} ${timeString}`;
            }
        }, 100);
        // Store interval ID and start time for cleanup
        window._analysisTimerInterval = timerInterval;
        window._analysisStartTime = analysisStartTime;
    }
    
    if (els.outputContainer) {
        els.outputContainer.setAttribute('aria-busy', 'true');
    } 

    const controller = new AbortController();
    // Longer timeout for slower models
    const slowModels = ['x-ai/grok-4.1-fast:free', 'tngtech/deepseek-r1t2-chimera:free'];
    const timeoutDuration = slowModels.includes(selectedModel) ? 120000 : 60000; // 120s for slow models, 60s for others
    const timeoutId = setTimeout(() => controller.abort(), timeoutDuration);

    const targetLangName = t.langName || "English";
    
    if (!selectedModel) {
        els.errorMsg.textContent = "Please select a model.";
        els.errorMsg.classList.remove('hidden');
        els.loadingOverlay.classList.add('hidden');
        els.runBtn.classList.remove('run-btn-glowing');
        return;
    }

    try {
    const taskMap = { 
        'debug': 'Fix bugs and errors in the code.', 
        'optimize': 'Optimize code for performance, readability, and best practices.', 
        'explain': 'Explain code logic, purpose, and how it works in detail.', 
        'review': 'Perform comprehensive code review: check for bugs, security issues, best practices, and provide improvement suggestions.',
        'security': 'Analyze code for security vulnerabilities, potential exploits, and security best practices.',
        'refactor': 'Refactor code to improve structure, maintainability, and design patterns while preserving functionality.',
        'document': 'Generate comprehensive documentation: comments, docstrings, and usage examples.',
        'convert': 'Convert code to another programming language or framework.',
        'format': 'Format and style code according to language-specific conventions and best practices.',
        'test': 'Analyze code using step-by-step reasoning and show the thinking process.'
    };

    let rawText = "";

    if (API_CONFIG.useServer) {
        try {
            // Validate request data before sending
            if (!code || !code.trim()) {
                throw new Error("Code cannot be empty");
            }
            if (!selectedModel || !selectedModel.trim()) {
                throw new Error("Model must be selected");
            }

            const requestBody = {
                code: code.trim(),
                mode: currentMode || 'debug',
                lang: responseLang || 'en', // Interface language for AI response
                model: selectedModel,
                wishes: wishes ? wishes.trim() : '',
                // Add convert language info if in convert mode
                ...(currentMode === 'convert' && els.convertFromLang && els.convertToLang ? {
                    convertFrom: els.convertFromLang.value,
                    convertTo: els.convertToLang.value
                } : {})
            };

            const serverResponse = await fetch('/api/ai-request', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody),
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!serverResponse.ok) {
                let errorData;
                try {
                    errorData = await serverResponse.json();
                } catch (e) {
                    errorData = { error: serverResponse.statusText, message: serverResponse.statusText };
                }
                
                let errMsg = errorData.error || errorData.message || serverResponse.statusText;
                
                if (serverResponse.status === 400) {
                    errMsg = errorData.message || "Invalid request. Please check your input.";
                } else if (serverResponse.status === 401) {
                    errMsg = "Authentication failed. Please check server configuration.";
                } else if (serverResponse.status === 429) {
                    errMsg = "Rate limit exceeded. Please try again later.";
                } else if (serverResponse.status === 500) {
                    errMsg = errorData.message || "Server error. Please try again later.";
                } else if (serverResponse.status === 404) {
                    errMsg = "API endpoint not found. Please check deployment.";
                } else if (serverResponse.status === 504) {
                    errMsg = "Request timeout. The server took too long to respond.";
                }
                
                const error = new Error(errMsg);
                error.status = serverResponse.status;
                error.isModelError = serverResponse.status === 404 || errMsg.includes('model') || errMsg.includes('not found');
                throw error;
            }
            
            let serverData;
            try {
                serverData = await serverResponse.json();
            } catch (e) {
                throw new Error("Invalid JSON response from server");
            }
            
            if (!serverData || typeof serverData !== 'object') {
                throw new Error("Invalid response format from server");
            }
            
            rawText = serverData.rawText || "";
            
            if (!rawText || rawText.trim().length === 0) {
                throw new Error("Empty response from server.");
            }
        } catch (fetchError) {
            clearTimeout(timeoutId);
            if (fetchError.name === 'AbortError') {
                throw new Error("Request timeout");
            }
            // Handle network errors
            if (fetchError.name === 'TypeError') {
                if (fetchError.message.includes('Failed to fetch') || fetchError.message.includes('NetworkError')) {
                    throw new Error("Network error: Cannot reach server. Please check your connection.");
                }
                throw new Error(`Connection error: ${fetchError.message}`);
            }
            // Re-throw if it's already a proper Error object
            throw fetchError;
        }
    }

    if (!rawText) {
        throw new Error("Empty response from server.");
    }

    let result;
    try {
        result = JSON.parse(rawText);
    } catch (e) {
        let cleanedText = rawText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
        const start = cleanedText.indexOf('{');
        const end = cleanedText.lastIndexOf('}');
        if (start !== -1 && end !== -1 && end > start) {
            const jsonStr = cleanedText.substring(start, end + 1);
            try {
               result = JSON.parse(jsonStr); 
            } catch (e2) {
               const fixedCodeMatch = cleanedText.match(/"fixedCode"\s*:\s*"([^"]*(?:\\.[^"]*)*)"/) || 
                                     cleanedText.match(/"fixedCode"\s*:\s*`([^`]+)`/);
               const explanationMatch = cleanedText.match(/"explanation"\s*:\s*"([^"]*(?:\\.[^"]*)*)"/) || 
                                       cleanedText.match(/"explanation"\s*:\s*`([^`]+)`/);
               const tipMatch = cleanedText.match(/"tip"\s*:\s*"([^"]*(?:\\.[^"]*)*)"/);
               const scoreMatch = cleanedText.match(/"score"\s*:\s*(\d+)/);
               
               result = {
                   fixedCode: fixedCodeMatch ? fixedCodeMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"') : cleanedText,
                   explanation: explanationMatch ? explanationMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"') : "Analysis completed.",
                   tip: tipMatch ? tipMatch[1] : "Code processed successfully.",
                   score: scoreMatch ? parseInt(scoreMatch[1]) : 75,
                   smells: []
               };
            }
        } else {
            result = {
                fixedCode: cleanedText,
                explanation: "AI response received. Please review the code below.",
                tip: "Review the generated code carefully.",
                score: 70,
                smells: []
            };
        }
    }
    
    if (!result || typeof result !== 'object') {
        throw new Error("Invalid response structure from AI.");
    }
    
    result.fixedCode = result.fixedCode || "// No code generated";
    result.explanation = result.explanation || "Analysis completed.";
    result.tip = result.tip || "Code processed.";
    result.score = typeof result.score === 'number' ? Math.max(0, Math.min(100, result.score)) : 75;
    result.smells = Array.isArray(result.smells) ? result.smells : [];

    setCachedResponse(cacheKey, result);
    
    // Calculate analysis time
    const analysisTime = window._analysisStartTime ? Date.now() - window._analysisStartTime : 0;
    
    renderOutput(result, lang, analysisTime);
    addToHistory({ mode: currentMode, lang: responseLang, input: code, output: result, time: new Date().toLocaleTimeString() });

    } catch (error) {
        const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
        let errorMessage = t.errorEmpty || "Error occurred";
        
        const modelConfig = MODEL_CONFIG[selectedModel];
        const isModelError = error.isModelError || (error.message && (
            error.message.includes('model') || 
            error.message.includes('not found') ||
            error.message.includes('invalid') ||
            error.message.includes('404') ||
            error.status === 404
        ));
        
        if (isModelError && modelConfig?.fallback && !window._triedFallback) {
            window._triedFallback = true;
            els.modelSelect.value = modelConfig.fallback;
            els.loadingText.textContent = `Trying fallback model...`;
            setTimeout(() => {
                window._triedFallback = false;
                runAI();
            }, 500);
            return;
        }
        
        window._triedFallback = false;
        
        if (error.name === 'AbortError') {
            errorMessage = "Timeout. Try again.";
        } else if (error.message) {
            errorMessage = "Error: " + error.message;
            // Provide helpful suggestions
            if (error.message.includes('401') || error.message.includes('authentication')) {
                errorMessage += " Check your API keys.";
            } else if (error.message.includes('429') || error.message.includes('rate limit')) {
                errorMessage += " Try again in a moment.";
            } else if (isModelError) {
                errorMessage += " Model may be unavailable. Try another model from the list.";
            }
        } else if (error.response) {
            errorMessage = `API Error: ${error.response.status} - ${error.response.statusText}`;
        }
        
        els.errorMsg.textContent = errorMessage;
        els.errorMsg.classList.remove('hidden');
        els.errorMsg.classList.add('animate-shake');
        setTimeout(() => els.errorMsg.classList.remove('animate-shake'), 300);
    } finally {
        // Stop timer if still running
        if (window._analysisTimerInterval) {
            clearInterval(window._analysisTimerInterval);
            window._analysisTimerInterval = null;
        }
        
        els.loadingOverlay.classList.add('hidden');
        els.runBtn.classList.remove('run-btn-glowing');
        els.runBtn.setAttribute('aria-busy', 'false');
        els.runBtn.disabled = false;
        
        if (els.outputContainer) {
            els.outputContainer.setAttribute('aria-busy', 'false');
        }
    }
}

// ... RENDER & UTILS ...
function renderOutput(data, lang, analysisTime) {
    els.emptyState.classList.add('hidden'); 
    els.outputContainer.classList.remove('hidden');
    
    // Stop and display timer
    if (window._analysisTimerInterval) {
        clearInterval(window._analysisTimerInterval);
        window._analysisTimerInterval = null;
    }
    
    if (els.analysisTimer && els.timerText && analysisTime !== undefined) {
        const seconds = Math.floor(analysisTime / 1000);
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        const timeString = minutes > 0 ? `${minutes}m ${secs}s` : `${secs}s`;
        const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
        const timerLabel = t.analysisTimeLabel || 'Analysis time:';
        els.timerText.textContent = `${timerLabel} ${timeString}`;
        els.analysisTimer.classList.remove('hidden');
    }
    
    // Show AI disclaimer
    if (els.aiDisclaimer) {
        setTimeout(() => {
            els.aiDisclaimer.classList.remove('hidden');
        }, 500);
    }
    
    els.outputContainer.classList.add('animate-fade-in-up');
    setTimeout(() => {
        els.outputContainer.classList.remove('animate-fade-in-up');
    }, 400);
    
    // Announce to screen readers
    if (els.outputContainer) {
        els.outputContainer.setAttribute('aria-live', 'polite');
        els.outputContainer.setAttribute('aria-busy', 'false');
    }
    
    if (typingInterval) clearInterval(typingInterval); 
    
    const explanation = data.explanation || "Analysis completed.";
    typeWriter(els.outputExpl, explanation, 5);
    
    els.outputTip.textContent = data.tip || "Code processed successfully.";
    
    const score = typeof data.score === 'number' ? Math.max(0, Math.min(100, data.score)) : 75;
    animateScoreCount(els.scoreCircle, score);
    
    if (data.smells && Array.isArray(data.smells) && data.smells.length > 0 && data.smells[0] !== 'None' && data.smells[0] !== '') {
        els.smellsSection.classList.remove('hidden');
        els.smellsList.innerHTML = data.smells.map(s => `<li>• ${s}</li>`).join('');
    } else {
        els.smellsSection.classList.add('hidden');
    }
    
    const codeBlock = els.outputCode;
    codeBlock.className = 'code-font text-sm';
    const fixedCode = data.fixedCode || "// No code generated";
    codeBlock.textContent = fixedCode;
    
    const langMap = { 
        'JavaScript': 'javascript', 
        'TypeScript': 'typescript',
        'Python': 'python', 
        'HTML/CSS': 'html', 
        'Java': 'java', 
        'C++': 'cpp',
        'C': 'c',
        'C#': 'csharp',
        'PHP': 'php', 
        'SQL': 'sql',
        'Go': 'go',
        'Rust': 'rust',
        'Ruby': 'ruby',
        'Kotlin': 'kotlin',
        'Dart': 'dart',
        'R': 'r',
        'MATLAB': 'matlab',
        'Shell/Bash': 'bash',
        'Swift': 'swift',
        'Vue': 'javascript',
        'React': 'javascript',
        'Svelte': 'javascript',
        'PowerShell': 'powershell',
        'Lua': 'lua',
        'Perl': 'perl',
        'Scala': 'scala',
        'Haskell': 'haskell',
        'Elixir': 'elixir',
        'Clojure': 'clojure',
        'Erlang': 'erlang',
        'JSON': 'json',
        'YAML': 'yaml',
        'XML': 'xml',
        'Markdown': 'markdown',
        'TOML': 'toml',
        'INI': 'ini',
        'Objective-C': 'objectivec',
        'Assembly': 'asm'
    };
    const prismLang = langMap[lang] || 'plaintext';
    
    codeBlock.classList.remove(...Object.values(langMap).map(l => `language-${l}`), 'language-plaintext');
    codeBlock.classList.add(`language-${prismLang}`);
    
    // Highlight with Prism
    if (window.Prism) {
        try {
            Prism.highlightElement(codeBlock);
        } catch(e) {
        }
    }
    
    if (['HTML/CSS', 'JavaScript', 'TypeScript'].includes(lang)) {
        els.tabPreview.classList.remove('hidden');
        if (currentMode !== 'explain' && currentMode !== 'review' && currentMode !== 'document') {
            switchTab('preview');
        }
    } else {
        els.tabPreview.classList.add('hidden');
        if (!els.viewPreview.classList.contains('hidden')) {
            switchTab('code');
        }
    }
}

function nextTourStep() { currentTourStep++; showTourStep(currentTourStep); }
function startTour() { currentTourStep = 0; els.tourOverlay.classList.remove('hidden'); requestAnimationFrame(() => els.tourOverlay.classList.remove('opacity-0')); showTourStep(0); }
function showTourStep(index) {
    if (index >= tourSteps.length) return endTour();
    const step = tourSteps[index];
    const targetEl = els[step.target];
    if (!targetEl) return nextTourStep();
    
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
    targetEl.classList.add('tour-highlight');
    
    // Scroll to element
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    
    // Update tooltip content
    els.tourTitle.textContent = t[step.titleKey] || step.titleKey;
    els.tourDesc.textContent = t[step.descKey] || step.descKey;
    els.tourNextBtn.textContent = index === tourSteps.length - 1 ? (t.finishTour || "Finish") : (t.nextTour || "Next");
    
    // Show tooltip
    els.tourTooltip.classList.remove('hidden');
    requestAnimationFrame(() => {
        els.tourTooltip.classList.remove('opacity-0', 'scale-95');
        const rect = targetEl.getBoundingClientRect();
        const tooltipRect = els.tourTooltip.getBoundingClientRect();
        
        // Position tooltip based on step position preference
        let top, left;
        if (step.pos === 'top') {
            top = `${rect.top - tooltipRect.height - 15}px`;
            left = `${rect.left + (rect.width / 2) - (tooltipRect.width / 2)}px`;
        } else if (step.pos === 'bottom') {
            top = `${rect.bottom + 15}px`;
            left = `${rect.left + (rect.width / 2) - (tooltipRect.width / 2)}px`;
        } else if (step.pos === 'right') {
            top = `${rect.top + (rect.height / 2) - (tooltipRect.height / 2)}px`;
            left = `${rect.right + 15}px`;
        } else {
            top = `${rect.top + (rect.height / 2) - (tooltipRect.height / 2)}px`;
            left = `${rect.left - tooltipRect.width - 15}px`;
        }
        
        // Ensure tooltip stays within viewport
        const maxLeft = window.innerWidth - tooltipRect.width - 20;
        const maxTop = window.innerHeight - tooltipRect.height - 20;
        left = Math.max(20, Math.min(parseInt(left), maxLeft)) + 'px';
        top = Math.max(20, Math.min(parseInt(top), maxTop)) + 'px';
        
        els.tourTooltip.style.top = top;
        els.tourTooltip.style.left = left;
    });
}
function endTour() { document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight')); els.tourOverlay.classList.add('opacity-0'); els.tourTooltip.classList.add('opacity-0'); setTimeout(() => { els.tourOverlay.classList.add('hidden'); els.tourTooltip.classList.add('hidden'); }, 300); localStorage.setItem('fixly_tour_seen', 'true'); }
const tourSteps = [
    { target: 'targetInput', titleKey: 'tourStep1Title', descKey: 'tourStep1Desc', pos: 'bottom' },
    { target: 'targetLang', titleKey: 'tourStep2Title', descKey: 'tourStep2Desc', pos: 'bottom' },
    { target: 'targetModes', titleKey: 'tourStep3Title', descKey: 'tourStep3Desc', pos: 'bottom' },
    { target: 'targetRun', titleKey: 'tourStep4Title', descKey: 'tourStep4Desc', pos: 'top' }
];

function toggleSidebar() { 
    els.sidebar.classList.toggle('hidden'); 
    els.sidebar.classList.toggle('flex'); 
    if (!els.sidebar.classList.contains('hidden')) els.sidebar.classList.add('sidebar-animate-open'); 
}

function showTooltip(e) { clearTimeout(tooltipHideTimeout); const key = e.currentTarget.dataset.tooltipKey; if(!key) return; const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en; els.tooltip.textContent = t[key]; els.tooltip.classList.remove('hidden', 'opacity-0'); const rect = e.currentTarget.getBoundingClientRect(); els.tooltip.style.top = `${rect.bottom + 5}px`; els.tooltip.style.left = `${rect.left + rect.width/2}px`; }
function hideTooltip() { tooltipHideTimeout = setTimeout(() => { els.tooltip.classList.add('opacity-0'); setTimeout(() => els.tooltip.classList.add('hidden'), 200); }, 150); }

function animateScoreCount(targetEl, finalScore) {
    if (!targetEl) return;
    
    let start = 0;
    const duration = 800;
    const clampedScore = Math.max(0, Math.min(100, finalScore));
    
    const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const current = Math.floor(progress * clampedScore);
        targetEl.textContent = current;
        
        // Color based on score
        if (current > 80) {
            targetEl.style.color = '#10b981';
            targetEl.style.borderColor = '#10b981';
        } else if (current > 50) {
            targetEl.style.color = '#ca8a04';
            targetEl.style.borderColor = '#ca8a04';
        } else {
            targetEl.style.color = '#dc2626';
            targetEl.style.borderColor = '#dc2626';
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
            // Score text based on final score
            if (clampedScore > 80) {
                els.scoreText.textContent = "Excellent";
            } else if (clampedScore > 50) {
                els.scoreText.textContent = "Good";
            } else {
                els.scoreText.textContent = "Issues";
            }
        }
    };
    
    window.requestAnimationFrame(step);
}

function toggleTheme() { isDark = !isDark; els.html.classList.toggle('dark'); localStorage.setItem('fixly_theme', isDark ? 'dark' : 'light'); }
function updateTexts(lang) {
    currentLang = lang;
    localStorage.setItem('fixly_lang', lang);
    // Update HTML lang attribute
    if (els.html) els.html.setAttribute('lang', lang);
    const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            if (el.classList.contains('toolbar-btn-icon')) {
                // Don't set title - tooltip is handled by showTooltip via data-tooltip-key
                el.setAttribute('aria-label', t[key]);
            } 
            else if (el.classList.contains('toolbar-btn-text')) {
                el.textContent = t[key];
            } else {
                el.textContent = t[key];
            }
        }
    });
    
    if (els.clearConfirmDialogContent) {
        const titleEl = els.clearConfirmDialogContent.querySelector('h3[data-i18n="clearConfirmTitle"]');
        const messageEl = els.clearConfirmDialogContent.querySelector('p[data-i18n="clearConfirmMessage"]');
        if (titleEl && t.clearConfirmTitle) titleEl.textContent = t.clearConfirmTitle;
        if (messageEl && t.clearConfirmMessage) messageEl.textContent = t.clearConfirmMessage;
    }
    if (els.clearHistoryConfirmDialogContent) {
        const titleEl = els.clearHistoryConfirmDialogContent.querySelector('h3[data-i18n="clearHistoryConfirmTitle"]');
        const messageEl = els.clearHistoryConfirmDialogContent.querySelector('p[data-i18n="clearHistoryConfirmMessage"]');
        if (titleEl && t.clearHistoryConfirmTitle) titleEl.textContent = t.clearHistoryConfirmTitle;
        if (messageEl && t.clearHistoryConfirmMessage) messageEl.textContent = t.clearHistoryConfirmMessage;
    }
    if (els.changeLanguageDialogContent) {
        const titleEl = els.changeLanguageDialogContent.querySelector('h3[data-i18n="changeLanguageConfirmTitle"]');
        if (titleEl && t.changeLanguageConfirmTitle) titleEl.textContent = t.changeLanguageConfirmTitle;
        if (els.changeLanguageCancel && t.cancel) els.changeLanguageCancel.textContent = t.cancel;
        if (els.changeLanguageOk && t.changeLanguage) els.changeLanguageOk.textContent = t.changeLanguage;
    }
    if (els.deleteChatDialogContent) {
        const titleEl = els.deleteChatDialogContent.querySelector('h3[data-i18n="deleteChatConfirmTitle"]');
        const messageEl = els.deleteChatDialogContent.querySelector('p[data-i18n="deleteChatConfirmMessage"]');
        if (titleEl && t.deleteChatConfirmTitle) titleEl.textContent = t.deleteChatConfirmTitle;
        if (messageEl && t.deleteChatConfirmMessage) messageEl.textContent = t.deleteChatConfirmMessage;
        if (els.deleteChatCancel && t.cancel) els.deleteChatCancel.textContent = t.cancel;
        if (els.deleteChatOk && t.deleteChat) els.deleteChatOk.textContent = t.deleteChat;
    }
    
    // Tooltips are handled by showTooltip function via data-tooltip-key, no need to set title
    
    if (els.input) els.input.placeholder = t.placeholder || "// Paste code here...";
    if (els.wishes) els.wishes.placeholder = t.wishesPlaceholder || "Additional wishes...";
    
    // Update convert panel labels
    if (els.convertPanel) {
        const fromLabel = els.convertPanel.querySelector('[data-i18n="convertFrom"]');
        const toLabel = els.convertPanel.querySelector('[data-i18n="convertTo"]');
        if (fromLabel && t.convertFrom) fromLabel.textContent = t.convertFrom;
        if (toLabel && t.convertTo) toLabel.textContent = t.convertTo;
    }
    
    // Update welcome screen translations
    if (els.welcomeScreen) {
        const welcomeDesc = els.welcomeScreen.querySelector('[data-i18n="welcomeDesc"]');
        const startTutorialBtn = els.welcomeScreen.querySelector('[data-i18n="startTutorialBtn"]');
        const skipBtn = els.welcomeScreen.querySelector('[data-i18n="skipBtn"]');
        const featureDebug = els.welcomeScreen.querySelector('[data-i18n="featureDebug"]');
        const featureDebugDesc = els.welcomeScreen.querySelector('[data-i18n="featureDebugDesc"]');
        const featureOptimize = els.welcomeScreen.querySelector('[data-i18n="featureOptimize"]');
        const featureOptimizeDesc = els.welcomeScreen.querySelector('[data-i18n="featureOptimizeDesc"]');
        const featureExplain = els.welcomeScreen.querySelector('[data-i18n="featureExplain"]');
        const featureExplainDesc = els.welcomeScreen.querySelector('[data-i18n="featureExplainDesc"]');
        const featureConvert = els.welcomeScreen.querySelector('[data-i18n="featureConvert"]');
        const featureConvertDesc = els.welcomeScreen.querySelector('[data-i18n="featureConvertDesc"]');
        const featureTest = els.welcomeScreen.querySelector('[data-i18n="featureTest"]');
        const featureTestDesc = els.welcomeScreen.querySelector('[data-i18n="featureTestDesc"]');
        const featureSecurity = els.welcomeScreen.querySelector('[data-i18n="featureSecurity"]');
        const featureSecurityDesc = els.welcomeScreen.querySelector('[data-i18n="featureSecurityDesc"]');
        const featureMultiLang = els.welcomeScreen.querySelector('[data-i18n="featureMultiLang"]');
        const featureMultiCodeLang = els.welcomeScreen.querySelector('[data-i18n="featureMultiCodeLang"]');
        const featureFast = els.welcomeScreen.querySelector('[data-i18n="featureFast"]');
        
        if (welcomeDesc && t.welcomeDesc) welcomeDesc.textContent = t.welcomeDesc;
        if (startTutorialBtn && t.startTutorialBtn) startTutorialBtn.textContent = t.startTutorialBtn;
        if (skipBtn && t.skipBtn) skipBtn.textContent = t.skipBtn;
        if (featureDebug && t.featureDebug) featureDebug.textContent = t.featureDebug;
        if (featureDebugDesc && t.featureDebugDesc) featureDebugDesc.textContent = t.featureDebugDesc;
        if (featureOptimize && t.featureOptimize) featureOptimize.textContent = t.featureOptimize;
        if (featureOptimizeDesc && t.featureOptimizeDesc) featureOptimizeDesc.textContent = t.featureOptimizeDesc;
        if (featureExplain && t.featureExplain) featureExplain.textContent = t.featureExplain;
        if (featureExplainDesc && t.featureExplainDesc) featureExplainDesc.textContent = t.featureExplainDesc;
        if (featureConvert && t.featureConvert) featureConvert.textContent = t.featureConvert;
        if (featureConvertDesc && t.featureConvertDesc) featureConvertDesc.textContent = t.featureConvertDesc;
        if (featureTest && t.featureTest) featureTest.textContent = t.featureTest;
        if (featureTestDesc && t.featureTestDesc) featureTestDesc.textContent = t.featureTestDesc;
        
        // Update timer and disclaimer texts
        if (els.timerText && t.analysisTimeLabel) {
            const currentText = els.timerText.textContent;
            if (currentText && currentText.includes(':')) {
                const timePart = currentText.split(':')[1]?.trim() || '';
                if (timePart) {
                    els.timerText.textContent = `${t.analysisTimeLabel} ${timePart}`;
                }
            }
        }
        if (els.aiDisclaimer) {
            const disclaimerText = els.aiDisclaimer.querySelector('p[data-i18n="aiDisclaimer"]');
            if (disclaimerText && t.aiDisclaimer) {
                disclaimerText.textContent = t.aiDisclaimer;
            }
        }
        if (featureSecurity && t.featureSecurity) featureSecurity.textContent = t.featureSecurity;
        if (featureSecurityDesc && t.featureSecurityDesc) featureSecurityDesc.textContent = t.featureSecurityDesc;
        if (featureMultiLang && t.featureMultiLang) featureMultiLang.textContent = t.featureMultiLang;
        if (featureMultiCodeLang && t.featureMultiCodeLang) featureMultiCodeLang.textContent = t.featureMultiCodeLang;
        if (featureFast && t.featureFast) featureFast.textContent = t.featureFast;
    }
    
    setMode(currentMode);
}
function setMode(mode) {
    currentMode = mode;
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    const icons = { 
        debug: 'fa-wrench', 
        optimize: 'fa-gauge-high', 
        explain: 'fa-book-open', 
        review: 'fa-code-review',
        security: 'fa-shield-halved',
        refactor: 'fa-code-branch',
        document: 'fa-file-lines',
        convert: 'fa-right-left',
        format: 'fa-indent',
        test: 'fa-vial-virus' 
    };
    const names = { 
        debug: t.tipDebug, 
        optimize: t.tipOptimize, 
        explain: t.tipExplain,
        review: t.tipReview,
        security: t.tipSecurity,
        refactor: t.tipRefactor,
        document: t.tipDocument,
        convert: t.tipConvert,
        format: t.tipFormat,
        test: t.tipTest 
    };
    
    els.modeIcon.className = `fa-solid ${icons[mode] || 'fa-code'} text-base`;
    els.modeName.textContent = names[mode] || mode;
    
    els.modeBtns.forEach(btn => {
        const isActive = btn.dataset.mode === mode;
        btn.classList.toggle('active-mode', isActive);
        btn.setAttribute('aria-pressed', isActive);
        if (!isActive) btn.className = 'mode-btn';
    });
    
    els.runBtnText.textContent = t.runBtn;
    
    // Show/hide convert panel based on mode
    if (els.convertPanel) {
        if (mode === 'convert') {
            els.convertPanel.classList.remove('hidden', 'convert-panel-hide');
            els.convertPanel.classList.add('convert-panel-show');
            // Sync convert-from with current language select
            if (els.convertFromLang && els.langSelect) {
                els.convertFromLang.value = els.langSelect.value;
            }
            // Set default convert-to to JavaScript if same as from
            if (els.convertToLang && els.convertFromLang) {
                if (els.convertToLang.value === els.convertFromLang.value) {
                    els.convertToLang.value = 'JavaScript';
                }
            }
        } else {
            els.convertPanel.classList.remove('convert-panel-show');
            els.convertPanel.classList.add('convert-panel-hide');
            setTimeout(() => {
                if (els.convertPanel && !els.convertPanel.classList.contains('convert-panel-show')) {
                    els.convertPanel.classList.add('hidden');
                }
            }, 300);
        }
    }
    
    // Announce mode change for screen readers
    if (els.activeModeDisplay) {
        els.activeModeDisplay.setAttribute('aria-live', 'polite');
    }
}

function switchTab(tab) {
    if (!els.viewCode || !els.viewPreview || !els.tabCode || !els.tabPreview) return;
    if (tab === 'code') {
        els.viewCode.classList.remove('hidden');
        els.viewPreview.classList.add('hidden');
        els.tabCode.classList.add('bg-white', 'dark:bg-slate-700', 'text-brand-600', 'dark:text-brand-400', 'shadow-sm');
        els.tabCode.classList.remove('text-slate-500');
        els.tabPreview.classList.remove('bg-white', 'dark:bg-slate-700', 'text-brand-600', 'dark:text-brand-400', 'shadow-sm');
        els.tabPreview.classList.add('text-slate-500');
    } else {
        els.viewCode.classList.add('hidden');
        els.viewPreview.classList.remove('hidden');
        els.tabPreview.classList.add('bg-white', 'dark:bg-slate-700', 'text-brand-600', 'dark:text-brand-400', 'shadow-sm');
        els.tabPreview.classList.remove('text-slate-500');
        els.tabCode.classList.remove('bg-white', 'dark:bg-slate-700', 'text-brand-600', 'dark:text-brand-400', 'shadow-sm');
        els.tabCode.classList.add('text-slate-500');
        runPreview();
    }
}
window.switchTab = switchTab;
function runPreview() {
    try {
        const code = els.outputCode.textContent;
        const lang = els.langSelect.value;
        const frame = els.previewFrame.contentWindow.document;
        
        if (!frame) {
            return;
        }
        
        frame.open();
        
        const baseStyles = `<style>
            body { font-family: 'Segoe UI', sans-serif; padding: 20px; color: #333; margin: 0; }
            .console-log { font-family: monospace; background: #f1f5f9; padding: 4px 8px; border-radius: 4px; margin-bottom: 4px; border-left: 3px solid #cbd5e1; font-size: 12px; }
            .console-error { background: #fef2f2; color: #dc2626; border-left-color: #dc2626; }
            .console-warn { background: #fffbeb; color: #d97706; border-left-color: #d97706; }
        </style>`;
        
        const consoleInterceptor = `<script>
            (function() {
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
                
                console.log = function(...args) {
                    originalLog.apply(console, args);
                    appendLog(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
                };
                
                console.error = function(...args) {
                    originalErr.apply(console, args);
                    appendLog(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '), 'console-error');
                };
                
                console.warn = function(...args) {
                    originalWarn.apply(console, args);
                    appendLog(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '), 'console-warn');
                };
                
                window.onerror = function(message, source, lineno, colno, error) {
                    appendLog('Error: ' + message + (lineno ? ' (line ' + lineno + ')' : ''), 'console-error');
                };
            })();
        <\/script>`;
        
        if (lang === 'HTML/CSS') {
            frame.write(baseStyles + code);
        } else if (lang === 'JavaScript' || lang === 'TypeScript') {
            let jsCode = code;
            if (lang === 'TypeScript') {
                jsCode = code
                    .replace(/:\s*\w+(\[\])?(\s*\|\s*\w+)*/g, '')
                    .replace(/interface\s+\w+\s*\{[^}]*\}/g, '')
                    .replace(/type\s+\w+\s*=\s*[^;]+;/g, '');
            }
            frame.write(`<!DOCTYPE html>
                <html>
                <head>${baseStyles}</head>
                <body>
                    <h3 style="margin-top:0;color:#64748b;font-size:14px;font-weight:bold;text-transform:uppercase;">${lang} Console Output</h3>
                    <div id="app"></div>
                    ${consoleInterceptor}
                    <script>
                        try {
                            ${jsCode}
                        } catch(e) {
                            console.error(e.message);
                        }
                    <\/script>
                </body>
                </html>`);
        } else {
            frame.write(`<html><body style="font-family:sans-serif;color:#666;padding:20px;"><h3>No Preview for ${lang}</h3></body></html>`);
        }
        
        frame.close();
    } catch (error) {
        const frame = els.previewFrame.contentWindow.document;
        if (frame) {
            frame.open();
            frame.write(`<html><body style="font-family:sans-serif;color:#dc2626;padding:20px;"><h3>Preview Error</h3><p>${error.message}</p></body></html>`);
            frame.close();
        }
    }
}
function newChat() { 
    els.input.value = ''; 
    els.wishes.value = ''; 
    els.outputContainer.classList.add('hidden'); 
    els.emptyState.classList.remove('hidden'); 
    els.tabPreview.classList.add('hidden'); 
    localStorage.removeItem('fixly_draft'); 
    currentChatId = null; // Reset current chat - next addToHistory will create new chat
    renderHistory(); // Re-render to remove active state
    switchTab('code'); 
    updateLineNumbers(); 
}
async function copyCode() {
    try {
        const text = els.outputCode.textContent;
        await navigator.clipboard.writeText(text);
        
        // Visual feedback
        const originalHTML = els.copyBtn.innerHTML;
        els.copyBtn.innerHTML = '<i class="fa-solid fa-check text-brand-500" aria-hidden="true"></i>';
        els.copyBtn.setAttribute('aria-label', 'Copied!');
        
        setTimeout(() => {
            els.copyBtn.innerHTML = originalHTML;
            els.copyBtn.setAttribute('aria-label', 'Copy code');
        }, 2000);
        
        // Announce to screen readers
        const announcement = document.createElement('div');
        announcement.className = 'sr-only';
        announcement.setAttribute('aria-live', 'polite');
        announcement.textContent = 'Code copied to clipboard';
        document.body.appendChild(announcement);
        setTimeout(() => document.body.removeChild(announcement), 1000);
    } catch (err) {
        console.error('Failed to copy:', err);
        els.errorMsg.textContent = 'Failed to copy code. Please select and copy manually.';
        els.errorMsg.classList.remove('hidden');
    }
}
function exportMarkdown() { const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en; const md = `# FixlyCode Report\n\n${els.outputExpl.textContent}\n\n\`\`\`\n${els.outputCode.textContent}\n\`\`\``; navigator.clipboard.writeText(md); els.exportBtn.textContent = "Copied!"; setTimeout(() => els.exportBtn.innerHTML = `<i class="fa-brands fa-markdown mr-2"></i> ${t.exportBtn}`, 2000); }
function addToHistory(item) {
    // If we have an active chat, add message to it instead of creating new chat
    if (currentChatId) {
        const currentChat = history.find(chat => chat.id === currentChatId);
        if (currentChat) {
            // Add message to existing chat
            if (!currentChat.messages) {
                currentChat.messages = [];
            }
            currentChat.messages.push({
                input: item.input,
                output: item.output,
                mode: item.mode,
                lang: item.lang,
                time: item.time || new Date().toLocaleTimeString(),
                timestamp: Date.now()
            });
            // Update chat's last activity time
            currentChat.lastActivity = Date.now();
            currentChat.lastMessage = item.input.substring(0, 50);
            // Save to localStorage
            try {
                localStorage.setItem('fixly_history', JSON.stringify(history));
            } catch (e) {
                if (e.name === 'QuotaExceededError') {
                    history = history.slice(0, 10);
                    try {
                        localStorage.setItem('fixly_history', JSON.stringify(history));
                    } catch (e2) {
                    }
                }
            }
            renderHistory();
            return;
        }
    }
    
    // Create new chat if no active chat
    const newChat = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        messages: [{
            input: item.input,
            output: item.output,
            mode: item.mode,
            lang: item.lang,
            time: item.time || new Date().toLocaleTimeString(),
            timestamp: Date.now()
        }],
        versions: [],
        createdAt: Date.now(),
        lastActivity: Date.now(),
        lastMessage: item.input.substring(0, 50),
        // Keep first message info for display
        firstMode: item.mode,
        firstLang: item.lang
    };
    
    // Set as current active chat
    currentChatId = newChat.id;
    
    history.unshift(newChat);
    if (history.length > 20) history.pop();
    
    // Save to localStorage with error handling
    try {
        localStorage.setItem('fixly_history', JSON.stringify(history));
    } catch (e) {
        if (e.name === 'QuotaExceededError') {
            history = history.slice(0, 10);
            try {
                localStorage.setItem('fixly_history', JSON.stringify(history));
            } catch (e2) {
            }
        }
    }
    
    renderHistory();
}
function renderHistory() {
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    els.historyList.innerHTML = '';
    
    if (!history.length) {
        els.historyList.innerHTML = `<div class="text-center p-4 opacity-70 text-slate-400 text-xs" role="status" aria-live="polite">${t.historyEmptyDesc}</div>`;
        return;
    }
    
    // Use DocumentFragment for better performance
    const fragment = document.createDocumentFragment();
    
    history.forEach((chat, index) => {
        const div = document.createElement('div');
        const isActive = currentChatId === chat.id;
        div.className = `p-3 rounded-lg ${isActive ? 'bg-brand-50 dark:bg-brand-900/20 border-brand-500' : 'bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-800'} border hover:border-brand-500 mb-2 transition-colors relative group`;
        div.setAttribute('role', 'button');
        div.setAttribute('tabindex', '0');
        
        const lastMessage = chat.messages && chat.messages.length > 0 
            ? chat.messages[chat.messages.length - 1] 
            : null;
        
        const messageCount = chat.messages ? chat.messages.length : 1;
        const displayTime = lastMessage ? lastMessage.time : (chat.lastActivity ? new Date(chat.lastActivity).toLocaleTimeString() : '');
        const displayText = chat.lastMessage || (lastMessage ? lastMessage.input.substring(0, 30) : '') || 'Empty chat';
        const displayMode = lastMessage ? lastMessage.mode : (chat.firstMode || 'debug');
        
        div.setAttribute('aria-label', `Chat ${index + 1}: ${messageCount} messages, ${displayMode} mode`);
        
        const contentDiv = document.createElement('div');
        contentDiv.className = "cursor-pointer";
        contentDiv.onclick = () => {
            // Load last message from chat
            if (lastMessage) {
                els.input.value = lastMessage.input;
                els.langSelect.value = lastMessage.lang;
                setMode(lastMessage.mode);
                renderOutput(lastMessage.output, lastMessage.lang, 0);
            } else {
                // Fallback for old format
                els.input.value = chat.input || '';
                els.langSelect.value = chat.lang || 'JavaScript';
                setMode(chat.mode || 'debug');
                if (chat.output) {
                    renderOutput(chat.output, chat.lang || 'JavaScript', 0);
                }
            }
            updateLineNumbers();
            els.input.focus();
            // Set as current active chat
            currentChatId = chat.id;
            renderHistory(); // Re-render to show active state
        };
        
        contentDiv.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                contentDiv.click();
            }
        });
        
        const escapeHtml = (text) => {
            const tempDiv = document.createElement('div');
            tempDiv.textContent = text;
            return tempDiv.innerHTML;
        };
        
        const actionsDiv = document.createElement('div');
        actionsDiv.className = "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1";
        
        // Version history button
        const versionBtn = document.createElement('button');
        versionBtn.className = "p-1.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-500 hover:text-blue-600 dark:hover:text-blue-400";
        versionBtn.setAttribute('aria-label', 'View version history');
        versionBtn.innerHTML = '<i class="fa-solid fa-clock-rotate-left text-xs"></i>';
        versionBtn.onclick = (e) => {
            e.stopPropagation();
            if (chat.versions && chat.versions.length > 0) {
                showVersionHistory(chat.id);
            } else {
                const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
                showToast(t.noVersions || 'No saved versions');
            }
        };
        
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = "p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 hover:text-red-600 dark:hover:text-red-400";
        deleteBtn.setAttribute('aria-label', 'Delete this chat');
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can text-xs"></i>';
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            showDeleteChatDialog(index);
        };
        
        actionsDiv.appendChild(versionBtn);
        actionsDiv.appendChild(deleteBtn);
        
        // Show version count badge if versions exist
        const versionCount = chat.versions ? chat.versions.length : 0;
        const versionBadge = versionCount > 0 ? `<span class="absolute top-1 left-1 bg-brand-500 text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold">${versionCount}</span>` : '';
        
        // Show message count badge
        const messageBadge = messageCount > 1 ? `<span class="absolute top-1 right-1 bg-blue-500 text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold">${messageCount}</span>` : '';
        
        contentDiv.innerHTML = `
            <div class="flex justify-between mb-1">
                <span class="font-mono text-[10px] text-slate-400">${escapeHtml(displayTime)}</span>
                <span class="text-[10px] font-bold text-brand-600 dark:text-brand-400">${escapeHtml(displayMode)}</span>
            </div>
            <div class="text-xs truncate text-slate-500 dark:text-slate-400 relative">${versionBadge}${messageBadge}${escapeHtml(displayText)}...</div>
        `;
        
        div.appendChild(contentDiv);
        div.appendChild(actionsDiv);
        fragment.appendChild(div);
    });
    
    els.historyList.appendChild(fragment);
}
function showClearHistoryConfirmDialog() {
    if (!els.clearHistoryConfirmDialog || !els.clearHistoryConfirmDialogContent) return;
    els.clearHistoryConfirmDialog.classList.remove('hidden');
    els.clearHistoryConfirmDialog.classList.add('flex');
    
    setTimeout(() => {
        els.clearHistoryConfirmDialogContent.classList.add('dialog-open');
    }, 10);
}

function closeClearHistoryConfirmDialog() {
    if (!els.clearHistoryConfirmDialog || !els.clearHistoryConfirmDialogContent) return;
    els.clearHistoryConfirmDialogContent.classList.remove('dialog-open');
    setTimeout(() => {
        els.clearHistoryConfirmDialog.classList.add('hidden');
        els.clearHistoryConfirmDialog.classList.remove('flex');
    }, 200);
}

function clearHistory() { 
    history = []; 
    localStorage.removeItem('fixly_history'); 
    renderHistory(); 
}

// Show delete chat confirmation dialog
function showDeleteChatDialog(index) {
    if (!els.deleteChatDialog || !els.deleteChatDialogContent) return;
    
    // Store the index for later deletion
    pendingDeleteChatIndex = index;
    
    // Update translations
    updateDeleteChatDialogTranslations();
    
    // Show dialog
    els.deleteChatDialog.classList.remove('hidden');
    els.deleteChatDialog.classList.add('flex');
    
    requestAnimationFrame(() => {
        els.deleteChatDialogContent.classList.remove('opacity-0', 'scale-95');
        els.deleteChatDialogContent.classList.add('dialog-open');
    });
}

// Close delete chat dialog
function closeDeleteChatDialog() {
    if (!els.deleteChatDialog || !els.deleteChatDialogContent) return;
    
    els.deleteChatDialogContent.classList.remove('dialog-open');
    
    setTimeout(() => {
        els.deleteChatDialog.classList.add('hidden');
        els.deleteChatDialog.classList.remove('flex');
        els.deleteChatDialogContent.classList.add('opacity-0', 'scale-95');
        pendingDeleteChatIndex = null;
    }, 200);
}

// Update translations for delete chat dialog
function updateDeleteChatDialogTranslations() {
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    const titleEl = els.deleteChatDialogContent?.querySelector('h3[data-i18n="deleteChatConfirmTitle"]');
    const messageEl = els.deleteChatDialogContent?.querySelector('p[data-i18n="deleteChatConfirmMessage"]');
    const cancelBtn = els.deleteChatCancel;
    const okBtn = els.deleteChatOk;
    
    if (titleEl && t.deleteChatConfirmTitle) {
        titleEl.textContent = t.deleteChatConfirmTitle;
    }
    if (messageEl && t.deleteChatConfirmMessage) {
        messageEl.textContent = t.deleteChatConfirmMessage;
    }
    if (cancelBtn && t.cancel) {
        cancelBtn.textContent = t.cancel;
    }
    if (okBtn && t.deleteChat) {
        okBtn.textContent = t.deleteChat;
    }
}

// Show language mismatch dialog
function showLanguageMismatchDialog(detectedLang, selectedLang) {
    if (!els.languageMismatchDialog || !els.languageMismatchDialogContent) return;
    
    // Store detected language
    pendingDetectedLanguage = detectedLang;
    
    // Update translations
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    const langNames = {
        'JavaScript': 'JavaScript',
        'TypeScript': 'TypeScript',
        'Python': 'Python',
        'Java': 'Java',
        'C++': 'C++',
        'C#': 'C#',
        'C': 'C',
        'Go': 'Go',
        'Rust': 'Rust',
        'Swift': 'Swift',
        'Kotlin': 'Kotlin',
        'PHP': 'PHP',
        'Ruby': 'Ruby',
        'HTML/CSS': 'HTML/CSS',
        'React': 'React',
        'SQL': 'SQL',
        'Shell/Bash': 'Shell/Bash'
    };
    
    const detectedLangName = langNames[detectedLang] || detectedLang;
    const selectedLangName = langNames[selectedLang] || selectedLang;
    
    // Build message based on UI language
    let message;
    if (currentLang === 'uk') {
        message = `Код виглядає як ${detectedLangName}, але вибрано ${selectedLangName}. Змінити мову програмування на ${detectedLangName}?`;
    } else if (currentLang === 'ru') {
        message = `Код выглядит как ${detectedLangName}, но выбрано ${selectedLangName}. Изменить язык программирования на ${detectedLangName}?`;
    } else if (currentLang === 'pl') {
        message = `Kod wygląda na ${detectedLangName}, ale wybrano ${selectedLangName}. Zmienić język programowania na ${detectedLangName}?`;
    } else if (currentLang === 'de') {
        message = `Der Code sieht aus wie ${detectedLangName}, aber ${selectedLangName} wurde ausgewählt. Programmiersprache auf ${detectedLangName} ändern?`;
    } else if (currentLang === 'es') {
        message = `El código parece ser ${detectedLangName}, pero se seleccionó ${selectedLangName}. ¿Cambiar el lenguaje de programación a ${detectedLangName}?`;
    } else {
        message = `Code appears to be ${detectedLangName}, but ${selectedLangName} is selected. Change programming language to ${detectedLangName}?`;
    }
    
    if (els.languageMismatchMessage) {
        els.languageMismatchMessage.textContent = message;
    }
    
    // Update button texts
    if (els.languageMismatchCancel && t.cancel) {
        els.languageMismatchCancel.textContent = t.cancel;
    }
    if (els.languageMismatchContinue && t.continueAnyway) {
        els.languageMismatchContinue.textContent = t.continueAnyway;
    }
    if (els.languageMismatchChange && t.changeLanguage) {
        els.languageMismatchChange.textContent = t.changeLanguage;
    }
    
    // Show dialog
    els.languageMismatchDialog.classList.remove('hidden');
    els.languageMismatchDialog.classList.add('flex');
    
    requestAnimationFrame(() => {
        els.languageMismatchDialogContent.classList.remove('opacity-0', 'scale-95');
        els.languageMismatchDialogContent.classList.add('dialog-open');
    });
}

// Close language mismatch dialog
function closeLanguageMismatchDialog() {
    if (!els.languageMismatchDialog || !els.languageMismatchDialogContent) return;
    
    els.languageMismatchDialogContent.classList.remove('dialog-open');
    
    setTimeout(() => {
        els.languageMismatchDialog.classList.add('hidden');
        els.languageMismatchDialog.classList.remove('flex');
        els.languageMismatchDialogContent.classList.add('opacity-0', 'scale-95');
        pendingDetectedLanguage = null;
    }, 200);
}

function deleteHistoryItem(index) {
    if (index >= 0 && index < history.length) {
        history.splice(index, 1);
        localStorage.setItem('fixly_history', JSON.stringify(history));
        renderHistory();
    }
}


function createFile(filename, content = '', language = 'JavaScript') {
    // If filename is "New File" without extension, add extension based on language
    let finalFilename = filename;
    if (filename === 'New File' || filename.toLowerCase() === 'new file') {
        const extMap = {
            'JavaScript': '.js',
            'TypeScript': '.ts',
            'React': '.jsx',
            'Python': '.py',
            'Java': '.java',
            'C++': '.cpp',
            'C': '.c',
            'C#': '.cs',
            'HTML/CSS': '.html',
            'PHP': '.php',
            'Ruby': '.rb',
            'Vue': '.vue',
            'Svelte': '.svelte',
            'Go': '.go',
            'Rust': '.rs',
            'Swift': '.swift',
            'Kotlin': '.kt',
            'Dart': '.dart',
            'Objective-C': '.m',
            'SQL': '.sql',
            'R': '.r',
            'Shell/Bash': '.sh',
            'PowerShell': '.ps1',
            'Lua': '.lua',
            'Perl': '.pl',
            'Scala': '.scala',
            'Haskell': '.hs',
            'Elixir': '.ex',
            'Clojure': '.clj',
            'Erlang': '.erl',
            'JSON': '.json',
            'YAML': '.yaml',
            'XML': '.xml',
            'Markdown': '.md',
            'TOML': '.toml',
            'INI': '.ini',
            'Assembly': '.asm'
        };
        const ext = extMap[language] || '.js';
        finalFilename = 'New File' + ext;
        
        // If file already exists, add number
        let counter = 1;
        while (files[finalFilename]) {
            finalFilename = `New File (${counter})${ext}`;
            counter++;
        }
    }
    
    files[finalFilename] = {
        content: content,
        language: language,
        modified: Date.now()
    };
    if (!fileVersions[finalFilename]) {
        fileVersions[finalFilename] = [];
    }
    saveFiles();
    renderFileTabs();
    
    // Animate file creation
    const newTab = document.querySelector(`[data-filename="${finalFilename}"]`);
    if (newTab) {
        newTab.classList.add('file-tab-new');
        setTimeout(() => {
            newTab.classList.remove('file-tab-new');
        }, 300);
    }
    
    openFile(finalFilename);
    
    // Animate editor opening
    els.input.style.transform = 'scale(0.98)';
    els.input.style.opacity = '0.8';
    setTimeout(() => {
        els.input.style.transform = 'scale(1)';
        els.input.style.opacity = '1';
    }, 200);
}

function openFile(filename) {
    if (!files[filename]) return;
    
    // Save current file before switching
    if (activeFile && files[activeFile]) {
        files[activeFile].content = els.input.value;
        files[activeFile].modified = Date.now();
    }
    
    // Animate file switch with slide animation
    els.input.style.opacity = '0.5';
    els.input.style.transform = 'translateX(-10px)';
    els.input.classList.add('animate-slide-in-left');
    
    setTimeout(() => {
        activeFile = filename;
        els.input.value = files[filename].content;
        els.langSelect.value = files[filename].language;
        updateLineNumbers();
        renderFileTabs();
        saveFiles();
        
        // Animate back with slide
        els.input.style.opacity = '1';
        els.input.style.transform = 'translateX(0)';
        els.input.classList.remove('animate-slide-in-left');
        els.input.classList.add('animate-slide-in-right');
        setTimeout(() => {
            els.input.classList.remove('animate-slide-in-right');
        }, 300);
    }, 150);
}

function closeFile(filename) {
    if (Object.keys(files).length <= 1) {
        return;
    }
    
    const tabElement = document.querySelector(`[data-filename="${filename}"]`);
    if (tabElement) {
        tabElement.classList.add('file-tab-closing');
        setTimeout(() => {
            if (activeFile === filename) {
                const fileList = Object.keys(files);
                const currentIndex = fileList.indexOf(filename);
                const nextFile = fileList[currentIndex + 1] || fileList[currentIndex - 1];
                openFile(nextFile);
            }
            
            delete files[filename];
            saveFiles();
            renderFileTabs();
        }, 250);
    } else {
        if (activeFile === filename) {
            const fileList = Object.keys(files);
            const currentIndex = fileList.indexOf(filename);
            const nextFile = fileList[currentIndex + 1] || fileList[currentIndex - 1];
            openFile(nextFile);
        }
        
        delete files[filename];
        saveFiles();
        renderFileTabs();
    }
}

function renderFileTabs() {
    els.fileTabs.innerHTML = '';
    
    Object.keys(files).forEach(filename => {
        const tab = document.createElement('div');
        tab.className = `file-tab ${activeFile === filename ? 'active' : ''} ${activeFile === filename ? '' : 'file-tab-new'}`;
        tab.setAttribute('data-filename', filename);
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'truncate flex-1';
        nameSpan.textContent = filename;
        nameSpan.setAttribute('title', filename);
        
        // Make filename editable on double click
        nameSpan.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            editFileName(filename, nameSpan);
        });
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-tab';
        closeBtn.innerHTML = '<i class="fa-solid fa-xmark text-[10px]"></i>';
        closeBtn.onclick = (e) => {
            e.stopPropagation();
            closeFile(filename);
        };
        
        tab.appendChild(nameSpan);
        tab.appendChild(closeBtn);
        tab.addEventListener('click', () => {
            if (!tab.classList.contains('file-tab-closing')) {
                openFile(filename);
            }
        });
        
        els.fileTabs.appendChild(tab);
    });
}

// Edit file name inline
function editFileName(filename, nameElement) {
    const oldName = filename;
    const lastDotIndex = oldName.lastIndexOf('.');
    const baseName = lastDotIndex > 0 ? oldName.substring(0, lastDotIndex) : oldName;
    const ext = lastDotIndex > 0 ? oldName.substring(lastDotIndex) : '';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.value = baseName;
    input.className = 'bg-transparent border border-brand-500 rounded px-1 text-xs w-full';
    input.style.minWidth = '80px';
    
    // Replace span with input
    nameElement.replaceWith(input);
    input.focus();
    input.select();
    
    const finishEdit = () => {
        const newBaseName = input.value.trim() || 'New File';
        const newFilename = newBaseName + ext;
        
        if (newFilename !== oldName) {
            if (files[newFilename] && newFilename !== oldName) {
                alert('File with this name already exists!');
                input.replaceWith(nameElement);
                return;
            }
            renameFile(oldName, newFilename);
        } else {
            // Just restore the element
            input.replaceWith(nameElement);
        }
    };
    
    input.addEventListener('blur', finishEdit);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            finishEdit();
        } else if (e.key === 'Escape') {
            input.replaceWith(nameElement);
        }
    });
}

function saveFiles() {
    try {
        localStorage.setItem('fixly_files', JSON.stringify(files));
        localStorage.setItem('fixly_file_versions', JSON.stringify(fileVersions));
    } catch (e) {
    }
}

// Variable to store pending language change
let pendingLanguageChange = null;
// Variable to store pending chat deletion index
let pendingDeleteChatIndex = null;
// Variable to store detected language from code analysis
let pendingDetectedLanguage = null;

// Handle language change - update file extension and ask for confirmation if code exists
function handleLanguageChange() {
    if (!activeFile || !files[activeFile]) {
        // No active file, just update
        return;
    }
    
    const newLang = els.langSelect.value;
    const currentLang = files[activeFile].language;
    
    // If language didn't change, do nothing
    if (newLang === currentLang) {
        return;
    }
    
    // Check if there's code in the editor
    const hasCode = els.input.value.trim().length > 0;
    
    if (hasCode) {
        // Store the new language for later use
        pendingLanguageChange = newLang;
        
        // Show confirmation dialog
        showChangeLanguageDialog(currentLang, newLang);
        
        // Revert language select temporarily
        els.langSelect.value = currentLang;
    } else {
        // No code, just update directly
        renameFileWithExtension(activeFile, newLang);
    }
}

// Show change language confirmation dialog
function showChangeLanguageDialog(programmingLang, newLang) {
    if (!els.changeLanguageDialog || !els.changeLanguageDialogContent) return;
    
    // Use UI language, not programming language
    const uiLang = currentLang || localStorage.getItem('fixly_lang') || 'en';
    const t = TRANSLATIONS[uiLang] || TRANSLATIONS.en;
    const langNames = {
        'JavaScript': 'JavaScript',
        'TypeScript': 'TypeScript',
        'Python': 'Python',
        'Java': 'Java',
        'C++': 'C++',
        'C#': 'C#',
        'Go': 'Go',
        'Rust': 'Rust',
        'Swift': 'Swift',
        'Kotlin': 'Kotlin',
        'PHP': 'PHP',
        'Ruby': 'Ruby',
        'HTML/CSS': 'HTML/CSS',
        'Vue': 'Vue',
        'React': 'React',
        'Svelte': 'Svelte',
        'SQL': 'SQL',
        'R': 'R',
        'MATLAB': 'MATLAB',
        'Shell/Bash': 'Shell/Bash',
        'PowerShell': 'PowerShell',
        'Lua': 'Lua',
        'Perl': 'Perl',
        'Scala': 'Scala',
        'Haskell': 'Haskell',
        'Elixir': 'Elixir',
        'Clojure': 'Clojure',
        'Erlang': 'Erlang',
        'JSON': 'JSON',
        'YAML': 'YAML',
        'XML': 'XML',
        'Markdown': 'Markdown',
        'TOML': 'TOML',
        'INI': 'INI',
        'C': 'C',
        'Dart': 'Dart',
        'Objective-C': 'Objective-C',
        'Assembly': 'Assembly'
    };
    
    const currentLangName = langNames[programmingLang] || programmingLang;
    const newLangName = langNames[newLang] || newLang;
    
    // Update message with language names
    if (els.changeLanguageMessage) {
        // Build message based on UI language
        let message;
        if (uiLang === 'uk') {
            message = `Ви впевнені, що хочете змінити мову програмування з "${currentLangName}" на "${newLangName}"? Розширення файлу буде оновлено автоматично.`;
        } else if (uiLang === 'ru') {
            message = `Вы уверены, что хотите изменить язык программирования с "${currentLangName}" на "${newLangName}"? Расширение файла будет обновлено автоматически.`;
        } else if (uiLang === 'pl') {
            message = `Czy na pewno chcesz zmienić język programowania z "${currentLangName}" na "${newLangName}"? Rozszerzenie pliku zostanie zaktualizowane automatycznie.`;
        } else if (uiLang === 'de') {
            message = `Sind Sie sicher, dass Sie die Programmiersprache von "${currentLangName}" zu "${newLangName}" ändern möchten? Die Dateierweiterung wird automatisch aktualisiert.`;
        } else if (uiLang === 'es') {
            message = `¿Estás seguro de que quieres cambiar el lenguaje de programación de "${currentLangName}" a "${newLangName}"? La extensión del archivo se actualizará automáticamente.`;
        } else {
            // English default
            message = `Are you sure you want to change the programming language from "${currentLangName}" to "${newLangName}"? The file extension will be updated automatically.`;
        }
        
        els.changeLanguageMessage.textContent = message;
    }
    
    // Update translations
    updateChangeLanguageDialogTranslations();
    
    // Show dialog
    els.changeLanguageDialog.classList.remove('hidden');
    els.changeLanguageDialog.classList.add('flex');
    
    requestAnimationFrame(() => {
        els.changeLanguageDialogContent.classList.remove('opacity-0', 'scale-95');
        els.changeLanguageDialogContent.classList.add('dialog-open');
    });
}

// Close change language dialog
function closeChangeLanguageDialog() {
    if (!els.changeLanguageDialog || !els.changeLanguageDialogContent) return;
    
    els.changeLanguageDialogContent.classList.remove('dialog-open');
    
    setTimeout(() => {
        els.changeLanguageDialog.classList.add('hidden');
        els.changeLanguageDialog.classList.remove('flex');
        els.changeLanguageDialogContent.classList.add('opacity-0', 'scale-95');
        pendingLanguageChange = null;
    }, 200);
}

// Update translations for change language dialog
function updateChangeLanguageDialogTranslations() {
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    const titleEl = els.changeLanguageDialogContent?.querySelector('h3[data-i18n="changeLanguageConfirmTitle"]');
    const cancelBtn = els.changeLanguageCancel;
    const okBtn = els.changeLanguageOk;
    
    if (titleEl && t.changeLanguageConfirmTitle) {
        titleEl.textContent = t.changeLanguageConfirmTitle;
    }
    if (cancelBtn && t.cancel) {
        cancelBtn.textContent = t.cancel;
    }
    if (okBtn && t.changeLanguage) {
        okBtn.textContent = t.changeLanguage;
    }
}

// Rename file with correct extension based on language
function renameFileWithExtension(oldFilename, newLanguage) {
    if (!files[oldFilename]) return;
    
    // Get base name without extension
    const lastDotIndex = oldFilename.lastIndexOf('.');
    let baseName = lastDotIndex > 0 ? oldFilename.substring(0, lastDotIndex) : oldFilename;
    
    // If it's "New File" or "untitled", keep it as is
    if (baseName === 'New File' || baseName === 'untitled' || baseName.toLowerCase() === 'new file') {
        baseName = 'New File';
    }
    
    // Map language to extension
    const extMap = {
        'JavaScript': '.js',
        'TypeScript': '.ts',
        'React': '.jsx',
        'Python': '.py',
        'Java': '.java',
        'C++': '.cpp',
        'C': '.c',
        'C#': '.cs',
        'HTML/CSS': '.html',
        'PHP': '.php',
        'Ruby': '.rb',
        'Vue': '.vue',
        'Svelte': '.svelte',
        'Go': '.go',
        'Rust': '.rs',
        'Swift': '.swift',
        'Kotlin': '.kt',
        'Dart': '.dart',
        'Objective-C': '.m',
        'SQL': '.sql',
        'R': '.r',
        'Shell/Bash': '.sh',
        'PowerShell': '.ps1',
        'Lua': '.lua',
        'Perl': '.pl',
        'Scala': '.scala',
        'Haskell': '.hs',
        'Elixir': '.ex',
        'Clojure': '.clj',
        'Erlang': '.erl',
        'JSON': '.json',
        'YAML': '.yaml',
        'XML': '.xml',
        'Markdown': '.md',
        'TOML': '.toml',
        'INI': '.ini',
        'Assembly': '.asm'
    };
    
    const newExt = extMap[newLanguage] || '';
    const newFilename = baseName + newExt;
    
    // If filename already exists and it's different, add number
    let finalFilename = newFilename;
    let counter = 1;
    while (files[finalFilename] && finalFilename !== oldFilename) {
        const nameWithoutExt = baseName;
        finalFilename = `${nameWithoutExt} (${counter})${newExt}`;
        counter++;
    }
    
    // Save current content
    const content = els.input.value;
    const language = newLanguage;
    const modified = files[oldFilename].modified;
    
    // Remove old file
    delete files[oldFilename];
    
    // Create new file with new name
    files[finalFilename] = {
        content: content,
        language: language,
        modified: modified
    };
    
    // Update versions
    if (fileVersions[oldFilename]) {
        fileVersions[finalFilename] = fileVersions[oldFilename];
        delete fileVersions[oldFilename];
    }
    
    // Update active file
    activeFile = finalFilename;
    
    // Save and re-render
    saveFiles();
    renderFileTabs();
    
    // Update language select to match
    els.langSelect.value = newLanguage;
}

// Rename file function (can be called from UI)
function renameFile(oldFilename, newFilename) {
    if (!files[oldFilename]) return false;
    
    // Check if new filename already exists
    if (files[newFilename] && newFilename !== oldFilename) {
        alert('File with this name already exists!');
        return false;
    }
    
    // Save current content
    const content = files[oldFilename].content;
    const language = files[oldFilename].language;
    const modified = files[oldFilename].modified;
    
    // Remove old file
    delete files[oldFilename];
    
    // Create new file with new name
    files[newFilename] = {
        content: content,
        language: language,
        modified: modified
    };
    
    // Update versions
    if (fileVersions[oldFilename]) {
        fileVersions[newFilename] = fileVersions[oldFilename];
        delete fileVersions[oldFilename];
    }
    
    // Update active file if it was the renamed one
    if (activeFile === oldFilename) {
        activeFile = newFilename;
    }
    
    // Save and re-render
    saveFiles();
    renderFileTabs();
    
    return true;
}


function showNewFileDialog() {
    els.newFileDialog.classList.remove('hidden');
    els.newFileDialog.classList.add('flex');
    els.newFileName.value = '';
    els.newFileType.value = '.js';
    setTimeout(() => {
        els.newFileDialogContent.classList.add('dialog-open');
        els.newFileName.focus();
    }, 10);
}

function closeNewFileDialog() {
    els.newFileDialogContent.classList.remove('dialog-open');
    setTimeout(() => {
        els.newFileDialog.classList.add('hidden');
        els.newFileDialog.classList.remove('flex');
    }, 300);
}

function createNewFile() {
    const name = els.newFileName.value.trim();
    const type = els.newFileType.value;
    
    if (!name) {
        els.newFileName.focus();
        return;
    }
    
    const filename = name.endsWith(type) ? name : name + type;
    
    if (files[filename]) {
        if (!confirm(`File "${filename}" already exists. Overwrite?`)) {
            return;
        }
    }
    
    const langMap = {
        // Popular
        '.js': 'JavaScript',
        '.ts': 'TypeScript',
        '.jsx': 'React',
        '.tsx': 'React',
        '.py': 'Python',
        '.java': 'Java',
        '.cpp': 'C++',
        '.c': 'C',
        '.cs': 'C#',
        // Web
        '.html': 'HTML/CSS',
        '.css': 'HTML/CSS',
        '.php': 'PHP',
        '.rb': 'Ruby',
        '.vue': 'Vue',
        '.svelte': 'Svelte',
        // Systems
        '.go': 'Go',
        '.rs': 'Rust',
        '.asm': 'Assembly',
        // Mobile
        '.swift': 'Swift',
        '.kt': 'Kotlin',
        '.dart': 'Dart',
        '.m': 'Objective-C',
        // Data & Scripts
        '.sql': 'SQL',
        '.r': 'R',
        '.sh': 'Shell/Bash',
        '.ps1': 'PowerShell',
        '.lua': 'Lua',
        '.pl': 'Perl',
        '.scala': 'Scala',
        '.hs': 'Haskell',
        '.ex': 'Elixir',
        '.clj': 'Clojure',
        '.erl': 'Erlang',
        // Config & Markup
        '.json': 'JSON',
        '.yaml': 'YAML',
        '.yml': 'YAML',
        '.xml': 'XML',
        '.md': 'Markdown',
        '.toml': 'TOML',
        '.ini': 'INI',
        '.conf': 'INI',
        // Other
        '.txt': 'JavaScript',
        '.log': 'JavaScript'
    };
    
    createFile(filename, '', langMap[type] || 'JavaScript');
    closeNewFileDialog();
}


async function formatCode() {
    if (!els.input.value.trim()) {
        // Visual feedback for empty
        els.formatCodeBtn.classList.add('animate-shake');
        setTimeout(() => els.formatCodeBtn.classList.remove('animate-shake'), 300);
        return;
    }
    
    const code = els.input.value;
    const lang = els.langSelect.value;
    
    // Enhanced formatting with better indentation
    let formatted = code;
    let indentLevel = 0;
    const indentSize = 4;
    
    if (lang === 'JavaScript' || lang === 'TypeScript') {
        // Enhanced JS/TS formatting
        const lines = code.split('\n');
        formatted = lines.map(line => {
            const trimmed = line.trim();
            if (!trimmed) return '';
            
            // Decrease indent for closing braces
            if (trimmed.startsWith('}') || trimmed.startsWith(']') || trimmed.startsWith(')')) {
                indentLevel = Math.max(0, indentLevel - 1);
            }
            
            const indented = ' '.repeat(indentLevel * indentSize) + trimmed;
            
            // Increase indent for opening braces
            if (trimmed.endsWith('{') || trimmed.endsWith('[') || trimmed.endsWith('(')) {
                indentLevel++;
            }
            
            return indented;
        }).join('\n');
        
        // Clean up extra spaces
        formatted = formatted
            .replace(/\s*{\s*/g, ' {')
            .replace(/\s*}\s*/g, ' }')
            .replace(/;\s*/g, ';\n')
            .replace(/\n{3,}/g, '\n\n')
            .trim();
            
    } else if (lang === 'HTML/CSS') {
        // Enhanced HTML formatting
        formatted = code
            .replace(/>\s*</g, '>\n<')
            .replace(/^\s+|\s+$/gm, '')
            .split('\n')
            .map(line => {
                const trimmed = line.trim();
                if (!trimmed) return '';
                if (trimmed.startsWith('</')) {
                    indentLevel = Math.max(0, indentLevel - 1);
                }
                const indented = ' '.repeat(indentLevel * 2) + trimmed;
                if (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.endsWith('/>')) {
                    indentLevel++;
                }
                return indented;
            })
            .join('\n')
            .trim();
    } else if (lang === 'Python') {
        // Python formatting (basic)
        formatted = code
            .split('\n')
            .map(line => {
                const trimmed = line.trim();
                if (!trimmed) return '';
                if (trimmed && !trimmed.startsWith('#') && !trimmed.match(/^(if|elif|else|for|while|def|class|try|except|finally|with)\s/)) {
                    // Check if previous line should increase indent
                }
                return trimmed;
            })
            .join('\n')
            .replace(/\n{3,}/g, '\n\n')
            .trim();
    }
    
    // Animate the change
    els.input.style.opacity = '0.5';
    setTimeout(() => {
        els.input.value = formatted;
        updateLineNumbers();
        els.input.style.opacity = '1';
    }, 150);
    
    // Visual feedback with animation
    const originalHTML = els.formatCodeBtn.innerHTML;
    els.formatCodeBtn.innerHTML = '<i class="fa-solid fa-check text-brand-500 animate-checkmark"></i>';
    els.formatCodeBtn.classList.add('animate-pulse-glow');
    setTimeout(() => {
        els.formatCodeBtn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i>';
        els.formatCodeBtn.classList.remove('animate-pulse-glow');
    }, 1500);
    
    // Save version after formatting
    if (activeFile) {
        saveCurrentVersion();
    }
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Add animation to upload button
    els.uploadFileBtn.classList.add('animate-bounce');
    setTimeout(() => {
        els.uploadFileBtn.classList.remove('animate-bounce');
    }, 500);
    
    const reader = new FileReader();
    reader.onload = (e) => {
        const content = e.target.result;
        const filename = file.name;
        const ext = filename.substring(filename.lastIndexOf('.'));
        
        const langMap = {
            // Popular
            '.js': 'JavaScript',
            '.ts': 'TypeScript',
            '.jsx': 'React',
            '.tsx': 'React',
            '.py': 'Python',
            '.java': 'Java',
            '.cpp': 'C++',
            '.c': 'C',
            '.cs': 'C#',
            // Web
            '.html': 'HTML/CSS',
            '.css': 'HTML/CSS',
            '.php': 'PHP',
            '.rb': 'Ruby',
            '.vue': 'Vue',
            '.svelte': 'Svelte',
            // Systems
            '.go': 'Go',
            '.rs': 'Rust',
            '.asm': 'Assembly',
            // Mobile
            '.swift': 'Swift',
            '.kt': 'Kotlin',
            '.dart': 'Dart',
            '.m': 'Objective-C',
            // Data & Scripts
            '.sql': 'SQL',
            '.r': 'R',
            '.sh': 'Shell/Bash',
            '.ps1': 'PowerShell',
            '.lua': 'Lua',
            '.pl': 'Perl',
            '.scala': 'Scala',
            '.hs': 'Haskell',
            '.ex': 'Elixir',
            '.clj': 'Clojure',
            '.erl': 'Erlang',
            // Config & Markup
            '.json': 'JSON',
            '.yaml': 'YAML',
            '.yml': 'YAML',
            '.xml': 'XML',
            '.md': 'Markdown',
            '.toml': 'TOML',
            '.ini': 'INI',
            '.conf': 'INI',
            // Other
            '.txt': 'JavaScript',
            '.log': 'JavaScript'
        };
        
        createFile(filename, content, langMap[ext] || 'JavaScript');
        
        // Add success animation
        els.uploadFileBtn.innerHTML = '<i class="fa-solid fa-check text-brand-500 animate-checkmark" aria-hidden="true"></i>';
        els.uploadFileBtn.classList.add('animate-pulse-glow');
        setTimeout(() => {
            els.uploadFileBtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up" aria-hidden="true"></i>';
            els.uploadFileBtn.classList.remove('animate-pulse-glow');
        }, 1000);
    };
    reader.readAsText(file);
    
    // Reset input
    event.target.value = '';
}

function downloadCurrentFile() {
    // Add animation to download button
    els.downloadFileBtn.classList.add('animate-bounce');
    setTimeout(() => {
        els.downloadFileBtn.classList.remove('animate-bounce');
    }, 500);
    
    if (!activeFile || !files[activeFile]) {
        // Download current editor content
        const content = els.input.value;
        const lang = els.langSelect.value;
        
        const extMap = {
            'JavaScript': '.js',
            'TypeScript': '.ts',
            'React': '.jsx',
            'Python': '.py',
            'Java': '.java',
            'C++': '.cpp',
            'C': '.c',
            'C#': '.cs',
            'HTML/CSS': '.html',
            'PHP': '.php',
            'Ruby': '.rb',
            'Vue': '.vue',
            'Svelte': '.svelte',
            'Go': '.go',
            'Rust': '.rs',
            'Swift': '.swift',
            'Kotlin': '.kt',
            'Dart': '.dart',
            'Objective-C': '.m',
            'SQL': '.sql',
            'R': '.r',
            'Shell/Bash': '.sh',
            'PowerShell': '.ps1',
            'Lua': '.lua',
            'Perl': '.pl',
            'Scala': '.scala',
            'Haskell': '.hs',
            'Elixir': '.ex',
            'Clojure': '.clj',
            'Erlang': '.erl',
            'JSON': '.json',
            'YAML': '.yaml',
            'XML': '.xml',
            'Markdown': '.md',
            'TOML': '.toml',
            'INI': '.ini',
            'Assembly': '.asm'
        };
        
        const ext = extMap[lang] || '.txt';
        const filename = `code${ext}`;
        
        downloadFile(filename, content);
        return;
    }
    
    const content = files[activeFile].content;
    downloadFile(activeFile, content);
}

function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Visual feedback with animation
    els.downloadFileBtn.innerHTML = '<i class="fa-solid fa-check text-brand-500 animate-checkmark" aria-hidden="true"></i>';
    els.downloadFileBtn.classList.add('animate-pulse-glow');
    setTimeout(() => {
        els.downloadFileBtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-down" aria-hidden="true"></i>';
        els.downloadFileBtn.classList.remove('animate-pulse-glow');
    }, 1500);
}

async function copyInputCode() {
    const code = els.input.value;
    if (!code.trim()) {
        els.copyInputBtn.classList.add('animate-shake');
        setTimeout(() => els.copyInputBtn.classList.remove('animate-shake'), 300);
        return;
    }
    
    try {
        await navigator.clipboard.writeText(code);
        
        // Visual feedback with animation
        const originalHTML = els.copyInputBtn.innerHTML;
        els.copyInputBtn.innerHTML = '<i class="fa-solid fa-check text-brand-500 animate-checkmark"></i>';
        els.copyInputBtn.classList.add('animate-pulse-glow');
        setTimeout(() => {
            els.copyInputBtn.innerHTML = originalHTML;
            els.copyInputBtn.classList.remove('animate-pulse-glow');
            updateTexts(currentLang);
        }, 1500);
    } catch (err) {
    }
}


function showClearConfirmDialog() {
    if (!els.clearConfirmDialog || !els.clearConfirmDialogContent) return;
    els.clearConfirmDialog.classList.remove('hidden');
    els.clearConfirmDialog.classList.add('flex');
    
    setTimeout(() => {
        els.clearConfirmDialogContent.classList.add('dialog-open');
    }, 10);
}

function closeClearConfirmDialog() {
    if (!els.clearConfirmDialog || !els.clearConfirmDialogContent) return;
    els.clearConfirmDialogContent.classList.remove('dialog-open');
    setTimeout(() => {
        els.clearConfirmDialog.classList.add('hidden');
        els.clearConfirmDialog.classList.remove('flex');
    }, 200);
}

function clearInput() {
    if (!els.input) return;
    els.input.value = '';
    els.input.focus();
    localStorage.removeItem('fixly_draft');
    updateLineNumbers();
    
    const clearBtn = document.getElementById('clear-input-btn');
    if (clearBtn) {
        clearBtn.innerHTML = '<i class="fa-solid fa-check text-brand-500 animate-checkmark" aria-hidden="true"></i>';
        clearBtn.classList.add('animate-pulse-glow');
        setTimeout(() => {
            clearBtn.innerHTML = '<i class="fa-solid fa-trash-can" aria-hidden="true"></i>';
            clearBtn.classList.remove('animate-pulse-glow');
        }, 1000);
    }
    
    if (activeFile && files[activeFile]) {
        files[activeFile].content = '';
        files[activeFile].modified = Date.now();
        saveFiles();
    }
}


function saveCurrentVersion() {
    const content = els.input.value.trim();
    if (!content) return;
    
    // Save to current active chat if exists
    if (currentChatId) {
        const currentChat = history.find(chat => chat.id === currentChatId);
        if (currentChat) {
            if (!currentChat.versions) {
                currentChat.versions = [];
            }
            
            // Don't save if same as last version
            const lastVersion = currentChat.versions[currentChat.versions.length - 1];
            if (lastVersion && lastVersion.content === content) {
                return;
            }
            
            currentChat.versions.push({
                content: content,
                timestamp: Date.now()
            });
            
            // Keep only last 50 versions per chat
            if (currentChat.versions.length > 50) {
                currentChat.versions = currentChat.versions.slice(-50);
            }
            
            // Save to localStorage
            try {
                localStorage.setItem('fixly_history', JSON.stringify(history));
            } catch (e) {
            }
            return;
        }
    }
    
    // Fallback to file-based versioning if no active chat
    if (!activeFile) return;
    
    if (!fileVersions[activeFile]) {
        fileVersions[activeFile] = [];
    }
    
    // Don't save if same as last version
    const lastVersion = fileVersions[activeFile][fileVersions[activeFile].length - 1];
    if (lastVersion && lastVersion.content === content) {
        return;
    }
    
    fileVersions[activeFile].push({
        content: content,
        timestamp: Date.now()
    });
    
    // Keep only last 50 versions per file
    if (fileVersions[activeFile].length > 50) {
        fileVersions[activeFile] = fileVersions[activeFile].slice(-50);
    }
    
    saveFiles();
}

function showVersionHistory(chatId = null) {
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    
    // If chatId provided, show versions for that chat
    if (chatId) {
        const chat = history.find(c => c.id === chatId);
        if (chat && chat.versions && chat.versions.length > 0) {
            renderChatVersionHistory(chat);
            els.versionHistoryDialog.classList.remove('hidden');
            els.versionHistoryDialog.classList.add('flex');
            setTimeout(() => {
                els.versionHistoryDialogContent.classList.add('dialog-open');
            }, 10);
            return;
        } else {
            showToast(t.noVersions || 'No saved versions');
            return;
        }
    }
    
    // Otherwise, show file versions (fallback)
    if (!activeFile || !fileVersions[activeFile] || fileVersions[activeFile].length === 0) {
        // Try to show current chat versions
        if (currentChatId) {
            const currentChat = history.find(c => c.id === currentChatId);
            if (currentChat && currentChat.versions && currentChat.versions.length > 0) {
                renderChatVersionHistory(currentChat);
                els.versionHistoryDialog.classList.remove('hidden');
                els.versionHistoryDialog.classList.add('flex');
                setTimeout(() => {
                    els.versionHistoryDialogContent.classList.add('dialog-open');
                }, 10);
                return;
            }
        }
        showToast(t.noVersions || 'No saved versions');
        return;
    }
    
    els.versionHistoryDialog.classList.remove('hidden');
    els.versionHistoryDialog.classList.add('flex');
    
    renderVersionHistory();
    
    setTimeout(() => {
        els.versionHistoryDialogContent.classList.add('dialog-open');
    }, 10);
}

function renderVersionHistory() {
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    els.versionHistoryList.innerHTML = '';
    
    if (!activeFile || !fileVersions[activeFile]) {
        els.versionHistoryList.innerHTML = `<div class="text-center text-slate-400 py-4">${t.noVersions || 'No versions'}</div>`;
        return;
    }
    
    const versions = fileVersions[activeFile].slice().reverse(); // Show newest first
    
    versions.forEach((version, index) => {
        const item = document.createElement('div');
        item.className = 'version-item p-3 bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 mb-2';
        const date = new Date(version.timestamp);
        item.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                    <div class="text-sm font-semibold text-slate-800 dark:text-white">Version ${versions.length - index}</div>
                    <div class="text-xs text-slate-500 dark:text-slate-400">${date.toLocaleString()}</div>
                </div>
                <button class="px-3 py-1 text-xs bg-brand-600 hover:bg-brand-500 text-white rounded-lg transition" onclick="restoreFileVersion(${versions.length - 1 - index})">
                    ${t.restoreVersion || 'Restore'}
                </button>
            </div>
        `;
        els.versionHistoryList.appendChild(item);
    });
}

function renderChatVersionHistory(chat) {
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    els.versionHistoryList.innerHTML = '';
    
    if (!chat || !chat.versions || chat.versions.length === 0) {
        els.versionHistoryList.innerHTML = `<div class="text-center text-slate-400 py-4">${t.noVersions || 'No versions'}</div>`;
        return;
    }
    
    // Update dialog title to show chat info
    const titleEl = els.versionHistoryDialogContent?.querySelector('h3');
    if (titleEl) {
        const chatPreview = chat.lastMessage || (chat.messages && chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].input.substring(0, 30) : '') || 'Chat';
        titleEl.textContent = `${t.versionHistory} - ${chatPreview}${chatPreview.length > 30 ? '...' : ''}`;
    }
    
    const versions = chat.versions.slice().reverse(); // Show newest first
    
    versions.forEach((version, index) => {
        const item = document.createElement('div');
        item.className = 'version-item p-3 bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 mb-2';
        const date = new Date(version.timestamp);
        item.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                    <div class="text-sm font-semibold text-slate-800 dark:text-white">Version ${versions.length - index}</div>
                    <div class="text-xs text-slate-500 dark:text-slate-400">${date.toLocaleString()}</div>
                </div>
                <button class="px-3 py-1 text-xs bg-brand-600 hover:bg-brand-500 text-white rounded-lg transition" onclick="restoreChatVersion('${chat.id}', ${versions.length - 1 - index})">
                    ${t.restoreVersion || 'Restore'}
                </button>
            </div>
        `;
        els.versionHistoryList.appendChild(item);
    });
}

function restoreFileVersion(index) {
    if (!activeFile || !fileVersions[activeFile] || !fileVersions[activeFile][index]) return;
    
    const version = fileVersions[activeFile][index];
    els.input.value = version.content;
    updateLineNumbers();
    closeVersionHistory();
}

function restoreChatVersion(chatId, index) {
    const chat = history.find(c => c.id === chatId);
    if (!chat || !chat.versions || !chat.versions[index]) return;
    
    const version = chat.versions[index];
    els.input.value = version.content;
    updateLineNumbers();
    closeVersionHistory();
}

// Show toast notification
function showToast(message, duration = 3000) {
    if (!els.toast || !els.toastMessage) return;
    
    els.toastMessage.textContent = message;
    
    // Show toast
    els.toast.classList.remove('translate-x-full', 'opacity-0');
    els.toast.classList.add('-translate-x-0', 'opacity-100');
    els.toast.classList.remove('pointer-events-none');
    
    // Auto hide after duration
    const hideToast = () => {
        els.toast.classList.add('translate-x-full', 'opacity-0');
        els.toast.classList.remove('-translate-x-0', 'opacity-100');
        els.toast.classList.add('pointer-events-none');
    };
    
    // Clear existing timeout if any
    if (els.toast._hideTimeout) {
        clearTimeout(els.toast._hideTimeout);
    }
    
    els.toast._hideTimeout = setTimeout(hideToast, duration);
    
    // Close button handler
    if (els.toastClose) {
        els.toastClose.onclick = () => {
            hideToast();
            if (els.toast._hideTimeout) {
                clearTimeout(els.toast._hideTimeout);
            }
        };
    }
}

function closeVersionHistory() {
    els.versionHistoryDialogContent.classList.remove('dialog-open');
    setTimeout(() => {
        els.versionHistoryDialog.classList.add('hidden');
        els.versionHistoryDialog.classList.remove('flex');
        // Reset dialog title
        const titleEl = els.versionHistoryDialogContent?.querySelector('h3');
        if (titleEl) {
            const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
            titleEl.textContent = t.versionHistory || 'Version History';
        }
    }, 300);
}

// Enhanced input handler - save to current file
if (els.input) {
    els.input.addEventListener('input', () => {
        if (activeFile && files[activeFile]) {
            files[activeFile].content = els.input.value;
            files[activeFile].modified = Date.now();
        }
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
            saveFiles();
            saveCurrentVersion();
            localStorage.setItem('fixly_draft', els.input.value);
        }, 1000);
        updateLineNumbers();
    });
}


async function testAIModel(modelId) {
    const modelConfig = MODEL_CONFIG[modelId];
    if (!modelConfig) {
        return { success: false, error: 'Model not configured' };
    }
    
    const testCode = "console.log('test');";
    
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout for test
        
        const response = await fetch('/api/ai-request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: testCode,
                mode: 'test',
                lang: 'en',
                model: modelId,
                wishes: ''
            }),
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMsg = errorData.error || errorData.message || `HTTP ${response.status}`;
            MODEL_CONFIG[modelId].verified = false;
            return { success: false, error: errorMsg };
        }
        
        const data = await response.json();
        const hasContent = !!(data.rawText && data.rawText.trim().length > 0);
        
        if (!hasContent) {
            MODEL_CONFIG[modelId].verified = false;
            return { success: false, error: 'Empty response' };
        }
        
        // Update verified status
        MODEL_CONFIG[modelId].verified = true;
        return { success: true };
        
    } catch (error) {
        const errorMsg = error.name === 'AbortError' ? 'Timeout' : error.message || 'Unknown error';
        MODEL_CONFIG[modelId].verified = false;
        return { success: false, error: errorMsg };
    }
}

async function verifyAllModels() {
    const results = {};
    const modelSelect = els.modelSelect;
    const originalOptions = Array.from(modelSelect.options);
    
    for (const modelId of Object.keys(MODEL_CONFIG)) {
        const result = await testAIModel(modelId);
        results[modelId] = result.success;
        
        const option = Array.from(modelSelect.options).find(opt => opt.value === modelId);
        if (option) {
            if (result.success) {
                option.text = option.text.replace(/^[✗×]?\s*/, '✓ ');
                option.style.color = '';
            } else {
                option.text = option.text.replace(/^[✓]?\s*/, '✗ ');
                option.style.color = '#ef4444';
                option.title = `Error: ${result.error || 'Failed'}`;
            }
        }
        
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    try {
        localStorage.setItem('fixly_model_verification', JSON.stringify({
            results,
            timestamp: Date.now()
        }));
    } catch (e) {
    }
    
    return results;
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        const cached = localStorage.getItem('fixly_model_verification');
        if (cached) {
            const data = JSON.parse(cached);
            if (Date.now() - data.timestamp > 24 * 60 * 60 * 1000) {
                setTimeout(() => verifyAllModels(), 2000);
            }
        } else {
            setTimeout(() => verifyAllModels(), 2000);
        }
    } catch (e) {
    }
});  