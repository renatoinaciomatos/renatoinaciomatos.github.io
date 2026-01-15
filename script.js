const classesData = [
    { day: "Segunda", start: "20:50", end: "22:30", code: "293-P" },
    { day: "Quarta",  start: "15:10", end: "16:50", code: "162-I" },
    { day: "Quinta",  start: "19:00", end: "20:40", code: "393-P" },
    { day: "Sexta",   start: "15:10", end: "16:50", code: "122-I" }
];

const container = document.getElementById('schedule');

classesData.forEach(item => {
    const block = document.createElement('div');
    block.className = 'day-group';
    
    block.innerHTML = `
        <span class="day-label">${item.day}</span>
        <span class="time">${item.start} — ${item.end}</span>
        <span class="code">${item.code}</span>
    `;
    
    container.appendChild(block);
});
