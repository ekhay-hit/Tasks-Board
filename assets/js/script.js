const float = $(".floatDiv");
const addTaskBtn = $("#btn1");
const storeTaskBtn = $("#btn2");

// input selector
let toDo;
let myTask = JSON.parse(localStorage.getItem("toDo"));
// console.log(` this is my array now ${JSON.stringify(myTask)}`);

let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
$(function () {
  $("#date").datepicker();
});

// Todo: create a function to generate a unique task id
function generateTaskId() {}

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
    const divE1 = $("<div>");
    $(divE1).attr("id", `task-${i}`);
    $(divE1).addClass("task-style")

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
    btn.text("Delete");
    divE1.append(btn);
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

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  //   if (localStorage.getItem(toDo) === null) {
  //     toDo = [];
  //   } else {
  //     toDo = JSON.parse(localStorage.getItem("toDo"));
  //   }

  addTaskBtn.click(function () {
    $(".floatDiv").toggle();
  });
  storeTaskBtn.click(handleAddTask);
  $( function() {
    $(".task-style").draggable();
  } );
  renderTaskList();

  //   const divE1 = $("<div>");
  //   divE1.addClass("task-style");
  //   $("#todo-cards").append(divE1);
  //   const title = $("<h6>");
  //   title.text(myTask[0].title);
  //   divE1.append(title);
  //   const dateHolder = $("<p>");
  //   dateHolder.text(myTask[0].date);
  //   divE1.append(dateHolder);
  //   const status = $("<p>");
  //   status.text(myTask[0].task);
  //   divE1.append(status);
  //   const btn = $("<button>");
  //   btn.text("Delete");
  //   divE1.append(btn);
});
