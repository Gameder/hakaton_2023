const taskInput = document.getElementById('taskInput');
const taskInput_date = document.getElementById('date');
const taskList = document.getElementById('taskList');

// Слушатель события отправки формы
document.forms[0].addEventListener('click', function(e) {
  e.preventDefault();
  addTask();
});

document.forms[0].addEventListener('submit', function(e) {
    e.preventDefault();
    deleteTask();
  });

// Функция добавления задачи
function addTask() {
  const taskText = taskInput.value + " " +taskInput_date.value;
  if (taskText.trim() !== '' && taskInput_date.value !== "" && taskInput.value !== "") {
    const task = document.createElement('p');
    task.innerText = taskText;
    const button = document.createElement('button');
    button.innerText = 'х';
    button.onclick = function (event) {
        var ul = document.getElementById("taskList");
        var items = ul.getElementsByTagName("li");
        var lastItem = items[items.length-1];
        ul.removeChild(lastItem);
      };
    const taskItem = document.createElement('li');
    task.appendChild(button);
    taskItem.appendChild(task);
    taskList.appendChild(taskItem);
    taskInput.value = '';
  }
}

function deleteTask() {
    var ul = document.getElementById("taskList");
    var items = ul.getElementsByTagName("li");
    var lastItem = items[items.length-1];
    ul.removeChild(lastItem);

  }

