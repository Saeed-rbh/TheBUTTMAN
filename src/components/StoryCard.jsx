import React, { useState, useEffect, useRef } from 'react';

export default function StoryCard({ folder, title, text }) {
    const basePath = `/assets/batman/${folder}`;
    const [images, setImages] = useState([`${basePath}/1.png`]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(null);
    const peekTimer = useRef(null);

    // Probe for 2–10 variants lazily
    useEffect(() => {
        const found = [`${basePath}/1.png`];
        for (let i = 2; i <= 10; i++) {
            const srcPath = `${basePath}/${i}.png`;
            const tempImg = new Image();
            tempImg.onload = () => {
                found.push(srcPath);
                found.sort((a, b) =>
                    parseInt(a.match(/\/(\d+)\.png$/)[1]) -
                    parseInt(b.match(/\/(\d+)\.png$/)[1])
                );
                setImages([...found]);
            };
            tempImg.src = srcPath;
        }
    }, [folder]);

    // Auto-peek: briefly show next image and come back to hint variants exist
    useEffect(() => {
        if (images.length < 2) return;
        peekTimer.current = setTimeout(() => {
            goTo(1); // peek at variant 2
            setTimeout(() => goTo(0), 1200); // snap back
        }, 2000);
        return () => clearTimeout(peekTimer.current);
    }, [images.length]);

    const goTo = (idx) => {
        setCurrentIndex(prev => {
            if (idx === prev) return prev;
            setPrevIndex(prev);
            // Clear prevIndex after the crossfade completes
            setTimeout(() => setPrevIndex(null), 700);
            return idx;
        });
    };

    const handleNext = (e) => {
        if (e) e.stopPropagation();
        if (images.length <= 1) return;
        clearTimeout(peekTimer.current);
        goTo((currentIndex + 1) % images.length);
    };

    const handlePrev = (e) => {
        if (e) e.stopPropagation();
        if (images.length <= 1) return;
        clearTimeout(peekTimer.current);
        goTo((currentIndex - 1 + images.length) % images.length);
    };

    const hasMultiple = images.length > 1;

    // Ghost images: prev and next in list
    const ghostPrevSrc = hasMultiple ? images[(currentIndex - 1 + images.length) % images.length] : null;
    const ghostNextSrc = hasMultiple ? images[(currentIndex + 1) % images.length] : null;

    return (
        <div className="story-card">
            {/* Image carousel */}
            <div className="card-img-wrap" onClick={handleNext}>
                {/* Ghost images — transparent, inside the image area */}
                {hasMultiple && ghostPrevSrc && (
                    <img
                        className="card-img-ghost card-img-ghost-left"
                        src={ghostPrevSrc}
                        alt=""
                        aria-hidden="true"
                    />
                )}
                {hasMultiple && ghostNextSrc && (
                    <img
                        className="card-img-ghost card-img-ghost-right"
                        src={ghostNextSrc}
                        alt=""
                        aria-hidden="true"
                    />
                )}

                {/* Outgoing image (fades out underneath) — true crossfade */}
                {prevIndex !== null && (
                    <img
                        key={`prev-${prevIndex}`}
                        className="variant-img card-img-layer card-img-outgoing"
                        src={images[prevIndex]}
                        alt={title}
                    />
                )}

                {/* Current image (fades in on top) */}
                <img
                    key={`cur-${currentIndex}`}
                    className="variant-img card-img-layer card-img-incoming"
                    src={images[currentIndex]}
                    alt={title}
                />
            </div>

            {/* Dot indicators */}
            {hasMultiple && (
                <div className="card-dots">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            className={`card-dot ${i === currentIndex ? 'active' : ''}`}
                            onClick={() => goTo(i)}
                            aria-label={`Variant ${i + 1}`}
                        />
                    ))}
                </div>
            )}

            <h3>{title}</h3>
            <p>{text}</p>

            {/* Timeline navigation arrows — positioned near the ::after dot */}
            {hasMultiple && (
                <div className="card-timeline-nav">
                    <button className="card-arrow card-arrow-left" onClick={handlePrev}>‹</button>
                    <button className="card-arrow card-arrow-right" onClick={handleNext}>›</button>
                </div>
            )}
        </div>
    );
}
