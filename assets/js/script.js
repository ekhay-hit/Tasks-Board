// selectors for elements 
const float = $(".floatDiv");
const addTaskBtn = $("#btn1");
const storeTaskBtn = $("#btn2");
const btnCloseTask = $(".btn-close");
const parent = $(".card-body");
const closebtn =$("#closebtn")


// array initial
let toDo = [];
// Pulling the JSON and parsing it, assigned to an array
let myTask = JSON.parse(localStorage.getItem("toDo"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
  // set a condition for the loop
  let condition = true;
  // varaible to store the id
  let randomId;
  //loop through the array and look if the id exist, if does then generate an other random id
  while (condition) {
    // assinging random function to id
    let id = Math.floor(Math.random() * 40);
    // create an id using template and the id from random
    randomId = `task-${id}`;
    //loop and check if the randomId exist in the array if does call ranodm again if not return the id
    for (let i = 0; i < toDo.length; i++) {
      if (randomId.includes(toDo[i].id)) {
        id = Math.floor(Math.random() * 40);
        randomId = `task-${id}`;
      } else {
        condition = false;
      }
    }
    return randomId;
  }
}

// ************Todo: create a function to create a task card

function createTaskCard() {
  // check if the array of object is null or has object if does initials the array with the object 
  if (localStorage.getItem("toDo") === null) {
    return;
  } else {
    toDo = JSON.parse(localStorage.getItem("toDo"));
    myTask = JSON.parse(localStorage.getItem("toDo"));
  }
  
  // empty the tasks container to avoid displaying same task multiple times
  $("#todo-cards").empty();
  $("#in-progress-card").empty();
  $("#done-cards").empty();
  // loop through the array of object and create html dynamically and assign it the values in each object property
  for (let i = 0; i < myTask.length; i++) {
 
    // create a div
    const divE1 = $("<div>");
    // add and a random id to div
    $(divE1).attr("id", myTask[i].id);
    //add a class to syle the div
    $(divE1).addClass("task-card");
    // create and heading6 
    const title = $("<h6>");
    // added title to heading
    title.text(myTask[i].title);
    // appened title to dive
    divE1.append(title);
    // create a p element
    const dateHolder = $("<p>");
    // add date of the object to the element 
    dateHolder.text(myTask[i].date);
    //append date to div
    divE1.append(dateHolder);
    // create a p element 
    const discription = $("<p>");
    //add description to the element 
    discription.text(myTask[i].task);
    // append p to div
    divE1.append(discription);
    // create a button element
    const btn = $("<button>");
    // add a style to the button
    btn.addClass("btnTask");
    // add a text to the button
    btn.text("Delete");
    // append the button to div
    divE1.append(btn);
      // give a style to div base on the date 
    let taskDate =myTask[i].date;
    let today = dayjs();
    if(today.isSame(taskDate, 'day')){
      divE1.css("background-color", "#FFF633"); // yellow
    }else if (today.isAfter(taskDate)){
      divE1.css("background-color", "#FF3333"); // red
    }else {
      title.css("background-color", "#EFEFE7"); // gray
    }
   
    // append the div task to the page pased on its status and changed the style
    if (toDo[i].status === "to-do") {
      $("#todo-cards").append(divE1);
    } else if (toDo[i].status === "in-progress") {
      $("#in-progress-card").append(divE1);
    } else if (toDo[i].status === "done") {
      $("#done-cards").append(divE1);
      divE1.css("background-color", "#EFEFE7");
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
  // open the windows when click add task
  $(".floatDiv").toggle();
  console.log("You have click the button in floating Div");
  // logic for preventing the submission of an commplet task input
  if (
    $("#title").val() === "" ||
    $("#date").val()=== "" ||
    $("#task").val() === ""
  ) {
    alert("Please complete all task inputs");
  } else {
    // assgning the input to object 
  const date = $("#date").val();
  const task = {
    title: $("#title").val(),
    date: dayjs(date).format("MM/DD/YYYY"),
    task: $("#task").val().trim(),
    id: generateTaskId(),
    status: "to-do",
  };
  // push the object to the array
  toDo.push(task);
  // store the array in local storage
  localStorage.setItem("toDo", JSON.stringify(toDo));
    // empty the input value t
    $("#title").val("");
    $("#date").val("");
    $("#task").val("");
  // re-load the page 
  history.go(0)
  // render the task
  renderTaskList();
}
}

function closeWindow() {
  $(".floatDiv").toggle();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(e){
  e.preventDefault();
  let id = e.target.parentNode.id;
  console.log(toDo);
  let index =getIndexOfId(id);
  const discardArry = toDo.splice(index, 1);
  console.log("I am here at delete");
  console.log(toDo);
  localStorage.setItem("toDo", JSON.stringify(toDo));
// re-load the page 
   history.go(0)
}
// function to find the index of a given property 
function  getIndexOfId(myid){
  let index = toDo
     .map(function (x) {
       return x.id;
     })
     .indexOf(myid);
   
  return index;
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
   // get the id of draggable element
   const dragedElId = ui.draggable.prop("id");
   console.log(`this the elm dragged ${dragedElId}`);
// get the id of the droppable parent element
const target = document.getElementById(event.target.id).parentNode.id;
console.log(`This the target drop ${target}`);
// look through the array and return the index of the id property that was given
event.preventDefault();
let index = getIndexOfId(dragedElId);
console.log(
  `This is the index of draged element in the array ${index}`
);
     // update the status of where the object is dropped
   if (target === "in-progress") {
     toDo[index].status = "in-progress";
   } else if (target === "done") {
     toDo[index].status = "done";
   }else if(target === "to-do"){
     toDo[index].status = "to-do";
   }
   // update the array object in the local storage
   localStorage.setItem("toDo", JSON.stringify(toDo));
   // re-load the page 
   history.go(0)
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();
  addTaskBtn.click(function () {
    $(".floatDiv").toggle();
  });

  storeTaskBtn.click(handleAddTask);
  btnCloseTask.click(closeWindow);
 
  // delete function  handleDeleteTask
  const deleteTask = document.querySelectorAll(".btnTask");
  for(let i=0; i< deleteTask.length; i++){
    
    deleteTask[i].addEventListener("click",handleDeleteTask);
    // {
  //     e.preventDefault();
  //     let id = e.target.parentNode.id;
  //     console.log(toDo);
  //     let index =getIndexOfId(id);
  //     const discardArry = toDo.splice(index, 1);
  //     console.log("I am here at delete");
  //     console.log(toDo);
  //     localStorage.setItem("toDo", JSON.stringify(toDo));
  //  // re-load the page 
  //      history.go(0)
    // });
  
  } 
  $(function () {
    $("#date").datepicker();
    $(".task-card").draggable();

    $(".card-body").droppable({
      drop: function (event, ui) {
        $(this).addClass("ui-state-highlight");
        handleDrop(event, ui);
      },
     
    });

  });

});
