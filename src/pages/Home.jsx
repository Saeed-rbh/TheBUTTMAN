import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    const [mintQty, setMintQty] = useState(1);
    const [mintText, setMintText] = useState('MINT NOW');
    const peachContainerRef = useRef(null);
    const powContainerRef = useRef(null);
    const heroImgRef = useRef(null);

    // Add peach rain
    useEffect(() => {
        const createPeach = () => {
            if (!peachContainerRef.current) return;
            const peach = document.createElement('div');
            peach.classList.add('peach');
            peach.innerText = '🍑';
            peach.style.left = Math.random() * 100 + 'vw';
            peach.style.animationDuration = Math.random() * 3 + 2 + 's';
            peachContainerRef.current.appendChild(peach);
            setTimeout(() => { peach.remove(); }, 5000);
        };
        const interval = setInterval(createPeach, 800);
        return () => clearInterval(interval);
    }, []);

    // Scroll Observer and 3D Cards
    useEffect(() => {
        const handleCardMove = (e, card) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -20;
            const rotateY = ((x - centerX) / centerX) * 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        };
        const cards = document.querySelectorAll('.about-card');
        cards.forEach(card => {
            card.onmousemove = (e) => handleCardMove(e, card);
            card.onmouseleave = () => { card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`; card.style.transition = 'transform 0.5s ease-out'; };
            card.onmouseenter = () => { card.style.transition = 'none'; };
        });

        return () => {
            cards.forEach(card => {
                card.onmousemove = null;
                card.onmouseleave = null;
                card.onmouseenter = null;
            });
        };
    }, []);

    const triggerNolanMode = (e) => {
        e.preventDefault();
        const portal = document.createElement('div');
        portal.className = 'portal-transition';
        portal.style.left = e.clientX + 'px';
        portal.style.top = e.clientY + 'px';
        document.body.appendChild(portal);

        requestAnimationFrame(() => {
            setTimeout(() => portal.classList.add('expand'), 10);
        });

        setTimeout(() => {
            portal.remove();
            navigate('/nolan');
        }, 1200);
    };

    const handleHeroClick = (e) => {
        if (!heroImgRef.current || !powContainerRef.current) return;
        const randomRotate = Math.floor(Math.random() * 360);
        const randomScale = 0.8 + Math.random() * 0.7;

        heroImgRef.current.style.transform = `rotate(${randomRotate}deg) scale(${randomScale})`;
        heroImgRef.current.style.transition = 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

        setTimeout(() => heroImgRef.current.style.transform = '', 600);

        const pow = document.createElement('div');
        pow.classList.add('pow-bubble');
        const sfx = ['POW!', 'BAM!', 'ZAP!', 'WHACK!', 'BOOP!'];
        pow.innerText = sfx[Math.floor(Math.random() * sfx.length)];
        pow.style.left = (e.clientX - 50 + (Math.random() * 100 - 50)) + 'px';
        pow.style.top = (e.clientY - 50 + (Math.random() * 100 - 50)) + 'px';
        powContainerRef.current.appendChild(pow);
        setTimeout(() => pow.remove(), 600);
    };

    const handleCrazySpin = () => {
        document.body.classList.add('spinning-chaos');
        setTimeout(() => {
            alert("WHAT HAVE YOU DONE?!");
            document.body.classList.remove('spinning-chaos');
        }, 3000);
    };

    return (
        <div>
            <div ref={powContainerRef} id="pow-container"></div>
            <div ref={peachContainerRef} id="peach-rain"></div>

            <div className="wacky-marquee">
                <div className="marquee-content">
                    🦸‍♂️ WARNING: THE HERO HAS ARRIVED 🌈 PROTECTING THE BLOCKCHAIN ONE CHEEK AT A TIME 🍑 JUSTICE NEVER LOOKED SO WEIRD 🦸‍♂️ 🦸‍♂️ WARNING: THE HERO HAS ARRIVED 🌈 PROTECTING THE BLOCKCHAIN ONE CHEEK AT A TIME 🍑 JUSTICE NEVER LOOKED SO WEIRD 🦸‍♂️
                </div>
            </div>

            <nav className="navbar">
                <div className="logo">THE BUTTMAN</div>
                <ul className="nav-links">
                    <li><a href="#story">The Squad</a></li>
                    <li><a href="#gallery">Gallery</a></li>
                    <li><a href="#roadmap">The Journey</a></li>
                </ul>
                <button className="wallet-btn" onClick={() => window.location.href = '/whitelist'}>Join NFT Whitelist</button>
            </nav>

            <main>
                <section className="hero">
                    <div className="hero-bg-burst"></div>
                    <div className="hero-content">
                        <div className="comic-issue-sticker">ISSUE #1<br />GENESIS</div>
                        <h1 className="glitch-text" data-text="MEET THE BUTTMAN">MEET THE BUTTMAN</h1>
                        <p className="subtitle">He's got eyes on his cheeks and rainbows on his feet. The most bizarre and wonderful NFT you'll ever own.</p>
                        <div className="cta-group">
                            <button className="primary-btn bounce-on-hover" onClick={() => window.location.href = '/whitelist'}>Join Whitelist 🎟️</button>
                            <button className="secondary-btn">Join Discord</button>
                        </div>
                        <div className="social-icons">
                            <a href="https://x.com/thebuttman_nft" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="X (Twitter)">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </a>
                            <a href="#" className="social-icon" aria-label="Discord">
                                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" /></svg>
                            </a>
                        </div>
                    </div>
                    <div className="hero-image-container">
                        <img
                            ref={heroImgRef}
                            src="/assets/character.PNG"
                            alt="THE BUTTMAN Character"
                            className="floating-img"
                            onClick={handleHeroClick}
                            style={{ cursor: 'pointer' }}
                        />
                        <div className="shadow"></div>
                    </div>
                </section>

                <section id="story" className="story-section">
                    <img className="story-ghost-bg" src="/assets/character.PNG" alt="" />
                    <div className="story-container">
                        <div className="story-grid">
                            <div className="story-text-col">
                                <h2 className="section-title wobbly-text" style={{ textAlign: 'left', marginBottom: '1.5rem', fontSize: '3rem' }}>See Behind You:<br />The Squad</h2>
                                <p className="story-text" style={{ marginBottom: '1.5rem' }}>
                                    The Web3 space is a crazy, unpredictable circus. While most are busy looking straight ahead and getting blindsided by the next big rug pull, the real visionaries rely on a different sense. To survive the blockchain, you need a silent-but-deadly early warning system.
                                </p>
                                <p className="story-text">
                                    Enter THE BUTTMAN: his cheeks start clapping the moment danger approaches, sounding the alarm 💨 before the charts can even dump. Consisting of 3,333 entirely unique BUTTMAN NFTs, this is an elite community built for the true weirdos of Web3.
                                </p>
                            </div>
                            <div className="story-quote-col">
                                <div className="comic-quote-box">
                                    <div className="pow-sticker">BAM!</div>
                                    <blockquote>
                                        "With an eye on each cheek, THE BUTTMAN sees the chaos coming before anyone else, alarming the squad with a tactical fart. Our vision is to protect the blockchain... backwards. *pbbbt* 💨"
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* NFT Gallery Showcase */}
                <section id="gallery" className="gallery-section">
                    <h2 className="section-title">THE ROGUES GALLERY</h2>
                    <div className="gallery-scroll-wrapper">
                        <div className="gallery-row gallery-row-left">
                            {[...Array(2)].flatMap(() => [
                                { name: 'The Dark Butt', img: '/assets/batman/The_Dark_Butt/1.png' },
                                { name: 'Doc Butto', img: '/assets/batman/Doc_Butto/1.png' },
                                { name: 'Butt Bane', img: '/assets/batman/Butt_Bane/1.png' },
                                { name: 'Harvey Two Butt', img: '/assets/batman/Harvey_Two_Butt/1.png' },
                                { name: 'Mr Freeze Butt', img: '/assets/batman/Mr_Freeze_Butt/1.png' },
                            ]).map((c, i) => (
                                <div className="gallery-card" key={`r1-${i}`}>
                                    <div className="card-top-pin"></div>
                                    <img src={c.img} alt={c.name} />
                                    <div className="character-name">{c.name}</div>
                                </div>
                            ))}
                        </div>
                        <div className="gallery-row gallery-row-right">
                            {[...Array(2)].flatMap(() => [
                                { name: 'Poison Butt-vy', img: '/assets/batman/Poison_Butt_vy/1.png' },
                                { name: 'Ras al Butt', img: '/assets/batman/Ras_al_Butt/1.png' },
                                { name: 'The Butt-dler', img: '/assets/batman/The_Butt_dler/1.png' },
                                { name: 'The Scare Butt', img: '/assets/batman/The_Scare_Butt/1.png' },
                                { name: 'The Dark Butt v2', img: '/assets/batman/The_Dark_Butt/2.png' },
                            ]).map((c, i) => (
                                <div className="gallery-card" key={`r2-${i}`}>
                                    <div className="card-top-pin"></div>
                                    <img src={c.img} alt={c.name} />
                                    <div className="character-name">{c.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="roadmap" className="roadmap-section">
                    <h2 className="section-title bouncy-text">THE JOURNEY</h2>
                    <p className="roadmap-summary" style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '1.2rem' }}>
                        3,333 unique BUTTMAN NFTs. Your Web3 digital identity and AI agent.
                    </p>
                    <div className="timeline">
                        {[
                            {
                                step: '1',
                                title: 'Phase 1: Genesis',
                                items: [
                                    'Limited collabs with strong DAOs',
                                    'WL for creators, meme makers and supporters',
                                    'Genesis collection launch',
                                    'Secondary market integrations'
                                ]
                            },
                            {
                                step: '2',
                                title: 'Phase 2: Mainnet Beta',
                                items: [
                                    'Ecosystem partnerships for NFT holders',
                                    'Early access for BUTTMAN holders',
                                    'Loculus Beta launch'
                                ]
                            },
                            {
                                step: '3',
                                title: 'Phase 3: Expansion',
                                items: [
                                    'Platform mainnet launch',
                                    '$LCLS tokenomics announcement',
                                    'Airdrop checker for holders & users',
                                    'TGE (Token Generation Event)'
                                ]
                            }
                        ].map((item, idx) => {
                            const colors = ['cyan', 'yellow', 'red'];
                            const phaseColor = colors[idx % 3];
                            const branchClass = idx % 2 === 0 ? 'left-branch' : 'right-branch';
                            return (
                                <div className={`timeline-item ${branchClass} phase-${phaseColor}`} key={idx}>
                                    <div className="timeline-dot">{item.step}</div>
                                    <div className="timeline-content comic-panel">
                                        <h3>{item.title}</h3>
                                        <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem', textAlign: 'left', lineHeight: '1.6' }}>
                                            {item.items.map((listItem, i) => (
                                                <li key={i}>{listItem}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </main>

            <footer className="site-footer">
                <div className="footer-grid">
                    <div className="footer-col">
                        <div className="logo" style={{ marginBottom: '1rem' }}>THE BUTTMAN</div>
                        <p className="footer-desc">10,000 unique BUTTMAN NFTs. The most bizarre and wonderful collection on the blockchain.</p>
                    </div>
                    <div className="footer-col">
                        <h4>Collection</h4>
                        <ul>
                            <li><a href="#roadmap">The Journey</a></li>
                            <li><a href="#gallery">Rogues Gallery</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Community</h4>
                        <ul>
                            <li><a href="https://x.com/thebuttman_nft" target="_blank" rel="noopener noreferrer">X (Twitter)</a></li>
                            <li><a href="#">Discord</a></li>
                            <li><a href="#">OpenSea</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Tools</h4>
                        <ul>
                            <li><a href="/whitelist">Whitelist</a></li>
                            <li><a href="/nolan">Nolan Mode</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2026 THE BUTTMAN Project. No butts were harmed in the making of this site.</p>
                    <div className="social-icons">
                        <a href="https://x.com/thebuttman_nft" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="X">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                        </a>
                        <a href="#" className="social-icon" aria-label="Discord">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" /></svg>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
