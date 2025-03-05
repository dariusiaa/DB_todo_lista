document.getElementById('taskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const category = document.getElementById('taskCategory').value;
    const status = document.getElementById('taskStatus').value;
    const priority = document.getElementById('taskPriority').value;
    const dueDate = document.getElementById('taskDueDate').value;

    fetch('add_task.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, category, status, priority, due_date: dueDate })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadTasks();
            document.getElementById('taskForm').reset();
        } else {
            console.error('Błąd podczas dodawania zadania:', data);
        }
    })
    .catch(error => {
        console.error('Błąd:', error);
    });
});

function loadTasks() {
    fetch('get_tasks.php')
        .then(response => response.json())
        .then(data => {
            const taskLists = {
                'Praca': document.getElementById('lista-praca'),
                'Dom': document.getElementById('lista-dom'),
                'Inne': document.getElementById('lista-inne')
            };

        
            for (const list in taskLists) {
                taskLists[list].innerHTML = '';
            }

        
            data.tasks.forEach(task => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <div>
                        <strong>${task.title}</strong>
                        <p>${task.description}</p>
                        <p>Status: ${task.status}</p>
                        <p>Priorytet: ${task.priority}</p>
                        <p>Planowana data zakończenia: ${task.due_date ? task.due_date : 'Brak'}</p>
                    </div>
                    <button class="edit-btn" onclick="editTask(${task.id})">Edytuj</button>
                    <button class="delete-btn" onclick="deleteTask(${task.id})">Usuń</button>
                `;
                taskLists[task.category].appendChild(li);
            });
        })
        .catch(error => {
            console.error('Błąd podczas ładowania zadań:', error);
        });
}

function deleteTask(id) {
    fetch('delete_task.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadTasks();
        } else {
            console.error('Błąd podczas usuwania zadania:', data);
        }
    })
    .catch(error => {
        console.error('Błąd:', error);
    });
}

function editTask(id) {
    fetch(`get_tasks.php?id=${id}`)
        .then(response => response.json())
        .then(data => {
            const task = data.tasks[0];
            document.getElementById('editTaskId').value = task.id;
            document.getElementById('editTaskTitle').value = task.title;
            document.getElementById('editTaskDescription').value = task.description;
            document.getElementById('editTaskCategory').value = task.category;
            document.getElementById('editTaskStatus').value = task.status;
            document.getElementById('editTaskPriority').value = task.priority;
            document.getElementById('editTaskDueDate').value = task.due_date;

            document.getElementById('editTaskContainer').style.display = 'block';
        })
        .catch(error => {
            console.error('Błąd podczas ładowania zadania do edycji:', error);
        });
}

document.getElementById('editTaskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('editTaskId').value;
    const title = document.getElementById('editTaskTitle').value;
    const description = document.getElementById('editTaskDescription').value;
    const category = document.getElementById('editTaskCategory').value;

    const status = document.getElementById('editTaskStatus').value;

    const priority = document.getElementById('editTaskPriority').value;

    const dueDate = document.getElementById('editTaskDueDate').value;


    fetch('update_task.php', {

        method: 'POST',

        headers: {

            'Content-Type': 'application/json'

        },

        body: JSON.stringify({ id, title, description, category, status, priority, due_date: dueDate })

    })

    .then(response => response.json())

    .then(data => {

        if (data.success) {

            loadTasks();

            document.getElementById('editTaskContainer').style.display = 'none';

            document.getElementById('editTaskForm').reset();

        } else {

            console.error('Błąd podczas aktualizacji zadania:', data);

        }

    })

    .catch(error => {

        console.error('Błąd:', error);

    });

});




document.getElementById('cancelEditButton').addEventListener('click', function() {

    document.getElementById('editTaskContainer').style.display = 'none';

    document.getElementById('editTaskForm').reset();

});

loadTasks();