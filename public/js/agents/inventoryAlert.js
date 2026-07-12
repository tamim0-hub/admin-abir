// ============================================
// INVENTORY ALERT AGENT
// ============================================

class InventoryAlertAgent {
    constructor() {
        this.name = 'Inventory Alert';
        this.icon = '⚠️';
        this.router = getRouter();
        this.tracker = getTokenTracker();
        this.perf = getPerfTracker();
    }

    async checkStock(inventoryData) {
        const startTime = Date.now();
        
        const messages = [
            { role: 'system', content: `You are an Inventory Alert Agent. Check stock levels and identify low stock items.
            Return: { productId, name, stock, status: 'ok'|'low'|'out' }.
            Return as JSON array.` },
            { role: 'user', content: `Inventory: ${JSON.stringify(inventoryData)}` }
        ];

        const result = await this.router.chat('inventoryAlert', messages, { temperature: 0.1 });
        const time = (Date.now() - startTime) / 1000;

        if (result.success) {
            this.tracker.track('inventoryAlert', result.model, result.tokens);
            this.perf.track('inventoryAlert', result.model, true, time, result.tokens);
            try {
                return JSON.parse(result.content);
            } catch {
                return { error: 'Parse failed', raw: result.content };
            }
        } else {
            this.perf.track('inventoryAlert', 'unknown', false, time, 0);
            return { error: result.error };
        }
    }
}