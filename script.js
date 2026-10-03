const gift = document.getElementById("gift");
const intro = document.getElementById("intro");
const surprise = document.getElementById("surprise");
const flowerBurst = document.getElementById("flowerBurst");
const petals = document.getElementById("petals");
const again = document.getElementById("again");

const svgFlowers = [
    // Flor rosa
    `<svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="4" fill="#fff"/><path d="M16 4v8M16 20v8M4 16h8M20 16h8M7.5 7.5l5.7 5.7M18.8 18.8l5.7 5.7M7.5 24.5l5.7-5.7M18.8 13.2l5.7-5.7" stroke="#d88b9a" stroke-width="4" stroke-linecap="round"/></svg>`,
    // Flor amarilla
    `<svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="5" fill="#8d5b4c"/><path d="M16 2v6M16 24v6M2 16h6M24 16h6M6 6l4.2 4.2M21.8 21.8l4.2 4.2M6 26l4.2-4.2M21.8 10.2l4.2-4.2" stroke="#e7b64d" stroke-width="4" stroke-linecap="round"/></svg>`,
    // Petalito verde/hoja
    `<svg viewBox="0 0 32 32" fill="none"><path d="M16 4C8 12 8 20 16 28C24 20 24 12 16 4Z" fill="#77956c"/></svg>`
];

for (let i = 0; i < 12; i++) {
    const petal = document.createElement("span");
    petal.className = "background-petal";
    petal.textContent = ["🌸", "🌼", "🌷", "🌿"][Math.floor(Math.random() * 4)];
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.fontSize = `${12 + Math.random() * 13}px`;
    petal.style.animationDuration = `${8 + Math.random() * 9}s`;
    petal.style.animationDelay = `${Math.random() * -12}s`;
    petal.style.setProperty("--drift", `${-80 + Math.random() * 160}px`);
    petals.appendChild(petal);
}

function createFlowerBurst() {
    flowerBurst.innerHTML = "";

    for (let i = 0; i < 35; i++) {
        const flower = document.createElement("span");
        flower.className = "flying-flower";

        // Asignar una figura de flor SVG aleatoria
        flower.innerHTML = svgFlowers[Math.floor(Math.random() * svgFlowers.length)];

        const x = -45 + Math.random() * 90;
        const y = -(window.innerHeight * (0.28 + Math.random() * 0.65));
        const size = 20 + Math.random() * 25;
        const duration = 1.5 + Math.random() * 1.5;
        const delay = Math.random() * 1.25;
        const scale = 0.65 + Math.random() * 0.75;
        const rotation = -180 + Math.random() * 360;

        flower.style.setProperty("--x", `${x}vw`);
        flower.style.setProperty("--y", `${y}px`);
        flower.style.setProperty("--size", `${size}px`);
        flower.style.setProperty("--duration", `${duration}s`);
        flower.style.setProperty("--delay", `${delay}s`);
        flower.style.setProperty("--scale", scale);
        flower.style.setProperty("--rotation", `${rotation}deg`);

        flowerBurst.appendChild(flower);
    }
}

again.addEventListener("click", () => {
    surprise.classList.remove("show");
    surprise.setAttribute("aria-hidden", "true");
    flowerBurst.innerHTML = "";

    setTimeout(() => {
        intro.classList.remove("hide");
        gift.classList.remove("open");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, 500);
});

const candle = document.getElementById("candle");
const flame = document.getElementById("flame");
const wishHint = document.getElementById("wishHint");
const lockWarning = document.getElementById("lockWarning");

let isCandleBlown = false;
let warningTimeout;

candle.addEventListener("click", () => {
    if (!isCandleBlown) {
        isCandleBlown = true;
        flame.classList.remove("lit");
        flame.classList.add("out");

        lockWarning.classList.remove("active");

        wishHint.textContent = "Your wish is stored! Now you can open your gift 🎁✨";
        wishHint.style.color = "#77956c";

        if ("vibrate" in navigator) {
            navigator.vibrate([30, 40]);
        }
    }
});
function openGift() {
    window.scrollTo(0, 0);
    if (!isCandleBlown) {
        lockWarning.textContent = "Make a wish and blow out the candle first! 🎂🕯️";
        lockWarning.classList.add("active");

        // Pequeña animación de sacudida en el regalo
        gift.classList.remove("locked-shake");
        void gift.offsetWidth; // Forzar reflow para reiniciar animación
        gift.classList.add("locked-shake");

        // Ocultar el aviso después de 3 segundos
        clearTimeout(warningTimeout);
        warningTimeout = setTimeout(() => {
            lockWarning.classList.remove("active");
        }, 3000);

        if ("vibrate" in navigator) {
            navigator.vibrate(80);
        }
        return;
    }

    if (gift.classList.contains("open")) return;

    gift.classList.add("open");
    createFlowerBurst();

    if ("vibrate" in navigator) {
        navigator.vibrate([30, 50, 70]);
    }

    setTimeout(() => {
        intro.classList.add("hide");
        surprise.classList.add("show");
        surprise.setAttribute("aria-hidden", "false");
    }, 700);
}

gift.addEventListener("click", openGift);

again.addEventListener("click", () => {
    surprise.classList.remove("show");
    surprise.setAttribute("aria-hidden", "true");
    flowerBurst.innerHTML = "";

    setTimeout(() => {
        // Restablecer la vela y el estado del regalo
        surprise.scrollTop = 0;
        isCandleBlown = false;
        flame.classList.remove("out");
        flame.classList.add("lit");
        lockWarning.classList.remove("active");
        wishHint.textContent = "Make a wish and click the candle to blow it out! 🎂✨";
        wishHint.style.color = "#a28270";

        intro.classList.remove("hide");
        gift.classList.remove("open");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, 500);
});