const taskInput = document.getElementById('taskInput');
const taskInput_date = document.getElementById('date');
const taskList = document.getElementById('taskList');
var int = 0;
// Слушатель события отправки формы
document.forms[0].addEventListener('submit', function(e) {
  e.preventDefault();
  addTask();
});

document.forms[0].addEventListener('click', function (event) {
    if (event.target.nodeName === 'BUTTON'){
      event.target.closest('li').remove()
    }
  })

// Функция добавления задачи
function addTask() {
  const taskText = taskInput.value + " " +taskInput_date.value;
  if (taskText.trim() !== '' && taskInput_date.value !== "" && taskInput.value !== "") {
    const task = document.createElement('p');
    task.innerText = taskText;
    const button = document.createElement('button');
    button.innerText = 'х';
    const taskItem = document.createElement('li');
    task.appendChild(button);
    taskItem.appendChild(task);
    taskList.appendChild(taskItem);
    taskInput.value = '';
  }
}





