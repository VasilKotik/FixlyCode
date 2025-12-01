const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// CORS configuration - secure but permissive for Vercel
app.use(cors({
    origin: '*',
    credentials: false,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept']
}));

// Handle preflight OPTIONS requests
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    res.sendStatus(200);
});

// Body parser with size limit
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Request validation middleware
const validateRequest = (req, res, next) => {
    const { code, mode, lang, model, wishes } = req.body;

    // Validate required fields
    if (!code || typeof code !== 'string') {
        return res.status(400).json({ 
            error: 'Missing or invalid code field',
            message: 'Code is required and must be a string'
        });
    }

    if (!code.trim()) {
        return res.status(400).json({ 
            error: 'Empty code',
            message: 'Code cannot be empty'
        });
    }

    if (!model || typeof model !== 'string' || !model.trim()) {
        return res.status(400).json({ 
            error: 'Missing or invalid model field',
            message: 'Model is required and must be a valid string'
        });
    }

    // Validate optional fields
    if (mode && typeof mode !== 'string') {
        return res.status(400).json({ 
            error: 'Invalid mode field',
            message: 'Mode must be a string'
        });
    }

    if (lang && typeof lang !== 'string') {
        return res.status(400).json({ 
            error: 'Invalid lang field',
            message: 'Language must be a string'
        });
    }

    if (wishes && typeof wishes !== 'string') {
        return res.status(400).json({ 
            error: 'Invalid wishes field',
            message: 'Wishes must be a string'
        });
    }

    // Validate convert fields if in convert mode
    const convertFrom = req.body.convertFrom;
    const convertTo = req.body.convertTo;
    if (mode === 'convert') {
        if (convertFrom && typeof convertFrom !== 'string') {
            return res.status(400).json({ 
                error: 'Invalid convertFrom field',
                message: 'convertFrom must be a string'
            });
        }
        if (convertTo && typeof convertTo !== 'string') {
            return res.status(400).json({ 
                error: 'Invalid convertTo field',
                message: 'convertTo must be a string'
            });
        }
    }

    // Sanitize input
    req.body.code = code.trim();
    req.body.model = model.trim();
    req.body.mode = (mode && typeof mode === 'string') ? mode.trim() : 'debug';
    req.body.lang = (lang && typeof lang === 'string') ? lang.trim() : 'en';
    req.body.wishes = (wishes && typeof wishes === 'string') ? wishes.trim() : '';
    req.body.convertFrom = (convertFrom && typeof convertFrom === 'string') ? convertFrom.trim() : null;
    req.body.convertTo = (convertTo && typeof convertTo === 'string') ? convertTo.trim() : null;

    next();
};

