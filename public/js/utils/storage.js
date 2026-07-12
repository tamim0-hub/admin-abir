// ============================================
// STORAGE.JS - লোকাল স্টোরেজ ম্যানেজমেন্ট
// ============================================

const STORAGE_KEYS = {
    SETTINGS: 'dropship_settings',
    INBOX: 'dropship_inbox',
    AGENTS: 'dropship_agents',
    METRICS: 'dropship_metrics'
};

// ===== সেভ =====
function saveSettings(data) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data));
}

function getSettings() {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return raw ? JSON.parse(raw) : null;
}

function saveInbox(data) {
    localStorage.setItem(STORAGE_KEYS.INBOX, JSON.stringify(data));
}

function getInbox() {
    const raw = localStorage.getItem(STORAGE_KEYS.INBOX);
    return raw ? JSON.parse(raw) : [];
}

function saveAgents(data) {
    localStorage.setItem(STORAGE_KEYS.AGENTS, JSON.stringify(data));
}

function getAgents() {
    const raw = localStorage.getItem(STORAGE_KEYS.AGENTS);
    return raw ? JSON.parse(raw) : {};
}

function saveMetrics(data) {
    localStorage.setItem(STORAGE_KEYS.METRICS, JSON.stringify(data));
}

function getMetrics() {
    const raw = localStorage.getItem(STORAGE_KEYS.METRICS);
    return raw ? JSON.parse(raw) : {};
}

// ===== ডেটা ডাউনলোড (ব্যাকআপ) =====
function downloadAllData() {
    const data = {
        settings: getSettings(),
        inbox: getInbox(),
        agents: getAgents(),
        metrics: getMetrics(),
        exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dropship_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

// ===== ডেটা আপলোড (রিস্টোর) =====
function uploadAllData(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (data.settings) saveSettings(data.settings);
            if (data.inbox) saveInbox(data.inbox);
            if (data.agents) saveAgents(data.agents);
            if (data.metrics) saveMetrics(data.metrics);
            alert('✅ ডেটা সফলভাবে রিস্টোর করা হয়েছে!');
            location.reload();
        } catch (err) {
            alert('❌ ভুল ফাইল ফরম্যাট!');
        }
    };
    reader.readAsText(file);
}