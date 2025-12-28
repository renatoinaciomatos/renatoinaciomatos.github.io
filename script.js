const routineAM = {
    0: "🌙", 1: "🌙", 2: "🌙", 3: "🌙", 4: "🌙", 5: "🌙", 6: "🌙", 7: "🌙",
    8: "☀️", 9: "☕", 10: "🪆", 11: "📱"
};

const routinePM = {
    12: "📺", 13: "🍲", 14: "🏃", 15: "🎨", 16: "📱", 17: "🚶", 18: "🚶", 19: "🏃",
    20: "🍽️", 21: "🛀", 22: "🌙", 23: "🌙"
};

function createClock() {
    const container = document.getElementById('sectors-container');
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF33A8', '#33FFF3', 
                    '#F3FF33', '#FF8633', '#8633FF', '#33FF86', '#FF3333', '#3386FF'];

    for (let i = 0; i < 12; i++) {
        // Criar fatias coloridas (30 graus cada)
        const sector = document.createElement('div');
        sector.className = 'sector';
        sector.style.backgroundColor = colors[i];
        
        // Lógica de rotação para cada hora (12h às 11h)
        const rotation = i * 30;
        sector.style.transform = `rotate(${rotation}deg)`;
        
        // Clip-path para criar o triângulo da fatia
        sector.style.clipPath = "polygon(50% 50%, 40% 0%, 60% 0%)";
        container.appendChild(sector);

        // Criar ícones
        const iconWrap = document.createElement('div');
        iconWrap.className = 'activity-icon';
        iconWrap.id = `icon-${i}`;
        
        // Posicionar ícone no círculo
        const angle = (rotation - 90) * (Math.PI / 180);
        const radius = 240; 
        const x = 300 + radius * Math.cos(angle) - 25;
        const y = 300 + radius * Math.sin(angle) - 25;
        
        iconWrap.style.left = `${x}px`;
        iconWrap.style.top = `${y}px`;
        container.appendChild(iconWrap);
    }
}

function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Rotação dos ponteiros
    const hourDeg = (hours % 12) * 30 + (minutes / 2);
    const minDeg = minutes * 6;

    document.querySelector('.hour-hand').style.transform = `rotate(${hourDeg}deg)`;
    document.querySelector('.minute-hand').style.transform = `rotate(${minDeg}deg)`;

    // Atualizar Ícones baseado em AM/PM
    const isPM = hours >= 12;
    const routine = isPM ? routinePM : routineAM;

    for (let i = 0; i < 12; i++) {
        const iconDiv = document.getElementById(`icon-${i}`);
        // Se for relógio de 12h, o índice 0 no relógio representa 12h ou 0h
        let hourKey = i === 0 ? (isPM ? 12 : 0) : (isPM ? i + 12 : i);
        
        // Ajuste especial para o período da noite (Lua de 9PM a 7AM)
        if (hourKey >= 21 || hourKey <= 7) {
            iconDiv.innerText = "🌙";
        } else {
            iconDiv.innerText = routine[hourKey] || "✨";
        }
    }
}

createClock();
setInterval(updateClock, 1000);
updateClock();
