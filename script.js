const API_CONFIG = {
    useServer: true
};
const MODEL_CONFIG = {
    'gemini-2.5-flash': { provider: 'google', supportsJson: true, verified: true },
    'deepseek/deepseek-chat:free': { provider: 'openrouter', supportsJson: true, verified: true },
    'meta-llama/llama-3.1-8b-instruct:free': { provider: 'openrouter', supportsJson: true, verified: true },
    'qwen/qwen-2.5-14b-instruct:free': { provider: 'openrouter', supportsJson: true, verified: true },
    'google/gemma-2-9b-it:free': { provider: 'openrouter', supportsJson: true, verified: true },
    'microsoft/phi-3.5-mini-128k-instruct:free': { provider: 'openrouter', supportsJson: true, verified: true }
};

const FALLBACK_MODELS = {
    'google': 'gemini-2.5-flash',
    'openrouter': 'meta-llama/llama-3.1-8b-instruct:free'
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
        newChatBtn: "Новий чат", donateBtn: "На каву розробнику", runBtn: "Запуск", analysisHeader: "Діагностика", emptyTitle: "FixlyCode", loading: "Аналіз...", errorEmpty: "Введіть код!", clearHistory: "Очистити історію", clearHistoryConfirm: "Ви впевнені, що хочете очистити всю історію?", placeholder: "// Вставте код тут...", tipHeader: "Порада:", langName: "Українська", wishesPlaceholder: "Побажання...", exportBtn: "Експорт в Markdown", scoreTitle: "Рейтинг",
        tipDebug: "Виправити помилки", tipOptimize: "Покращити код", tipExplain: "Пояснити логіку", tipReview: "Code Review", tipSecurity: "Безпека", tipRefactor: "Рефакторинг", tipDocument: "Документація", tipConvert: "Конвертувати", tipFormat: "Форматування", tipTest: "Створити тести",
        tipFormatCode: "Форматувати код згідно стандартів мови програмування", tipUploadFile: "Завантажити файл з комп'ютера в редактор", tipDownloadFile: "Зберегти поточний код у файл", tipVersionHistory: "Переглянути та відновити попередні версії файлу", tipCopyCode: "Копіювати код з редактора в буфер обміну", tipClearEditor: "Очистити весь код з редактора",
        formatCode: "Форматувати", uploadFile: "Завантажити", downloadFile: "Зберегти", copyCode: "Копіювати", clearEditor: "Очистити",
        clearConfirm: "Ви впевнені, що хочете очистити редактор? Весь код буде видалено.",
        clearConfirmTitle: "Очистити редактор?",
        clearConfirmMessage: "Ви впевнені, що хочете очистити редактор? Весь код буде безповоротно видалено. Цю дію неможливо скасувати.",
        clearHistoryConfirmTitle: "Очистити історію?",
        clearHistoryConfirmMessage: "Ви впевнені, що хочете очистити всю історію? Всі збережені чати будуть безповоротно видалені. Цю дію неможливо скасувати.",
        newFileTitle: "Створити новий файл", fileName: "Назва файлу", fileType: "Тип файлу", cancel: "Скасувати", create: "Створити",
        versionHistory: "Історія версій", close: "Закрити", restoreVersion: "Відновити версію", noVersions: "Немає збережених версій", chatPrevious: "Попереднє", chatNext: "Наступне",
        changeLanguageConfirm: "Ви впевнені, що хочете змінити мову? Розширення файлу буде оновлено автоматично.",
        changeLanguageConfirmTitle: "Змінити мову програмування?",
        changeLanguageConfirmMessage: "Ви впевнені, що хочете змінити мову програмування? Розширення файлу буде оновлено автоматично.",
        changeLanguage: "Змінити мову",
        deleteChatConfirmTitle: "Видалити чат?",
        deleteChatConfirmMessage: "Ви впевнені, що хочете видалити цей чат? Цю дію неможливо скасувати.",
        deleteChat: "Видалити чат", 
        welcomeDesc: "Ваш персональний AI-асистент. Виправляйте баги, оптимізуйте код та тестуйте.", startBtn: "Почати роботу", startTutorialBtn: "Почати навчання", skipBtn: "Пропустити", nextTour: "Далі", finishTour: "Завершити", emptyStatePrompt: "Оберіть режим та натисніть Запуск",
        tabHistory: "Історія", tabTips: "Поради AI", historyEmptyDesc: "Тут з'являться ваші запити.", funFactHeader: "Цікавий факт",
        tourStep1Title: "1. Введіть Код", tourStep1Desc: "Вставте ваш код сюди в текстове поле.", tourStep2Title: "2. Оберіть Мову", tourStep2Desc: "Виберіть мову програмування вашого коду.", tourStep3Title: "3. Оберіть Режим", tourStep3Desc: "Виберіть, що має зробити AI з вашим кодом (виправити, оптимізувати, пояснити тощо).", tourStep4Title: "4. Запустіть AI", tourStep4Desc: "Натисніть кнопку Запуск, щоб почати аналіз!"
    },
    en: {
        newChatBtn: "New Chat", donateBtn: "Buy me a coffee", runBtn: "Run", analysisHeader: "Analysis", emptyTitle: "FixlyCode", loading: "Thinking...", errorEmpty: "Enter code!", clearHistory: "Clear History", clearHistoryConfirm: "Are you sure you want to clear all history?", placeholder: "// Paste code here...", langName: "English", wishesPlaceholder: "Wishes...", exportBtn: "Export MD", scoreTitle: "Score",
        tipDebug: "Fix Bugs", tipOptimize: "Optimize", tipExplain: "Explain", tipReview: "Code Review", tipSecurity: "Security", tipRefactor: "Refactor", tipDocument: "Document", tipConvert: "Convert", tipFormat: "Format", tipTest: "Tests",
        tipFormatCode: "Format code according to programming language standards", tipUploadFile: "Upload a file from your computer to the editor", tipDownloadFile: "Save current code to a file", tipVersionHistory: "View and restore previous file versions", tipCopyCode: "Copy code from editor to clipboard", tipClearEditor: "Clear all code from the editor",
        formatCode: "Format", uploadFile: "Upload", downloadFile: "Download", copyCode: "Copy", clearEditor: "Clear",
        clearConfirm: "Are you sure you want to clear the editor? All code will be deleted.",
        clearConfirmTitle: "Clear Editor?",
        clearConfirmMessage: "Are you sure you want to clear the editor? All code will be permanently deleted. This action cannot be undone.",
        clearHistoryConfirmTitle: "Clear History?",
        clearHistoryConfirmMessage: "Are you sure you want to clear all history? All saved chats will be permanently deleted. This action cannot be undone.",
        newFileTitle: "Create New File", fileName: "File Name", fileType: "File Type", cancel: "Cancel", create: "Create",
        versionHistory: "Version History", close: "Close", restoreVersion: "Restore Version", noVersions: "No saved versions",
        changeLanguageConfirm: "Are you sure you want to change the language? File extension will be updated automatically.",
        changeLanguageConfirmTitle: "Change Programming Language?",
        changeLanguageConfirmMessage: "Are you sure you want to change the programming language? The file extension will be updated automatically.",
        changeLanguage: "Change Language",
        deleteChatConfirmTitle: "Delete Chat?",
        deleteChatConfirmMessage: "Are you sure you want to delete this chat? This action cannot be undone.",
        deleteChat: "Delete Chat",
        welcomeDesc: "Your AI coding assistant.", startBtn: "Get Started", startTutorialBtn: "Start Tutorial", skipBtn: "Skip", nextTour: "Next", finishTour: "Finish", emptyStatePrompt: "Ready to code.",
        tabHistory: "History", tabTips: "AI Tips", historyEmptyDesc: "No history yet.", funFactHeader: "Fun Fact",
        tourStep1Title: "1. Input Code", tourStep1Desc: "Paste your code here in the text area.", tourStep2Title: "2. Select Language", tourStep2Desc: "Choose the programming language of your code.", tourStep3Title: "3. Choose Mode", tourStep3Desc: "Select what AI should do with your code (debug, optimize, explain, etc.).", tourStep4Title: "4. Run AI", tourStep4Desc: "Click the Run button to start the analysis!"
    },
    pl: {
        newChatBtn: "Nowy czat", donateBtn: "Postaw kawę", runBtn: "Uruchom", analysisHeader: "Analiza", emptyTitle: "FixlyCode", loading: "Analizowanie...", errorEmpty: "Wprowadź kod!", clearHistory: "Wyczyść historię", clearHistoryConfirm: "Czy na pewno chcesz wyczyścić całą historię?", placeholder: "// Wklej kod tutaj...", tipHeader: "Wskazówka:", langName: "Polski", wishesPlaceholder: "Życzenia...", exportBtn: "Eksportuj MD", scoreTitle: "Ocena",
        formatCode: "Formatuj", uploadFile: "Wgraj", downloadFile: "Pobierz", copyCode: "Kopiuj", clearEditor: "Wyczyść",
        clearConfirm: "Czy na pewno chcesz wyczyścić edytor? Cały kod zostanie usunięty.",
        clearConfirmTitle: "Wyczyścić edytor?",
        clearConfirmMessage: "Czy na pewno chcesz wyczyścić edytor? Cały kod zostanie trwale usunięty. Tej akcji nie można cofnąć.",
        clearHistoryConfirmTitle: "Wyczyścić historię?",
        clearHistoryConfirmMessage: "Czy na pewno chcesz wyczyścić całą historię? Wszystkie zapisane czaty zostaną trwale usunięte. Tej akcji nie można cofnąć.",
        newFileTitle: "Utwórz nowy plik", fileName: "Nazwa pliku", fileType: "Typ pliku", cancel: "Anuluj", create: "Utwórz",
        versionHistory: "Historia wersji", close: "Zamknij", restoreVersion: "Przywróć wersję", noVersions: "Brak zapisanych wersji",
        changeLanguageConfirm: "Czy na pewno chcesz zmienić język? Rozszerzenie pliku zostanie zaktualizowane automatycznie.",
        changeLanguageConfirmTitle: "Zmienić język programowania?",
        changeLanguageConfirmMessage: "Czy na pewno chcesz zmienić język programowania? Rozszerzenie pliku zostanie zaktualizowane automatycznie.",
        changeLanguage: "Zmienić język",
        deleteChatConfirmTitle: "Usunąć czat?",
        deleteChatConfirmMessage: "Czy na pewno chcesz usunąć ten czat? Tej akcji nie można cofnąć.",
        deleteChat: "Usunąć czat",
        tipDebug: "Napraw błędy", tipOptimize: "Optymalizuj", tipExplain: "Wyjaśnij", tipReview: "Code Review", tipSecurity: "Bezpieczeństwo", tipRefactor: "Refaktoryzuj", tipDocument: "Dokumentacja", tipConvert: "Konwertuj", tipFormat: "Formatuj", tipTest: "Testy",
        tipFormatCode: "Formatuj kod zgodnie ze standardami języka programowania", tipUploadFile: "Prześlij plik z komputera do edytora", tipDownloadFile: "Zapisz bieżący kod do pliku", tipVersionHistory: "Zobacz i przywróć poprzednie wersje pliku", tipCopyCode: "Skopiuj kod z edytora do schowka", tipClearEditor: "Wyczyść cały kod z edytora",
        welcomeDesc: "Twój asystent AI do kodowania.", startBtn: "Rozpocznij", startTutorialBtn: "Rozpocznij samouczek", skipBtn: "Pomiń", nextTour: "Dalej", finishTour: "Zakończ", emptyStatePrompt: "Gotowy do kodowania.",
        tabHistory: "Historia", tabTips: "Wskazówki AI", historyEmptyDesc: "Brak historii.", funFactHeader: "Ciekawostka",
        tourStep1Title: "1. Wprowadź kod", tourStep1Desc: "Wklej swój kod tutaj w obszarze tekstowym.", tourStep2Title: "2. Wybierz język", tourStep2Desc: "Wybierz język programowania swojego kodu.", tourStep3Title: "3. Wybierz tryb", tourStep3Desc: "Wybierz, co AI powinno zrobić z twoim kodem (debugowanie, optymalizacja, wyjaśnienie itp.).", tourStep4Title: "4. Uruchom AI", tourStep4Desc: "Kliknij przycisk Uruchom, aby rozpocząć analizę!"
    },
    de: {
        newChatBtn: "Neuer Chat", donateBtn: "Kaffee spenden", runBtn: "Ausführen", analysisHeader: "Analyse", emptyTitle: "FixlyCode", loading: "Analysiere...", errorEmpty: "Code eingeben!", clearHistory: "Verlauf löschen", clearHistoryConfirm: "Sind Sie sicher, dass Sie den gesamten Verlauf löschen möchten?", placeholder: "// Code hier einfügen...", tipHeader: "Tipp:", langName: "Deutsch", wishesPlaceholder: "Wünsche...", exportBtn: "Als MD exportieren", scoreTitle: "Bewertung",
        formatCode: "Formatieren", uploadFile: "Hochladen", downloadFile: "Herunterladen", copyCode: "Kopieren", clearEditor: "Löschen",
        clearConfirm: "Sind Sie sicher, dass Sie den Editor löschen möchten? Der gesamte Code wird gelöscht.",
        clearConfirmTitle: "Editor löschen?",
        clearConfirmMessage: "Sind Sie sicher, dass Sie den Editor löschen möchten? Der gesamte Code wird dauerhaft gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.",
        clearHistoryConfirmTitle: "Verlauf löschen?",
        clearHistoryConfirmMessage: "Sind Sie sicher, dass Sie den gesamten Verlauf löschen möchten? Alle gespeicherten Chats werden dauerhaft gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.",
        newFileTitle: "Neue Datei erstellen", fileName: "Dateiname", fileType: "Dateityp", cancel: "Abbrechen", create: "Erstellen",
        versionHistory: "Versionsverlauf", close: "Schließen", restoreVersion: "Version wiederherstellen", noVersions: "Keine gespeicherten Versionen",
        changeLanguageConfirm: "Sind Sie sicher, dass Sie die Sprache ändern möchten? Die Dateierweiterung wird automatisch aktualisiert.",
        changeLanguageConfirmTitle: "Programmiersprache ändern?",
        changeLanguageConfirmMessage: "Sind Sie sicher, dass Sie die Programmiersprache ändern möchten? Die Dateierweiterung wird automatisch aktualisiert.",
        changeLanguage: "Sprache ändern",
        deleteChatConfirmTitle: "Chat löschen?",
        deleteChatConfirmMessage: "Sind Sie sicher, dass Sie diesen Chat löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.",
        deleteChat: "Chat löschen",
        tipDebug: "Fehler beheben", tipOptimize: "Optimieren", tipExplain: "Erklären", tipReview: "Code Review", tipSecurity: "Sicherheit", tipRefactor: "Refaktorieren", tipDocument: "Dokumentieren", tipConvert: "Konvertieren", tipFormat: "Formatieren", tipTest: "Tests",
        tipFormatCode: "Code nach Programmierstandards formatieren", tipUploadFile: "Datei vom Computer in den Editor hochladen", tipDownloadFile: "Aktuellen Code in Datei speichern", tipVersionHistory: "Vorherige Dateiversionen anzeigen und wiederherstellen", tipCopyCode: "Code aus Editor in Zwischenablage kopieren", tipClearEditor: "Gesamten Code aus Editor löschen",
        welcomeDesc: "Ihr KI-Code-Assistent.", startBtn: "Loslegen", startTutorialBtn: "Tutorial starten", skipBtn: "Überspringen", nextTour: "Weiter", finishTour: "Beenden", emptyStatePrompt: "Bereit zum Codieren.",
        tabHistory: "Verlauf", tabTips: "KI-Tipps", historyEmptyDesc: "Kein Verlauf.", funFactHeader: "Fun Fact",
        tourStep1Title: "1. Code eingeben", tourStep1Desc: "Fügen Sie Ihren Code hier in das Textfeld ein.", tourStep2Title: "2. Sprache wählen", tourStep2Desc: "Wählen Sie die Programmiersprache Ihres Codes.", tourStep3Title: "3. Modus wählen", tourStep3Desc: "Wählen Sie, was die KI mit Ihrem Code tun soll (Debuggen, Optimieren, Erklären usw.).", tourStep4Title: "4. KI ausführen", tourStep4Desc: "Klicken Sie auf die Schaltfläche Ausführen, um die Analyse zu starten!"
    },
    es: {
        newChatBtn: "Nuevo chat", donateBtn: "Invítame un café", runBtn: "Ejecutar", analysisHeader: "Análisis", emptyTitle: "FixlyCode", loading: "Analizando...", errorEmpty: "¡Ingresa código!", clearHistory: "Limpiar historial", clearHistoryConfirm: "¿Estás seguro de que quieres limpiar todo el historial?", placeholder: "// Pega el código aquí...", tipHeader: "Consejo:", langName: "Español", wishesPlaceholder: "Deseos...", exportBtn: "Exportar MD", scoreTitle: "Puntuación",
        formatCode: "Formatear", uploadFile: "Subir", downloadFile: "Descargar", copyCode: "Copiar", clearEditor: "Limpiar",
        clearConfirm: "¿Estás seguro de que quieres limpiar el editor? Todo el código será eliminado.",
        clearConfirmTitle: "¿Limpiar editor?",
        clearConfirmMessage: "¿Estás seguro de que quieres limpiar el editor? Todo el código será eliminado permanentemente. Esta acción no se puede deshacer.",
        clearHistoryConfirmTitle: "¿Limpiar historial?",
        clearHistoryConfirmMessage: "¿Estás seguro de que quieres limpiar todo el historial? Todos los chats guardados serán eliminados permanentemente. Esta acción no se puede deshacer.",
        newFileTitle: "Crear nuevo archivo", fileName: "Nombre del archivo", fileType: "Tipo de archivo", cancel: "Cancelar", create: "Crear",
        versionHistory: "Historial de versiones", close: "Cerrar", restoreVersion: "Restaurar versión", noVersions: "No hay versiones guardadas",
        changeLanguageConfirm: "¿Estás seguro de que quieres cambiar el idioma? La extensión del archivo se actualizará automáticamente.",
        changeLanguageConfirmTitle: "¿Cambiar lenguaje de programación?",
        changeLanguageConfirmMessage: "¿Estás seguro de que quieres cambiar el lenguaje de programación? La extensión del archivo se actualizará automáticamente.",
        changeLanguage: "Cambiar lenguaje",
        deleteChatConfirmTitle: "¿Eliminar chat?",
        deleteChatConfirmMessage: "¿Estás seguro de que quieres eliminar este chat? Esta acción no se puede deshacer.",
        deleteChat: "Eliminar chat",
        tipDebug: "Corregir errores", tipOptimize: "Optimizar", tipExplain: "Explicar", tipReview: "Code Review", tipSecurity: "Seguridad", tipRefactor: "Refactorizar", tipDocument: "Documentar", tipConvert: "Convertir", tipFormat: "Formatear", tipTest: "Pruebas",
        tipFormatCode: "Formatear código según estándares del lenguaje de programación", tipUploadFile: "Subir un archivo desde tu computadora al editor", tipDownloadFile: "Guardar código actual en un archivo", tipVersionHistory: "Ver y restaurar versiones anteriores del archivo", tipCopyCode: "Copiar código del editor al portapapeles", tipClearEditor: "Limpiar todo el código del editor",
        welcomeDesc: "Tu asistente de código con IA.", startBtn: "Comenzar", startTutorialBtn: "Iniciar tutorial", skipBtn: "Omitir", nextTour: "Siguiente", finishTour: "Finalizar", emptyStatePrompt: "Listo para codificar.",
        tabHistory: "Historial", tabTips: "Consejos IA", historyEmptyDesc: "Sin historial.", funFactHeader: "Dato curioso",
        tourStep1Title: "1. Ingresa código", tourStep1Desc: "Pega tu código aquí en el área de texto.", tourStep2Title: "2. Selecciona idioma", tourStep2Desc: "Elige el lenguaje de programación de tu código.", tourStep3Title: "3. Elige modo", tourStep3Desc: "Selecciona qué debe hacer la IA con tu código (depurar, optimizar, explicar, etc.).", tourStep4Title: "4. Ejecutar IA", tourStep4Desc: "¡Haz clic en el botón Ejecutar para comenzar el análisis!"
    },
    ru: {
        newChatBtn: "Новый чат", donateBtn: "Купить кофе", runBtn: "Запуск", analysisHeader: "Анализ", emptyTitle: "FixlyCode", loading: "Анализ...", errorEmpty: "Введите код!", clearHistory: "Очистить историю", clearHistoryConfirm: "Вы уверены, что хотите очистить всю историю?", placeholder: "// Вставьте код здесь...", tipHeader: "Совет:", langName: "Русский", wishesPlaceholder: "Пожелания...", exportBtn: "Экспорт в Markdown", scoreTitle: "Рейтинг",
        formatCode: "Форматировать", uploadFile: "Загрузить", downloadFile: "Сохранить", copyCode: "Копировать", clearEditor: "Очистить",
        clearConfirm: "Вы уверены, что хотите очистить редактор? Весь код будет удален.",
        clearConfirmTitle: "Очистить редактор?",
        clearConfirmMessage: "Вы уверены, что хотите очистить редактор? Весь код будет безвозвратно удален. Это действие нельзя отменить.",
        clearHistoryConfirmTitle: "Очистить историю?",
        clearHistoryConfirmMessage: "Вы уверены, что хотите очистить всю историю? Все сохраненные чаты будут безвозвратно удалены. Это действие нельзя отменить.",
        newFileTitle: "Создать новый файл", fileName: "Имя файла", fileType: "Тип файла", cancel: "Отмена", create: "Создать",
        versionHistory: "История версий", close: "Закрыть", restoreVersion: "Восстановить версию", noVersions: "Нет сохраненных версий",
        changeLanguageConfirm: "Вы уверены, что хотите изменить язык? Расширение файла будет обновлено автоматически.",
        changeLanguageConfirmTitle: "Изменить язык программирования?",
        changeLanguageConfirmMessage: "Вы уверены, что хотите изменить язык программирования? Расширение файла будет обновлено автоматически.",
        changeLanguage: "Изменить язык",
        deleteChatConfirmTitle: "Удалить чат?",
        deleteChatConfirmMessage: "Вы уверены, что хотите удалить этот чат? Это действие нельзя отменить.",
        deleteChat: "Удалить чат",
        tipDebug: "Исправить ошибки", tipOptimize: "Оптимизировать", tipExplain: "Объяснить", tipReview: "Code Review", tipSecurity: "Безопасность", tipRefactor: "Рефакторинг", tipDocument: "Документация", tipConvert: "Конвертировать", tipFormat: "Форматирование", tipTest: "Тесты",
        tipFormatCode: "Форматировать код согласно стандартам языка программирования", tipUploadFile: "Загрузить файл с компьютера в редактор", tipDownloadFile: "Сохранить текущий код в файл", tipVersionHistory: "Просмотреть и восстановить предыдущие версии файла", tipCopyCode: "Копировать код из редактора в буфер обмена", tipClearEditor: "Очистить весь код из редактора",
        welcomeDesc: "Ваш персональный AI-ассистент. Исправляйте баги, оптимизируйте код и тестируйте.", startBtn: "Начать работу", startTutorialBtn: "Начать обучение", skipBtn: "Пропустить", nextTour: "Далее", finishTour: "Завершить", emptyStatePrompt: "Выберите режим и нажмите Запуск",
        tabHistory: "История", tabTips: "Советы AI", historyEmptyDesc: "Здесь появятся ваши запросы.", funFactHeader: "Интересный факт",
        tourStep1Title: "1. Введите код", tourStep1Desc: "Вставьте ваш код сюда в текстовое поле.", tourStep2Title: "2. Выберите язык", tourStep2Desc: "Выберите язык программирования вашего кода.", tourStep3Title: "3. Выберите режим", tourStep3Desc: "Выберите, что должен сделать AI с вашим кодом (исправить, оптимизировать, объяснить и т.д.).", tourStep4Title: "4. Запустите AI", tourStep4Desc: "Нажмите кнопку Запуск, чтобы начать анализ!"
    }
};

