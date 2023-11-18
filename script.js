const taskName = document.getElementById('taskName');
const taskInput = document.getElementById('taskText');
const taskInput_date = document.getElementById('date');
const taskList = document.getElementById('taskList');

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

