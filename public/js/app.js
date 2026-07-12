// ============================================
// APP.JS - মেইন অ্যাপ্লিকেশন কন্ট্রোলার
// ============================================

// গ্লোবাল ইন্সট্যান্স
let leaderAgent, productAgent, priceAgent, orderAgent, cartAgent;
let inventoryAgent, socialAgent, thumbnailAgent, videoAgent, seoAgent;

function loadApp() {
    console.log('🚀 DropShip Orchestrator Pro লোড হচ্ছে...');

    // সব এজেন্ট ইন্সট্যান্স তৈরি
    leaderAgent = new LeaderAgent();
    productAgent = new ProductSourcingAgent();
    priceAgent = new PriceUpdateAgent();
    orderAgent = new OrderFulfillmentAgent();
    cartAgent = new CartRecoveryAgent();
    inventoryAgent = new InventoryAlertAgent();
    socialAgent = new SocialMediaAgent();
    thumbnailAgent = new ThumbnailCourtAgent();
    videoAgent = new VideoGeneratorAgent();
    seoAgent = new SEOAgent();

    // এজেন্ট লিস্ট UI আপডেট
    updateAgentList();

    // ইভেন্ট লিসেনার
    document.getElementById('runAllBtn')?.addEventListener('click', runAllAgents);
    document.getElementById('pauseAllBtn')?.addEventListener('click', pauseAllAgents);

    // ডেমো ইনবক্স মেসেজ
    addDemoInbox();

    // স্ট্যাটাস আপডেট (প্রতি ৫ সেকেন্ড)
    setInterval(updateAgentList, 5000);

    console.log('✅ অ্যাপ রেডি!');
}

function updateAgentList() {
    const list = document.getElementById('agentList');
    if (!list) return;

    const agents = [
        { name: 'Leader', icon: '👔', status: 'running' },
        { name: 'Product Sourcing', icon: '📦', status: 'running' },
        { name: 'Price Auto-Update', icon: '💰', status: 'running' },
        { name: 'Order Fulfillment', icon: '🚚', status: 'idle' },
        { name: 'Cart Recovery', icon: '🛒', status: 'idle' },
        { name: 'Inventory Alert', icon: '⚠️', status: 'running' },
        { name: 'Social Media', icon: '📱', status: 'idle' },
        { name: 'Thumbnail Court', icon: '🖼️', status: 'running' },
        { name: 'Video Generator', icon: '🎬', status: 'idle' },
        { name: 'SEO Agent', icon: '🔍', status: 'running' }
    ];

    let html = '';
    agents.forEach(a => {
        const statusClass = a.status === 'running' ? 'running' : 'idle';
        const statusText = a.status === 'running' ? '● Running' : '○ Idle';
        html += `
            <div class="agent-item">
                <span class="agent-name"><i class="fas fa-microchip"></i> ${a.icon} ${a.name}</span>
                <span class="agent-status ${statusClass}">${statusText}</span>
            </div>
        `;
    });
    list.innerHTML = html;

    // এজেন্ট কাউন্ট আপডেট
    const running = agents.filter(a => a.status === 'running').length;
    document.getElementById('agentCount').textContent = `${running}/${agents.length} Running`;
}

function addDemoInbox() {
    const inbox = getInbox();
    if (inbox.length > 0) return;

    const demos = [
        { time: '2 min ago', title: '🛒 Cart Recovery Triggered', preview: '3 customers left items in cart. Email series triggered.', badge: 'Auto-Triggered' },
        { time: '15 min ago', title: '📦 Product Sourcing Complete', preview: '247 new products synced from supplier.', badge: 'Success' },
        { time: '1 hour ago', title: '⚠️ Inventory Alert', preview: '"Wireless Earbuds Pro" out of stock. Auto-unpublished.', badge: 'Critical' }
    ];

    demos.forEach(d => {
        inbox.push({
            id: Date.now() + Math.random(),
            time: d.time,
            title: d.title,
            preview: d.preview,
            badge: d.badge,
            read: false,
            timestamp: Date.now()
        });
    });

    saveInbox(inbox);
    updateInboxUI();
}

function updateInboxUI() {
    const list = document.getElementById('inboxList');
    const unread = document.getElementById('unreadCount');
    if (!list) return;

    const inbox = getInbox();
    const unreadCount = inbox.filter(i => !i.read).length;
    if (unread) unread.textContent = `● ${unreadCount} unread`;

    let html = '';
    inbox.slice().reverse().forEach(item => {
        const badgeClass = item.badge === 'Critical' ? 'critical' : '';
        html += `
            <div class="inbox-item" data-id="${item.id}">
                <div class="inbox-time">${item.time}</div>
                <div class="inbox-title">${item.title}</div>
                <div class="inbox-preview">${item.preview}</div>
                <span class="inbox-badge ${badgeClass}">${item.badge}</span>
            </div>
        `;
    });
    list.innerHTML = html || '<div style="color:#556688; text-align:center; padding:20px;">📭 কোন মেসেজ নেই</div>';
}

async function runAllAgents() {
    console.log('🚀 সব এজেন্ট রান হচ্ছে...');
    // প্রতিটি এজেন্টের কাজ চালানো হবে
    // (সিমুলেটেড)
    document.getElementById('runAllBtn').textContent = '⏳ Running...';
    setTimeout(() => {
        document.getElementById('runAllBtn').textContent = '✅ Done!';
        setTimeout(() => {
            document.getElementById('runAllBtn').innerHTML = '<i class="fas fa-play"></i> Run All Agents';
        }, 2000);
    }, 3000);

    // ইনবক্সে নোটিফিকেশন
    const inbox = getInbox();
    inbox.push({
        id: Date.now(),
        time: 'Just now',
        title: '🚀 All Agents Executed',
        preview: 'All 10 agents completed their tasks successfully.',
        badge: 'Success',
        read: false,
        timestamp: Date.now()
    });
    saveInbox(inbox);
    updateInboxUI();
}

function pauseAllAgents() {
    console.log('⏸️ সব এজেন্ট পজ করা হলো');
    // (সিমুলেটেড)
    document.getElementById('pauseAllBtn').textContent = '⏸️ Paused';
    setTimeout(() => {
        document.getElementById('pauseAllBtn').innerHTML = '<i class="fas fa-pause"></i> Pause';
    }, 2000);
}

// ===== ডেটা এক্সপোর্ট/ইমপোর্ট =====
window.downloadData = downloadAllData;
window.uploadData = uploadAllData;
window.logout = logout;

// অ্যাপ লোড (যদি লগইন করা থাকে)
document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('loggedIn') === 'true') {
        loadApp();
    }
});