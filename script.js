import { auth, ifAuth, getTasks, get_user } from "./api.js";

const taskName = document.getElementById('taskName');
const taskInput = document.getElementById('taskText');
const taskInput_date = document.getElementById('date');
const taskList = document.getElementById('taskList');
const tokenInput = document.getElementById('tokenInput');
const authDiv = document.getElementById('auth-div');
const mainDiv = document.getElementById('main-div');
const navbar = document.getElementById('main-navbar');
const authButton = document.getElementById('auth-button');
const logoutButton = document.getElementById('logout-button');

window.onload = async function(e) {
  console.log("adasda")
  e.preventDefault();
  if (ifAuth()) {
    navbar.style.display = "block"
    mainDiv.style.display = "block"
    authDiv.style.display = "none"
    let tasks = await getTasks()
    // console.log(tasks)
    for (let i = 0; i < tasks.length; i++) {
      let task = tasks[i]
      console.log(task)
      let card = elementFromHTML(`
  <div class="card mb-3" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${task.title}</h5>
        <p class="card-text">${task['description']}\n${task['date']}</p>
        <a onclick="deleteTask()" class="btn btn-primary">Закрыть задачу</a>
      </div>
    </div>
  `)
  taskList.appendChild(card)
    }
  }
}

function logout(){
  Cookies.remove("token")
  navbar.style.display = "none"
    mainDiv.style.display = "none"
    authDiv.style.display = "block"
}

logoutButton.onclick = logout

// Слушатель события отправки формы
document.forms[0].addEventListener('submit', function(e) {
  e.preventDefault();
  addTask();
});

// document.forms[0].addEventListener('submit', function(e) {
    // e.preventDefault();
    // deleteTask();
  // });


function elementFromHTML(html) {
  const template = document.createElement("template")

  template.innerHTML = html.trim()
  return template.content.firstElementChild
}


async function authButtonFunc(){
  let res = await auth(tokenInput.value)
  console.log(ifAuth())
  if (ifAuth() === true) {
    navbar.style.display = "block"
    mainDiv.style.display = "block"
    authDiv.style.display = "none"
  } 
}

authButton.onclick = authButtonFunc

// Функция добавления задачи
function addTask() {
  let card = elementFromHTML(`
  <div class="card mb-3" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${taskName.value}</h5>
        <p class="card-text">${taskInput.value}\n${taskInput_date.value}</p>
        <a onclick="deleteTask()" class="btn btn-primary">Закрыть задачу</a>
      </div>
    </div>
  `)
  taskList.appendChild(card)


}

function deleteTask() {
    var ul = document.getElementById("taskList");
    var items = ul.getElementsByTagName("div");
    var lastItem = items[items.length-1];
    taskList.removeChild(lastItem);

  }

  export {authButton}
