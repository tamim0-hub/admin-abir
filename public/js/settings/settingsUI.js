// ============================================
// SETTINGS UI - সেটিংস প্যানেল কন্ট্রোল
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // প্রফিট স্লাইডার
    const profitSlider = document.getElementById('profitSlider');
    const profitDisplay = document.getElementById('profitDisplay');
    const profitDisplayHome = document.getElementById('profitDisplayHome');

    profitSlider.addEventListener('input', () => {
        const val = profitSlider.value;
        profitDisplay.textContent = val + '%';
        if (profitDisplayHome) profitDisplayHome.textContent = val + '%';
    });

    // সেভ বাটন
    document.getElementById('saveSettingsBtn').addEventListener('click', saveAllSettings);

    // লোড করা
    loadSavedSettings();
});

function loadSavedSettings() {
    const saved = getSettings();
    if (!saved) return;

    // API Keys
    if (saved.groqKey1) document.getElementById('groqKey1').value = saved.groqKey1;
    if (saved.groqKey2) document.getElementById('groqKey2').value = saved.groqKey2;

    // Website
    if (saved.websiteUrl) document.getElementById('websiteUrl').value = saved.websiteUrl;
    if (saved.websiteApiKey) document.getElementById('websiteApiKey').value = saved.websiteApiKey;
    if (saved.webhookUrl) document.getElementById('webhookUrl').value = saved.webhookUrl;

    // Social
    if (saved.fbLink) document.getElementById('fbLink').value = saved.fbLink;
    if (saved.igLink) document.getElementById('igLink').value = saved.igLink;
    if (saved.linkedinLink) document.getElementById('linkedinLink').value = saved.linkedinLink;
    if (saved.twitterLink) document.getElementById('twitterLink').value = saved.twitterLink;
    if (saved.tiktokLink) document.getElementById('tiktokLink').value = saved.tiktokLink;

    // Profit
    if (saved.profitMargin) {
        document.getElementById('profitSlider').value = saved.profitMargin;
        document.getElementById('profitDisplay').textContent = saved.profitMargin + '%';
        if (document.getElementById('profitDisplayHome')) {
            document.getElementById('profitDisplayHome').textContent = saved.profitMargin + '%';
        }
    }

    // Models
    if (saved.models) {
        for (const [agent, model] of Object.entries(saved.models)) {
            const select = document.querySelector(`select[data-agent="${agent}"]`);
            if (select) select.value = model;
        }
    }
}

function saveAllSettings() {
    const settings = {
        groqKey1: document.getElementById('groqKey1').value.trim(),
        groqKey2: document.getElementById('groqKey2').value.trim(),
        websiteUrl: document.getElementById('websiteUrl').value.trim(),
        websiteApiKey: document.getElementById('websiteApiKey').value.trim(),
        webhookUrl: document.getElementById('webhookUrl').value.trim(),
        fbLink: document.getElementById('fbLink').value.trim(),
        igLink: document.getElementById('igLink').value.trim(),
        linkedinLink: document.getElementById('linkedinLink').value.trim(),
        twitterLink: document.getElementById('twitterLink').value.trim(),
        tiktokLink: document.getElementById('tiktokLink').value.trim(),
        profitMargin: parseInt(document.getElementById('profitSlider').value),
        models: getSelectedModels()
    };

    saveSettings(settings);
    document.getElementById('saveStatus').textContent = '✅ সব সেটিংস সংরক্ষিত হয়েছে!';
    document.getElementById('saveStatus').style.color = '#2ecc71';
    
    setTimeout(() => {
        document.getElementById('saveStatus').textContent = '';
    }, 3000);

    // UI আপডেট
    if (document.getElementById('profitDisplayHome')) {
        document.getElementById('profitDisplayHome').textContent = settings.profitMargin + '%';
    }
}

function getSelectedModels() {
    const selects = document.querySelectorAll('#modelSelectGrid select');
    const models = {};
    selects.forEach(sel => {
        models[sel.dataset.agent] = sel.value;
    });
    return models;
}