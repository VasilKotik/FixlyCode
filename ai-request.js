// api/ai-request.js
// Імпортуємо fetch (якщо node 18+, він вбудований, але для надійності залишимо require)
const https = require('https');

// Отримуємо ключі
const INTERNAL_SECRET = process.env.INTERNAL_SECRET_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// Допоміжна функція для запитів (щоб не залежати від node-fetch)
function postRequest(url, body, headers) {
    return new Promise((resolve, reject) => {
        const parsedUrl = new URL(url);
        const options = {
            hostname: parsedUrl.hostname,
            path: parsedUrl.pathname + parsedUrl.search,
            method: 'POST',
            headers: headers
        };
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    resolve({ error: "Invalid JSON response", raw: data });
                }
            });
        });
        req.on('error', (e) => reject(e));
        req.write(JSON.stringify(body));
        req.end();
    });
}

// Це стандартна функція Vercel. Вона працює ЗАВЖДИ.
module.exports = async (req, res) => {
    // 1. CORS заголовки (щоб фронтенд точно достукався)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Internal-Token');

    // Якщо браузер просто перевіряє з'єднання (OPTIONS) - кажемо ОК
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 2. Перевірка токена
    const clientToken = req.headers['x-internal-token'];
    if (!INTERNAL_SECRET || clientToken !== INTERNAL_SECRET) {
        return res.status(401).json({ error: 'Unauthorized: Wrong token' });
    }

    try {
        const { code, mode, lang, model, wishes } = req.body;

        // Формування промпта
        const prompt = `Role: Senior Dev. Fix/Analyze this code. Mode: ${mode}. Language: ${lang}. Wishes: ${wishes}. CODE: ${code}. Return JSON with fixedCode, explanation, tip, score, smells.`;

        const isOpenRouter = model && (model.includes('/') || model.includes('llama'));
        const apiKey = isOpenRouter ? OPENROUTER_API_KEY : GEMINI_API_KEY;

        if (!apiKey) return res.status(500).json({ error: 'Server Error: API Key missing' });

        let rawText = "";

        if (isOpenRouter) {
            const data = await postRequest("https://openrouter.ai/api/v1/chat/completions", {
                model: model,
                messages: [{ role: "user", content: prompt }]
            }, {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://fixlycode.vercel.app",
                "X-Title": "FixlyCode"
            });
            rawText = data.choices?.[0]?.message?.content || "";
        } else {
            const data = await postRequest(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
                contents: [{ parts: [{ text: prompt }] }]
            }, { "Content-Type": "application/json" });
            rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        }

        res.status(200).json({ rawText });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
