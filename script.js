// --- CONFIGURATION ---
// Woh Date Aur Time Jab Se Aapko Counting Shuru Karni Hai
// Format: "Mahina Din, Saal Ghanta:Minute:Second" (e.g., "January 1, 2023 00:00:00")
const startDateString = "April 25, 2025 00:00:00"; // <<< Yahaan apni start date daalein
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

// Start date object banao
const startDate = new Date(startDateString).getTime();

// Har second timer update karo
const interval = setInterval(updateElapsedTime, 1000);

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
