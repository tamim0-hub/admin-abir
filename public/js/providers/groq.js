// ============================================
// GROQ.JS - Groq API Provider
// ============================================

class GroqProvider {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.groq.com/openai/v1';
        this.name = 'groq';
    }

    async chat(messages, model, options = {}) {
        if (!this.apiKey) {
            throw new Error('❌ Groq API Key সেট করা নেই!');
        }

        try {
            const response = await fetch(`${this.baseUrl}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: model || 'mixtral-8x7b',
                    messages: messages,
                    temperature: options.temperature || 0.7,
                    max_tokens: options.maxTokens || 1024
                })
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error?.message || 'API কল ব্যর্থ');
            }

            const data = await response.json();
            return {
                success: true,
                content: data.choices[0].message.content,
                tokens: data.usage?.total_tokens || 0,
                model: model || 'mixtral-8x7b',
                time: 0 // later
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                content: null
            };
        }
    }

    async testConnection() {
        try {
            const result = await this.chat(
                [{ role: 'user', content: 'Hello, are you working?' }],
                'mixtral-8x7b',
                { maxTokens: 10 }
            );
            return result.success;
        } catch {
            return false;
        }
    }
}