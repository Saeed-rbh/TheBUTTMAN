document.addEventListener('DOMContentLoaded', () => {
    // Custom cursor
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    }

    // Horizontal Scrolling via Mouse Wheel
    const container = document.querySelector('.story-map-container');
    if (container) {
        window.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                // Prevent vertical scroll bumping and override it with instant horizontal movement
                e.preventDefault();
                window.scrollBy({
                    left: e.deltaY * 1.5,
                    behavior: 'auto' // 'smooth' causes massive jitter when rapidly scrolling
                });
            }
        }, { passive: false });
    }

    // Intersection Observer for highlighting map nodes
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, {
        root: null,
        rootMargin: '0px -15% 0px -15%',
        threshold: 0.5
    });

    document.querySelectorAll('.story-card').forEach(card => {
        observer.observe(card);
    });

    // Dynamic Folder-Based Image Cycling
    document.querySelectorAll('.story-card').forEach(card => {
        const img = card.querySelector('.variant-img');
        const hint = card.querySelector('.variant-hint');

        if (img && img.dataset.folder) {
            const folder = img.dataset.folder;
            let images = [];
            let maxChecks = 10;

            // Proactively probe for 1.png through 10.png
            for (let i = 1; i <= maxChecks; i++) {
                const tempImg = new Image();
                const srcPath = `./assets/batman/${folder}/${i}.png`;
                tempImg.src = srcPath;
                tempImg.onload = () => {
                    if (!images.includes(srcPath)) images.push(srcPath);
                    // Sort numerically since async loads arrive out of order
                    images.sort((a, b) => {
                        let numA = parseInt(a.match(/\/(\d+)\.png$/)[1]);
                        let numB = parseInt(b.match(/\/(\d+)\.png$/)[1]);
                        return numA - numB;
                    });

                    if (images.length > 0 && hint) {
                        let curIdx = images.indexOf(img.getAttribute('src'));
                        if (curIdx === -1) curIdx = 0;
                        hint.innerHTML = `Variants (${curIdx + 1}/${images.length}) ⟳`;
                    }
                };
            }

            img.addEventListener('click', () => {
                if (images.length > 1) {
                    let currentIndex = images.indexOf(img.getAttribute('src'));
                    if (currentIndex === -1) currentIndex = 0;

                    currentIndex = (currentIndex + 1) % images.length;

                    // Add quick jiggle on swap
                    img.style.transform = 'scale(0.8) rotate(15deg)';

                    setTimeout(() => {
                        img.setAttribute('src', images[currentIndex]);
                        if (hint) {
                            hint.innerHTML = `Variants (${currentIndex + 1}/${images.length}) ⟳`;
                        }
                        img.style.transform = '';
                    }, 150);
                } else {
                    alert(`Drop more images named 1.png, 2.png... up to 10.png into the 'assets/batman/${folder}/' folder to unlock variants!`);
                }
            });
        }
    });

    // Return to main page transition
    const returnBtn = document.getElementById('return-btn');
    if (returnBtn) {
        returnBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const portal = document.getElementById('un-portal');
            portal.style.left = e.clientX + 'px';
            portal.style.top = e.clientY + 'px';

            requestAnimationFrame(() => {
                portal.classList.add('expand');
            });

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1200);
        });
    }
});
