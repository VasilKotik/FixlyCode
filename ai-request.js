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
'debug': {
    'en': 'Analyze the code for bugs and errors. Fix them to ensure correct functionality and prevent runtime issues.',
        'uk': 'Проаналізуйте код на наявність помилок та багів. Виправте їх для забезпечення правильної роботи програми.',
            'ru': 'Проанализируйте код на наличие ошибок и багов. Исправьте их для обеспечения правильной работы программы.',
                'pl': 'Przeanalizuj kod pod kątem błędów. Napraw je, aby zapewnić poprawne działanie programu.',
                    'de': 'Analysieren Sie den Code auf Fehler. Beheben Sie diese, um die korrekte Funktionalität sicherzustellen.',
                        'es': 'Analice el código en busca de errores. Corríjalos para asegurar el funcionamiento correcto del programa.'
},
'optimize': {
    'en': 'Optimize the code for better performance, memory usage, readability, and adherence to best practices.',
        'uk': 'Оптимізуйте код для кращої продуктивності, використання пам\'яті, читабельності та дотримання найкращих практик.',
            'ru': 'Оптимизируйте код для лучшей производительности, использования памяти, читаемости и соблюдения лучших практик.',
                'pl': 'Zoptymalizuj kod pod kątem lepszej wydajności, zużycia pamięci, czytelności i przestrzegania najlepszych praktyk.',
                    'de': 'Optimieren Sie den Code für bessere Leistung, Speichernutzung, Lesbarkeit und Einhaltung von Best Practices.',
                        'es': 'Optimice el código para un mejor rendimiento, uso de memoria, legibilidad y cumplimiento de las mejores prácticas.'
},
'explain': {
    'en': 'Explain the code\'s logic, purpose, and functionality in detail. Break down complex parts for clarity.',
        'uk': 'Детально поясніть логіку, призначення та функціональність коду. Розбийте складні частини для кращого розуміння.',
            'ru': 'Подробно объясните логику, назначение и функциональность кода. Разбейте сложные части для лучшего понимания.',
                'pl': 'Szczegółowo wyjaśnij logikę, cel i funkcjonalność kodu. Rozbij skomplikowane części dla jasności.',
                    'de': 'Erklären Sie die Logik, den Zweck und die Funktionalität des Codes im Detail. Gliedern Sie komplexe Teile zur Klarheit.',
                        'es': 'Explique la lógica, el propósito y la funcionalidad del código en detalle. Desgloselo para mayor claridad.'
},
'review': {
    'en': 'Conduct a comprehensive code review. Identify bugs, security risks, and style issues. Suggest specific improvements.',
        'uk': 'Проведіть комплексний огляд коду. Виявіть помилки, ризики безпеки та проблеми зі стилем. Запропонуйте конкретні покращення.',
            'ru': 'Проведите комплексный обзор кода. Выявите ошибки, риски безопасности и проблемы со стилем. Предложите конкретные улучшения.',
                'pl': 'Przeprowadź kompleksowy przegląd kodu. Zidentyfikuj błędy, ryzyka bezpieczeństwa i problemy ze stylem. Zaproponuj konkretne ulepszenia.',
                    'de': 'Führen Sie eine umfassende Code-Überprüfung durch. Identifizieren Sie Fehler, Sicherheitsrisiken und Stilprobleme. Schlagen Sie konkrete Verbesserungen vor.',
                        'es': 'Realice una revisión exhaustiva del código. Identifique errores, riesgos de seguridad y problemas de estilo. Sugiera mejoras específicas.'
},
'security': {
    'en': 'Analyze the code for security vulnerabilities and potential exploits. Recommend security hardening measures.',
        'uk': 'Проаналізуйте код на вразливості безпеки та потенційні експлойти. Рекомендуйте заходи щодо посилення безпеки.',
            'ru': 'Проанализируйте код на уязвимости безопасности и потенциальные эксплойты. Рекомендуйте меры по усилению безопасности.',
                'pl': 'Przeanalizuj kod pod kątem luk bezpieczeństwa i potencjalnych exploitów. Zalec środki wzmacniające bezpieczeństwo.',
                    'de': 'Analysieren Sie den Code auf Sicherheitslücken und potenzielle Exploits. Empfehlen Sie Maßnahmen zur Sicherheitshärtung.',
                        'es': 'Analice el código en busca de vulnerabilidades de seguridad y posibles exploits. Recomiende medidas de fortalecimiento de la seguridad.'
},
'refactor': {
    'en': 'Refactor the code to improve its structure and maintainability without changing its external behavior.',
        'uk': 'Рефакторинг коду для покращення його структури та підтримуваності без зміни зовнішньої поведінки.',
            'ru': 'Рефакторинг кода для улучшения его структуры и поддерживаемости без изменения внешнего поведения.',
                'pl': 'Zrefaktoryzuj kod, aby poprawić jego strukturę i łatwość utrzymania bez zmiany jego zachowania zewnętrznego.',
                    'de': 'Refaktorisieren Sie den Code, um seine Struktur und Wartbarkeit zu verbessern, ohne sein externes Verhalten zu ändern.',
                        'es': 'Refactorice el código para mejorar su estructura y mantenibilidad sin cambiar su comportamiento externo.'
},
'document': {
    'en': 'Add comprehensive documentation, including comments and docstrings, to explain the code clearly.',
        'uk': 'Додайте вичерпну документацію, включаючи коментарі та docstrings, для чіткого пояснення коду.',
            'ru': 'Добавьте исчерпывающую документацию, включая комментарии и docstrings, для четкого объяснения кода.',
                'pl': 'Dodaj kompleksową dokumentację, w tym komentarze i docstrings, aby jasno wyjaśnić kod.',
                    'de': 'Fügen Sie umfassende Dokumentation hinzu, einschließlich Kommentare und Docstrings, um den Code klar zu erklären.',
                        'es': 'Agregue documentación completa, incluidos comentarios y docstrings, para explicar el código claramente.'
},
'convert': {
    'en': 'Convert the code to the specified target language or framework while preserving logic and functionality.',
        'uk': 'Конвертуйте код у вказану цільову мову або фреймворк, зберігаючи логіку та функціональність.',
            'ru': 'Конвертируйте код в указанный целевой язык или фреймворк, сохраняя логику и функциональность.',
                'pl': 'Skonwertuj kod na wskazany język docelowy lub framework, zachowując logikę i funkcjonalność.',
                    'de': 'Konvertieren Sie den Code in die angegebene Zielsprache oder das Framework unter Beibehaltung von Logik und Funktionalität.',
                        'es': 'Convierta el código al idioma o framework de destino especificado conservando la lógica y la funcionalidad.'
},
'format': {
    'en': 'Format the code according to standard style guidelines and conventions for the language.',
        'uk': 'Відформатуйте код відповідно до стандартних рекомендацій та конвенцій стилю для цієї мови.',
            'ru': 'Отформатируйте код в соответствии со стандартными рекомендациями и конвенциями стиля для этого языка.',
                'pl': 'Sformatuj kod zgodnie ze standardowymi wytycznymi i konwencjami stylu dla tego języka.',
                    'de': 'Formatieren Sie den Code gemäß den Standard-Stilrichtlinien und Konventionen für die Sprache.',
                        'es': 'Formatee el código de acuerdo con las pautas y convenciones de estilo estándar para el idioma.'
},
'test': {
    'en': 'Analyze the code using step-by-step reasoning. Identify issues, patterns, and propose solutions logically.',
        'uk': 'Проаналізуйте код, використовуючи покрокове міркування. Виявіть проблеми, патерни та логічно запропонуйте рішення.',
            'ru': 'Проанализируйте код, используя пошаговые рассуждения. Выявите проблемы, паттерны и логически предложите решения.',
                'pl': 'Przeanalizuj kod, używając rozumowania krok po kroku. Zidentyfikuj problemy, wzorce i logicznie zaproponuj rozwiązania.',
                    'de': 'Analysieren Sie den Code mit schrittweisem Denken. Identifizieren Sie Probleme, Muster und schlagen Sie logisch Lösungen vor.',
                        'es': 'Analice el código utilizando razonamiento paso a paso. Identifique problemas, patrones y proponga soluciones lógicamente.'
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
        const wishesText = wishes ? wishes.trim() : '';

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

        // Create system message with professional language enforcement
        const systemMessage = `You are a Senior Tech Lead and expert code assistant.
Your goal is to provide high-quality, accurate, and helpful code analysis and solutions.

PRIMARY DIRECTIVE:
You must respond in ${targetLangName.toUpperCase()} (${lang}).
All text fields (explanation, tip, smells) MUST be written in ${targetLangName}.
Do not use English for explanations unless the user specifically asks for it.

Task: ${taskDescription}
${mode === 'convert' && convertFrom && convertTo ? `\nCONVERSION SPECIFICATIONS:\n- Convert FROM: ${convertFrom}\n- Convert TO: ${convertTo}\n- Preserve functionality and logic\n- Use idiomatic ${convertTo} code style\n- Add comments explaining conversion choices if needed\n` : ''}
${wishesText ? `\nAdditional requirements from user: ${wishesText}` : ''}

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

IMPORTANT: Please ensure your response is strictly in ${targetLangName}.`;

        // Language-specific reminders for user message
        const languageReminders = {
            'uk': `Будь ласка, надайте відповідь українською мовою.`,
            'ru': `Пожалуйста, предоставьте ответ на русском языке.`,
            'pl': `Proszę o odpowiedź w języku polskim.`,
            'de': `Bitte antworten Sie auf Deutsch.`,
            'es': `Por favor, responda en español.`,
            'en': `Please respond in English.`
        };

        const languageReminder = languageReminders[lang] || languageReminders['en'];

        // User message with code and strong language reminder
        const userMessage = `${wishesText ? `User additional requirements: ${wishesText}\n\n` : ''}Code to process:\n\`\`\`\n${code}\n\`\`\`

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

            const supportsJsonMode = model.includes('qwen') ||
                model.includes('gpt-oss') ||
                model.includes('grok') ||
                model.includes('deepseek');

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

Please ensure all explanations are in ${targetLangName}.`;

            const geminiUserContent = `${wishesText ? `User additional requirements: ${wishesText}\n\n` : ''}Code to process:\n\`\`\`\n${code}\n\`\`\`

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
        // Longer timeout for slower models
        const slowModels = ['x-ai/grok-4.1-fast:free', 'tngtech/deepseek-r1t2-chimera:free'];
        const timeoutDuration = slowModels.includes(model) ? 120000 : 60000; // 120s for slow models, 60s for others
        const timeoutId = setTimeout(() => controller.abort(), timeoutDuration);

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
