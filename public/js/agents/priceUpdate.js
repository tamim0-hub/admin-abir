// ============================================
// PRICE UPDATE AGENT
// ============================================

class PriceUpdateAgent {
    constructor() {
        this.name = 'Price Update';
        this.icon = '💰';
        this.router = getRouter();
        this.tracker = getTokenTracker();
        this.perf = getPerfTracker();
    }

    async updatePrices(productData) {
        const startTime = Date.now();
        const profitMargin = getSettings()?.profitMargin || 10;
        
        const messages = [
            { role: 'system', content: `You are a Price Update Agent. Calculate new prices with ${profitMargin}% profit margin.
            Format: { productId, oldPrice, newPrice, profit }.
            Return as JSON array.` },
            { role: 'user', content: `Products: ${JSON.stringify(productData)}` }
        ];

        const result = await this.router.chat('priceUpdate', messages, { temperature: 0.1 });
        const time = (Date.now() - startTime) / 1000;

        if (result.success) {
            this.tracker.track('priceUpdate', result.model, result.tokens);
            this.perf.track('priceUpdate', result.model, true, time, result.tokens);
            try {
                return JSON.parse(result.content);
            } catch {
                return { error: 'Parse failed', raw: result.content };
            }
        } else {
            this.perf.track('priceUpdate', 'unknown', false, time, 0);
            return { error: result.error };
        }
    }
}