// ============================================
// PERFORMANCE TRACKER - এজেন্ট পারফরম্যান্স
// ============================================

class PerformanceTracker {
    constructor() {
        this.metrics = {};
        this.loadFromStorage();
    }

    loadFromStorage() {
        const saved = getMetrics();
        this.metrics = saved.performance || {};
    }

    saveToStorage() {
        const metrics = getMetrics();
        metrics.performance = this.metrics;
        saveMetrics(metrics);
    }

    track(agent, model, success, time, tokens) {
        if (!this.metrics[agent]) {
            this.metrics[agent] = { total: 0, success: 0, avgTime: 0, tokens: 0 };
        }
        const m = this.metrics[agent];
        m.total += 1;
        if (success) m.success += 1;
        m.avgTime = (m.avgTime * (m.total - 1) + time) / m.total;
        m.tokens += tokens;
        this.saveToStorage();
    }

    getSuccessRate(agent) {
        const m = this.metrics[agent];
        if (!m || m.total === 0) return 100;
        return (m.success / m.total) * 100;
    }

    getAvgTime(agent) {
        const m = this.metrics[agent];
        if (!m) return 0;
        return m.avgTime;
    }

    getReport() {
        let report = '📊 PERFORMANCE REPORT\n';
        report += '═══════════════════════════\n\n';
        for (const [agent, m] of Object.entries(this.metrics)) {
            const rate = (m.success / m.total * 100).toFixed(1);
            report += `${agent}:\n`;
            report += `  Success: ${rate}%\n`;
            report += `  Avg Time: ${m.avgTime.toFixed(2)}s\n`;
            report += `  Tokens: ${m.tokens}\n\n`;
        }
        return report;
    }
}

let perfTracker = null;
function getPerfTracker() {
    if (!perfTracker) perfTracker = new PerformanceTracker();
    return perfTracker;
}