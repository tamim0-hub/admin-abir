// ============================================
// ORDER FULFILLMENT AGENT
// ============================================

class OrderFulfillmentAgent {
    constructor() {
        this.name = 'Order Fulfillment';
        this.icon = '🚚';
        this.router = getRouter();
        this.tracker = getTokenTracker();
        this.perf = getPerfTracker();
    }

    async fulfillOrder(orderData) {
        const startTime = Date.now();
        
        const messages = [
            { role: 'system', content: `You are an Order Fulfillment Agent. Process orders for dropshipping.
            Format: { orderId, status: 'confirmed', supplierOrderId, tracking }.
            Return as JSON.` },
            { role: 'user', content: `Order: ${JSON.stringify(orderData)}` }
        ];

        const result = await this.router.chat('orderFulfillment', messages, { temperature: 0.1 });
        const time = (Date.now() - startTime) / 1000;

        if (result.success) {
            this.tracker.track('orderFulfillment', result.model, result.tokens);
            this.perf.track('orderFulfillment', result.model, true, time, result.tokens);
            try {
                return JSON.parse(result.content);
            } catch {
                return { error: 'Parse failed', raw: result.content };
            }
        } else {
            this.perf.track('orderFulfillment', 'unknown', false, time, 0);
            return { error: result.error };
        }
    }
}