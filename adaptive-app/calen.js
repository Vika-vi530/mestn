const MONTH_NAMES = [
    "Январь","Февраль","Март","Апрель","Май","Июнь",
    "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"
];

const now = new Date();
const year  = now.getFullYear();
const month = now.getMonth();

document.getElementById("month").textContent = MONTH_NAMES[month];
document.getElementById("year").textContent  = year;

const daysInMonth = new Date(year, month + 1, 0).getDate();
const calendar = JSON.parse(localStorage.getItem("calendar") || "{}");

const grid = document.getElementById("grid");
grid.innerHTML = "";

for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement("div");
    cell.className = "day";

    // ключ в формате YYYY-MM-DD, как в task.js
    const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const photo = calendar[key];

    if (photo) {
        cell.classList.add("has-photo");
        cell.style.backgroundImage = `url('${photo}')`;
    }

    const span = document.createElement("span");
    span.textContent = d;
    cell.appendChild(span);

    grid.appendChild(cell);
}