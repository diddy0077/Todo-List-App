
let addTaskBtn = document.getElementById('addTaskBtn');
let taskList = document.getElementById('taskList');

let taskArray = [];
addTaskBtn.addEventListener('click', () => {
  let taskInput = document.getElementById('taskInput').value.trim();
  if(taskInput === '') {
    return taskList.textContent = 'You must enter at least one task to submit'
  }
  let task = {
    text: taskInput,
    completed: false
  }
  taskArray.push(task)
  localStorage.setItem("tasks", JSON.stringify(taskArray));
  renderTasks()
  taskInput.value = '';
})


function renderTasks() {
  taskList.textContent = ''; // Clear the list

  for (let i = 0; i < taskArray.length; i++) {
    const li = document.createElement("li");
    li.textContent = taskArray[i].text;

    // If the task is completed, add a style
    if (taskArray[i].completed) {
      li.style.textDecoration = "line-through";
      li.style.color = "gray";
    }

    // Create the "Complete" button
    const completeBtn = document.createElement("button");
    completeBtn.textContent = taskArray[i].completed ? "Undo" : "Complete";

    // Add event listener to toggle 'completed' status
    completeBtn.addEventListener("click", () => {
      taskArray[i].completed = !taskArray[i].completed;
      localStorage.setItem("tasks", JSON.stringify(taskArray));
      renderTasks(); // Re-render updated list
    });
    li.appendChild(completeBtn);
    taskList.appendChild(li);
    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Delete';
    li.appendChild(deleteBtn)
    deleteBtn.addEventListener('click', () => {
      taskArray.splice(i, 1)
      localStorage.setItem('tasks', JSON.stringify(taskArray))
      renderTasks()
    })
  }
}
let storedTasks = JSON.parse(localStorage.getItem("tasks"));
if (storedTasks) {
  taskArray = storedTasks;
}
renderTasks();
const darkModeButton = document.querySelector('.dark-mode-button');
const bodyEl = document.querySelector('body')
darkModeButton.addEventListener('click', () => {
  bodyEl.classList.toggle('dark')
  if (bodyEl.classList.contains('dark')) {
  darkModeButton.textContent = '☀️Light Mode';
} else {
  darkModeButton.textContent = '🌙Dark Mode';
}
})

