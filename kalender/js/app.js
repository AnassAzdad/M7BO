let currentDate = new Date();
          
function renderCalendar() {
    const monthYear = document.getElementById("month-year");
    const daysContainer = document.getElementById("calendar-days");
    const weekdaysContainer = document.getElementById("weekdays");
    daysContainer.innerHTML = "";
    weekdaysContainer.innerHTML = "";
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    monthYear.innerText = new Intl.DateTimeFormat('nl-NL', { month: 'long', year: 'numeric' }).format(currentDate);
    
    const weekdays = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];
    weekdays.forEach(day => {
        let dayDiv = document.createElement("div");
        dayDiv.innerText = day;
        weekdaysContainer.appendChild(dayDiv);
    });
    
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const prevLastDate = new Date(year, month, 0).getDate();
    
    let daysAdded = 0;
    
    for (let i = 0; i < firstDay; i++) {
        let emptyDiv = document.createElement("div");
        emptyDiv.classList.add("empty-day");
        emptyDiv.innerText = prevLastDate - (firstDay - 1) + i;
        daysContainer.appendChild(emptyDiv);
        daysAdded++;
    }
    
    for (let day = 1; day <= lastDate; day++) {
        let dayDiv = document.createElement("div");
        dayDiv.classList.add("day");
        dayDiv.innerText = day;
        daysContainer.appendChild(dayDiv);
        daysAdded++;
    }
    
    let nextMonthDay = 1;
    while (daysAdded % 7 !== 0) {
        let emptyDiv = document.createElement("div");
        emptyDiv.classList.add("empty-day");
        emptyDiv.innerText = nextMonthDay;
        daysContainer.appendChild(emptyDiv);
        daysAdded++;
        nextMonthDay++;
    }
}

function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

renderCalendar();