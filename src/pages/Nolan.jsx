import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StoryCard from '../components/StoryCard';

const CHARACTERS = [
    { folder: 'The_Dark_Butt', title: 'The Dark Butt', text: 'He is vengeance. He is the night. He is inexplicably uncomfortable to sit on.' },
    { folder: 'Harvey_Two_Butt', title: 'Harvey Two-Butt', text: 'Once a hero, his face was scarred... replacing it completely with a sentient gluteus maximus.' },
    { folder: 'Butt_Bane', title: 'Butt-Bane', text: '"You think cheeks are your ally? I was born in them." His only weakness is finding pants that fit.' },
    { folder: 'Doc_Butto', title: 'Doc Butto', text: 'From the wrong universe! Four mechanical tentacles on his rear end make him immensely terrifying.' },
    { folder: 'The_Scare_Butt', title: 'The Scare-Butt', text: 'Uses fear toxin to plunge victims into terrifying hallucinations made entirely of tight denim.' },
    { folder: 'Ras_al_Butt', title: "Ra's al Butt", text: 'Seeks to cleanse Gotham via an orbital strike of giant, devastatingly stinky athletic socks.' },
    { folder: 'The_Butt_dler', title: 'The Butt-dler', text: 'Leaves infuriating puzzles involving the mathematics of complicated seating arrangements.' },
    { folder: 'Poison_Butt_vy', title: 'Poison Butt-vy', text: 'Mutating harmless poison ivy into dangerous wedgie-inducing superhero-trapping vines.' },
    { folder: 'Mr_Freeze_Butt', title: 'Mr Freeze-Butt', text: 'Driven by tragedy to wield the coldest, most rigid buns in the entire criminal underworld.' }
];

export default function Nolan() {
    const navigate = useNavigate();

    // Dark body + horizontal scroll override
    useEffect(() => {
        document.body.classList.add('nolan-page');
        const origOverflowY = document.body.style.overflowY;
        const origOverflowX = document.body.style.overflowX;
        document.body.style.overflowY = 'hidden';
        document.body.style.overflowX = 'auto';

        const handleWheel = (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                window.scrollBy({ left: e.deltaY * 1.5, behavior: 'auto' });
            }
        };
        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            document.body.classList.remove('nolan-page');
            document.body.style.overflowY = origOverflowY;
            document.body.style.overflowX = origOverflowX;
            window.removeEventListener('wheel', handleWheel);
        };
    }, []);

    // IntersectionObserver — delayed so React has committed all children to the DOM
    useEffect(() => {
        const timer = setTimeout(() => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    } else {
                        entry.target.classList.remove('in-view');
                    }
                });
            }, { root: null, rootMargin: '0px -15% 0px -15%', threshold: 0.3 });

            document.querySelectorAll('.story-card').forEach(card => observer.observe(card));
            return () => observer.disconnect();
        }, 150);

        return () => clearTimeout(timer);
    }, []);

    const handleReturn = (e) => {
        e.preventDefault();
        const portal = document.getElementById('un-portal');
        portal.style.left = e.clientX + 'px';
        portal.style.top = e.clientY + 'px';
        requestAnimationFrame(() => {
            portal.style.transform = 'translate(-50%, -50%) scale(150) rotate(-720deg)';
        });
        setTimeout(() => navigate('/'), 1200);
    };

    return (
        <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', width: 'max-content', fontFamily: 'Impact, sans-serif' }}>
            {/* Blob portal for return transition */}
            <div id="un-portal" style={{
                position: 'fixed', top: '50%', left: '50%',
                width: '80px', height: '80px',
                background: '#ff85c2',
                borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                transform: 'translate(-50%, -50%) scale(0) rotate(0deg)',
                zIndex: 99999,
                transition: 'transform 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                pointerEvents: 'none',
                boxShadow: 'inset -20px -20px 0 rgba(255,255,255,0.4), 0 0 100px #ffe100'
            }}></div>

            <div className="nolan-header" style={{ position: 'fixed', top: 0, width: '100vw', padding: '1rem 3%', zIndex: 1000, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(to bottom, rgba(15,23,42,1) 0%, transparent 100%)', boxSizing: 'border-box' }}>
                <h2 style={{ color: '#ff3333', letterSpacing: '5px', margin: 0 }}>THE ROGUES MAP</h2>
                <button className="back-btn" onClick={handleReturn} style={{ cursor: 'pointer' }}>🔙 RETURN TO THE LIGHT</button>
            </div>

            <div className="scroll-hint">SCROLL HORIZONTALLY ➔</div>

            <div style={{ display: 'flex', alignItems: 'center', height: '100vh', padding: '0 10vw', width: 'max-content', position: 'relative' }}>
                {/* Animated dashed timeline */}
                <div className="timeline-path"></div>

                {/* Intro text block */}
                <div style={{ minWidth: '440px', maxWidth: '440px', marginRight: '6rem', marginLeft: '2rem', color: '#cbd5e1', fontSize: '1.1rem', lineHeight: 1.6, zIndex: 1, fontFamily: "'Mali', cursive" }}>
                    <h1 style={{ color: '#ff3333', fontSize: '4rem', letterSpacing: '2px', marginBottom: '1rem', lineHeight: 1, fontFamily: 'Impact, sans-serif', textShadow: '3px 3px 0 #000' }}>THE DESCENT</h1>
                    <p>What happens when a colorful, radiant superhero loses his way? He gets <strong>rebooted</strong> into a gritty, cinematic universe full of brooding stares and moral ambiguity.</p>
                    <p style={{ marginTop: '1rem' }}>Welcome to the <strong>Dark Side of the Butt</strong>. As you travel through these archives, you will witness the tragic, unfortunate origins that birthed the worst (and most uncomfortably seated) villains Gotham has ever seen...</p>
                </div>

                {/* Character cards */}
                {CHARACTERS.map((char, i) => (
                    <StoryCard key={i} folder={char.folder} title={char.title} text={char.text} />
                ))}

                <div style={{ minWidth: '10vw' }}></div>
            </div>
        </div>
    );
}
