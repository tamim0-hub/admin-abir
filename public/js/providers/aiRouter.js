// ============================================
// AI ROUTER - স্মার্ট রাউটিং সিস্টেম
// ============================================

class AIRouter {
    constructor() {
        this.providers = {};
        this.defaultProvider = null;
        this.modelMap = {};
    }

    addProvider(name, provider) {
        this.providers[name] = provider;
        if (!this.defaultProvider) {
            this.defaultProvider = name;
        }
    }

    setModelMap(map) {
        this.modelMap = map;
    }

    async getProvider(agent) {
        // সেটিংস থেকে মডেল ম্যাপ লোড
        const settings = getSettings();
        const model = settings?.models?.[agent] || this.modelMap[agent] || 'mixtral-8x7b';

        // কোন প্রোভাইডার ব্যবহার করবে?
        // বর্তমানে শুধু Groq
        const providerName = this.defaultProvider || 'groq';
        const provider = this.providers[providerName];

        if (!provider) {
            throw new Error(`❌ ${providerName} প্রোভাইডার পাওয়া যায়নি!`);
        }

        return { provider, model };
    }

    async chat(agent, messages, options = {}) {
        const { provider, model } = await this.getProvider(agent);
        return await provider.chat(messages, model, options);
    }
}

// সিঙ্গেলটন ইন্সট্যান্স
let routerInstance = null;

function getRouter() {
    if (!routerInstance) {
        routerInstance = new AIRouter();
        
        // Groq প্রোভাইডার যোগ (সেটিংস থেকে কী নিবে)
        const settings = getSettings();
        const key1 = settings?.groqKey1 || '';
        const key2 = settings?.groqKey2 || '';
        
        // প্রথম কী দিয়ে প্রোভাইডার তৈরি
        const groq = new GroqProvider(key1 || key2);
        routerInstance.addProvider('groq', groq);

        // মডেল ম্যাপ সেট (ডিফল্ট)
        routerInstance.setModelMap({
            leader: 'mixtral-8x7b',
            cartRecovery: 'mixtral-8x7b',
            thumbnailCourt: 'mixtral-8x7b',
            seoAgent: 'mixtral-8x7b',
            socialMedia: 'llama-3.3-70b',
            videoGenerator: 'llama-3.3-70b',
            productSourcing: 'llama-3.1-8b',
            priceUpdate: 'llama-3.1-8b',
            orderFulfillment: 'llama-3.1-8b',
            inventoryAlert: 'gemma-7b'
        });
    }
    return routerInstance;
}