let currentMode = 'debug';
let currentLang = localStorage.getItem('fixly_lang') || 'uk';
let isDark = localStorage.getItem('fixly_theme') !== 'light';
let history = [];
let currentTourStep = 0; 
let tooltipHideTimeout; 
let typingInterval; 
let saveTimeout; // For debounce

// Chat system - accumulate requests in one chat
let chats = {}; // { chatId: { id, messages: [], createdAt } }
let currentChatId = null; // Current active chat ID
let currentMessageIndex = -1; // Index of currently displayed message in chat

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


try { history = JSON.parse(localStorage.getItem('fixly_history')) || []; } catch (e) { history = []; }
try { 
    chats = JSON.parse(localStorage.getItem('fixly_chats')) || {}; 
    currentChatId = localStorage.getItem('fixly_current_chat_id');
} catch (e) { 
    chats = {}; 
    currentChatId = null;
}
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
    clearHistoryConfirmOk: document.getElementById('clear-history-confirm-ok')
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
    
    // Initialize chat if exists
    if (currentChatId && chats[currentChatId] && chats[currentChatId].messages.length > 0) {
        currentMessageIndex = chats[currentChatId].messages.length - 1;
        renderChatMessages(chats[currentChatId], currentMessageIndex);
    }
    
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
    
    if (!checkRateLimit()) {
        const remaining = Math.ceil((RATE_LIMIT.windowMs - (Date.now() - RATE_LIMIT.requests[0])) / 1000);
        els.errorMsg.textContent = `Rate limit exceeded. Please wait ${remaining} seconds.`;
        els.errorMsg.classList.remove('hidden');
        els.errorMsg.classList.add('animate-shake');
        setTimeout(() => els.errorMsg.classList.remove('animate-shake'), 300);
        return;
    }
    
    const selectedModel = els.modelSelect.value;
    const lang = els.langSelect.value;
    
    // Create or get current chat
    if (!currentChatId || !chats[currentChatId]) {
        const newChatId = 'chat_' + Date.now();
        chats[newChatId] = {
            id: newChatId,
            messages: [],
            createdAt: Date.now()
        };
        currentChatId = newChatId;
        currentMessageIndex = -1;
        try {
            localStorage.setItem('fixly_chats', JSON.stringify(chats));
            localStorage.setItem('fixly_current_chat_id', currentChatId);
        } catch (e) {}
    }
    
    const cacheKey = generateCacheKey(code, currentMode, lang, selectedModel, wishes);
    const cached = getCachedResponse(cacheKey);
    
    if (cached) {
        // Add message to current chat
        const message = {
            input: code,
            output: cached,
            mode: currentMode,
            lang: lang,
            wishes: wishes,
            time: new Date().toLocaleTimeString(),
            timestamp: Date.now()
        };
        chats[currentChatId].messages.push(message);
        currentMessageIndex = chats[currentChatId].messages.length - 1;
        try {
            localStorage.setItem('fixly_chats', JSON.stringify(chats));
        } catch (e) {}
        
        renderChatMessages(chats[currentChatId], currentMessageIndex);
        addToHistory({ mode: currentMode, lang, input: code, output: cached, time: new Date().toLocaleTimeString() });
        return;
    }
    
    els.errorMsg.classList.add('hidden');
    els.loadingText.textContent = t.loading;
    els.loadingOverlay.classList.remove('hidden');
    els.runBtn.classList.add('run-btn-glowing');
    els.runBtn.setAttribute('aria-busy', 'true');
    els.runBtn.disabled = true;
    
    if (els.outputContainer) {
        els.outputContainer.setAttribute('aria-busy', 'true');
    } 

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

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
        'test': 'Generate comprehensive unit tests, integration tests, and test cases.'
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
                lang: lang || 'en',
                model: selectedModel,
                wishes: wishes ? wishes.trim() : ''
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
    
    // Add message to current chat
    const message = {
        input: code,
        output: result,
        mode: currentMode,
        lang: lang,
        wishes: wishes,
        time: new Date().toLocaleTimeString(),
        timestamp: Date.now()
    };
    chats[currentChatId].messages.push(message);
    currentMessageIndex = chats[currentChatId].messages.length - 1;
    try {
        localStorage.setItem('fixly_chats', JSON.stringify(chats));
    } catch (e) {}
    
    renderChatMessages(chats[currentChatId], currentMessageIndex);
    addToHistory({ mode: currentMode, lang, input: code, output: result, time: new Date().toLocaleTimeString() });

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
function renderChatMessages(chat, messageIndex) {
    if (!chat || !chat.messages || chat.messages.length === 0) {
        return;
    }
    
    const message = chat.messages[messageIndex];
    if (!message) {
        return;
    }
    
    renderOutput(message.output, message.lang);
    
    // Add navigation buttons if there are multiple messages
    if (chat.messages.length > 1) {
        addChatNavigation(chat, messageIndex);
    } else {
        removeChatNavigation();
    }
}

