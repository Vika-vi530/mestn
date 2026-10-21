// ---------- Дата ----------
const MONTHS = [
    "января", "февраля", "марта", "апреля",
    "мая", "июня", "июля", "августа",
    "сентября", "октября", "ноября", "декабря"
];

const dateEl = document.getElementById("date");
const now = new Date();
dateEl.textContent = `${now.getDate()} ${MONTHS[now.getMonth()]}`;

// ---------- Город ----------
const CITIES = ["Брест", "Гродно"];
let cityIndex = CITIES.indexOf(localStorage.getItem("selectedCity"));
if (cityIndex === -1) cityIndex = 0;

const cityEl = document.getElementById("city");
cityEl.textContent = CITIES[cityIndex];
localStorage.setItem("selectedCity", CITIES[cityIndex]);

document.getElementById("changeCity").addEventListener("click", () => {
    cityIndex = (cityIndex + 1) % CITIES.length;
    cityEl.textContent = CITIES[cityIndex];
    localStorage.setItem("selectedCity", CITIES[cityIndex]);
});

// ---------- Счётчик (читаем из localStorage) ----------
const counterEl = document.getElementById("counter");
const tasksTotal = 1;
let tasksDone = Number(localStorage.getItem("tasksDone") || 0);

// автосброс на следующий день (по желанию)
const today = new Date().toDateString();
if (localStorage.getItem("tasksDate") !== today) {
    tasksDone = 0;
    localStorage.setItem("tasksDone", 0);
    localStorage.setItem("tasksDate", today);
}

function updateCounter() {
    counterEl.textContent = `Сегодня: ${tasksDone} из ${tasksTotal}`;
}
updateCounter();

document.getElementById("acceptBtn").addEventListener("click", () => {
    window.location.href = "task.html";
});

// ---------- Таймер ----------
const timeLeftEl = document.getElementById("timeLeft");

function updateTimeLeft() {
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    const diffMs = endOfDay - now;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    timeLeftEl.innerHTML =
        `Осталось ${hours} ч ${minutes} мин<br>до конца дня`;
}

updateTimeLeft();
setInterval(updateTimeLeft, 60000);