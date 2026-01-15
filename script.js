const myClasses = {
    "Segunda": [
        { time: "20:50", code: "293-P" },
        { time: "21:40", code: "293-P" }
    ],
    "Quarta": [
        { time: "15:10", code: "162-I" },
        { time: "16:00", code: "162-I" }
    ],
    "Quinta": [
        { time: "19:00", code: "393-P" },
        { time: "19:50", code: "393-P" }
    ],
    "Sexta": [
        { time: "15:10", code: "122-I" },
        { time: "16:00", code: "122-I" }
    ]
};

const container = document.getElementById('schedule-container');

// Itera apenas sobre os dias que têm aula
Object.entries(myClasses).forEach(([day, classes]) => {
    const column = document.createElement('div');
    column.className = 'day-column';
    
    let html = `<h2 class="day-title">${day}</h2>`;
    
    classes.forEach(c => {
        html += `
            <div class="class-card">
                <span class="class-time">${c.time}</span>
                <span class="class-code">${c.code}</span>
            </div>
        `;
    });
    
    column.innerHTML = html;
    container.appendChild(column);
});
