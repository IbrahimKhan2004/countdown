// --- CONFIGURATION ---
// Woh Date Aur Time Jab Se Aapko Counting Shuru Karni Hai
// Format: "Mahina Din, Saal Ghanta:Minute:Second" (e.g., "January 1, 2023 00:00:00")
const startDateString = "April 25, 2025 19:46:00"; // <<< Yahaan apni start date daalein
// ---------------------

// Average values for calculation (approximations)
const AVG_DAYS_IN_YEAR = 365.2425;
const AVG_DAYS_IN_MONTH = AVG_DAYS_IN_YEAR / 12; // approx 30.436875

// Get elements
const yearsElement = document.getElementById('years');
const monthsElement = document.getElementById('months');
const weeksElement = document.getElementById('weeks');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const audioElement = document.getElementById('background-music');
const quoteText = document.getElementById('quote-text');
const anniversaryCountdown = document.getElementById('anniversary-countdown');

// Quotes array
const quotes = [
    "\"My soul recognizes yours; we were made from the same dust.\"",
    "\"If my heart was a city, you would be every street.\"",
    "\"I found in you my home and my peace.\"",
    "\"You are the answer to a prayer I didn't even know I was making.\"",
    "\"In your light, I learn how to love.\"",
    "\"Your soul is my favorite place to be.\"",
    "\"Whatever our souls are made of, yours and mine are the same.\""
];

let quoteIndex = 0;

function updateQuote() {
    if (!quoteText) return;

    quoteText.classList.remove('fade-in');

    setTimeout(() => {
        quoteText.textContent = quotes[quoteIndex];
        quoteText.classList.add('fade-in');
        quoteIndex = (quoteIndex + 1) % quotes.length;
    }, 1500);
}

// Change quote every 7 seconds
setInterval(updateQuote, 7000);
updateQuote();

// Visual Effects: Falling Petals
function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');

    // Random size
    const size = Math.random() * 15 + 10;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;

    // Random horizontal position
    petal.style.left = Math.random() * 100 + 'vw';

    // Random animation duration
    const duration = Math.random() * 5 + 5;
    petal.style.animationDuration = `${duration}s`;

    // Random opacity
    petal.style.opacity = Math.random() * 0.5 + 0.2;

    document.body.appendChild(petal);

    // Remove petal after animation ends
    setTimeout(() => {
        petal.remove();
    }, duration * 1000);
}

// Create petals periodically
setInterval(createPetal, 300);

function createStars() {
    const starCount = 50;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';

        const duration = Math.random() * 3 + 2;
        star.style.setProperty('--duration', `${duration}s`);
        star.style.animationDelay = `${Math.random() * 5}s`;

        document.body.appendChild(star);
    }
}

createStars();

// Start date object banao
const startDate = new Date(startDateString).getTime();

// Har second timer update karo
const interval = setInterval(() => {
    updateElapsedTime();
    updateAnniversaryCountdown();
}, 1000);

function updateAnniversaryCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    let nextAnniversary = new Date(currentYear, 3, 25); // April is 3 (0-indexed)

    if (now > nextAnniversary) {
        nextAnniversary = new Date(currentYear + 1, 3, 25);
    }

    const diff = nextAnniversary - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    anniversaryCountdown.innerHTML = `
        <div class="time-section">
            <span class="number">${days}</span>
            <span class="label">Days</span>
        </div>
        <div class="separator">|</div>
        <div class="time-section">
            <span class="number">${String(hours).padStart(2, '0')}</span>
            <span class="label">Hours</span>
        </div>
        <div class="separator">:</div>
        <div class="time-section">
            <span class="number">${String(minutes).padStart(2, '0')}</span>
            <span class="label">Mins</span>
        </div>
        <div class="separator">:</div>
        <div class="time-section">
            <span class="number">${String(seconds).padStart(2, '0')}</span>
            <span class="label">Secs</span>
        </div>
    `;
}

function updateElapsedTime() {
    const now = new Date().getTime();
    const diff = now - startDate; // Milliseconds ka difference

    // Agar start date future mein hai (galti se)
    if (diff < 0) {
        // Aap yahaan error message dikha sakte hain ya timer ko 0 par rok sakte hain
        [yearsElement, monthsElement, weeksElement, daysElement, hoursElement, minutesElement, secondsElement].forEach(el => el.textContent = '0');
        return;
    }

    // Calculate total elapsed time in different units from the difference
    let remainingDiff = diff;

    // Seconds
    const seconds = Math.floor(remainingDiff / 1000) % 60;

    // Minutes
    const minutes = Math.floor(remainingDiff / (1000 * 60)) % 60;

    // Hours
    const hours = Math.floor(remainingDiff / (1000 * 60 * 60)) % 24;

    // Total Days elapsed
    const totalDays = Math.floor(remainingDiff / (1000 * 60 * 60 * 24));

    // Approximate Years
    const years = Math.floor(totalDays / AVG_DAYS_IN_YEAR);

    // Approximate remaining days after full years
    const daysRemainingAfterYears = totalDays - Math.floor(years * AVG_DAYS_IN_YEAR);

    // Approximate Months from remaining days
    const months = Math.floor(daysRemainingAfterYears / AVG_DAYS_IN_MONTH);

    // Approximate remaining days after full months
    const daysRemainingAfterMonths = daysRemainingAfterYears - Math.floor(months * AVG_DAYS_IN_MONTH);

    // Weeks from remaining days
    const weeks = Math.floor(daysRemainingAfterMonths / 7);

    // Days from remaining days
    const days = Math.floor(daysRemainingAfterMonths % 7);


    // Update HTML elements
    yearsElement.textContent = String(years); // No padding needed usually
    monthsElement.textContent = String(months);
    weeksElement.textContent = String(weeks);
    daysElement.textContent = String(days);
    hoursElement.textContent = String(hours).padStart(2, '0');
    minutesElement.textContent = String(minutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');

    // Try to play audio if paused
    if (audioElement && audioElement.paused) {
        audioElement.play().catch(error => {
            console.log("Autoplay was prevented:", error);
        });
    }
}

// Initial call to display timer immediately
updateElapsedTime();
updateAnniversaryCountdown();
