document.getElementById('addTaskButton').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const task = {
            text: taskText,
            dateAdded: new Date().toLocaleString(),
            completed: false
        };
        addTaskToDOM(task);
        taskInput.value = ''; // Clear the input field
    }
}

function addTaskToDOM(task) {
    const taskList = task.completed ? document.getElementById('completedTasksList') : document.getElementById('pendingTasksList');

    const li = document.createElement('li');
    li.textContent = `${task.text} (Added: ${task.dateAdded})`;

    const completeButton = document.createElement('button');
    completeButton.textContent = task.completed ? 'Undo' : 'Complete';
    completeButton.addEventListener('click', () => toggleComplete(task, li));

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editTask(task, li));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(li));

    // Append buttons to the task item
    li.appendChild(completeButton);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    // Append the task item to the appropriate list
    taskList.appendChild(li);
}

function toggleComplete(task, listItem) {
    task.completed = !task.completed;
    listItem.remove(); // Remove the item from the current list
    addTaskToDOM(task); // Add it back to the appropriate list
}

function editTask(task, listItem) {
    const newTaskText = prompt('Edit Task:', task.text);
    if (newTaskText) {
        task.text = newTaskText;
        listItem.remove(); // Remove the current item
        addTaskToDOM(task); // Re-add the updated item
    }
}

function deleteTask(listItem) {
    listItem.remove();
}
