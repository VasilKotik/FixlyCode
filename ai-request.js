const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// CORS configuration
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    credentials: true
}));

app.use(bodyParser.json());

// Middleware for authentication via X-Internal-Token
const authenticate = (req, res, next) => {
    const token = req.headers['x-internal-token'];
    const secretKey = process.env.INTERNAL_SECRET_KEY;
    
    if (!secretKey) {
        return res.status(500).json({
            error: 'Server configuration error',
            message: 'Internal secret key not configured'
        });
    }
    
    if (!token || token !== secretKey) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Invalid or missing internal token'
        });
    }
    
    next();
};

// Main API endpoint - handle both root and /api/ai-request paths for Vercel
// Слухаємо корінь, бо Vercel вже привів нас у цей файл
app.post('/', async (req, res) => {
    try {
        const { code, mode, lang, model, wishes } = req.body;

        // Validation
        if (!code || !model) {
            return res.status(400).json({ 
                error: 'Missing required fields',
                message: 'Code and model are required'
            });
        }

        if (!code.trim()) {
            return res.status(400).json({ 
                error: 'Empty code',
                message: 'Code cannot be empty'
            });
        }

        const isOpenRouter = model.includes('/');
        let url, headers, body;

        // Task mapping
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

        // Language mapping
        const targetLangName = lang === 'uk' ? 'Ukrainian' : 
                              lang === 'en' ? 'English' :
                              lang === 'pl' ? 'Polish' :
                              lang === 'de' ? 'German' :
                              lang === 'es' ? 'Spanish' :
                              lang === 'ru' ? 'Russian' : 'English';

        const prompt = `Role: Senior Tech Lead. Task: ${taskMap[mode] || 'Process code.'} ${wishes ? 'User Wishes: ' + wishes : ''} Language: ${lang}. Output Language: ${targetLangName}. IMPORTANT: Output RAW JSON ONLY: { "fixedCode": "CODE_STRING", "explanation": "MARKDOWN_STRING", "tip": "STRING", "score": INT(0-100), "smells": ["STRING"] }`;

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
                "HTTP-Referer": req.headers.referer || req.headers.origin || "https://yourdomain.com",
                "X-Title": "FixlyCode"
            };

            const supportsJsonMode = model.includes('llama') || model.includes('gemma') || model.includes('qwen') || model.includes('phi-3');
            
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
            headers = { 'Content-Type': 'application/json' };
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

        // Make API request
        // Using built-in fetch in Node.js 18+
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000);

        const response = await fetch(url, {
            method: 'POST',
            headers,
            body,
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            let errMsg = response.statusText;
            
            if (errorData.error) {
                errMsg = errorData.error.message || errorData.error.error?.message || JSON.stringify(errorData.error);
            }

            if (response.status === 401) {
                errMsg = "Authentication failed. Please check API keys.";
            } else if (response.status === 429) {
                errMsg = "Rate limit exceeded. Please try again later.";
            } else if (response.status === 400) {
                errMsg = "Invalid request. " + (errorData.error?.message || "");
            } else if (response.status === 404) {
                errMsg = "Model not found.";
            }

            return res.status(response.status).json({
                error: errMsg,
                status: response.status
            });
        }

        const data = await response.json();

        let rawText = "";
        
        if (isOpenRouter) {
            if (!data.choices || !data.choices[0] || !data.choices[0].message) {
                return res.status(500).json({ 
                    error: 'Invalid response structure from OpenRouter API'
                });
            }
            rawText = data.choices[0].message.content || "";
        } else {
            if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts) {
                return res.status(500).json({ 
                    error: 'Invalid response structure from Gemini API'
                });
            }
            rawText = data.candidates[0].content.parts[0].text || "";
        }

        if (!rawText || rawText.trim().length === 0) {
            return res.status(500).json({ 
                error: 'Empty response from AI model'
            });
        }

        res.json({
            success: true,
            rawText: rawText,
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
        timestamp: new Date().toISOString()
    });
});

// Export for Vercel Serverless Functions
module.exports = app;

