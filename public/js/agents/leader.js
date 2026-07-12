// ============================================
// LEADER AGENT - সবকিছুর বস
// ============================================

class LeaderAgent {
    constructor() {
        this.name = 'Leader';
        this.icon = '👔';
        this.router = getRouter();
        this.tracker = getTokenTracker();
        this.perf = getPerfTracker();
    }

    async decide(task, context) {
        const startTime = Date.now();
        
        const messages = [
            { role: 'system', content: `You are the Leader Agent. Your job is to analyze tasks and make smart decisions for a dropshipping business. 
            Current profit margin: ${getSettings()?.profitMargin || 10}%.
            Available agents: Product Sourcing, Price Update, Order Fulfillment, Cart Recovery, Inventory Alert, Social Media, Thumbnail Court, Video Generator, SEO Agent.
            Give clear, actionable decisions.` },
            { role: 'user', content: `Task: ${task}\nContext: ${JSON.stringify(context)}` }
        ];

        const result = await this.router.chat('leader', messages, { temperature: 0.3 });
        const time = (Date.now() - startTime) / 1000;

        if (result.success) {
            this.tracker.track('leader', result.model, result.tokens);
            this.perf.track('leader', result.model, true, time, result.tokens);
        } else {
            this.perf.track('leader', 'unknown', false, time, 0);
        }

        return result;
    }
}