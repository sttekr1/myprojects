const resultOutput = document.getElementById("resultOutput");
const inputTitle = document.getElementById("inputTitle");
const commentArea = document.getElementById("commentArea");
const addReminderBtn = document.getElementById("addReminderBtn");
const refreshBtn = document.getElementById("refreshBtn");
const errorMsg = document.getElementById("errorMsg");
const radioLow = document.getElementById("radioLow");
const radioHigh = document.getElementById("radioHigh");

function Reminder(title, priority, description) {
    this.title = title;
    this.priority = priority;
    this.description = description;
};

let databaseOfReminders = [];

function addToAList(databaseArray, output) {
    output.innerHTML = "";
    for (let i = 0; i < databaseArray.length; i++) {
        output.innerHTML += `
        <tr id="${i}">
        <td>${i + 1}</td>
        <td>${databaseArray[i].title}</td>
        <td>${databaseArray[i].priority}</td>
        <td>${databaseArray[i].description}</td>
        <td class="deleteInput"><a onclick="deleteInput(${i})" aria-label="Delete">&#10006;</td>
        </tr>`;
    }
};

function deleteInput(id) {
    document.getElementById(id).style.display = "none";
    databaseOfReminders.splice(id, 1);
};

function checkPriority() {
    if (radioHigh.checked) {
        return radioHigh.value;
    } else {
        return radioLow.value;
    };
};

addReminderBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (inputTitle.value != "" && commentArea.value != "") {
        let newReminder = new Reminder(inputTitle.value, checkPriority(), commentArea.value);
        databaseOfReminders.push(newReminder);
        console.log(databaseOfReminders);
        addToAList(databaseOfReminders, resultOutput);
        errorMsg.style.display = "none";
        inputTitle.value = "";
        commentArea.value = "";
    } else {
        errorMsg.style.display = "block";
        errorMsg.style.color = "red";
    }
});

refreshBtn.addEventListener("click", function (e) {
    e.preventDefault();
    addToAList(databaseOfReminders, resultOutput);
});