// ============================================
// TOKEN TRACKER - টোকেন খরচ ট্র্যাকিং
// ============================================

class TokenTracker {
    constructor() {
        this.usage = {};
        this.costRates = {
            'mixtral-8x7b': 0.00000027,
            'llama-3.3-70b': 0.00000059,
            'llama-3.1-8b': 0.00000005,
            'gemma-7b': 0.00000007
        };
        this.loadFromStorage();
    }

    loadFromStorage() {
        const saved = getMetrics();
        this.usage = saved.tokenUsage || {};
    }

    saveToStorage() {
        const metrics = getMetrics();
        metrics.tokenUsage = this.usage;
        saveMetrics(metrics);
    }

    track(agent, model, tokens) {
        if (!this.usage[agent]) {
            this.usage[agent] = { tokens: 0, cost: 0, requests: 0 };
        }
        this.usage[agent].tokens += tokens;
        this.usage[agent].cost += tokens * (this.costRates[model] || 0.00000010);
        this.usage[agent].requests += 1;
        this.saveToStorage();
    }

    getReport() {
        let report = '💰 TOKEN USAGE REPORT\n';
        report += '═══════════════════════════\n\n';
        let totalTokens = 0;
        let totalCost = 0;

        for (const [agent, data] of Object.entries(this.usage)) {
            report += `${agent}:\n`;
            report += `  Tokens: ${data.tokens}\n`;
            report += `  Cost: $${data.cost.toFixed(4)}\n`;
            report += `  Requests: ${data.requests}\n\n`;
            totalTokens += data.tokens;
            totalCost += data.cost;
        }

        report += '═══════════════════════════\n';
        report += `TOTAL TOKENS: ${totalTokens}\n`;
        report += `TOTAL COST: $${totalCost.toFixed(4)}\n`;
        report += '═══════════════════════════\n';
        return report;
    }

    getStats() {
        let totalTokens = 0;
        let totalCost = 0;
        let totalRequests = 0;
        for (const data of Object.values(this.usage)) {
            totalTokens += data.tokens;
            totalCost += data.cost;
            totalRequests += data.requests;
        }
        return { totalTokens, totalCost, totalRequests };
    }
}

let tokenTracker = null;
function getTokenTracker() {
    if (!tokenTracker) tokenTracker = new TokenTracker();
    return tokenTracker;
}