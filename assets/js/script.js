const float = $(".floatDiv");
const addTaskBtn = $("#btn1");
const storeTaskBtn = $("#btn2");
const btnCloseTask =$(".btn-close")
const parent =$(".card-body");
// const deleteTask = getElementById("todo-cards").querySelectorAll(".btnTask");
const deleteTask = document.querySelectorAll(".btnTask");
// input selector
let toDo=[];
let myTask = JSON.parse(localStorage.getItem("toDo"));
// console.log(` this is my array now ${JSON.stringify(myTask)}`);

let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));


// Todo: create a function to generate a unique task id
function generateTaskId() {};

function calculateTaskDate(taskDate){
  let today =dayjs();
  console.log(`today is ${today}`);
  const targetDay = dayjs(taskDate);
  let days = targetDay.diff(today, 'days');
  console.log(`the number of days are ${days}`);
  return days;
}

// Todo: create a function to create a task card



function createTaskCard(task) {
  if (localStorage.getItem("toDo") === null) {
    return;
  } else {
    toDo = JSON.parse(localStorage.getItem("toDo"));
    myTask = JSON.parse(localStorage.getItem("toDo"));
  }

  $("#todo-cards").empty();
  // task.preventDefault();
  for (let i = 0; i < myTask.length; i++) {
    let dueDate =calculateTaskDate(myTask[i].date);
    const divE1 = $("<div>");
    $(divE1).attr("id", `task-${i}`);
    $(divE1).addClass("task-card")
    $("#todo-cards").append(divE1);

    const title = $("<h6>");
    title.text(myTask[i].title);
    divE1.append(title);
    const dateHolder = $("<p>");
    dateHolder.text(myTask[i].date);
    divE1.append(dateHolder);
    const status = $("<p>");
    status.text(myTask[i].task);
    divE1.append(status);
    const btn = $("<button>");
    btn.addClass("btnTask")
    btn.text("Delete");
    divE1.append(btn);
    
    if(dueDate >= 1){
      title.css("background-color", "#EFEFE7");  // gray
      // divE1.attr("style", "background-color:green");
    }else if(dueDate < 0){
      // divE1.attr("style", "background-color:red");
      divE1.css("background-color", "#FF3333");  // red
    }else {
      divE1.css("background-color", "#FFF633"); // yellow
    }
  }
}


// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  createTaskCard(task);
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();
  $(".floatDiv").toggle();
  console.log("You have click the button in floating Div");

  const date = $("#date").val();

  const task = {
    title: $("#title").val(),
    date: dayjs(date).format("MM/DD/YYYY"),
    task: $("#task").val().trim(),
  };
  toDo.push(task);
  localStorage.setItem("toDo", JSON.stringify(toDo));
  renderTaskList();
}

function closeWindow(){
  $(".floatDiv").toggle();
}
// delete a task 

function dltTask(e){
  console.log('I am here at delete');
  e.currentTarget.remove();
}




// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

  renderTaskList();
  addTaskBtn.click(function () {
    $(".floatDiv").toggle();
  });

  storeTaskBtn.click(handleAddTask);
  btnCloseTask.click(closeWindow);
  // deleteTask.click(dltTask);
//https://stackoverflow.com/questions/64023462/how-can-i-create-a-click-event-where-i-have-several-divs-and-each-having-a-butt
document.querySelector('.card-body').addEventListener('click', (e) => {
  //  console.log(e.target)
  e.currentTarget.remove();
  
 })

  
  $( function() {
    $("#date").datepicker();

    $(".task-card").draggable();

    $( ".card-body" ).droppable({  
      drop: function( event, ui ) {
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "#in-progress-cards" )
         console.log( ui.draggable.prop('id'))
      }
    });

  });


    let dragged = null;

         const source = document.getElementById("todo-cards");
       
         source.addEventListener("dragstart", (event) => {
           // store a ref. on the dragged elem
           dragged = event.target;
           console.log(`draged ${dragged}`);
         });
         
         const target = document.querySelector(".card-body");
         target.addEventListener("dragover", (event) => {
           // prevent default to allow drop
           event.preventDefault();
         });
         
         target.addEventListener("drop", (event) => {
           // prevent default action (open as a link for some elements)
           event.preventDefault();
           // move dragged element to the selected drop target
           if (event.target.className === "in-progress-card") {
             dragged.parentNode.removeChild(dragged);
             event.target.appendChild(dragged);
           }
         });
});
