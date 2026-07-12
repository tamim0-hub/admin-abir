// ============================================
// CART RECOVERY AGENT
// ============================================

class CartRecoveryAgent {
    constructor() {
        this.name = 'Cart Recovery';
        this.icon = '🛒';
        this.router = getRouter();
        this.tracker = getTokenTracker();
        this.perf = getPerfTracker();
    }

    async generateEmail(abandonedCart) {
        const startTime = Date.now();
        
        const messages = [
            { role: 'system', content: `You are a Cart Recovery Agent. Write persuasive emails in Bangla.
            Email 1: 1 hour - "ভুলে গেলেন নাকি?"
            Email 2: 24 hours - "আপনার কার্টে ডিসকাউন্ট রেডি!"
            Email 3: 48 hours - "শেষবারের সুযোগ!"
            Write in natural Bangla, conversational, with emojis.` },
            { role: 'user', content: `Cart: ${JSON.stringify(abandonedCart)}` }
        ];

        const result = await this.router.chat('cartRecovery', messages, { temperature: 0.7 });
        const time = (Date.now() - startTime) / 1000;

        if (result.success) {
            this.tracker.track('cartRecovery', result.model, result.tokens);
            this.perf.track('cartRecovery', result.model, true, time, result.tokens);
        } else {
            this.perf.track('cartRecovery', 'unknown', false, time, 0);
        }

        return result;
    }
}