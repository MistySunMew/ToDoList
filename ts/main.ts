//@ts-ignore: Ignoring issue with js-datepicker lack of intellisense
const picker = datepicker("#due-date");
picker.setMin(new Date()); //Set to today's date

class ToDoItem {
    title:string;
    dueDate:Date;
    isCompleted:boolean;

    constructor(title:string) {
        this.title = title;
    }
}

/**
 * Check form data is valid
 */
function isValid():boolean {

}

/**
 * Gets data from the form and constructs a ToDoItem object
 */
function getToDoItem():ToDoItem {

}

/**
 * Display given ToDoItem on the webpage
 */
function displayToDoItem(item:ToDoItem):void {

}

//TODO: Allow user to mark a ToDoItem as completed