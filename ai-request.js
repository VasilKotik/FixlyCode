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
    const { code, mode, lang, model, wishes, convertFromLang, convertToLang } = req.body;

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

    // Sanitize input
    req.body.code = code.trim();
    req.body.model = model.trim();
    req.body.mode = (mode && typeof mode === 'string') ? mode.trim() : 'debug';
    req.body.lang = (lang && typeof lang === 'string') ? lang.trim() : 'en';
    req.body.wishes = (wishes && typeof wishes === 'string') ? wishes.trim() : '';

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
        'en': 'Explain code logic, purpose, and how it works in detail.',
        'uk': 'Поясніть логіку коду, призначення та як він працює детально.',
        'ru': 'Объясните логику кода, назначение и как он работает подробно.',
        'pl': 'Wyjaśnij szczegółowo logikę kodu, cel i sposób działania.',
        'de': 'Erklären Sie die Codelogik, den Zweck und die Funktionsweise im Detail.',
        'es': 'Explique la lógica del código, el propósito y cómo funciona en detalle.'
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
        const { code, mode, lang, model, wishes, convertFromLang, convertToLang } = req.body;

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
        
        // For convert mode, add language conversion info
        if (mode === 'convert' && convertFromLang && convertToLang) {
            const convertInstructions = {
                'uk': `Конвертуйте код з ${convertFromLang} на ${convertToLang}.`,
                'ru': `Конвертируйте код с ${convertFromLang} на ${convertToLang}.`,
                'pl': `Konwertuj kod z ${convertFromLang} na ${convertToLang}.`,
                'de': `Konvertieren Sie den Code von ${convertFromLang} zu ${convertToLang}.`,
                'es': `Convierta el código de ${convertFromLang} a ${convertToLang}.`,
                'en': `Convert code from ${convertFromLang} to ${convertToLang}.`
            };
            taskDescription = convertInstructions[lang] || convertInstructions['en'];
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
  "explanation": "Оригінальний код містив помилку в логіці перевірки. Умова \`if (x > 0)\` не враховувала випадок, коли змінна \`x\` дорівнює нулю. Додано обробку цього випадку через додаткову умову \`else if (x === 0)\`, що забезпечує коректну роботу функції для всіх можливих значень вхідних даних.",
  "tip": "Завжди перевіряйте крайові випадки при написанні умовних операторів. Це допомагає уникнути несподіваної поведінки програми та потенційних помилок.",
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
  "explanation": "Оригинальный код содержал ошибку в логике проверки. Условие не учитывало случай, когда переменная равна нулю. Добавлена обработка этого случая, что обеспечивает корректную работу функции для всех возможных значений входных данных.",
  "tip": "Всегда проверяйте граничные случаи при написании условных операторов. Это помогает избежать неожиданного поведения программы.",
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
  "explanation": "Dodano obsługę przypadku, gdy x jest równe zero. Teraz funkcja poprawnie obsługuje wszystkie możliwe wartości.",
  "tip": "Zawsze sprawdzaj przypadki brzegowe przy pisaniu operatorów warunkowych.",
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
  "explanation": "Es wurde eine Behandlung für den Fall hinzugefügt, wenn x gleich null ist. Die Funktion behandelt nun alle möglichen Werte korrekt.",
  "tip": "Überprüfen Sie immer Grenzfälle beim Schreiben von bedingten Operatoren.",
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
  "explanation": "Se agregó el manejo del caso cuando x es igual a cero. Ahora la función maneja correctamente todos los valores posibles.",
  "tip": "Siempre verifique los casos límite al escribir operadores condicionales.",
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
  "explanation": "Added handling for the case when x equals zero. The function now correctly handles all possible values.",
  "tip": "Always check edge cases when writing conditional operators.",
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
EVEN IF THE USER WRITES IN ENGLISH, YOU MUST RESPOND IN ${targetLangName.toUpperCase()}.

EXAMPLE OF CORRECT ${targetLangName.toUpperCase()} RESPONSE:
${examples.fullExample}

You are a Senior Tech Lead code assistant.

Task (in ${targetLangName}): ${taskDescription}
${wishesText ? `Additional requirements (respond in ${targetLangName} even if user wrote in English): ${wishesText}` : ''}

OUTPUT FORMAT - Raw JSON only:
{
  "fixedCode": "CODE_STRING",
  "explanation": "TEXT_IN_${targetLangName.toUpperCase()}_ONLY - NO ENGLISH ALLOWED",
  "tip": "TEXT_IN_${targetLangName.toUpperCase()}_ONLY - NO ENGLISH ALLOWED",
  "score": INT(0-100),
  "smells": ["TEXT_IN_${targetLangName.toUpperCase()}_ONLY - NO ENGLISH ALLOWED"]
}

CRITICAL RULES:
1. If you write English in explanation, tip, or smells, your response is WRONG.
2. Use ${targetLangName} ONLY for all text fields.
3. The task description above is in ${targetLangName} - follow that language.
4. Even if user wishes are in English, your response must be in ${targetLangName}.`;

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

${languageReminder}

REMEMBER: The task is "${taskDescription}" - this is in ${targetLangName}. You MUST respond in ${targetLangName} language.`;

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
                                   model.includes('phi-3') ||
                                   model.includes('deepseek') ||
                                   model.includes('gpt-4o') ||
                                   model.includes('claude') ||
                                   model.includes('mistral') ||
                                   model.includes('gemini-pro');
            
            // Create few-shot example messages for better language adherence
            const fewShotExample = {
                role: "assistant",
                content: examples.fullExample
            };
            
            const exampleUserMessage = {
                role: "user",
                content: `Code to process:\n\`\`\`\nfunction test() { return x; }\n\`\`\`\n\n${languageReminder}\n\nTask: ${taskDescription} (respond in ${targetLangName})`
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

REMEMBER: 
- ALL text fields (explanation, tip, smells) MUST be in ${targetLangName}.
- English is FORBIDDEN for text fields.
- The task description "${taskDescription}" is in ${targetLangName} - use that language.
- Even if user writes in English, respond in ${targetLangName} ONLY.`;

            const geminiUserContent = `${wishesText ? `User Wishes: ${wishesText}\n\n` : ''}Code to process:\n\`\`\`\n${code}\n\`\`\`

${languageReminder}

CRITICAL: 
- Respond EXCLUSIVELY in ${targetLangName} (${lang}) language.
- The task is: "${taskDescription}" (this is in ${targetLangName} - follow this language).
- Use the example above as a reference.
- Even if user wishes are in English, your response must be in ${targetLangName}.`;

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
                // Check if it's a model-specific error from OpenRouter
                if (isOpenRouter && (errMsg.includes('model') || errMsg.includes('not found') || errMsg.includes('unavailable'))) {
                    errMsg = "Model not found or unavailable. Please try another model from the list.";
                }
            } else if (response.status === 404) {
                errMsg = "Model not found or unavailable. Please try another model from the list.";
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
