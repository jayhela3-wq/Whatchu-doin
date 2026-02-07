// Language Translations
const translations = {
    en: {
        envelope: "♡ Letter for You ♡",
        question: "Nandini, Will you please be my Valentine?",
        yippee: "Yippeeee!",
        dateText: "Valentine Date:",
        dateDetails: "Meow Restaurant at 7pm. Dress fancy!",
        daysUntil: "Days until Valentine:",
        loveLow: "Not quite...",
        loveMid: "Getting there...",
        loveHigh: "Almost there!",
        loveFull: "Perfect Match! 💕"
    },
    hi: {
        envelope: "♡ आपके लिए पत्र ♡",
        question: "नंदिनी, क्या आप मेरी वैलेंटाइन होगी?",
        yippee: "यिप्पीई!",
        dateText: "वैलेंटाइन डेट:",
        dateDetails: "मेओ रेस्तरां में रात 7 बजे। शानदार ढंग से कपड़े पहनें!",
        daysUntil: "वैलेंटाइन तक के दिन:",
        loveLow: "अभी नहीं...",
        loveMid: "वहाँ लगभग पहुँचा...",
        loveHigh: "लगभग वहाँ!",
        loveFull: "परफेक्ट मैच! 💕"
    }
};

let currentLanguage = "en";

// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");
const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");
const musicBtn = document.getElementById("music-btn");
const audio = document.getElementById("music");
const bgMusic = document.getElementById("bg-music");
const soundEffects = document.getElementById("sound-effects");
const languageSelect = document.getElementById("language-select");
const resetBtn = document.getElementById("reset-btn");
const timerDisplay = document.getElementById("timer-display");
const heartsContainer = document.getElementById("hearts-container");
const sparklesContainer = document.getElementById("sparkles-container");
const confettiCanvas = document.getElementById("confetti-canvas");
const envelopeText = document.getElementById("envelope-text");
const dateText = document.getElementById("date-text");
const petalsContainer = document.getElementById("petals-container");
const heartExplosionsContainer = document.getElementById("heart-explosions");
const loveMeter = document.getElementById("love-meter");
const loveFill = document.getElementById("love-fill");
const lovePercent = document.getElementById("love-percent");
const loveLabel = document.getElementById("love-label");
const musicPointer = document.getElementById("music-pointer");

let lovePercentage = 0;

// Set canvas size for confetti
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;
window.addEventListener("resize", () => {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
});

// ===== TRANSLATIONS =====
function setLanguage(lang) {
    currentLanguage = lang;
    envelopeText.textContent = translations[lang].envelope;
    title.textContent = translations[lang].question;
    dateText.textContent = translations[lang].dateText;
    finalText.textContent = translations[lang].dateDetails;
    updateTimer();
}

languageSelect.addEventListener("change", (e) => {
    setLanguage(e.target.value);
});

// ===== CONFETTI =====
function createConfetti() {
    const ctx = confettiCanvas.getContext("2d");
    const particles = [];
    
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * confettiCanvas.width,
            y: -10,
            vx: (Math.random() - 0.5) * 8,
            vy: Math.random() * 5 + 5,
            color: ["#ff69b4", "#ff1493", "#ffc0cb", "#ffb6c1", "#ffd700"][Math.floor(Math.random() * 5)],
            rotation: Math.random() * 360,
            rotationVel: Math.random() * 10
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        
        let hasParticles = false;
        particles.forEach(p => {
            if (p.y < confettiCanvas.height) {
                hasParticles = true;
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.2;
                p.rotation += p.rotationVel;
                
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-5, -5, 10, 10);
                ctx.restore();
            }
        });
        
        if (hasParticles) requestAnimationFrame(animate);
    }
    animate();
}

// ===== FLOATING HEARTS =====
function createFloatingHeart() {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = "❤️";
    heart.style.left = Math.random() * 100 + "%";
    const tx = (Math.random() - 0.5) * 200;
    heart.style.setProperty("--tx", tx + "px");
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
}

