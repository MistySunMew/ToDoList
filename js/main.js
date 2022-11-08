var picker = datepicker("#due-date");
var toDoKey = "todo";
picker.setMin(new Date());
var ToDoItem = (function () {
    function ToDoItem() {
    }
    return ToDoItem;
}());
var toDoItemArray = [];
window.onload = function () {
    var addItem = $("add");
    addItem.onclick = main;
    if (localStorage.getItem(toDoKey) != null) {
        loadFromStorage();
    }
};
function main() {
    if (isValid()) {
        var item = getToDoItem();
        displayToDoItem(item);
        toDoItemArray.push(item);
        var toDoStorage = JSON.stringify(toDoItemArray);
        localStorage.setItem(toDoKey, toDoStorage);
    }
}
function isValid() {
    return true;
}
function getToDoItem() {
    var myItem = new ToDoItem();
    myItem.task = $("task").value;
    myItem.dueDate = new Date($("due-date").value).toDateString();
    myItem.isCompleted = $("is-complete").checked;
    return myItem;
}
function displayToDoItem(item) {
    var itemText = document.createElement("h3");
    itemText.innerText = item.task;
    var itemDate = document.createElement("p");
    itemDate.innerText = item.dueDate;
    var itemDiv = document.createElement("div");
    itemDiv.onclick = markAsComplete;
    itemDiv.classList.add("todo");
    if (item.isCompleted) {
        itemDiv.classList.add("completed");
    }
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);
    if (item.isCompleted) {
        $("complete-items").appendChild(itemDiv);
    }
    else {
        $("incomplete-items").appendChild(itemDiv);
    }
}
function $(id) {
    return document.getElementById(id);
}
function markAsComplete() {
    var itemDiv = this;
    itemDiv.classList.add("completed");
    var completeItems = $("complete-items");
    completeItems.appendChild(itemDiv);
}
function loadFromStorage() {
    var toDoStorage = localStorage.getItem(toDoKey);
    toDoItemArray = JSON.parse(toDoStorage);
    if (toDoItemArray.length > 0) {
        toDoItemArray.forEach(function (item) {
            displayToDoItem(item);
        });
    }
}