function addChatNavigation(chat, currentIndex) {
    // Remove existing navigation if any
    removeChatNavigation();
    
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    const prevText = t.chatPrevious || 'Previous';
    const nextText = t.chatNext || 'Next';
    
    const navHTML = `
        <div id="chat-navigation" class="flex items-center justify-between p-3 bg-gray-100 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
            <button id="chat-prev-btn" class="px-3 py-1.5 text-xs font-bold bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-500/20 hover:text-brand-600 dark:hover:text-brand-400 transition disabled:opacity-50 disabled:cursor-not-allowed" ${currentIndex <= 0 ? 'disabled' : ''}>
                <i class="fa-solid fa-chevron-left mr-1"></i> ${prevText}
            </button>
            <span class="text-xs text-slate-600 dark:text-slate-400 font-medium">
                ${currentIndex + 1} / ${chat.messages.length}
            </span>
            <button id="chat-next-btn" class="px-3 py-1.5 text-xs font-bold bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-500/20 hover:text-brand-600 dark:hover:text-brand-400 transition disabled:opacity-50 disabled:cursor-not-allowed" ${currentIndex >= chat.messages.length - 1 ? 'disabled' : ''}>
                ${nextText} <i class="fa-solid fa-chevron-right ml-1"></i>
            </button>
        </div>
    `;
    
    const outputContainer = els.outputContainer;
    if (outputContainer) {
        outputContainer.insertAdjacentHTML('afterbegin', navHTML);
        
        const prevBtn = document.getElementById('chat-prev-btn');
        const nextBtn = document.getElementById('chat-next-btn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentMessageIndex = currentIndex - 1;
                    renderChatMessages(chat, currentMessageIndex);
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentIndex < chat.messages.length - 1) {
                    currentMessageIndex = currentIndex + 1;
                    renderChatMessages(chat, currentMessageIndex);
                }
            });
        }
    }
}

