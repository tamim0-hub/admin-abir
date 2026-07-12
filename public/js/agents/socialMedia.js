// ============================================
// SOCIAL MEDIA AGENT
// ============================================

class SocialMediaAgent {
    constructor() {
        this.name = 'Social Media';
        this.icon = '📱';
        this.router = getRouter();
        this.tracker = getTokenTracker();
        this.perf = getPerfTracker();
    }

    async generatePost(topic, goal) {
        const startTime = Date.now();
        
        const messages = [
            { role: 'system', content: `You are a Social Media Agent. Write engaging Bangla posts.
            Goal: ${goal || 'engagement'}.
            Format: Hook → Body → CTA → Hashtags.
            Write in natural Bangla, conversational, friendly.` },
            { role: 'user', content: `Topic: ${topic}` }
        ];

        const result = await this.router.chat('socialMedia', messages, { temperature: 0.8 });
        const time = (Date.now() - startTime) / 1000;

        if (result.success) {
            this.tracker.track('socialMedia', result.model, result.tokens);
            this.perf.track('socialMedia', result.model, true, time, result.tokens);
        } else {
            this.perf.track('socialMedia', 'unknown', false, time, 0);
        }

        return result;
    }

    async analyzeProfile(profileUrl) {
        // প্রোফাইল ব্রাউজ করে অ্যানালাইসিস
        // (API ছাড়া, শুধু লিংক থেকে তথ্য নেয়)
        const startTime = Date.now();
        
        const messages = [
            { role: 'system', content: `You are a Social Media Analyst. Analyze this profile and give insights.
            Check: bio, post frequency, engagement, comments, content quality.
            Give score 1-10 and suggestions.` },
            { role: 'user', content: `Profile URL: ${profileUrl}` }
        ];

        const result = await this.router.chat('socialMedia', messages, { temperature: 0.4 });
        const time = (Date.now() - startTime) / 1000;

        if (result.success) {
            this.tracker.track('socialMedia', result.model, result.tokens);
            this.perf.track('socialMedia', result.model, true, time, result.tokens);
        } else {
            this.perf.track('socialMedia', 'unknown', false, time, 0);
        }

        return result;
    }
}