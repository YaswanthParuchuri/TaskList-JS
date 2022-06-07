//define UI variables
const form=document.querySelector('#task-form');
const taskList=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks');
const filter=document.querySelector('#filter');
const taskInput =document.querySelector('#task');

//Load all event listeners

loadEventListeners();

function loadEventListeners(){
    //Dom Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event
    form.addEventListener('submit',addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    //Clear all tasks
    clearBtn.addEventListener('click',clearAllTasks);
    //filter tasks event
    filter.addEventListener('keyup',filterTasks);
}

//get all the tasks
function getTasks(){
 
    let tasks;
    if(localStorage.getItem('tasks')===null)
    {
        tasks=[];
    }
    else{
    tasks= JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach((task)=>{
    //create a li element
    const li= document.createElement('li')
    //add a class
    li.className='collection-item';
    //create a textNode
    li.appendChild(document.createTextNode(task));
    //create a del itemlink
    const link=document.createElement('a');
    //add a class
    link.className='delete-item secondary-content';
    //add icon html
    link.innerHTML='<i class="fa-solid fa-trash-can"></i>';
    //add Link to li
    li.appendChild(link);
    //append li to UI 
    taskList.appendChild(li);


    });
}

//adding a Task
function addTask(e) {
    if (taskInput.value===''){
        alert('Please enter any task')
    }
   //create a li element
   const li= document.createElement('li')
   //add a class
   li.className='collection-item';
   //create a textNode
   li.appendChild(document.createTextNode(taskInput.value));
   //create a del itemlink
   const link=document.createElement('a');
   //add a class
   link.className='delete-item secondary-content';
   //add icon html
   link.innerHTML='<i class="fa-solid fa-trash-can"></i>';
    //add Link to li
    li.appendChild(link);
    //append li to UI 
    taskList.appendChild(li);

    //adding value to local storage
    addTasksToLocalStorage(taskInput.value);

    //clear input
    taskInput.value="";

    e.preventDefault();

}

//remove individual task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure'))
    {
        e.target.parentElement.parentElement.remove();
        //removing from the local storage
        removeItemFromLocalStorage(e.target.parentElement.parentElement);
    }
}

    e.preventDefault();
}

//remove item from LocalStorage
function removeItemFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach((task, index)=>{
        if(task===taskItem.textContent){
        tasks.splice(index, 1);
        }    
    })
localStorage.setItem('tasks',JSON.stringify(tasks))

}

//Clear all tasks
function clearAllTasks(e){

//  //easiest way
//  taskList.innerHTML='';

//fastest way
while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);

    let tasks=[]

    localStorage.setItem('tasks',JSON.stringify(tasks));

}
    e.preventDefault();
}

//Filter tasks
function filterTasks(e){
const text= e.target.value.toLowerCase();

let qlist=document.querySelectorAll('.collection-item');
qlist.forEach(
    (task)=>{
        const item= task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!= -1){
            task.style.display='block'
        }
        else{
            task.style.display='none';
        }
    } 
);   
}

//Local storage addition
function addTasksToLocalStorage(inputTask){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[]
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(inputTask);
    localStorage.setItem('tasks',JSON.stringify(tasks));

}