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

// Task mapping
const TASK_MAP = {
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
        
        // Build prompt
        const taskDescription = TASK_MAP[mode] || 'Process code.';
        const targetLangName = getTargetLangName(lang);
        const wishesText = wishes ? `User Wishes: ${wishes} ` : '';
        
        const prompt = `Role: Senior Tech Lead. Task: ${taskDescription} ${wishesText}Language: ${lang}. Output Language: ${targetLangName}. IMPORTANT: Output RAW JSON ONLY: { "fixedCode": "CODE_STRING", "explanation": "MARKDOWN_STRING", "tip": "STRING", "score": INT(0-100), "smells": ["STRING"] }`;

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
                    { role: "system", content: prompt },
                    { role: "user", content: code }
                ],
                temperature: 0.7,
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

            url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
            headers = { 
                'Content-Type': 'application/json'
            };
            body = JSON.stringify({
                contents: [{ parts: [{ text: code }] }],
                systemInstruction: { parts: [{ text: prompt }] },
                generationConfig: {
                    responseMimeType: "application/json",
                    temperature: 0.7,
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
