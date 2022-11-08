//@ts-ignore: Ignoring issue with js-datepicker lack of intellisense
const picker = datepicker("#due-date");
const toDoKey = "todo"
picker.setMin(new Date()); //Set to today's date

class ToDoItem {
    task:string;
    dueDate:string;
    isCompleted:boolean;
}

let toDoItemArray:ToDoItem[] = [];

window.onload = function() {
    let addItem = $("add");
    addItem.onclick = main;
    if (localStorage.getItem(toDoKey) != null) {
        loadFromStorage();
    }
}

function main() {
    if(isValid()) {
        let item = getToDoItem();
        displayToDoItem(item);
        toDoItemArray.push(item);
        let toDoStorage = JSON.stringify(toDoItemArray)
        localStorage.setItem(toDoKey, toDoStorage);
    }
}

/**
 * Check form data is valid
 */
function isValid():boolean {
    return true;
}

/**
 * Gets data from the form and constructs a ToDoItem object
 */
function getToDoItem():ToDoItem {
    let myItem = new ToDoItem();

    //get task
    myItem.task = (<HTMLInputElement>$("task")).value;

    //get due date
    myItem.dueDate = new Date((<HTMLInputElement>$("due-date")).value).toDateString();

    //get isCompleted
    myItem.isCompleted = (<HTMLInputElement>$("is-complete")).checked;

    return myItem;
}

/**
 * Display given ToDoItem on the webpage
 */
function displayToDoItem(item:ToDoItem):void {
    //Creates a <h3> element and sets the text to the task name
    let itemText = document.createElement("h3")
    itemText.innerText = item.task;

    //Creates a <p> element and sets the text to the dueDate
    let itemDate = document.createElement("p")
    itemDate.innerText = item.dueDate;

    //Creates a <div> element with the class todo and if the ToDoItem is marked completed adds a "completed" class
    let itemDiv = document.createElement("div");
    
    itemDiv.onclick = markAsComplete;

    itemDiv.classList.add("todo");
    if (item.isCompleted) {
        itemDiv.classList.add("completed");
    }

    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);

    //Adds itemDiv to the webpage based on completion
    if (item.isCompleted) {
        $("complete-items").appendChild(itemDiv);
    }
    else {
        $("incomplete-items").appendChild(itemDiv);
    }
}

/**
 * shortcut function for document.getElementById()
 * @param id the id of the HTML Element to retrieve
 * @returns HTMLElement
 */
function $(id):HTMLElement {
    return document.getElementById(id);
}

function markAsComplete() {
    let itemDiv = <HTMLDivElement>this;
    itemDiv.classList.add("completed");
    
    let completeItems = $("complete-items");
    completeItems.appendChild(itemDiv);
}

function loadFromStorage() {
    let toDoStorage = localStorage.getItem(toDoKey);
    toDoItemArray = JSON.parse(toDoStorage);
    if (toDoItemArray.length > 0) {
        toDoItemArray.forEach(item => {
            displayToDoItem(item);
        });
    }
}
