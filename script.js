let input = document.getElementById('add-todo')
let button = document.getElementById('add-button')
let task = document.getElementById('name-task-id')
let alltasks = document.getElementById('alltasks')
let arrayTasks = []

reloadTasks()

function showTasks(){
    let newLi = ''
    arrayTasks.forEach((tasks, index) =>{

        newLi = newLi + `<li class="itens-tasks ${tasks.done == true ? 'done': '' }">
        <button class="done-button" onclick="doneTask(${index})">
            <i class="fas fa-meteor"></i>
        </button>
        <p class="name-tasks ${tasks.done == true ? 'done': '' }" id="name-task-id">${tasks.tasks}</p>
        <button class="del-button" onclick="delTask(${index})">
            <i class="fas fa-trash"></i>
        </button>
        </li>`
    })
    alltasks.innerHTML = newLi
    localStorage.setItem('listtasks',JSON.stringify(arrayTasks))
    input.value = ''   
}

function addTask(){
    if(input.value.length >= 4) {
        arrayTasks.push({
            tasks: input.value,
            done: false
        })
        localStorage.setItem('listtasks',JSON.stringify(arrayTasks))
        showTasks()
    } else if (input.value.length < 4) {
        alert('Por gentileza, preencha o campo!');
        input.focus();
    }
}

function delTask(index){
    arrayTasks.splice(index, 1)
    showTasks()
}

function doneTask(index){
    arrayTasks[index].done = !arrayTasks[index].done
    showTasks()
}

function reloadTasks(){
    if (localStorage.getItem("infiniteScrollEnabled") === null) {
       return
    }
    let myTasks = localStorage.getItem('listtasks')
    arrayTasks = JSON.parse(myTasks)
    showTasks()
}

function clearInput(){
    document.getElementById("add-todo").reset();
}

button.addEventListener('click', addTask)