// Task mapping with translations
const TASK_MAP = {
    'debug': {
        'en': 'Fix bugs and errors in the code.',
        'uk': 'Виправте помилки та баги в коді.',
        'ru': 'Исправьте ошибки и баги в коде.',
        'pl': 'Napraw błędy w kodzie.',
        'de': 'Beheben Sie Fehler im Code.',
        'es': 'Corrija errores y bugs en el código.'
    },
    'optimize': {
        'en': 'Optimize code for performance, readability, and best practices.',
        'uk': 'Оптимізуйте код для продуктивності, читабельності та найкращих практик.',
        'ru': 'Оптимизируйте код для производительности, читаемости и лучших практик.',
        'pl': 'Zoptymalizuj kod pod kątem wydajności, czytelności i najlepszych praktyk.',
        'de': 'Optimieren Sie den Code für Leistung, Lesbarkeit und Best Practices.',
        'es': 'Optimice el código para rendimiento, legibilidad y mejores prácticas.'
    },
    'explain': {
        'en': 'Analyze the code thoroughly and explain: 1) What the code does and its purpose, 2) Identify ALL bugs, errors, and potential issues with clear explanations, 3) Explain WHERE each problem is located (specific lines/functions), 4) Explain WHY each problem occurs, 5) Provide step-by-step solutions on HOW to fix each issue. Make explanations clear and easy to understand for beginners.',
        'uk': 'Проаналізуйте код детально та поясніть: 1) Що робить код та його призначення, 2) Виявіть ВСІ помилки, баги та потенційні проблеми з чіткими поясненнями, 3) Поясніть ДЕ знаходиться кожна проблема (конкретні рядки/функції), 4) Поясніть ЧОМУ виникає кожна проблема, 5) Надайте покрокові рішення ЯК виправити кожну проблему. Зробіть пояснення зрозумілими для початківців.',
        'ru': 'Проанализируйте код детально и объясните: 1) Что делает код и его назначение, 2) Выявите ВСЕ ошибки, баги и потенциальные проблемы с четкими объяснениями, 3) Объясните ГДЕ находится каждая проблема (конкретные строки/функции), 4) Объясните ПОЧЕМУ возникает каждая проблема, 5) Предоставьте пошаговые решения КАК исправить каждую проблему. Сделайте объяснения понятными для начинающих.',
        'pl': 'Przeanalizuj kod szczegółowo i wyjaśnij: 1) Co robi kod i jego cel, 2) Zidentyfikuj WSZYSTKIE błędy, bugi i potencjalne problemy z jasnymi wyjaśnieniami, 3) Wyjaśnij GDZIE znajduje się każdy problem (konkretne linie/funkcje), 4) Wyjaśnij DLACZEGO występuje każdy problem, 5) Podaj krok po kroku rozwiązania JAK naprawić każdy problem. Uczyń wyjaśnienia zrozumiałymi dla początkujących.',
        'de': 'Analysieren Sie den Code gründlich und erklären Sie: 1) Was der Code tut und sein Zweck, 2) Identifizieren Sie ALLE Fehler, Bugs und potenzielle Probleme mit klaren Erklärungen, 3) Erklären Sie, WO sich jedes Problem befindet (spezifische Zeilen/Funktionen), 4) Erklären Sie, WARUM jedes Problem auftritt, 5) Geben Sie Schritt-für-Schritt-Lösungen an, WIE jedes Problem behoben werden kann. Machen Sie Erklärungen klar und verständlich für Anfänger.',
        'es': 'Analice el código a fondo y explique: 1) Qué hace el código y su propósito, 2) Identifique TODOS los errores, bugs y problemas potenciales con explicaciones claras, 3) Explique DÓNDE se encuentra cada problema (líneas/funciones específicas), 4) Explique POR QUÉ ocurre cada problema, 5) Proporcione soluciones paso a paso sobre CÓMO corregir cada problema. Haga las explicaciones claras y fáciles de entender para principiantes.'
    },
    'review': {
        'en': 'Perform comprehensive code review: check for bugs, security issues, best practices, and provide improvement suggestions.',
        'uk': 'Проведіть комплексний огляд коду: перевірте на помилки, проблеми безпеки, найкращі практики та надайте пропозиції щодо покращення.',
        'ru': 'Проведите комплексный обзор кода: проверьте на ошибки, проблемы безопасности, лучшие практики и предоставьте предложения по улучшению.',
        'pl': 'Przeprowadź kompleksowy przegląd kodu: sprawdź błędy, problemy bezpieczeństwa, najlepsze praktyki i zaproponuj ulepszenia.',
        'de': 'Führen Sie eine umfassende Code-Überprüfung durch: Prüfen Sie auf Fehler, Sicherheitsprobleme, Best Practices und geben Sie Verbesserungsvorschläge.',
        'es': 'Realice una revisión exhaustiva del código: verifique errores, problemas de seguridad, mejores prácticas y proporcione sugerencias de mejora.'
    },
    'security': {
        'en': 'Analyze code for security vulnerabilities, potential exploits, and security best practices.',
        'uk': 'Проаналізуйте код на вразливості безпеки, потенційні експлойти та найкращі практики безпеки.',
        'ru': 'Проанализируйте код на уязвимости безопасности, потенциальные эксплойты и лучшие практики безопасности.',
        'pl': 'Przeanalizuj kod pod kątem luk bezpieczeństwa, potencjalnych exploitów i najlepszych praktyk bezpieczeństwa.',
        'de': 'Analysieren Sie den Code auf Sicherheitslücken, potenzielle Exploits und Sicherheitsbest Practices.',
        'es': 'Analice el código en busca de vulnerabilidades de seguridad, posibles exploits y mejores prácticas de seguridad.'
    },
    'refactor': {
        'en': 'Refactor code to improve structure, maintainability, and design patterns while preserving functionality.',
        'uk': 'Рефакторинг коду для покращення структури, підтримуваності та патернів проектування зі збереженням функціональності.',
        'ru': 'Рефакторинг кода для улучшения структуры, поддерживаемости и паттернов проектирования с сохранением функциональности.',
        'pl': 'Refaktoryzuj kod, aby poprawić strukturę, utrzymywalność i wzorce projektowe, zachowując funkcjonalność.',
        'de': 'Refaktorisieren Sie den Code, um Struktur, Wartbarkeit und Entwurfsmuster zu verbessern, während die Funktionalität erhalten bleibt.',
        'es': 'Refactorice el código para mejorar la estructura, mantenibilidad y patrones de diseño preservando la funcionalidad.'
    },
    'document': {
        'en': 'Generate comprehensive documentation: comments, docstrings, and usage examples.',
        'uk': 'Створіть комплексну документацію: коментарі, docstrings та приклади використання.',
        'ru': 'Создайте комплексную документацию: комментарии, docstrings и примеры использования.',
        'pl': 'Wygeneruj kompleksową dokumentację: komentarze, docstrings i przykłady użycia.',
        'de': 'Erstellen Sie umfassende Dokumentation: Kommentare, Docstrings und Verwendungsbeispiele.',
        'es': 'Genere documentación completa: comentarios, docstrings y ejemplos de uso.'
    },
    'convert': {
        'en': 'Convert code to another programming language or framework.',
        'uk': 'Конвертуйте код в іншу мову програмування або фреймворк.',
        'ru': 'Конвертируйте код в другой язык программирования или фреймворк.',
        'pl': 'Konwertuj kod na inny język programowania lub framework.',
        'de': 'Konvertieren Sie den Code in eine andere Programmiersprache oder ein Framework.',
        'es': 'Convierta el código a otro lenguaje de programación o framework.'
    },
    'format': {
        'en': 'Format and style code according to language-specific conventions and best practices.',
        'uk': 'Відформатуйте та стилізуйте код відповідно до специфічних для мови конвенцій та найкращих практик.',
        'ru': 'Отформатируйте и стилизуйте код в соответствии с соглашениями и лучшими практиками для языка.',
        'pl': 'Sformatuj i ostyluj kod zgodnie z konwencjami i najlepszymi praktykami dla danego języka.',
        'de': 'Formatieren und stylen Sie den Code gemäß sprachspezifischen Konventionen und Best Practices.',
        'es': 'Formatee y estilice el código según las convenciones y mejores prácticas específicas del lenguaje.'
    },
    'test': {
        'en': 'Generate comprehensive unit tests, integration tests, and test cases.',
        'uk': 'Створіть комплексні модульні тести, інтеграційні тести та тестові випадки.',
        'ru': 'Создайте комплексные модульные тесты, интеграционные тесты и тестовые случаи.',
        'pl': 'Wygeneruj kompleksowe testy jednostkowe, testy integracyjne i przypadki testowe.',
        'de': 'Generieren Sie umfassende Unit-Tests, Integrationstests und Testfälle.',
        'es': 'Genere pruebas unitarias completas, pruebas de integración y casos de prueba.'
    }
};

