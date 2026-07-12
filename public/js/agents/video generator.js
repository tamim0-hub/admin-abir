// ============================================
// VIDEO GENERATOR AGENT
// ============================================

class VideoGeneratorAgent {
    constructor() {
        this.name = 'Video Generator';
        this.icon = '🎬';
        this.router = getRouter();
        this.tracker = getTokenTracker();
        this.perf = getPerfTracker();
    }

    async generateVideoScript(story, product) {
        const startTime = Date.now();
        
        const messages = [
            { role: 'system', content: `You are a Video Generator Agent. Create 60-second video script (6 scenes x 10 seconds).
            Format: 
            Scene 1: Hook (0-10s)
            Scene 2: Problem (10-20s)
            Scene 3: Solution (20-30s)
            Scene 4: Proof (30-40s)
            Scene 5: Offer (40-50s)
            Scene 6: CTA (50-60s)
            
            For each scene: imagePrompt, videoPrompt, onScreenText, voiceover, music, transition.
            Return as JSON.` },
            { role: 'user', content: `Story: ${story}\nProduct: ${product}` }
        ];

        const result = await this.router.chat('videoGenerator', messages, { temperature: 0.8 });
        const time = (Date.now() - startTime) / 1000;

        if (result.success) {
            this.tracker.track('videoGenerator', result.model, result.tokens);
            this.perf.track('videoGenerator', result.model, true, time, result.tokens);
            try {
                return JSON.parse(result.content);
            } catch {
                return { error: 'Parse failed', raw: result.content };
            }
        } else {
            this.perf.track('videoGenerator', 'unknown', false, time, 0);
            return { error: result.error };
        }
    }
}