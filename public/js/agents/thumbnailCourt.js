// ============================================
// THUMBNAIL COURT AGENT
// ============================================

class ThumbnailCourtAgent {
    constructor() {
        this.name = 'Thumbnail Court';
        this.icon = '🖼️';
        this.router = getRouter();
        this.tracker = getTokenTracker();
        this.perf = getPerfTracker();
    }

    async judgeThumbnail(topic, hook, visualIdea) {
        const startTime = Date.now();
        
        const messages = [
            { role: 'system', content: `You are the Thumbnail Court. Judge this visual idea.
            Judges:
            - MrBeast: Is it instantly understandable and big enough?
            - Gary Vee: Does it grab attention in the feed?
            - Hormozi: Does it make the promise feel valuable?
            - Ali Abdaal: Is it too confusing or crowded?
            - Justin Welsh: Does it fit the brand?
            - Dan Koe: Does it connect to money/leverage?
            - Ryan Reynolds: Does it have personality?
            - Seth Godin: Is it different enough?
            
            Give score 1-10 and feedback from each judge.` },
            { role: 'user', content: `Topic: ${topic}\nHook: ${hook}\nVisual Idea: ${visualIdea}` }
        ];

        const result = await this.router.chat('thumbnailCourt', messages, { temperature: 0.5 });
        const time = (Date.now() - startTime) / 1000;

        if (result.success) {
            this.tracker.track('thumbnailCourt', result.model, result.tokens);
            this.perf.track('thumbnailCourt', result.model, true, time, result.tokens);
        } else {
            this.perf.track('thumbnailCourt', 'unknown', false, time, 0);
        }

        return result;
    }
}