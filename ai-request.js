// api/ai-request.js
const { URL } = require('url');

// Отримуємо ключі
const INTERNAL_SECRET = process.env.INTERNAL_SECRET_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// Допоміжна функція для запитів (заміна fetch, щоб працювало скрізь)
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = async (req, res) => {
    // 1. CORS (Дозволяємо доступ з сайту)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Internal-Token'
    );

    // Обробка попереднього запиту (preflight)
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 2. Перевірка методу
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // 3. Перевірка безпеки
    const clientToken = req.headers['x-internal-token'];
    if (!INTERNAL_SECRET || clientToken !== INTERNAL_SECRET) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const { code, mode, lang, model, wishes } = req.body;

        // Формування промпта
        const prompt = `Role: Senior Dev. Task: ${mode}. Code: ${code}. Wishes: ${wishes}. Language: ${lang}. Return ONLY RAW JSON: { "fixedCode": "...", "explanation": "...", "tip": "...", "score": 85, "smells": [] }`;

        const isOpenRouter = model && (model.includes('/') || model.includes('llama'));
        const apiKey = isOpenRouter ? OPENROUTER_API_KEY : GEMINI_API_KEY;

        if (!apiKey) throw new Error("API Key missing");

        let rawText = "";

        if (isOpenRouter) {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://fixlycode.vercel.app",
                    "X-Title": "FixlyCode"
                },
                body: JSON.stringify({
                    model: model,
                    messages: [{ role: "user", content: prompt }]
                })
            });
            const data = await response.json();
            rawText = data.choices?.[0]?.message?.content || "";
        } else {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });
            const data = await response.json();
            rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        }

        res.status(200).json({ rawText });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
