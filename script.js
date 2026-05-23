/* ==========================================================================
   NEVERNESS TO EVERNESS (NTE) - CUSTOM INTERACTIVE SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- HUD Clock Implementation ---
    const clockElement = document.getElementById('hud-clock');
    
    function updateClock() {
        const now = new Date();
        const hrs = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        const secs = String(now.getSeconds()).padStart(2, '0');
        if (clockElement) {
            clockElement.textContent = `${hrs}:${mins}:${secs}`;
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    // --- Dynamic Latency Fluctuator ---
    const pingElement = document.getElementById('hud-ping');
    function fluctuatePing() {
        if (pingElement) {
            const basePing = 24;
            const variance = Math.floor(Math.random() * 8) - 4; // -4 to +3
            pingElement.textContent = `${basePing + variance} MS`;
        }
    }
    setInterval(fluctuatePing, 3000);

    // --- Dynamic Pre-registration Counter ---
    const countElement = document.getElementById('registration-count');
    let baseCount = 8531942;
    
    function incrementCounter() {
        if (countElement) {
            // Random small increase simulating live registrations
            const increment = Math.floor(Math.random() * 4) + 1; 
            baseCount += increment;
            // Format number with commas
            countElement.textContent = baseCount.toLocaleString();
        }
    }
    setInterval(incrementCounter, 4000);

    // ==========================================================================
    // HIGH-TECH AUDIO EFFECT SYNTHESISER (Web Audio API)
    // ==========================================================================
    let audioCtx = null;
    let sfxEnabled = true;
    const audioToggle = document.getElementById('audio-toggle');

    function initAudio() {
        if (!audioCtx) {
            // Initialize audio context
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContext();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    // Toggle SFX status
    if (audioToggle) {
        audioToggle.addEventListener('click', () => {
            initAudio();
            sfxEnabled = !sfxEnabled;
            
            const icon = audioToggle.querySelector('.audio-icon');
            const text = audioToggle.querySelector('.audio-text');
            
            if (sfxEnabled) {
                icon.textContent = '🔊';
                icon.classList.add('pulse-icon');
                text.textContent = 'SFX ON';
                audioToggle.style.borderColor = 'var(--brand-pink)';
                audioToggle.style.background = 'rgba(251, 86, 146, 0.15)';
                playClickSound(880, 0.1); // Play high tone confirmation
            } else {
                icon.textContent = '🔇';
                icon.classList.remove('pulse-icon');
                text.textContent = 'SFX OFF';
                audioToggle.style.borderColor = 'rgba(255,255,255,0.2)';
                audioToggle.style.background = 'rgba(18, 18, 18, 0.6)';
            }
        });
    }

    // Synthesize premium futuristic hover hum/beep
    function playHoverSound() {
        if (!sfxEnabled) return;
        try {
            initAudio();
            if (!audioCtx) return;
            
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            // Cyber atmospheric high sine beep sliding down
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1400, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1100, audioCtx.currentTime + 0.08);
            
            gainNode.gain.setValueAtTime(0.008, audioCtx.currentTime); // Subtle volume
            gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);
            
            osc.start();
            osc.stop(audioCtx.currentTime + 0.08);
        } catch (e) {
            console.warn('Audio synthesis warning:', e);
        }
    }

    // Synthesize gamer tactical high frequency click sound
    function playClickSound(freq = 600, duration = 0.15) {
        if (!sfxEnabled) return;
        try {
            initAudio();
            if (!audioCtx) return;

            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            const filter = audioCtx.createBiquadFilter();

            osc.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(freq * 0.4, audioCtx.currentTime + duration);

            filter.type = 'highpass';
            filter.frequency.setValueAtTime(400, audioCtx.currentTime);

            gainNode.gain.setValueAtTime(0.06, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {
            console.warn('Audio synthesis warning:', e);
        }
    }

    // Bind audio effects to interactive items
    const hoverElements = document.querySelectorAll('.ctr-btn-custom, .ctr-btn, .nav-hotspot, .logo-link, .social-link, .audio-toggle-btn');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            playHoverSound();
        });
        el.addEventListener('click', (e) => {
            // Use different tones for different types of buttons
            if (el.id === 'ctr-top-right' || el.id === 'ctr-center-btn' || el.classList.contains('ctr-glow-custom')) {
                playClickSound(1200, 0.25); // Bright neon high click
            } else if (el.id === 'ctr-bottom') {
                playClickSound(520, 0.3); // Deep heavy metallic click
            } else {
                playClickSound(800, 0.12); // Standard snappy digital click
            }
        });
    });

    // Resume Audio Context on the first page click anywhere to satisfy browser permissions
    document.body.addEventListener('click', () => {
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }, { once: true });


    // ==========================================================================
    // INTERACTIVE CYBERNETIC CANVAS GRID PARTICLES
    // ==========================================================================
    const canvas = document.getElementById('grid-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        
        let mouse = { x: null, y: null, active: false };

        // Grid properties
        const gridSize = 65;
        
        // Particle particle system
        const maxParticles = 30;
        const particles = [];

        // Adjust size on resize
        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        // Mouse interactions
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            mouse.active = true;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
            mouse.active = false;
        });

        // Define cyber HUD particle
        class HUDParticle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * width;
                this.y = height + Math.random() * 100;
                this.size = Math.random() * 3 + 1;
                this.speedY = -(Math.random() * 0.6 + 0.15);
                this.speedX = (Math.random() * 0.4 - 0.2);
                this.opacity = Math.random() * 0.6 + 0.1;
                this.life = Math.random() * 300 + 200;
                this.type = Math.floor(Math.random() * 3); // 0: square, 1: text/code, 2: circle
                this.character = ['+', 'x', '0', '1', '[ ]', 'NTE', 'ANOMALY'][Math.floor(Math.random() * 7)];
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX;
                this.life--;
                
                // Wrap horizontal edges
                if (this.x < 0 || this.x > width) this.speedX *= -1;

                if (this.y < -20 || this.life <= 0) {
                    this.reset();
                }
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                
                // Brand color variation (hot pink or cyan glow)
                if (this.type === 1) {
                    ctx.fillStyle = '#00F0FF';
                    ctx.shadowColor = '#00F0FF';
                } else {
                    ctx.fillStyle = '#FB5692';
                    ctx.shadowColor = '#FB5692';
                }
                
                ctx.shadowBlur = 4;

                if (this.type === 0) {
                    // Hollow futuristic squares
                    ctx.strokeStyle = ctx.fillStyle;
                    ctx.strokeRect(this.x, this.y, this.size * 2, this.size * 2);
                } else if (this.type === 1) {
                    // Micro digital UI letters
                    ctx.font = '7px monospace';
                    ctx.fillText(this.character, this.x, this.y);
                } else {
                    // Neon crosshair points
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                }

                ctx.restore();
            }
        }

        // Initialize particles
        for (let i = 0; i < maxParticles; i++) {
            particles.push(new HUDParticle());
        }

        // Beautiful matrix render loop
        function animate() {
            ctx.clearRect(0, 0, width, height);

            // Draw high tech cyber grid lines
            ctx.strokeStyle = 'rgba(0, 240, 255, 0.04)';
            ctx.lineWidth = 1;
            
            // Vertical lines
            for (let x = 0; x < width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }

            // Horizontal lines
            for (let y = 0; y < height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }

            // Subtle mouse interactive ripple glow
            if (mouse.active && mouse.x !== null) {
                ctx.save();
                let gradient = ctx.createRadialGradient(
                    mouse.x, mouse.y, 10,
                    mouse.x, mouse.y, 180
                );
                gradient.addColorStop(0, 'rgba(251, 86, 146, 0.05)');
                gradient.addColorStop(0.5, 'rgba(0, 240, 255, 0.02)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(mouse.x, mouse.y, 180, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            // Update & draw dynamic particles
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            requestAnimationFrame(animate);
        }
        
        animate();
    }

    // --- Cinematic Popup Control Logic ---
    const popupWrapper = document.getElementById('trailer-popup-wrapper');
    const popupCloseBtn = document.getElementById('popup-close');
    const popupSoundToggle = document.getElementById('popup-sound-toggle');
    const popupVid = document.getElementById('popup-vid');
    const popupVideoLink = document.getElementById('popup-video-link');

    if (popupCloseBtn && popupWrapper) {
        popupCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Avoid triggering any container clicks
            popupWrapper.style.transition = 'all 0.5s ease';
            popupWrapper.style.opacity = '0';
            popupWrapper.style.transform = 'translateY(20px) scale(0.95)';
            setTimeout(() => {
                popupWrapper.style.display = 'none';
            }, 500);
            
            // Also pause the video inside to release CPU/GPU resource
            if (popupVid) {
                popupVid.pause();
            }
        });
    }

    if (popupSoundToggle && popupVid) {
        popupSoundToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            popupVid.muted = !popupVid.muted;
            const icon = popupSoundToggle.querySelector('.sound-icon');
            const text = popupSoundToggle.querySelector('.sound-text');
            
            if (popupVid.muted) {
                if (icon) icon.textContent = '🔇';
                if (text) text.textContent = 'Enable Sound';
                popupSoundToggle.style.borderColor = 'rgba(255,255,255,0.12)';
                popupSoundToggle.style.background = 'rgba(255,255,255,0.05)';
            } else {
                if (icon) icon.textContent = '🔊';
                if (text) text.textContent = 'Disable Sound';
                popupSoundToggle.style.borderColor = 'var(--brand-cyan)';
                popupSoundToggle.style.background = 'rgba(0, 240, 255, 0.1)';
            }
        });
    }

    if (popupVideoLink) {
        popupVideoLink.addEventListener('click', () => {
            window.open('https://to.dordir.com/5A0I/2J2B7/', '_blank');
        });
    }
});
