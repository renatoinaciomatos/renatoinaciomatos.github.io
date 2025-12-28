const routineAM = {
    0: "🌙", 1: "🌙", 2: "🌙", 3: "🌙", 4: "🌙", 5: "🌙", 6: "🌙", 7: "🌙",
    8: "🌞", 9: "🥪", 10: "🧸", 11: "📱"
};

const routinePM = {
    12: "📺", 13: "🍽️", 14: "😌", 15: "🎨", 16: "📱", 17: "🚘", 18: "🚘", 19: "🔠",
    20: "🍽️", 21: "😴", 22: "🌙", 23: "🌙"
};

const container = document.getElementById('sectors-container');
const clock = document.getElementById('main-clock');
const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF33A8', '#33FFF3', '#F3FF33', '#FF8633', '#8633FF', '#33FF86', '#FF3333', '#3386FF'];

// Criar os elementos visuais
for (let i = 0; i < 12; i++) {
    // Fatias coloridas
    let sector = document.createElement('div');
    sector.className = 'sector';
    sector.style.backgroundColor = colors[i];
    sector.style.transform = `rotate(${i * 30}deg)`;
    container.appendChild(sector);

    // Ícones
    let icon = document.createElement('div');
    icon.className = 'activity-icon';
    icon.id = `icon-${i}`;
    
    // Matemática para posicionar em círculo (raio de 42% do relógio)
    let angle = (i * 30 - 90) * (Math.PI / 180);
    let radius = clock.offsetWidth / 2.4; 
    let x = (clock.offsetWidth / 2) + radius * Math.cos(angle) - 25;
    let y = (clock.offsetHeight / 2) + radius * Math.sin(angle) - 25;
    
    icon.style.left = x + 'px';
    icon.style.top = y + 'px';
    clock.appendChild(icon);
}

function update() {
    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let isPM = h >= 12;

    // Girar ponteiros
    document.getElementById('hour').style.transform = `rotate(${(h % 12) * 30 + m/2}deg)`;
    document.getElementById('min').style.transform = `rotate(${m * 6}deg)`;

    // Atualizar ícones (Dormir das 21h às 08h)
    for (let i = 0; i < 12; i++) {
        let iconEl = document.getElementById(`icon-${i}`);
        let hourRef = i; // 0 a 11 no relógio
        
        // Se for tarde, somamos 12 para checar a rotina (exceto se for 12)
        let actualH = isPM ? (hourRef === 0 ? 12 : hourRef + 12) : hourRef;
        if (hourRef === 0 && !isPM) actualH = 0;

        // Regra da Lua (9PM às 8AM)
        if (actualH >= 21 || actualH < 8) {
            iconEl.innerText = "🌙";
        } else {
            iconEl.innerText = isPM ? (routinePM[actualH] || "🌙") : (routineAM[actualH] || "🌙");
        }
    }
}

setInterval(update, 1000);
update();
