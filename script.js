// Get DOM elements
const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

function saveTasks(){
  const tasks = []; // Create an empty array to store all tasks

  // Select all <li> elements inside the task list and loop through each
  taskList.querySelectorAll('li').forEach(li => {
    // For each task <li>, get the task text and completion status, then create an object
    tasks.push({
      text: li.firstChild.textContent,  // Get the text content of the first child node inside the <li>, which is the task text entered by the user
      completed: li.classList.contains('completed')  // Check if the <li> element has the CSS class 'completed'; this indicates whether the task is marked as done or not.
    });
  })

  // Convert the tasks array into a JSON string and save it to localStorage with the key "tasks"
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function loadTasks(){
  // Retrieve the 'tasks' item from localStorage and parse it from JSON string to JavaScript array
  // If nothing is found, default to an empty array
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Create a task list item element with the task text and completed status
  tasks.forEach(task => {
    createTaskElement(task.text, task.completed)
  })
}

function createTaskElement(taskText, completed) {
  const li = document.createElement('li');
  li.textContent = taskText;

  if(completed){
    li.classList.add('completed');
  }

  li.addEventListener('click', ()=> {
    li.classList.toggle('completed')
    saveTasks()
  });

  const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.className = "delete-btn"

    deleteBtn.addEventListener('click', (e)=> {
      // Stop the click event from bubbling up to the <li> element
      // This prevents the parent <li>'s click event (which toggles "completed" status) from being triggered
      e.stopPropagation(); // Prevent delete button from toggling completed
      li.remove()
      saveTasks();
    });

    li.appendChild(deleteBtn) // Add deleteBtn as a child node of the li element
    taskList.appendChild(li);
}


// Add click event listener to the Add button
function addTask() {
  const taskText = input.value.trim(); // Get the current input value of the input element
  if(taskText !== ""){
    createTaskElement(taskText, false); 
    input.value = "" // Clear the input field
    saveTasks();
  }
}

// Click the Add button
addBtn.addEventListener('click', addTask)

// Press Enter key in the input box
input.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter'){
    e.preventDefault(); // 阻止默认行为
    addTask();
  }
});

loadTasks()