// ===== SPARKLES =====
function createSparkle(x, y) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.left = x + "px";
    sparkle.style.top = y + "px";
    sparklesContainer.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
}

// ===== FALLING PETALS =====
function createFallingPetal() {
    const petal = document.createElement("div");
    petal.className = "petal";
    const petals = ["🌹", "🌸", "🌼", "🌻"];
    petal.textContent = petals[Math.floor(Math.random() * petals.length)];
    petal.style.left = Math.random() * window.innerWidth + "px";
    const drift = (Math.random() - 0.5) * 200;
    petal.style.setProperty("--petal-drift", drift + "px");
    petalsContainer.appendChild(petal);
    setTimeout(() => petal.remove(), 6000);
}

// Create petals continuously
function startFallingPetals() {
    const petalInterval = setInterval(() => {
        if (document.getElementById("letter-container").style.display === "flex") {
            createFallingPetal();
        }
    }, 800);
    
    // Store interval so we can stop it later if needed
    window.petalInterval = petalInterval;
}

// ===== HEART EXPLOSIONS =====
function createHeartExplosion(x, y) {
    for (let i = 0; i < 12; i++) {
        const heart = document.createElement("div");
        heart.className = "heart-explosion";
        heart.textContent = "❤️";
        heart.style.left = x + "px";
        heart.style.top = y + "px";
        
        const angle = (i / 12) * Math.PI * 2;
        const distance = 100 + Math.random() * 50;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        heart.style.setProperty("--tx", tx + "px");
        heart.style.setProperty("--ty", ty + "px");
        
        heartExplosionsContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }
}

// ===== LOVE METER =====
function updateLoveMeter() {
    if (loveMeter.style.display === "none") {
        loveMeter.style.display = "block";
    }
    
    if (lovePercentage < 100) {
        lovePercentage += Math.random() * 15 + 5;
        if (lovePercentage > 100) lovePercentage = 100;
    }
    
    loveFill.style.width = lovePercentage + "%";
    lovePercent.textContent = Math.floor(lovePercentage) + "%";
    
    // Update label based on percentage
    if (lovePercentage < 30) {
        loveLabel.textContent = translations[currentLanguage].loveLow || "Not quite...";
    } else if (lovePercentage < 60) {
        loveLabel.textContent = translations[currentLanguage].loveMid || "Getting there...";
    } else if (lovePercentage < 100) {
        loveLabel.textContent = translations[currentLanguage].loveHigh || "Almost there!";
    } else {
        loveLabel.textContent = translations[currentLanguage].loveFull || "Perfect Match! 💕";
    }
    
    return lovePercentage;
}

// ===== TYPEWRITER EFFECT =====
function typeWriter(element, text, speed = 50) {
    return new Promise(resolve => {
        let i = 0;
        element.textContent = "";
        element.classList.add("typewriter");
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.classList.remove("typewriter");
                resolve();
            }
        }
        type();
    });
}

// ===== COUNTDOWN TIMER =====
function updateTimer() {
    const targetDate = new Date(2026, 1, 14, 19, 0, 0).getTime();
    const today = new Date().getTime();
    const daysLeft = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
    timerDisplay.textContent = translations[currentLanguage].daysUntil + " " + Math.max(0, daysLeft);
}

setInterval(updateTimer, 1000);

// ===== ENVELOPE CLICK =====
envelope.addEventListener("click", () => {
    playSound("click");
    playSound("whoosh");
    envelope.style.display = "none";
    letter.style.display = "flex";
    timerDisplay.style.display = "block";
    loveMeter.style.display = "block";
    
    // Start falling petals
    startFallingPetals();
    
    // Auto-play background music
    bgMusic.src = "background-music.mp3";
    bgMusic.play().catch(() => console.log("Background music not available"));
    
    setTimeout(() => {
        document.querySelector(".letter-window").classList.add("open");
        // Show music pointer
        musicPointer.style.display = "block";
        // Typewriter effect on title
        typeWriter(title, translations[currentLanguage].question, 30);
        // Floating hearts on open
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createFloatingHeart(), i * 300);
        }
    }, 50);
});

