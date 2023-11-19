import { auth, ifAuth, getTasks, getProjects, createTask, closeTask } from "./api.js";

const taskName = document.getElementById('taskName');
const taskInput = document.getElementById('taskText');
const taskInput_date = document.getElementById('date');
const taskList = document.getElementById('taskList');
const taskType = document.getElementById('task-type');
const taskPriority = document.getElementById('task-priority');
const tokenInput = document.getElementById('tokenInput');
const authDiv = document.getElementById('auth-div');
const mainDiv = document.getElementById('main-div');
const navbar = document.getElementById('main-navbar');
const projectSelect = document.getElementById('project-select');
const authButton = document.getElementById('auth-button');
const logoutButton = document.getElementById('logout-button');

window.onload = onLogin

async function onLogin() {
  if (ifAuth()) {
    navbar.style.display = "block"
    mainDiv.style.display = "block"
    authDiv.style.display = "none"
    let tasks = await getTasks('', 'today')
    // console.log(tasks)
    for (let i = 0; i < tasks.length; i++) {
      let task = tasks[i]
      let title = task.title
      let description = ''
      let date = ''
      if (task.description !== null) {
        description = task.description
      }
      if (task.date !== null) {
        date = task.date
      }
      let card = elementFromHTML(`
  <div class="card mb-3" style="width: 18rem;" id=task${task.id}>
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${description}\n${date}</p>
        <a class="btn btn-primary" id=btn${task.id}>Закрыть задачу</a>
      </div>
    </div>
  `)
  if (task.isCompleted === false) {
  taskList.appendChild(card)
  let btn = document.getElementById(`btn${task.id}`)
  btn.onclick = deleteTask(task.id)
    }}
  let projects = await getProjects()
  for (let i = 0; i < projects.length; i++) {
    let project = projects[i]
    projectSelect.appendChild(elementFromHTML(
      `
      <option value="${project.id}">${project.title}</option>
      `
    ))
  }
  }

}

function logout(){
  localStorage.removeItem("token")
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
  onLogin()
}

authButton.onclick = authButtonFunc

// Функция добавления задачи
async function addTask() {
  let date = taskInput_date.value.split("-")
  // ymd
  var task = await createTask(
    taskName.value,
    taskInput.value,
    [date[2], date[1], date[0]].join('.'),
    projectSelect.value,
    taskType.value,
    taskPriority.value
  )

  let card = elementFromHTML(`
  <div class="card mb-3" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${taskName.value}</h5>
        <p class="card-text">${taskInput.value}\n${taskInput_date.value}</p>
        <a class="btn btn-primary" id=btn${task.id}>Закрыть задачу</a>
      </div>
    </div>
  `)
  taskList.appendChild(card)
  let btn = document.getElementById(`btn${task.id}`).onclick = deleteTask


}

function deleteTask(id) {
    let task = document.getElementById(`task${id}`)
    task.style.display = "none"
    closeTask(id)

  }

  export {authButton, deleteTask}
