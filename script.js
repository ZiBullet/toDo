const form = document.forms.toDo,
    input = form.querySelector(".header__form-input"),
    cardsContainer = document.querySelector(".cards__wrap"),
    tasks = [];

form.onsubmit = (e) => {
    e.preventDefault();

    input.value.trim().length
        ? addTask()
        : console.log("A task is supposed to has a title.");
}

function addTask() {
    let date = new Date,
    
        hours = date.getHours() <= 9 
        ? "0" + date.getHours() 
        : date.getHours(),

        minutes = date.getMinutes() <= 9 
        ? "0" + date.getMinutes() 
        : date.getMinutes()
        currentTime = `${hours}:${minutes}`;

    let task = {
        id: Math.random(),
        time: currentTime
    },
        fm = new FormData(form);

    fm.forEach((value, key) => {
        task[key] = value;
    })

    tasks.push(task);
    displayTasks()
}

function displayTasks() {
    if (!tasks.length) cardsContainer.innerHTML = "";

    cardsContainer.innerHTML = "";
    tasks.forEach(task => cardsContainer.innerHTML += genCard(task));

    let delBtns = document.querySelectorAll(".cards__card-del");
    delBtns.forEach(btn => {
        btn.onclick = () => {
            delCard(btn);
            displayTasks()
        };
    })
}

function genCard(task) {
    let {id, title, time} = task;
    return `
    <div class="cards__card" id="${id}">
        <div class="cards__card-content">
            <h3 class="cards__card-title">${title}</h3>
            <img src="./imgs/cancel-icon.svg" class="cards__card-del">
        </div>
        <p class="cards__card-time">${time}</p>
    </div>
    `
}

function delCard(btn) {
    let card = btn.closest(".cards__card"),
        cardId = card.id;
    tasks.forEach((task, i) => {
        if (task.id != cardId) return;
        tasks.splice(i, 1);
    })
}