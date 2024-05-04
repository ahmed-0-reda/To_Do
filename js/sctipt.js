let input = document.querySelector("input");
let submit = document.querySelector(".form p");
let warning_msg = document.querySelector(".warning");
let showDiv = document.querySelector(".showList");
let del_All = document.querySelector(".del_All");
let Task_Arr = [];

/** 
 if (window.localStorage.getItem("task")) {
   Task_Arr = JSON.parse(window.localStorage.getItem("task"));
 }*/
//   ^ This line of code will be replaced by ((Task_Arr = tasks)) in getDataFromLocalStorage() function
// This Line Of Code DO The Same Thing

getDataFromLocalStorage();

showDiv.addEventListener("click", (element) => {
  if (element.target.classList.contains("delete")) {
    element.target.parentElement.remove();
    deleteTaskFromLocalStorage(
      element.target.parentElement.getAttribute("data-id")
    );
  }

  if (element.target.classList.contains("task")) {
    element.target.classList.toggle("done");
    changeTaskStatus(element.target.getAttribute("data-id"));
  }
});

submit.onclick = function () {
  if (input.value == "") {
    warning_msg.style.display = "block";
  } else {
    warning_msg.style.display = "none";

    addTaskToArr(input.value);
  }
};

function addTaskToArr(text) {
  const Task = {
    title: text,
    id: Date.now(),
    complete: false,
  };

  Task_Arr.push(Task);

  addTaskToPageFrom(Task_Arr);
  addTaskToLocalStorage(Task_Arr);
}

function addTaskToPageFrom(task) {
  showDiv.innerHTML = "";
  input.value = "";
  Task_Arr.forEach((task) => {
    let div = document.createElement("div");
    div.classList = "task";
    task.complete == true
      ? (div.classList = "task done")
      : (div.classList = "task");
    div.setAttribute("data-id", task.id);

    let p = document.createElement("p");
    p.appendChild(document.createTextNode(task.title));

    let delBtn = document.createElement("span");
    delBtn.classList = "delete";
    delBtn.appendChild(document.createTextNode("Delete"));

    showDiv.appendChild(div);
    div.appendChild(p);
    div.appendChild(delBtn);
  });
}

function addTaskToLocalStorage(Task_Arr) {
  window.localStorage.setItem("task", JSON.stringify(Task_Arr));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("task");
  if (data) {
    let tasks = JSON.parse(data);
    // console.log(tasks);
    // This line of code replaces the case of if condation in line num 8
    Task_Arr = tasks;
    addTaskToPageFrom(Task_Arr);
  }
}

function deleteTaskFromLocalStorage(taskYouWant) {
  Task_Arr = Task_Arr.filter((tasks) => tasks.id != taskYouWant);
  addTaskToLocalStorage(Task_Arr);
  ifNOTask();
}

function changeTaskStatus(taskYouWant) {
  for (let i = 0; i < Task_Arr.length; i++) {
    if (Task_Arr[i].id == taskYouWant) {
      Task_Arr[i].complete == false
        ? (Task_Arr[i].complete = true)
        : (Task_Arr[i].complete = false);
    }
  }
  addTaskToLocalStorage(Task_Arr);
}

del_All.onclick = function () {
  showDiv.innerHTML = "";
  Task_Arr = [];
  ifNOTask();
  window.localStorage.removeItem("task");
};
// window.localStorage.clear();

function ifNOTask() {
  if (showDiv.innerHTML == "") {
    showDiv.innerHTML = "No Tasks To Show";
  }
}
