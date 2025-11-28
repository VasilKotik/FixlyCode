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
        const { code, mode, lang, model, wishes } = req.body;

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
                explanation: 'Цей код містить помилку...',
                tip: 'Рекомендую використовувати...',
                smell: 'Дублювання коду'
            },
            'ru': {
                explanation: 'Этот код содержит ошибку...',
                tip: 'Рекомендую использовать...',
                smell: 'Дублирование кода'
            },
            'pl': {
                explanation: 'Ten kod zawiera błąd...',
                tip: 'Zalecam użycie...',
                smell: 'Duplikacja kodu'
            },
            'de': {
                explanation: 'Dieser Code enthält einen Fehler...',
                tip: 'Ich empfehle die Verwendung von...',
                smell: 'Code-Duplikation'
            },
            'es': {
                explanation: 'Este código contiene un error...',
                tip: 'Recomiendo usar...',
                smell: 'Duplicación de código'
            },
            'en': {
                explanation: 'This code contains an error...',
                tip: 'I recommend using...',
                smell: 'Code duplication'
            }
        };
        
        const examples = languageExamples[lang] || languageExamples['en'];
        
        // Create separate system message with strong language enforcement
        const systemMessage = `You are a Senior Tech Lead code assistant.

🚨🚨🚨 CRITICAL LANGUAGE REQUIREMENT - ABSOLUTELY MANDATORY 🚨🚨🚨

LANGUAGE: ${targetLangName} (code: ${lang})
YOU MUST RESPOND EXCLUSIVELY IN ${targetLangName.toUpperCase()}.
YOU ARE STRICTLY FORBIDDEN TO USE ENGLISH OR ANY OTHER LANGUAGE.

⚠️ RULES THAT CANNOT BE VIOLATED:
1. "explanation" field: MUST be written in ${targetLangName} ONLY
   Example format: "${examples.explanation}"
   
2. "tip" field: MUST be written in ${targetLangName} ONLY
   Example format: "${examples.tip}"
   
3. "smells" array: ALL items MUST be in ${targetLangName} ONLY
   Example format: ["${examples.smell}", "інший приклад"]
   
4. "fixedCode" field: Keep original programming language (JavaScript, Python, etc.)

❌ FORBIDDEN: English text in explanation, tip, or smells
✅ REQUIRED: ${targetLangName} text in explanation, tip, and smells

Task: ${taskDescription}

${wishesText ? `Additional requirements: ${wishesText}` : ''}

OUTPUT FORMAT - RAW JSON ONLY (no markdown, no code blocks, no explanations outside JSON):
{
  "fixedCode": "CODE_STRING",
  "explanation": "TEXT_IN_${targetLangName.toUpperCase()}_ONLY",
  "tip": "TEXT_IN_${targetLangName.toUpperCase()}_ONLY",
  "score": INT(0-100),
  "smells": ["TEXT_IN_${targetLangName.toUpperCase()}_ONLY"]
}

FINAL REMINDER: If you write ANY text in English in explanation, tip, or smells fields, your response is INCORRECT. Use ${targetLangName} ONLY.`;

        // User message with code and language reminder
        const userMessage = `${wishesText ? `User Wishes: ${wishesText}\n\n` : ''}Code to process:\n\`\`\`\n${code}\n\`\`\`

⚠️ LANGUAGE REMINDER: You MUST write explanation, tip, and smells in ${targetLangName} (${lang}) language. English is FORBIDDEN for these fields.`;

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
            
            body = JSON.stringify({
                model: model,
                messages: [
                    { role: "system", content: systemMessage },
                    { role: "user", content: userMessage }
                ],
                temperature: 0.3, // Lower temperature for better instruction following
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

            // For Gemini, combine system instruction with user message
            const geminiSystemInstruction = systemMessage;
            const geminiUserContent = `${wishesText ? `User Wishes: ${wishesText}\n\n` : ''}Code to process:\n\`\`\`\n${code}\n\`\`\`

⚠️ LANGUAGE REMINDER: You MUST write explanation, tip, and smells in ${targetLangName} (${lang}) language. English is FORBIDDEN for these fields.`;

            url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
            headers = { 
                'Content-Type': 'application/json'
            };
            body = JSON.stringify({
                contents: [{ parts: [{ text: geminiUserContent }] }],
                systemInstruction: { parts: [{ text: geminiSystemInstruction }] },
                generationConfig: {
                    responseMimeType: "application/json",
                    temperature: 0.3, // Lower temperature for better instruction following
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
