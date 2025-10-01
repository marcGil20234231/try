import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

const SAMPLE_GAMES = [
  {
    id: 1,
    title: 'Apex of Legends',
    tagline: 'A new era of champions',
    img: 'https://picsum.photos/800/450?random=1',
    platforms: ['PC', 'Console'],
  },
  {
    id: 2,
    title: 'Shadow Protocol',
    tagline: 'Stealth meets overload',
    img: 'https://picsum.photos/800/450?random=2',
    platforms: ['PC'],
  },
  {
    id: 3,
    title: 'Arcane Drift',
    tagline: 'Magic crashes the net',
    img: 'https://picsum.photos/800/450?random=3',
    platforms: ['PC', 'Mobile'],
  },
  {
    id: 4,
    title: 'Steel Rebellion',
    tagline: 'Riot on the streets',
    img: 'https://picsum.photos/800/450?random=4',
    platforms: ['Console'],
  },
];

const SAMPLE_NEWS = [
  { id: 1, title: 'Patch 2.1: Balance Update', summary: 'Champion tuning and bug fixes.', icon: '🔧' },
  { id: 2, title: 'Season Pass Live', summary: 'New rewards and events available.', icon: '🎟️' },
  { id: 3, title: 'Developer Livestream', summary: 'Behind the scenes with the team.', icon: '🎙️' },
];

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef(null);
  const cardsRef = useRef([]);
  const navRef = useRef(null);
  const newsRef = useRef(null);

  useEffect(() => {
    // Simulate loading
    const t = setTimeout(() => setLoaded(true), 1100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    // Entrance animations
    const tl = gsap.timeline();
    tl.from(navRef.current, { y: -30, autoAlpha: 0, duration: 0.6 });
    tl.from(heroRef.current, { y: 40, autoAlpha: 0, duration: 0.8 }, '-=0.3');
    tl.from(cardsRef.current, { y: 20, autoAlpha: 0, stagger: 0.12, duration: 0.6 }, '-=0.4');
    tl.from(newsRef.current, { x: 20, autoAlpha: 0, duration: 0.8 }, '-=0.5');

    // neon pulse
    gsap.to('.cta', { boxShadow: '0 0 20px rgba(99,102,241,0.45)', repeat: -1, yoyo: true, duration: 1.8 });
  }, [loaded]);

  // Simple carousel
  const [newsIndex, setNewsIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setNewsIndex((i) => (i + 1) % SAMPLE_NEWS.length), 4500);
    return () => clearInterval(id);
  }, []);

  // Parallax mouse
  useEffect(() => {
    function motion(e) {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      gsap.to('.bg-plate', { x, y, duration: 1.2, ease: 'power3.out' });
    }
    window.addEventListener('mousemove', motion);
    return () => window.removeEventListener('mousemove', motion);
  }, []);

  return (
    <div className="min-h-screen font-sans text-gray-100 bg-[#06060b] overflow-x-hidden">
      {/* Background layers */}
      <div aria-hidden className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#050212] via-[#071129] to-[#12040a] opacity-95" />
        <div className="absolute inset-0 bg-plate -z-20" />
        <div className="pointer-events-none absolute inset-0">
          <div className="bg-gradient-to-r from-transparent via-[#3b82f6]/7 to-transparent h-full w-full" />
        </div>
      </div>

      {/* Loading overlay */}
      {!loaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000cc]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-full border-4 border-[#7c3aed] border-t-transparent animate-spin" />
            <div className="text-sm text-[#c7b3ff] tracking-wide">LOADING ASSETS</div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav ref={navRef} className="sticky top-0 z-40 backdrop-blur-md bg-black/30 border-b border-[#2b1a3a]/30">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] shadow-[0_0_20px_rgba(124,58,237,0.12)] flex items-center justify-center font-extrabold text-lg">RG</div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold tracking-wide neon-text">RGNs Collective</h1>
              <p className="text-xs text-[#a6b0d6]">Games — Updates — News</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ul className="hidden md:flex gap-6 items-center text-sm tracking-wide">
              <li className="nav-link">Home</li>
              <li className="nav-link">Games</li>
              <li className="nav-link">Updates</li>
              <li className="nav-link">Community</li>
            </ul>
            <div className="flex items-center gap-3">
              <button className="px-3 py-1 rounded-md text-sm border border-[#3b2a55]/30">Sign in</button>
              <button className="px-4 py-1 rounded-md bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] neon-btn cta">Get Started</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header ref={heroRef} className="max-w-7xl mx-auto px-6 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="uppercase text-xs tracking-widest text-[#9aa6ff] mb-3">NEW RELEASE</div>
            <h2 className="text-4xl sm:text-6xl font-extrabold leading-tight neon-header">Apex of Legends</h2>
            <p className="mt-4 max-w-xl text-[#bfc9ff]/80">Dive into a fast-paced competitive battleground. New champions, a reworked ranked ladder, and a soundtrack that hits like thunder.</p>

            <div className="mt-8 flex gap-4">
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] neon-btn cta">Play Now</button>
              <button className="px-4 py-3 rounded-lg border border-[#3b2a55]/40">Patch Notes</button>
            </div>

            <div className="mt-8 flex gap-4 text-sm text-[#9aa6ff]">
              <div className="flex items-center gap-2"><span className="text-[#7c3aed] font-bold">Servers</span> Online</div>
              <div className="flex items-center gap-2"><span className="text-[#06b6d4] font-bold">Players</span> 1.2M</div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-plate rounded-2xl overflow-hidden shadow-2xl border border-[#2b1a3a]/30">
              <img src={SAMPLE_GAMES[0].img} alt="hero" loading="lazy" className="w-full h-64 sm:h-80 object-cover transform hover:scale-105 transition-transform duration-700" />
              <div className="p-4">
                <h3 className="font-bold text-lg">{SAMPLE_GAMES[0].title}</h3>
                <p className="text-sm text-[#bfc9ff]/70">{SAMPLE_GAMES[0].tagline}</p>
              </div>
            </div>

            <div className="absolute -inset-2 -z-10 rounded-3xl bg-gradient-to-r from-[#7c3aed]/20 via-[#06b6d4]/12 to-[#ef4444]/8 blur-2xl" />
          </div>
        </div>
      </header>

      {/* Game Cards */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold neon-sub">Featured Games</h3>
          <div className="text-sm text-[#9aa6ff]">Discover our latest & most popular titles</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAMPLE_GAMES.map((g, i) => (
            <article
              key={g.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group relative rounded-xl overflow-hidden border border-[#2b1a3a]/30 bg-[#07050a]/60 backdrop-blur-md hover:scale-[1.02] transition-transform duration-400"
            >
              <img src={g.img} alt={g.title} loading="lazy" className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="p-4">
                <h4 className="font-semibold text-lg neon-card">{g.title}</h4>
                <p className="text-sm text-[#bfc9ff]/70">{g.tagline}</p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs text-[#9aa6ff]">{g.platforms.join(' • ')}</div>
                  <button className="px-3 py-1 rounded-md border border-[#3b2a55]/30 text-sm hover:scale-105 transition-transform">View</button>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed]/12 via-transparent to-[#ef4444]/12" />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* News / Updates */}
      <section className="max-w-7xl mx-auto px-6 py-12" ref={newsRef}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold neon-sub">Latest Updates</h3>
          <div className="flex items-center gap-3">
            <button onClick={() => setNewsIndex((i) => (i - 1 + SAMPLE_NEWS.length) % SAMPLE_NEWS.length)} className="p-2 rounded-md border">◀</button>
            <button onClick={() => setNewsIndex((i) => (i + 1) % SAMPLE_NEWS.length)} className="p-2 rounded-md border">▶</button>
          </div>
        </div>

        <div className="relative">
          <div className="h-36 rounded-xl border border-[#2b1a3a]/30 bg-[#07050a]/40 p-6 flex items-center gap-6">
            <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-[#111214] border border-[#3b2a55]/30 text-2xl">{SAMPLE_NEWS[newsIndex].icon}</div>
            <div>
              <h4 className="font-semibold text-lg neon-card">{SAMPLE_NEWS[newsIndex].title}</h4>
              <p className="text-sm text-[#bfc9ff]/70">{SAMPLE_NEWS[newsIndex].summary}</p>
            </div>
          </div>

          <div className="mt-4 flex gap-3 text-sm text-[#9aa6ff]">
            {SAMPLE_NEWS.map((n, idx) => (
              <button key={n.id} className={`px-3 py-1 rounded ${idx === newsIndex ? 'bg-[#1b1330] border' : 'bg-transparent'}`} onClick={() => setNewsIndex(idx)}>
                {n.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 border-t border-[#2b1a3a]/30 bg-gradient-to-t from-transparent to-[#000000]/30">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] flex items-center justify-center font-extrabold">RG</div>
            <p className="mt-3 text-sm text-[#9aa6ff]">Riot-inspired showcase template. Replace with real branding and assets as appropriate.</p>
          </div>

          <div className="flex flex-col">
            <h5 className="font-semibold neon-sub">Newsletter</h5>
            <p className="text-sm text-[#9aa6ff] mt-2">Get the latest updates and drops.</p>
            <div className="mt-4 flex gap-2">
              <input className="flex-1 rounded-md px-3 py-2 bg-[#0b0a0f] border border-[#2b1a3a]/30" placeholder="email@example.com" />
              <button className="px-4 py-2 rounded-md bg-[#7c3aed]">Subscribe</button>
            </div>
          </div>

          <div className="flex flex-col items-start">
            <h5 className="font-semibold neon-sub">Follow</h5>
            <div className="mt-3 flex gap-3">
              <a className="p-2 rounded-md border border-[#2b1a3a]/30">TW</a>
              <a className="p-2 rounded-md border border-[#2b1a3a]/30">YT</a>
              <a className="p-2 rounded-md border border-[#2b1a3a]/30">DC</a>
            </div>
            <p className="text-xs text-[#8f9ad1] mt-4">© {new Date().getFullYear()} RGN Collective. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