// ===== SOUND EFFECTS =====
function playSound(type) {
    if (type === "click") {
        soundEffects.src = "click-sound.mp3";
        soundEffects.play().catch(() => {});
    } else if (type === "whoosh") {
        soundEffects.src = "whoosh-sound.mp3";
        soundEffects.play().catch(() => {});
    }
}

// ===== MOVE NO BUTTON =====
let noClickCount = 0;
let noButtonShrinking = false;

noBtn.addEventListener("mouseover", () => {
    if (noButtonShrinking) return;
    
    const min = 200;
    const max = 200;
    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;
    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;
    
    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
    
    // Update love meter on hover
    updateLoveMeter();
    
    // Heart explosion at mouse position
    createHeartExplosion(event.clientX, event.clientY);
});

// Click/Tap handler for No button - shrinks on each interaction
noBtn.addEventListener("click", () => {
    if (noButtonShrinking) return;
    
    noClickCount++;
    updateLoveMeter();
    createHeartExplosion(event.clientX || window.innerWidth/2, event.clientY || window.innerHeight/2);
    
    // After 3 clicks, start shrinking animation
    if (noClickCount >= 3) {
        noButtonShrinking = true;
        noBtn.classList.add("shrinking-away");
        setTimeout(() => {
            noBtn.style.display = "none";
        }, 600);
    }
});

// Touch support for No button
noBtn.addEventListener("touchstart", (e) => {
    if (noButtonShrinking) return;
    
    noClickCount++;
    updateLoveMeter();
    createHeartExplosion(e.touches[0].clientX, e.touches[0].clientY);
    
    // After 3 taps, start shrinking animation
    if (noClickCount >= 3) {
        noButtonShrinking = true;
        noBtn.classList.add("shrinking-away");
        setTimeout(() => {
            noBtn.style.display = "none";
        }, 600);
    }
});

// ===== MUSIC BUTTON =====
musicBtn.addEventListener("click", () => {
    playSound("click");
    audio.src = "Agar Tum Kaho Toh - Gunda  Allah Rakha LP  Azadi Records  Lyric Video.mp3";
    
    // Disappear the pointer
    musicPointer.classList.add("disappear");
    
    if (audio.paused) {
        audio.play().catch(() => {});
        musicBtn.textContent = "🎵 Playing...";
    } else {
        audio.pause();
        audio.currentTime = 0;
        musicBtn.textContent = "🎵 Tap Me";
    }
});

audio.addEventListener("ended", () => {
    musicBtn.textContent = "🎵 Tap Me";
});

// ===== YES BUTTON =====
yesBtn.addEventListener("click", () => {
    playSound("click");
    
    // Typewriter effect
    typeWriter(title, translations[currentLanguage].yippee, 100);
    
    catImg.src = "cat_dance.gif";
    document.querySelector(".letter-window").classList.add("final");
    buttons.style.display = "none";
    finalText.style.display = "block";
    
    // Stop background music
    bgMusic.pause();
    
    // Stop petals
    clearInterval(window.petalInterval);
    
    // Update love meter to 100%
    lovePercentage = 100;
    updateLoveMeter();
    
    // Play celebration effects
    createConfetti();
    for (let i = 0; i < 20; i++) {
        setTimeout(() => createFloatingHeart(), i * 100);
    }
    
    // Heart explosions everywhere
    for (let i = 0; i < 10; i++) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        setTimeout(() => createHeartExplosion(x, y), i * 100);
    }
    
    // Sparkles around the screen
    for (let i = 0; i < 15; i++) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        setTimeout(() => createSparkle(x, y), i * 50);
    }
    
    // Cat reactions
    const reactions = ["cat_dance.gif", "cat_heart.gif"];
    let reactionIndex = 0;
    const reactionInterval = setInterval(() => {
        reactionIndex = (reactionIndex + 1) % reactions.length;
        catImg.src = reactions[reactionIndex];
    }, 1000);
    
    setTimeout(() => clearInterval(reactionInterval), 5000);
});



// ===== INITIAL SETUP =====
setLanguage("en");