const routineAM = {
    0: "🌙", 1: "🌙", 2: "🌙", 3: "🌙", 4: "🌙", 5: "🌙", 6: "🌙", 7: "🌙",
    8: "🌞", 9: "🥪", 10: "🧸", 11: "📱"
};

const routinePM = {
    12: "📺", 13: "🍽️", 14: "😌", 15: "🎨", 16: "📱", 17: "🚘", 18: "🚘", 19: "🔠",
    20: "🍽️", 21: "😴", 22: "🌙", 23: "🌙"
};

const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF33A8', '#33FFF3', '#F3FF33', '#FF8633', '#8633FF', '#33FF86', '#FF3333', '#3386FF'];

function init() {
    const container = document.getElementById('sectors-container');
    const clock = document.getElementById('main-clock');
    const radius = 240; 

    for (let i = 0; i < 12; i++) {
        // 1. Fatias com cores independentes (atraso de animação)
        let sector = document.createElement('div');
        sector.className = 'sector';
        sector.style.backgroundColor = colors[i];
        sector.style.transform = `rotate(${i * 30}deg)`;
        sector.style.animationDelay = `-${i * 1}s`; // Atraso negativo faz começar em pontos diferentes
        container.appendChild(sector);

        // 2. Números com cores independentes
        let num = document.createElement('div');
        num.className = 'clock-number';
        num.innerText = i === 0 ? 12 : i;
        num.style.animationDelay = `-${i * 1.5}s`; // Atraso diferente das fatias para mais variedade
        
        let angleNum = (i * 30 - 90) * (Math.PI / 180);
        let xNum = radius + (radius + 75) * Math.cos(angleNum) - 35;
        let yNum = radius + (radius + 75) * Math.sin(angleNum) - 35;
        num.style.left = xNum + 'px';
        num.style.top = yNum + 'px';
        clock.appendChild(num);

        // 3. Ícones
        let icon = document.createElement('div');
        icon.className = 'activity-icon';
        icon.id = `icon-${i}`;
        let angleIcon = (i * 30 - 75) * (Math.PI / 180);
        let xIcon = radius + (radius * 0.65) * Math.cos(angleIcon) - 30;
        let yIcon = radius + (radius * 0.65) * Math.sin(angleIcon) - 30;
        icon.style.left = xIcon + 'px';
        icon.style.top = yIcon + 'px';
        clock.appendChild(icon);
    }
    
    update();
    setInterval(update, 1000);
}

function update() {
    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let isPM = h >= 12;

    document.getElementById('hour').style.transform = `rotate(${(h % 12) * 30 + m/2}deg)`;
    document.getElementById('min').style.transform = `rotate(${m * 6}deg)`;

    for (let i = 0; i < 12; i++) {
        let iconEl = document.getElementById(`icon-${i}`);
        let hourRef = i === 0 ? 12 : i;
        let actualH = isPM ? (hourRef === 12 ? 12 : hourRef + 12) : (hourRef === 12 ? 0 : hourRef);

        if (actualH >= 21 || actualH < 8) {
            iconEl.innerText = "🌙";
        } else {
            iconEl.innerText = isPM ? (routinePM[actualH] || "🌙") : (routineAM[actualH] || "🌙");
        }
    }
}

window.onload = init;