// Language mapping
const getTargetLangName = (lang) => {
    const langMap = {
        'uk': 'Ukrainian',
        'en': 'English',
        'pl': 'Polish',
        'de': 'German',
        'es': 'Spanish',
        'ru': 'Russian'
    };
    return langMap[lang] || 'English';
};

// Main API endpoint - handle both root and /api/ai-request paths for Vercel
app.post(['/', '/api/ai-request'], validateRequest, async (req, res) => {
    try {
        const { code, mode, lang, model, wishes, convertFrom, convertTo } = req.body;

        const isOpenRouter = model.includes('/');
        
        // Build prompt with language-specific task description
        const taskMapEntry = TASK_MAP[mode] || TASK_MAP['debug'];
        let taskDescription;
        
        if (typeof taskMapEntry === 'object') {
            // New format with translations
            taskDescription = taskMapEntry[lang] || taskMapEntry['en'] || 'Process code.';
        } else {
            // Fallback for old format (shouldn't happen, but just in case)
            taskDescription = taskMapEntry || 'Process code.';
        }
        
        const targetLangName = getTargetLangName(lang);
        const wishesText = wishes ? `User Wishes: ${wishes} ` : '';
        
        // Create strong language instruction based on selected language
        const languageInstructions = {
            'uk': 'ВАЖЛИВО: Відповідай ВИКЛЮЧНО українською мовою. Усі тексти (explanation, tip, smells) мають бути українською. Код залишається без змін.',
            'ru': 'ВАЖНО: Отвечай ИСКЛЮЧИТЕЛЬНО на русском языке. Все тексты (explanation, tip, smells) должны быть на русском. Код остается без изменений.',
            'pl': 'WAŻNE: Odpowiadaj WYŁĄCZNIE po polsku. Wszystkie teksty (explanation, tip, smells) muszą być po polsku. Kod pozostaje bez zmian.',
            'de': 'WICHTIG: Antworte AUSSCHLIESSLICH auf Deutsch. Alle Texte (explanation, tip, smells) müssen auf Deutsch sein. Code bleibt unverändert.',
            'es': 'IMPORTANTE: Responde EXCLUSIVAMENTE en español. Todos los textos (explanation, tip, smells) deben estar en español. El código permanece sin cambios.',
            'en': 'IMPORTANT: Respond EXCLUSIVELY in English. All texts (explanation, tip, smells) must be in English. Code remains unchanged.'
        };
        
        const langInstruction = languageInstructions[lang] || languageInstructions['en'];
        
        // Create language-specific examples for better enforcement
        const languageExamples = {
            'uk': {
                explanation: 'Цей код містить помилку в логіці перевірки. Умова `if (x > 0)` не враховує випадок, коли `x` дорівнює нулю.',
                tip: 'Рекомендую додати перевірку на нульове значення та обробити цей випадок окремо.',
                smell: 'Відсутня обробка крайових випадків',
                fullExample: `{
  "fixedCode": "if (x > 0) { return x * 2; } else if (x === 0) { return 0; } else { return null; }",
  "explanation": "АНАЛІЗ КОДУ:\\n\\n1. ПРИЗНАЧЕННЯ: Цей код перевіряє значення змінної x та повертає результат залежно від умови.\\n\\n2. ПРОБЛЕМА (рядок 1): Умова \`if (x > 0)\` перевіряє лише позитивні значення, але не враховує випадок, коли x = 0.\\n\\n3. ЧОМУ ЦЕ ПРОБЛЕМА: Коли x дорівнює нулю, функція не поверне жодного значення (undefined), що може призвести до помилок у коді, який використовує результат цієї функції.\\n\\n4. ДЕ ПОМИЛКА: У рядку з умовою \`if (x > 0)\` відсутня обробка нульового значення.\\n\\n5. ЯК ВИПРАВИТИ: Додайте перевірку \`else if (x === 0)\` для обробки нульового значення та поверніть відповідне значення (0). Також додайте \`else\` для обробки від'ємних значень.",
  "tip": "Завжди перевіряйте крайові випадки (0, null, undefined, порожні рядки) при написанні умовних операторів. Це допомагає уникнути несподіваної поведінки програми та потенційних помилок.",
  "score": 75,
  "smells": ["Відсутня обробка крайових випадків", "Недостатня перевірка вхідних даних", "Потенційна помилка при обробці нульового значення"]
}`
            },
            'ru': {
                explanation: 'Этот код содержит ошибку в логике проверки. Условие `if (x > 0)` не учитывает случай, когда `x` равно нулю.',
                tip: 'Рекомендую добавить проверку на нулевое значение и обработать этот случай отдельно.',
                smell: 'Отсутствует обработка граничных случаев',
                fullExample: `{
  "fixedCode": "if (x > 0) { return x * 2; } else if (x === 0) { return 0; } else { return null; }",
  "explanation": "АНАЛИЗ КОДА:\\n\\n1. НАЗНАЧЕНИЕ: Этот код проверяет значение переменной x и возвращает результат в зависимости от условия.\\n\\n2. ПРОБЛЕМА (строка 1): Условие \`if (x > 0)\` проверяет только положительные значения, но не учитывает случай, когда x = 0.\\n\\n3. ПОЧЕМУ ЭТО ПРОБЛЕМА: Когда x равно нулю, функция не вернет никакого значения (undefined), что может привести к ошибкам в коде, который использует результат этой функции.\\n\\n4. ГДЕ ОШИБКА: В строке с условием \`if (x > 0)\` отсутствует обработка нулевого значения.\\n\\n5. КАК ИСПРАВИТЬ: Добавьте проверку \`else if (x === 0)\` для обработки нулевого значения и верните соответствующее значение (0). Также добавьте \`else\` для обработки отрицательных значений.",
  "tip": "Всегда проверяйте граничные случаи (0, null, undefined, пустые строки) при написании условных операторов. Это помогает избежать неожиданного поведения программы.",
  "score": 75,
  "smells": ["Отсутствует обработка граничных случаев", "Недостаточная проверка входных данных", "Потенциальная ошибка при обработке нулевого значения"]
}`
            },
            'pl': {
                explanation: 'Ten kod zawiera błąd w logice sprawdzania. Warunek `if (x > 0)` nie uwzględnia przypadku, gdy `x` jest równe zero.',
                tip: 'Zalecam dodanie sprawdzenia wartości zerowej i osobne obsłużenie tego przypadku.',
                smell: 'Brak obsługi przypadków brzegowych',
                fullExample: `{
  "fixedCode": "if (x > 0) { return x * 2; } else if (x === 0) { return 0; } else { return null; }",
  "explanation": "ANALIZA KODU:\\n\\n1. CEL: Ten kod sprawdza wartość zmiennej x i zwraca wynik w zależności od warunku.\\n\\n2. PROBLEM (linia 1): Warunek \`if (x > 0)\` sprawdza tylko wartości dodatnie, ale nie uwzględnia przypadku, gdy x = 0.\\n\\n3. DLACZEGO TO PROBLEM: Gdy x jest równe zero, funkcja nie zwróci żadnej wartości (undefined), co może spowodować błędy w kodzie, który używa wyniku tej funkcji.\\n\\n4. GDZIE BŁĄD: W linii z warunkiem \`if (x > 0)\` brakuje obsługi wartości zerowej.\\n\\n5. JAK NAPRAWIĆ: Dodaj sprawdzenie \`else if (x === 0)\` aby obsłużyć wartość zerową i zwróć odpowiednią wartość (0). Dodaj także \`else\` do obsługi wartości ujemnych.",
  "tip": "Zawsze sprawdzaj przypadki brzegowe (0, null, undefined, puste stringi) przy pisaniu operatorów warunkowych. To pomaga uniknąć nieoczekiwanego zachowania programu.",
  "score": 75,
  "smells": ["Brak obsługi przypadków brzegowych", "Niewystarczająca walidacja danych wejściowych"]
}`
            },
            'de': {
                explanation: 'Dieser Code enthält einen Fehler in der Prüflogik. Die Bedingung `if (x > 0)` berücksichtigt nicht den Fall, wenn `x` gleich null ist.',
                tip: 'Ich empfehle, eine Prüfung auf den Nullwert hinzuzufügen und diesen Fall separat zu behandeln.',
                smell: 'Fehlende Behandlung von Grenzfällen',
                fullExample: `{
  "fixedCode": "if (x > 0) { return x * 2; } else if (x === 0) { return 0; } else { return null; }",
  "explanation": "CODE-ANALYSE:\\n\\n1. ZWECK: Dieser Code prüft den Wert der Variablen x und gibt ein Ergebnis basierend auf der Bedingung zurück.\\n\\n2. PROBLEM (Zeile 1): Die Bedingung \`if (x > 0)\` prüft nur positive Werte, berücksichtigt aber nicht den Fall, wenn x = 0 ist.\\n\\n3. WARUM DAS EIN PROBLEM IST: Wenn x gleich null ist, gibt die Funktion keinen Wert zurück (undefined), was zu Fehlern im Code führen kann, der das Ergebnis dieser Funktion verwendet.\\n\\n4. WO DER FEHLER IST: In der Zeile mit der Bedingung \`if (x > 0)\` fehlt die Behandlung des Nullwerts.\\n\\n5. WIE MAN ES BEHEBT: Fügen Sie eine Prüfung \`else if (x === 0)\` hinzu, um den Nullwert zu behandeln und den entsprechenden Wert (0) zurückzugeben. Fügen Sie auch \`else\` hinzu, um negative Werte zu behandeln.",
  "tip": "Überprüfen Sie immer Grenzfälle (0, null, undefined, leere Strings) beim Schreiben von bedingten Operatoren. Dies hilft, unerwartetes Programmverhalten zu vermeiden.",
  "score": 75,
  "smells": ["Fehlende Behandlung von Grenzfällen", "Unzureichende Validierung der Eingabedaten"]
}`
            },
            'es': {
                explanation: 'Este código contiene un error en la lógica de verificación. La condición `if (x > 0)` no considera el caso cuando `x` es igual a cero.',
                tip: 'Recomiendo agregar una verificación para el valor cero y manejar este caso por separado.',
                smell: 'Falta manejo de casos límite',
                fullExample: `{
  "fixedCode": "if (x > 0) { return x * 2; } else if (x === 0) { return 0; } else { return null; }",
  "explanation": "ANÁLISIS DEL CÓDIGO:\\n\\n1. PROPÓSITO: Este código verifica el valor de la variable x y devuelve un resultado basado en la condición.\\n\\n2. PROBLEMA (línea 1): La condición \`if (x > 0)\` solo verifica valores positivos, pero no considera el caso cuando x = 0.\\n\\n3. POR QUÉ ES UN PROBLEMA: Cuando x es igual a cero, la función no devolverá ningún valor (undefined), lo que puede causar errores en el código que usa el resultado de esta función.\\n\\n4. DÓNDE ESTÁ EL ERROR: En la línea con la condición \`if (x > 0)\` falta el manejo del valor cero.\\n\\n5. CÓMO CORREGIRLO: Agregue una verificación \`else if (x === 0)\` para manejar el valor cero y devolver el valor apropiado (0). También agregue \`else\` para manejar valores negativos.",
  "tip": "Siempre verifique los casos límite (0, null, undefined, cadenas vacías) al escribir operadores condicionales. Esto ayuda a evitar comportamientos inesperados del programa.",
  "score": 75,
  "smells": ["Falta manejo de casos límite", "Validación insuficiente de datos de entrada"]
}`
            },
            'en': {
                explanation: 'This code contains an error in the checking logic. The condition `if (x > 0)` does not account for the case when `x` equals zero.',
                tip: 'I recommend adding a check for zero value and handling this case separately.',
                smell: 'Missing edge case handling',
                fullExample: `{
  "fixedCode": "if (x > 0) { return x * 2; } else if (x === 0) { return 0; } else { return null; }",
  "explanation": "CODE ANALYSIS:\\n\\n1. PURPOSE: This code checks the value of variable x and returns a result based on the condition.\\n\\n2. PROBLEM (line 1): The condition \`if (x > 0)\` only checks for positive values but doesn't account for when x = 0.\\n\\n3. WHY THIS IS A PROBLEM: When x equals zero, the function won't return any value (undefined), which can cause errors in code that uses this function's result.\\n\\n4. WHERE THE ERROR IS: In the line with condition \`if (x > 0)\`, there's no handling for zero value.\\n\\n5. HOW TO FIX: Add a check \`else if (x === 0)\` to handle zero value and return the appropriate value (0). Also add \`else\` to handle negative values.",
  "tip": "Always check edge cases (0, null, undefined, empty strings) when writing conditional operators. This helps avoid unexpected program behavior.",
  "score": 75,
  "smells": ["Missing edge case handling", "Insufficient input data validation"]
}`
            }
        };
        
        const examples = languageExamples[lang] || languageExamples['en'];
        
        // Create system message with EXTREME language enforcement - language comes FIRST
        const systemMessage = `🚨🚨🚨 RESPONSE LANGUAGE: ${targetLangName.toUpperCase()} (${lang}) - THIS IS THE MOST IMPORTANT RULE 🚨🚨🚨

YOU MUST WRITE ALL TEXT FIELDS IN ${targetLangName.toUpperCase()} LANGUAGE.
ENGLISH IS STRICTLY FORBIDDEN FOR: explanation, tip, smells fields.

EXAMPLE OF CORRECT ${targetLangName.toUpperCase()} RESPONSE:
${examples.fullExample}

You are a Senior Tech Lead code assistant.

Task: ${taskDescription}
${mode === 'convert' && convertFrom && convertTo ? `\nCONVERSION SPECIFICATIONS:\n- Convert FROM: ${convertFrom}\n- Convert TO: ${convertTo}\n- Preserve functionality and logic\n- Use idiomatic ${convertTo} code style\n- Add comments explaining conversion choices if needed\n` : ''}
${wishesText ? `Additional requirements: ${wishesText}` : ''}

${mode === 'explain' ? `
SPECIAL INSTRUCTIONS FOR EXPLAIN MODE:
- Provide a COMPREHENSIVE and DETAILED explanation that helps beginners understand the code
- If there are bugs or errors, clearly identify:
  * WHERE the problem is (line numbers, function names, variable names)
  * WHAT the problem is (describe the issue clearly)
  * WHY it happens (explain the root cause)
  * HOW to fix it (step-by-step solution)
- Use simple language and avoid overly technical jargon
- Structure your explanation logically: purpose → analysis → problems (if any) → solutions
- Make sure the explanation is educational and helps the user learn
` : ''}

OUTPUT FORMAT - Raw JSON only:
{
  "fixedCode": "CODE_STRING",
  "explanation": "TEXT_IN_${targetLangName.toUpperCase()}_ONLY",
  "tip": "TEXT_IN_${targetLangName.toUpperCase()}_ONLY",
  "score": INT(0-100),
  "smells": ["TEXT_IN_${targetLangName.toUpperCase()}_ONLY"]
}

CRITICAL: If you write English in explanation, tip, or smells, your response is WRONG. Use ${targetLangName} ONLY.`;

        // Language-specific reminders for user message
        const languageReminders = {
            'uk': `🚨 МОВА ВІДПОВІДІ: УКРАЇНСЬКА (uk)
⚠️ ВИ ОБОВ'ЯЗКОВО ПОВИННІ писати explanation, tip та smells ВИКЛЮЧНО українською мовою.
❌ АНГЛІЙСЬКА МОВА ЗАБОРОНЕНА для цих полів.
✅ ПРИКЛАД правильного формату:
- explanation: "${examples.explanation}"
- tip: "${examples.tip}"
- smells: ["${examples.smell}"]

Якщо ви напишете хоча б одне слово англійською в explanation, tip або smells - ваша відповідь НЕПРАВИЛЬНА.`,
            'ru': `🚨 ЯЗЫК ОТВЕТА: РУССКИЙ (ru)
⚠️ ВЫ ОБЯЗАНЫ писать explanation, tip и smells ИСКЛЮЧИТЕЛЬНО на русском языке.
❌ АНГЛИЙСКИЙ ЯЗЫК ЗАПРЕЩЕН для этих полей.
✅ ПРИМЕР правильного формата:
- explanation: "${examples.explanation}"
- tip: "${examples.tip}"
- smells: ["${examples.smell}"]

Если вы напишете хотя бы одно слово на английском в explanation, tip или smells - ваш ответ НЕПРАВИЛЬНЫЙ.`,
            'pl': `🚨 JĘZYK ODPOWIEDZI: POLSKI (pl)
⚠️ MUSISZ pisać explanation, tip i smells WYŁĄCZNIE po polsku.
❌ JĘZYK ANGIELSKI JEST ZABRONIONY dla tych pól.
✅ PRZYKŁAD poprawnego formatu:
- explanation: "${examples.explanation}"
- tip: "${examples.tip}"
- smells: ["${examples.smell}"]

Jeśli napiszesz choć jedno słowo po angielsku w explanation, tip lub smells - twoja odpowiedź jest NIEPRAWIDŁOWA.`,
            'de': `🚨 ANTWORTSPRACHE: DEUTSCH (de)
⚠️ SIE MÜSSEN explanation, tip und smells AUSSCHLIESSLICH auf Deutsch schreiben.
❌ ENGLISCH IST VERBOTEN für diese Felder.
✅ BEISPIEL für das richtige Format:
- explanation: "${examples.explanation}"
- tip: "${examples.tip}"
- smells: ["${examples.smell}"]

Wenn Sie auch nur ein Wort auf Englisch in explanation, tip oder smells schreiben - Ihre Antwort ist FALSCH.`,
            'es': `🚨 IDIOMA DE RESPUESTA: ESPAÑOL (es)
⚠️ DEBES escribir explanation, tip y smells EXCLUSIVAMENTE en español.
❌ EL INGLÉS ESTÁ PROHIBIDO para estos campos.
✅ EJEMPLO del formato correcto:
- explanation: "${examples.explanation}"
- tip: "${examples.tip}"
- smells: ["${examples.smell}"]

Si escribes al menos una palabra en inglés en explanation, tip o smells - tu respuesta es INCORRECTA.`,
            'en': `🚨 RESPONSE LANGUAGE: ENGLISH (en)
⚠️ You MUST write explanation, tip, and smells EXCLUSIVELY in English.
✅ EXAMPLE of correct format:
- explanation: "${examples.explanation}"
- tip: "${examples.tip}"
- smells: ["${examples.smell}"]`
        };
        
        const languageReminder = languageReminders[lang] || languageReminders['en'];
        
        // User message with code and strong language reminder
        const userMessage = `${wishesText ? `User Wishes: ${wishesText}\n\n` : ''}Code to process:\n\`\`\`\n${code}\n\`\`\`

${languageReminder}`;

        let url, headers, body;

        if (isOpenRouter) {
            // OpenRouter API
            const apiKey = process.env.OPENROUTER_API_KEY;
            if (!apiKey) {
                return res.status(500).json({ 
                    error: 'Server configuration error',
                    message: 'OpenRouter API key not configured'
                });
            }

            url = "https://openrouter.ai/api/v1/chat/completions";
            headers = {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": req.headers.referer || req.headers.origin || "https://fixlycode.vercel.app",
                "X-Title": "FixlyCode"
            };

            const supportsJsonMode = model.includes('llama') || 
                                   model.includes('gemma') || 
                                   model.includes('qwen') || 
                                   model.includes('phi-3');
            
            // Create few-shot example messages for better language adherence
            const fewShotExample = {
                role: "assistant",
                content: examples.fullExample
            };
            
            const exampleUserMessage = {
                role: "user",
                content: `Code to process:\n\`\`\`\nfunction test() { return x; }\n\`\`\`\n\n${languageReminder}`
            };
            
            body = JSON.stringify({
                model: model,
                messages: [
                    { role: "system", content: systemMessage },
                    exampleUserMessage,
                    fewShotExample,
                    { role: "user", content: userMessage }
                ],
                temperature: 0.1, // Very low temperature for strict instruction following
                max_tokens: 4000,
                ...(supportsJsonMode && { response_format: { type: "json_object" } })
            });
        } else {
            // Google Gemini API
            const apiKey = process.env.GEMINI_API_KEY;
            if (!apiKey) {
                return res.status(500).json({ 
                    error: 'Server configuration error',
                    message: 'Gemini API key not configured'
                });
            }

            // For Gemini, combine system instruction with user message and add example
            const geminiSystemInstruction = `${systemMessage}

EXAMPLE OF CORRECT RESPONSE IN ${targetLangName.toUpperCase()}:
${examples.fullExample}

REMEMBER: ALL text fields (explanation, tip, smells) MUST be in ${targetLangName}. English is FORBIDDEN.`;

            const geminiUserContent = `${wishesText ? `User Wishes: ${wishesText}\n\n` : ''}Code to process:\n\`\`\`\n${code}\n\`\`\`

${languageReminder}

IMPORTANT: Respond in ${targetLangName} (${lang}) language. Use the example above as a reference.`;

            url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
            headers = { 
                'Content-Type': 'application/json'
            };
            body = JSON.stringify({
                contents: [{ parts: [{ text: geminiUserContent }] }],
                systemInstruction: { parts: [{ text: geminiSystemInstruction }] },
                generationConfig: {
                    responseMimeType: "application/json",
                    temperature: 0.1, // Very low temperature for strict instruction following
                    topP: 0.95,
                    topK: 40
                }
            });
        }

        // Make API request with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000);

        let response;
        try {
            response = await fetch(url, {
                method: 'POST',
                headers,
                body,
                signal: controller.signal
            });
        } catch (fetchError) {
            clearTimeout(timeoutId);
            if (fetchError.name === 'AbortError') {
                return res.status(504).json({ 
                    error: 'Request timeout',
                    message: 'The AI API request took too long to complete'
                });
            }
            throw fetchError;
        }

        clearTimeout(timeoutId);

        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch (e) {
                errorData = {};
            }
            
            let errMsg = response.statusText;
            
            if (errorData.error) {
                errMsg = errorData.error.message || 
                        errorData.error.error?.message || 
                        JSON.stringify(errorData.error);
            }

            // Map common error codes
            if (response.status === 401) {
                errMsg = "Authentication failed. Please check API keys configuration.";
            } else if (response.status === 429) {
                errMsg = "Rate limit exceeded. Please try again later.";
            } else if (response.status === 400) {
                errMsg = "Invalid request: " + (errorData.error?.message || errMsg);
            } else if (response.status === 404) {
                errMsg = "Model not found or unavailable.";
            } else if (response.status >= 500) {
                errMsg = "AI service error. Please try again later.";
            }

            return res.status(response.status).json({
                error: errMsg,
                status: response.status,
                message: errMsg
            });
        }

        // Parse response
        let data;
        try {
            data = await response.json();
        } catch (e) {
            return res.status(500).json({ 
                error: 'Invalid JSON response from AI API',
                message: 'The AI service returned invalid data'
            });
        }

        // Extract text based on API type
        let rawText = "";
        
        if (isOpenRouter) {
            if (!data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
                return res.status(500).json({ 
                    error: 'Invalid response structure from OpenRouter API',
                    message: 'Response missing choices array'
                });
            }
            
            const message = data.choices[0]?.message;
            if (!message || !message.content) {
                return res.status(500).json({ 
                    error: 'Invalid response structure from OpenRouter API',
                    message: 'Response missing message content'
                });
            }
            
            rawText = message.content || "";
        } else {
            // Gemini API
            if (!data.candidates || !Array.isArray(data.candidates) || data.candidates.length === 0) {
                return res.status(500).json({ 
                    error: 'Invalid response structure from Gemini API',
                    message: 'Response missing candidates array'
                });
            }
            
            const candidate = data.candidates[0];
            if (!candidate || !candidate.content || !candidate.content.parts) {
                return res.status(500).json({ 
                    error: 'Invalid response structure from Gemini API',
                    message: 'Response missing content parts'
                });
            }
            
            rawText = candidate.content.parts[0]?.text || "";
        }

        if (!rawText || rawText.trim().length === 0) {
            return res.status(500).json({ 
                error: 'Empty response from AI model',
                message: 'The AI model returned no content'
            });
        }

        // Return successful response
        res.json({
            success: true,
            rawText: rawText.trim(),
            model: model
        });

    } catch (error) {
        console.error('API Error:', error);
        
        if (error.name === 'AbortError') {
            return res.status(504).json({ 
                error: 'Request timeout',
                message: 'The request took too long to complete'
            });
        }

        res.status(500).json({ 
            error: 'Internal server error',
            message: error.message || 'An unexpected error occurred'
        });
    }
});

// Health check endpoint - handle both paths
app.get(['/', '/api/ai-request'], (req, res) => {
    res.json({ 
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'FixlyCode API'
    });
});

// Export for Vercel Serverless Functions
module.exports = app;
