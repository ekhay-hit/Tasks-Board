const float= $(".floatDiv");
const addTaskBtn =$('#btn1');
const storeTaskBtn =$('#btn2');

// input selector
let toDo;

// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
 
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {


    addTaskBtn.click(function(){
        $(".floatDiv").toggle();
    });
    
    storeTaskBtn.click(function(e){

        if(localStorage.getItem(toDo)=== null){
            toDo=[];
          }else{
              toDo = JSON.parse(localStorage.getItem(toDo))
          }
        e.preventDefault();
        $(".floatDiv").toggle();
        console.log('You have click the button in floating Div');
    
        const task = {
            title: $("#title").val(),
            date: $("#date").val(),
            task: $("#task").val().trim(),
        }
        toDo.push(task);
        localStorage.setItem("toDo", JSON.stringify(toDo))
    });
     
   
   
});

