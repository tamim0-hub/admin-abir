// ============================================
// MODEL SELECTOR - মডেল সিলেক্ট জেনারেটর
// ============================================

const AGENT_MODELS = {
    leader: { label: 'Leader', default: 'mixtral-8x7b' },
    cartRecovery: { label: 'Cart Recovery', default: 'mixtral-8x7b' },
    thumbnailCourt: { label: 'Thumbnail Court', default: 'mixtral-8x7b' },
    seoAgent: { label: 'SEO Agent', default: 'mixtral-8x7b' },
    socialMedia: { label: 'Social Media', default: 'llama-3.3-70b' },
    videoGenerator: { label: 'Video Generator', default: 'llama-3.3-70b' },
    productSourcing: { label: 'Product Sourcing', default: 'llama-3.1-8b' },
    priceUpdate: { label: 'Price Update', default: 'llama-3.1-8b' },
    orderFulfillment: { label: 'Order Fulfillment', default: 'llama-3.1-8b' },
    inventoryAlert: { label: 'Inventory Alert', default: 'gemma-7b' }
};

const MODEL_OPTIONS = [
    'mixtral-8x7b',
    'llama-3.3-70b',
    'llama-3.1-8b',
    'gemma-7b'
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('modelSelectGrid');
    if (!grid) return;

    let html = '';
    for (const [key, data] of Object.entries(AGENT_MODELS)) {
        html += `
            <div class="model-select-item">
                <span>${data.label}</span>
                <select data-agent="${key}">
                    ${MODEL_OPTIONS.map(m => `
                        <option value="${m}" ${m === data.default ? 'selected' : ''}>${m}</option>
                    `).join('')}
                </select>
            </div>
        `;
    }
    grid.innerHTML = html;

    // সেভ করা সেটিংস লোড
    const saved = getSettings();
    if (saved && saved.models) {
        for (const [agent, model] of Object.entries(saved.models)) {
            const select = document.querySelector(`select[data-agent="${agent}"]`);
            if (select) select.value = model;
        }
    }
});