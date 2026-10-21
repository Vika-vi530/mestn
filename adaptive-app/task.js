const TASKS_BY_CITY = {
    "Брест": [
        {
            html: 'Найди на набережной Мухавца разноцветные <span class="highlight">зонтики</span>, парящие в небе.'
        },
        {
            html: 'Найди задание с <span class="highlight">необычной стеной</span>'
        },
        {
            html: 'Гуляя по ул. Советской, найди три: <span class="highlight">пуговица, фонари и фонарщика</span>.'
        }
    ],
    "Гродно": [
        {
            html: 'Найди на Немиге <span class="highlight">три граффити</span>.'
        }
    ],
};

const city = localStorage.getItem("selectedCity") || "Брест";
const pool = TASKS_BY_CITY[city] || TASKS_BY_CITY["Брест"];

let task;
const savedTask = localStorage.getItem("currentTask");
if (savedTask) {
    try { task = JSON.parse(savedTask); localStorage.removeItem("currentTask"); }
    catch (e) { task = pool[Math.floor(Math.random() * pool.length)]; }
} else {
    task = pool[Math.floor(Math.random() * pool.length)];
}

const taskTextEl = document.getElementById("taskText");
const photoSlot  = document.getElementById("photoSlot");
const cameraIcon = document.getElementById("cameraIcon");
const taskImage  = document.getElementById("taskImage");
const fileInput  = document.getElementById("fileInput");
const doneBtn    = document.getElementById("doneBtn");

taskTextEl.innerHTML = task.html;

if (task.image) {
    taskImage.src = task.image;
    taskImage.classList.remove("hidden");
    cameraIcon.classList.add("hidden");
}

photoSlot.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
        taskImage.src = ev.target.result;
        taskImage.classList.remove("hidden");
        cameraIcon.classList.add("hidden");
    };
    reader.readAsDataURL(file);
});

doneBtn.addEventListener("click", () => {
    if (taskImage.classList.contains("hidden")) {
        alert("Сначала добавьте фотографию задания 📸");
        return;
    }

    const done = Number(localStorage.getItem("tasksDone") || 0) + 1;
    localStorage.setItem("tasksDone", done);

    const now = new Date();
    const key = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

    const calendar = JSON.parse(localStorage.getItem("calendar") || "{}");
    calendar[key] = taskImage.src;
    localStorage.setItem("calendar", JSON.stringify(calendar));

    // Возврат
    window.location.href = "index3.html";
});