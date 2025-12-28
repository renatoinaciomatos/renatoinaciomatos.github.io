const routineAM = {
    0: "🌙", 1: "🌙", 2: "🌙", 3: "🌙", 4: "🌙", 5: "🌙", 6: "🌙", 7: "🌙",
    8: "☀️", 9: "☕", 10: "🪆", 11: "📱"
};

const routinePM = {
    12: "📺", 13: "🍲", 14: "🏃", 15: "🎨", 16: "📱", 17: "🚶", 18: "🚶", 19: "🏃",
    20: "🍽️", 21: "🛀", 22: "🌙", 23: "🌙"
};

function init() {
    const container = document.getElementById('sectors-container');
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF33A8', '#33FFF3', 
                    '#F3FF33', '#FF8633', '#8633FF', '#33FF86', '#FF3333', '#3386FF'];

    for (let i = 0; i < 12; i++) {
        // Criar fatias
        const sector = document.createElement('div');
        sector.className = 'sector';
        sector.style.backgroundColor = colors[i];
        // Rotaciona cada fatia para a posição da hora (30 graus cada)
        // Subtraímos 15 para centralizar a fatia no número
        sector.style.transform = `rotate(${(i * 30) - 15}deg)`; 
        container.appendChild(sector);

        // Criar ícones
        const icon = document.createElement('div');
        icon.className = 'activity-icon';
        icon.id = `icon-${i}`;
        
        // Posicionar ícones em círculo
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const radius = 230; 
        const x = 300 + radius * Math.cos(angle) - 30;
        const y = 300 + radius * Math.sin(angle) - 30;
        
        icon.style.left = `${x}px`;
        icon.style.top = `${y}px`;
        document.querySelector('.clock-container').appendChild(icon);
    }
    update();
    setInterval(update, 1000);
}

function update() {
    const now = new Date();
    const hours = now.getHours();
    const mins = now.getMinutes();
    const isPM = hours >= 12;

    // Movimento ponteiros
    const hourDeg = ((hours % 12) * 30) + (mins / 2);
    const minDeg = mins * 6;

    document.querySelector('.hour-hand').style.transform = `rotate(${hourDeg}deg)`;
    document.querySelector('.minute-hand').style.transform = `rotate(${minDeg}deg)`;

    // Atualizar ícones baseado na rotina
    for (let i = 0; i < 12; i++) {
        const iconDiv = document.getElementById(`icon-${i}`);
        // Converte o índice do relógio (1-12) para a hora real
        let displayHour = i === 0 ? 12 : i; 
        
        // Lógica da Madrugada/Noite (9PM até 7:59AM = Lua)
        let actualHour = isPM ? (displayHour === 12 ? 12 : displayHour + 12) : (displayHour === 12 ? 0 : displayHour);
        
        if (actualHour >= 21 || actualHour <= 7) {
            iconDiv.innerText = "🌙";
        } else {
            iconDiv.innerText = isPM ? routinePM[actualHour] : routineAM[actualHour];
        }
    }
}

init();
