document.addEventListener('DOMContentLoaded', () => {
    const options = {
        sharedContext: 'Summarize the following text',
        type: 'key-points',
        format: 'markdown',
        length: 'medium',
    };

    async function initSummarizer() {
        if (!('ai' in self) || !('summarizer' in self.ai)) {
            document.getElementById('result').textContent = "Summarizer API not supported";
            return null;
        }

        const available = (await self.ai.summarizer.capabilities()).available;
        let summarizer;

        try {
            if (available === 'readily' || available === 'downloadable') {
                summarizer = await self.ai.summarizer.create(options);

                if (available === 'downloadable') {
                    summarizer.addEventListener('downloadprogress', (e) => {
                        console.log(`Download progress: ${e.loaded}/${e.total}`);
                    });
                    await summarizer.ready;
                }
                return summarizer;
            } else {
                document.getElementById('result').textContent = "Summarizer API not available";
                return null;
            }
        } catch (error) {
            document.getElementById('result').textContent = `Error initializing summarizer: ${error.message}`;
            return null;
        }
    }

    async function summarizeText(text) {
        const loadingEl = document.getElementById('loading');
        const resultEl = document.getElementById('result');
        

        try {
            const summarizer = await initSummarizer();
            if (!summarizer) return;

            const result = await summarizer.summarize(text);
            loadingEl.style.display = 'none';
            resultEl.textContent = result;

            summarizer.destroy();

        } catch (error) {
            loadingEl.style.display = 'none';
            resultEl.textContent = `Error generating summary: ${error.message}`;
        }
    }

    chrome.runtime.onMessage.addListener((message) => {
        if (message.type === 'textSelected') {
            summarizeText(message.text);
        }
    });
});