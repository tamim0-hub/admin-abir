// ============================================
// ROUTER.JS - প্যানেল নেভিগেশন
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.nav-tab[data-panel]');
    const panels = {
        home: document.getElementById('panel-home'),
        worker: document.getElementById('panel-worker'),
        inbox: document.getElementById('panel-inbox'),
        settings: document.getElementById('panel-settings')
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // সব ট্যাব থেকে active রিমুভ
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // সব প্যানেল লুকাও
            Object.values(panels).forEach(p => p?.classList.remove('active'));

            // টার্গেট প্যানেল শো
            const target = tab.dataset.panel;
            if (panels[target]) {
                panels[target].classList.add('active');
            }
        });
    });

    // ওয়ার্কার প্যানেলের জন্য অফিস জেনারেট
    generateOfficeGrid();
});

function generateOfficeGrid() {
    const grid = document.getElementById('officeGrid');
    if (!grid) return;

    const agents = [
        { name: 'Leader', icon: '👔', boss: true },
        { name: 'Product', icon: '📦', boss: false },
        { name: 'Price', icon: '💰', boss: false },
        { name: 'Order', icon: '🚚', boss: false },
        { name: 'Cart', icon: '🛒', boss: false },
        { name: 'Inventory', icon: '⚠️', boss: false },
        { name: 'Social', icon: '📱', boss: false },
        { name: 'Thumbnail', icon: '🖼️', boss: false },
        { name: 'Video', icon: '🎬', boss: false },
        { name: 'SEO', icon: '🔍', boss: false }
    ];

    // ৪x৪ গ্রিডে ১০টি এজেন্ট বসানো
    const positions = [
        [0,0], [0,1], [0,2], [0,3],
        [1,0], [1,1], [1,2], [1,3],
        [2,0], [2,1], [2,2], [2,3],
        [3,0], [3,1], [3,2], [3,3]
    ];

    let html = '';
    // লিডার (বস) ১,১ পজিশনে (সেন্টার)
    for (let i = 0; i < 16; i++) {
        const isBoss = (i === 5); // সেন্টার
        const agent = isBoss ? agents[0] : agents[i % agents.length];
        const cls = isBoss ? 'worker-cell boss' : 'worker-cell';
        const label = isBoss ? 'BOSS' : agent.name.substring(0, 4);
        html += `
            <div class="${cls}" data-agent="${agent.name}">
                ${agent.icon}
                <span class="worker-label">${label}</span>
            </div>
        `;
    }
    grid.innerHTML = html;
}