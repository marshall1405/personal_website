// === INTRO ANIMATION ===
const overlay = document.querySelector('.intro-overlay');

setTimeout(() => {
    overlay.classList.add('hidden');
    document.body.classList.remove('is-intro');
    overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
}, 800);


// === YOUTUBE STATS ===
// YT_API_KEY and YT_CHANNEL_ID are loaded from config.js (gitignored)
async function fetchYouTubeStats() {
    if (YT_API_KEY === 'YOUR_API_KEY_HERE' || YT_CHANNEL_ID === 'YOUR_CHANNEL_ID_HERE') return;
    try {
        const res  = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${YT_CHANNEL_ID}&key=${YT_API_KEY}`);
        const data = await res.json();
        const stats = data.items?.[0]?.statistics;
        if (!stats) return;
        const fmt = n => Number(n).toLocaleString();
        document.getElementById('yt-subs').textContent   = fmt(stats.subscriberCount);
        document.getElementById('yt-views').textContent  = fmt(stats.viewCount);
        document.getElementById('yt-videos').textContent = fmt(stats.videoCount);
    } catch (e) {
        console.error('YouTube stats fetch failed:', e);
    }
}

fetchYouTubeStats();

// === NAV ===
const navBtns = document.querySelectorAll('.nav-btn');
const panels  = document.querySelectorAll('.panel');

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        navBtns.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const target = document.getElementById(btn.dataset.target);
        if (target) target.classList.add('active');
    });
});