function removeChatNavigation() {
    const nav = document.getElementById('chat-navigation');
    if (nav) {
        nav.remove();
    }
}

function renderOutput(data, lang) {
    els.emptyState.classList.add('hidden'); 
    els.outputContainer.classList.remove('hidden');
    
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
    const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            if (el.classList.contains('toolbar-btn-icon')) {
                el.title = t[key];
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
    
    if (els.formatCodeBtn) els.formatCodeBtn.title = t.formatCode || 'Format Code';
    if (els.uploadFileBtn) els.uploadFileBtn.title = t.uploadFile || 'Upload File';
    if (els.downloadFileBtn) els.downloadFileBtn.title = t.downloadFile || 'Download File';
    if (els.versionHistoryBtn) els.versionHistoryBtn.title = t.versionHistory || 'Version History';
    if (els.copyInputBtn) els.copyInputBtn.title = t.copyCode || 'Copy Code';
    const clearBtn = document.getElementById('clear-input-btn');
    if (clearBtn) clearBtn.title = t.clearEditor || 'Clear Editor';
    
    if (els.input) els.input.placeholder = t.placeholder || "// Paste code here...";
    if (els.wishes) els.wishes.placeholder = t.wishesPlaceholder || "Additional wishes...";
    
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
    // Create new chat
    const newChatId = 'chat_' + Date.now();
    chats[newChatId] = {
        id: newChatId,
        messages: [],
        createdAt: Date.now()
    };
    currentChatId = newChatId;
    currentMessageIndex = -1;
    
    // Save chats
    try {
        localStorage.setItem('fixly_chats', JSON.stringify(chats));
        localStorage.setItem('fixly_current_chat_id', currentChatId);
    } catch (e) {}
    
    // Clear UI
    els.input.value = ''; 
    els.wishes.value = ''; 
    els.outputContainer.classList.add('hidden'); 
    els.emptyState.classList.remove('hidden'); 
    els.tabPreview.classList.add('hidden'); 
    localStorage.removeItem('fixly_draft'); 
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
    history.unshift(item);
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
    
    history.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = "p-3 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 hover:border-brand-500 mb-2 transition-colors relative group";
        div.setAttribute('role', 'button');
        div.setAttribute('tabindex', '0');
        div.setAttribute('aria-label', `History item ${index + 1}: ${item.mode} mode`);
        
        const contentDiv = document.createElement('div');
        contentDiv.className = "cursor-pointer";
        contentDiv.onclick = () => {
            els.input.value = item.input;
            els.langSelect.value = item.lang;
            setMode(item.mode);
            renderOutput(item.output, item.lang);
            updateLineNumbers();
            els.input.focus();
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
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 hover:text-red-600 dark:hover:text-red-400";
        deleteBtn.setAttribute('aria-label', 'Delete this history item');
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can text-xs"></i>';
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            showDeleteChatDialog(index);
        };
        
        contentDiv.innerHTML = `
            <div class="flex justify-between mb-1">
                <span class="font-mono text-[10px] text-slate-400">${escapeHtml(item.time)}</span>
                <span class="text-[10px] font-bold text-brand-600 dark:text-brand-400">${escapeHtml(item.mode)}</span>
            </div>
            <div class="text-xs truncate text-slate-500 dark:text-slate-400">${escapeHtml(item.input.substring(0, 30))}...</div>
        `;
        
        div.appendChild(contentDiv);
        div.appendChild(deleteBtn);
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
    const uiLang = window.currentLang || localStorage.getItem('fixly_lang') || 'en';
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
    if (!activeFile || !els.input.value.trim()) return;
    
    const content = els.input.value;
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

function showVersionHistory() {
    // Show chat messages if we have a current chat, otherwise show file versions
    if (currentChatId && chats[currentChatId] && chats[currentChatId].messages.length > 0) {
        // Show chat messages navigation
        renderChatVersionHistory();
    } else if (activeFile && fileVersions[activeFile] && fileVersions[activeFile].length > 0) {
        // Show file versions
        els.versionHistoryDialog.classList.remove('hidden');
        els.versionHistoryDialog.classList.add('flex');
        renderVersionHistory();
        setTimeout(() => {
            els.versionHistoryDialogContent.classList.add('dialog-open');
        }, 10);
    } else {
        const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
        alert(t.noVersions || 'No saved versions');
    }
}

function renderChatVersionHistory() {
    if (!currentChatId || !chats[currentChatId]) return;
    
    const chat = chats[currentChatId];
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    
    els.versionHistoryList.innerHTML = '';
    
    if (chat.messages.length === 0) {
        els.versionHistoryList.innerHTML = `<div class="text-center text-slate-400 py-4">${t.noVersions || 'No messages'}</div>`;
        return;
    }
    
    const messages = chat.messages.slice().reverse(); // Show newest first
    
    messages.forEach((message, index) => {
        const item = document.createElement('div');
        item.className = 'version-item cursor-pointer';
        const date = new Date(message.timestamp);
        const modeNames = {
            'debug': '🐛 Debug',
            'optimize': '⚡ Optimize',
            'explain': '📖 Explain',
            'review': '🔍 Review',
            'security': '🔒 Security',
            'refactor': '♻️ Refactor',
            'document': '📝 Document',
            'convert': '🔄 Convert',
            'format': '✨ Format',
            'test': '🧪 Test'
        };
        const modeName = modeNames[message.mode] || message.mode;
        
        item.innerHTML = `
            <div class="flex justify-between items-center">
                <div class="flex-1">
                    <div class="text-sm font-semibold text-slate-800 dark:text-white">${modeName} - ${message.time}</div>
                    <div class="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">${message.input.substring(0, 60)}${message.input.length > 60 ? '...' : ''}</div>
                </div>
                <button class="px-3 py-1 text-xs bg-brand-600 hover:bg-brand-500 text-white rounded-lg transition ml-2" onclick="loadChatMessage(${messages.length - 1 - index})">
                    ${t.restoreVersion || 'View'}
                </button>
            </div>
        `;
        els.versionHistoryList.appendChild(item);
    });
    
    els.versionHistoryDialog.classList.remove('hidden');
    els.versionHistoryDialog.classList.add('flex');
    setTimeout(() => {
        els.versionHistoryDialogContent.classList.add('dialog-open');
    }, 10);
}

function loadChatMessage(index) {
    if (!currentChatId || !chats[currentChatId] || !chats[currentChatId].messages[index]) return;
    
    currentMessageIndex = index;
    renderChatMessages(chats[currentChatId], index);
    closeVersionHistory();
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
        item.className = 'version-item';
        const date = new Date(version.timestamp);
        item.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                    <div class="text-sm font-semibold text-slate-800 dark:text-white">Version ${versions.length - index}</div>
                    <div class="text-xs text-slate-500 dark:text-slate-400">${date.toLocaleString()}</div>
                </div>
                <button class="px-3 py-1 text-xs bg-brand-600 hover:bg-brand-500 text-white rounded-lg transition" onclick="restoreVersion(${versions.length - 1 - index})">
                    ${t.restoreVersion || 'Restore'}
                </button>
            </div>
        `;
        els.versionHistoryList.appendChild(item);
    });
}

function restoreVersion(index) {
    if (!activeFile || !fileVersions[activeFile] || !fileVersions[activeFile][index]) return;
    
    const version = fileVersions[activeFile][index];
    els.input.value = version.content;
    updateLineNumbers();
    closeVersionHistory();
}

function closeVersionHistory() {
    els.versionHistoryDialogContent.classList.remove('dialog-open');
    setTimeout(() => {
        els.versionHistoryDialog.classList.add('hidden');
        els.versionHistoryDialog.classList.remove('flex');
    }, 300);
}

// Update input handler to save to current file
// Note: This replaces the existing input listener, so we need to preserve the original
const originalInputHandler = () => {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        localStorage.setItem('fixly_draft', els.input.value);
    }, 500);
    updateLineNumbers();
};

// Enhanced input handler
els.input.removeEventListener('input', originalInputHandler);
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