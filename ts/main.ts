//@ts-ignore: Ignoring issue with js-datepicker lack of intellisense
const picker = datepicker("#due-date");
picker.setMin(new Date()); //Set to today's date

class ToDoItem {
    task:string;
    dueDate:Date;
    isCompleted:boolean;
}

window.onload = function() {
    let addItem = $("add");
    addItem.onclick = main;
}

function main() {
    if(isValid()) {
        let item = getToDoItem();
        displayToDoItem(item);
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
    myItem.dueDate = new Date((<HTMLInputElement>$("due-date")).value);

    //get isCompleted
    myItem.isCompleted = (<HTMLInputElement>$("task")).checked;

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
    itemDate.innerText = item.dueDate.toDateString();

    //Creates a <div> element and if the ToDoItem is marked completed adds a "completed" class
    let itemDiv = document.createElement("div");
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

function $(id):HTMLElement {
    return document.getElementById(id);
}
//TODO: Allow user to mark a ToDoItem as completed