let tasks = [];

const taskForm = document.getElementById('task-form')
const title = document.getElementById('title');
const description = document.getElementById("description");


const taskList = document.getElementById('task-list')


const createTask = (titleTask, descriptionTask, dateTask) => {
    return {
        title: titleTask,
        date: dateTask,
        description: descriptionTask
    }
};

const addTask = (task) => {
    tasks.push(task)
    const div = document.createElement('div')

    div.innerHTML = `
        <div class="card text-center mb-4">
            <div class="card-body">
                <strong>Paciente </strong>: ${task.title}   <br>  
                <strong>Informe</strong>: ${task.description} <br>
                <strong>Fecha</strong>: ${task.date}
                <button href="#" class="btn btn-danger" id="${task.title}" name="delete" value="title">Delete</button>
            </div>
        </div>
    `
    taskList.appendChild(div)

    saveTaskStorage(tasks)
};

const saveTaskStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
};

const getTaskStorage = () => {
    const tasksStorage = JSON.parse(localStorage.getItem('tasks'))
    return tasksStorage
};

const showTasks = (tasks) => {
    console.log(tasks)

    const div = document.createElement('div')

    // Limpiar contenedor de informes
    taskList.innerHTML = ''

    tasks.forEach(task => {
        div.innerHTML += `
            <div class="card card-informes text-center mb-4">
                <div class="card-body">
                    <strong>Paciente </strong>: ${task.title}   <br>  
                    <strong>Informe</strong>: ${task.description} <br>
                    <strong>Fecha</strong>: ${task.date}
                    <button href="#" class="btn-form btn btn-danger" id="${task.title}" name="delete" value="${task.title}">Delete</button>
                </div>
            </div>
        `
        taskList.appendChild(div)
    })
};

const deleteTask = (title) => {
    tasks.forEach((task, index) => {
        if (task.title === title) {
            tasks.splice(index, 1)
        }
    })
    showTasks(tasks)
    saveTaskStorage(tasks)
};

// Listener

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('tasks')) {
        tasks = getTaskStorage()
        showTasks(tasks)
    }
})

taskList.addEventListener('click', (e) => deleteTask(e.target.value))

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const titleTask = title.value;
    const descriptionTask = description.value;
    const dateTask = date.value;

    const task = createTask(titleTask, descriptionTask, dateTask);

    addTask(task)
});

// Mostrar Historia Clínica del paciente con FETCH 

const mostrarHistoriaClinica = document.getElementById('contenedor-hc')

fetch('data/evoMed.json')
    .then((respEvo) => respEvo.json())
    .then(data => {


        data.forEach(task => {
            const div = document.createElement('div');
            div.classList.add('card-catalogo');
            div.innerHTML += `
                <div class="card card-informes text-center mb-4">
                <div class="card-body">
                    <strong>Fecha</strong>: ${task.fecha} <br>  
                    <strong>Fecha</strong>: ${task.idMed} <br>  
                    <strong>Informe</strong>: ${task.Informe}
                </div>
            </div>
            `
            mostrarHistoriaClinica.appendChild(div);
        });
    });