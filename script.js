const scheduleData = [
    { time: "07:10", mon: "", tue: "", wed: "", thu: "", fri: "" },
    { time: "08:00", mon: "", tue: "", wed: "", thu: "", fri: "" },
    { time: "09:10", mon: "", tue: "", wed: "", thu: "", fri: "" },
    { time: "10:00", mon: "", tue: "", wed: "", thu: "", fri: "" },
    { time: "11:00", mon: "", tue: "", wed: "", thu: "", fri: "" },
    { time: "11:50", mon: "", tue: "", wed: "", thu: "", fri: "" },
    { time: "13:10", mon: "", tue: "", wed: "", thu: "", fri: "" },
    { time: "14:00", mon: "", tue: "", wed: "", thu: "", fri: "" },
    { time: "15:10", mon: "", tue: "", wed: "162-I/Física I", thu: "", fri: "122-I/Física I" },
    { time: "16:00", mon: "", tue: "", wed: "162-I/Física I", thu: "", fri: "122-I/Física I" },
    { time: "17:00", mon: "", tue: "", wed: "", thu: "", fri: "" },
    { time: "17:50", mon: "", tue: "", wed: "", thu: "", fri: "" },
    { time: "19:00", mon: "", tue: "", wed: "", thu: "393-P/Física III", fri: "" },
    { time: "19:50", mon: "", tue: "", wed: "", thu: "393-P/Física III", fri: "" },
    { time: "20:50", mon: "293-P/Física II", tue: "", wed: "", thu: "", fri: "" },
    { time: "21:40", mon: "293-P/Física II", tue: "", wed: "", thu: "", fri: "" }
];

const tbody = document.getElementById('schedule-body');

scheduleData.forEach(row => {
    const tr = document.createElement('tr');
    
    // Criar array com os valores do dia para facilitar o loop
    const days = [row.time, row.mon, row.tue, row.wed, row.thu, row.fri];
    
    days.forEach((text, index) => {
        const td = document.createElement('td');
        td.textContent = text || "---";
        
        // Se não for a coluna de tempo e tiver conteúdo, adiciona classe de destaque
        if (index > 0 && text !== "") {
            td.classList.add('has-class');
        }
        
        tr.appendChild(td);
    });
    
    tbody.appendChild(tr);
});
