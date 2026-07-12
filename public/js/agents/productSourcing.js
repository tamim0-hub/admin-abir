// ============================================
// PRODUCT SOURCING AGENT
// ============================================

class ProductSourcingAgent {
    constructor() {
        this.name = 'Product Sourcing';
        this.icon = '📦';
        this.router = getRouter();
        this.tracker = getTokenTracker();
        this.perf = getPerfTracker();
    }

    async sourceProducts(supplierData) {
        const startTime = Date.now();
        
        const messages = [
            { role: 'system', content: `You are a Product Sourcing Agent. Extract product details from supplier data.
            Format: { name, description, price, images, category, sku }.
            Return as JSON array.` },
            { role: 'user', content: `Supplier Data: ${JSON.stringify(supplierData)}` }
        ];

        const result = await this.router.chat('productSourcing', messages, { temperature: 0.2 });
        const time = (Date.now() - startTime) / 1000;

        if (result.success) {
            this.tracker.track('productSourcing', result.model, result.tokens);
            this.perf.track('productSourcing', result.model, true, time, result.tokens);
            try {
                return JSON.parse(result.content);
            } catch {
                return { error: 'Parse failed', raw: result.content };
            }
        } else {
            this.perf.track('productSourcing', 'unknown', false, time, 0);
            return { error: result.error };
        }
    }
}