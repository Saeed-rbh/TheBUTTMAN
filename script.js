document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.custom-cursor');
    const cursorTrail = document.querySelector('.cursor-trail');
    const links = document.querySelectorAll('a, button, .timeline-item, .about-card');

    // Custom Cursor Movement
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        // Slight delay for trail to create a cool effect
        setTimeout(() => {
            cursorTrail.style.left = e.clientX + 'px';
            cursorTrail.style.top = e.clientY + 'px';
        }, 80);
    });

    // Hover effects for custom cursor
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });

    // Minting Logic
    const decreaseBtn = document.getElementById('decrease-qty');
    const increaseBtn = document.getElementById('increase-qty');
    const mintQty = document.getElementById('mint-qty');
    const mintActionBtn = document.getElementById('mint-action-btn');

    let qty = 1;
    const maxQty = 10;

    decreaseBtn.addEventListener('click', () => {
        if (qty > 1) {
            qty--;
            mintQty.textContent = qty;
            animateElement(mintQty, 'pop');
        }
    });

    increaseBtn.addEventListener('click', () => {
        if (qty < maxQty) {
            qty++;
            mintQty.textContent = qty;
            animateElement(mintQty, 'pop');
        }
    });

    mintActionBtn.addEventListener('click', () => {
        mintActionBtn.textContent = 'MINTING...';
        setTimeout(() => {
            alert(`You have successfully minted ${qty} Butt-Men! Welcome to the wildest club on the blockchain.`);
            mintActionBtn.textContent = 'MINT NOW';
        }, 1500);
    });

    // Interactive Image - POW!
    const heroImage = document.getElementById('main-character-img');
    const powContainer = document.getElementById('pow-container');
    if (heroImage) {
        heroImage.addEventListener('click', (e) => {
            // Random wacky superhero transformations
            const randomRotate = Math.floor(Math.random() * 360);
            const randomScale = 0.8 + Math.random() * 0.7; // 0.8 to 1.5

            heroImage.style.transform = `rotate(${randomRotate}deg) scale(${randomScale})`;
            heroImage.style.transition = 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

            setTimeout(() => {
                heroImage.style.transform = ''; // reset to let css float animation take over
            }, 600);

            // POW effect
            if (powContainer) {
                const pow = document.createElement('div');
                pow.classList.add('pow-bubble');

                const sfx = ['POW!', 'BAM!', 'ZAP!', 'WHACK!', 'BOOP!'];
                pow.innerText = sfx[Math.floor(Math.random() * sfx.length)];

                // Position near click with random offset
                pow.style.left = (e.clientX - 50 + (Math.random() * 100 - 50)) + 'px';
                pow.style.top = (e.clientY - 50 + (Math.random() * 100 - 50)) + 'px';

                powContainer.appendChild(pow);

                setTimeout(() => {
                    pow.remove();
                }, 600);
            }
        });
    }

    // Helper for quick animations
    function animateElement(element, animationName) {
        element.style.animation = 'none';
        element.offsetHeight; // trigger reflow
        element.style.animation = `${animationName} 0.3s ease-out`;
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- EXTRA CRAZY IMPROVEMENTS --- //

    // Falling Peaches Logic
    const peachRainContainer = document.getElementById('peach-rain');
    if (peachRainContainer) {
        function createPeach() {
            const peach = document.createElement('div');
            peach.classList.add('peach');
            peach.innerText = '🍑';
            peach.style.left = Math.random() * 100 + 'vw';
            peach.style.animationDuration = Math.random() * 3 + 2 + 's';

            peachRainContainer.appendChild(peach);

            setTimeout(() => {
                peach.remove();
            }, 5000);
        }

        // Create a peach every 800ms
        setInterval(createPeach, 800);
    }

    // 3D Card Tilt Effect
    const cards = document.querySelectorAll('.about-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate rotation values
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -20; // max 20deg
            const rotateY = ((x - centerX) / centerX) * 20;  // max 20deg

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
            card.style.transition = 'transform 0.5s ease-out';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none'; // remove transition when moving for snappiness
        });
    });

    // Crazy Easter Egg Button
    const crazyBtn = document.getElementById('crazy-btn');
    if (crazyBtn) {
        crazyBtn.addEventListener('click', () => {
            document.body.classList.add('spinning-chaos');
            setTimeout(() => {
                alert("WHAT HAVE YOU DONE?!");
                document.body.classList.remove('spinning-chaos');
            }, 3000);
        });
    }

    // Nolan Mode redirect via Cinematic Portal
    const nolanToggleBtn = document.getElementById('nolan-toggle-btn');
    if (nolanToggleBtn) {
        nolanToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Create portal element
            const portal = document.createElement('div');
            portal.className = 'portal-transition';
            portal.style.left = e.clientX + 'px';
            portal.style.top = e.clientY + 'px';
            document.body.appendChild(portal);

            // Trigger explosion animation
            requestAnimationFrame(() => {
                // slight delay to allow painting
                setTimeout(() => {
                    portal.classList.add('expand');
                }, 10);
            });

            // Wait for transition to finish, then redirect
            setTimeout(() => {
                window.location.href = 'nolan.html';
            }, 1200);
        });
    }

});
