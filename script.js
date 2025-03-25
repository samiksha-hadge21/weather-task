let count = 0;

function isAuthenticated() {
    return localStorage.getItem('user');
}

function checkTemp() {
    const city = document.getElementById('weatherInput').value;
    const cityname = document.getElementById('cityName');
    const temp = document.getElementById('temperature');
    const realfeel = document.getElementById('realfeel');
    const windspeed = document.getElementById('windspeed');
    const humidity = document.getElementById('humidity');
    const icon = document.getElementById('icon');

    fetch(`https://api.weatherapi.com/v1/current.json?key=69292638a3cc467c8de91237250403&q=${city}&aqi=yes`)
        .then(response => response.json())
        .then(data => {
            cityname.innerHTML = city;
            temp.innerHTML = data.current.temp_c + '°C';
            icon.src = data.current.condition.icon;
            realfeel.innerHTML = "Real Feel: " + data.current.feelslike_c + "°C";
            windspeed.innerHTML = "Wind Speed: " + data.current.wind_kph + " km/h";
            humidity.innerHTML = "Humidity: " + data.current.humidity + "%";
        })
        .catch(error => alert("Invalid City Name or Network Issue"));
}

function addTask() {
    let task = document.getElementById('taskInput').value;
    let priority = document.getElementById('priority').value;
    let container = document.getElementById('tasks');

    if (task === '') {
        alert("Please enter a task");
        return;
    }

    let jscontainer = document.createElement('div');
    jscontainer.className = 'task-item';
    jscontainer.id = `task${count}`;
    count++;

    let taskText = document.createElement('span');
    taskText.innerHTML = `${task} (${priority})`;

    let deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'Delete';
    deleteBtn.onclick = function () { deleteTask(jscontainer.id); };

    jscontainer.appendChild(taskText);
    jscontainer.appendChild(deleteBtn);
    container.appendChild(jscontainer);

    document.getElementById('taskInput').value = '';
    saveTasks();
}

function deleteTask(taskId) {
    document.getElementById(taskId).remove();
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll('.task-item').forEach(task => {
        tasks.push(task.innerText);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let container = document.getElementById('tasks');

    storedTasks.forEach(taskText => {
        let jscontainer = document.createElement('div');
        jscontainer.className = 'task-item';
        jscontainer.id = `task${count}`;
        count++;

        let taskSpan = document.createElement('span');
        taskSpan.innerText = taskText;

        let deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = 'Delete';
        deleteBtn.onclick = function () { deleteTask(jscontainer.id); };

        jscontainer.appendChild(taskSpan);
        jscontainer.appendChild(deleteBtn);
        container.appendChild(jscontainer);
    });
}

document.addEventListener("DOMContentLoaded", loadTasks);

