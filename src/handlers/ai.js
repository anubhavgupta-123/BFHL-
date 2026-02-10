
const OpenAI = require("openai");

const API_KEYS = [
    process.env.GROQ_API_KEY,
    process.env.GROQ_API_KEY_BACKUP,
].filter(Boolean);

const MODELS = ["openai/gpt-oss-120b", "openai/gpt-oss-20b"];

async function askAI(question) {
    if (API_KEYS.length === 0) {
        throw new Error("GROQ_API_KEY is not configured");
    }

    const prompt = `Answer the following question in exactly ONE word only. No punctuation, no extra text, just one single word.\n\nQuestion: ${question}`;

    for (const apiKey of API_KEYS) {
        const client = new OpenAI({
            apiKey,
            baseURL: "https://api.groq.com/openai/v1",
        });

        for (const model of MODELS) {
            try {
                const response = await client.responses.create({
                    model,
                    input: prompt,
                });

                const answer = response.output_text?.trim() || "";
                if (!answer) continue;

                const cleaned = answer.replace(/[.,!?;:]/g, "").split(/\s+/)[0];
                return cleaned;
            } catch (err) {
                console.error(`Key ${apiKey.slice(0, 10)}... / Model ${model} failed: ${err.message}`);
            }
        }
    }

    throw new Error("All AI models and API keys failed");
}

module.exports = askAI;
