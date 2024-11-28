const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.querySelector(".tasks");
const error = document.querySelector("#error");
const countValue = document.querySelector(".count-value");

let taskCount = 0;

const displayCount = (taskCount) => {
    countValue.innerText = taskCount;
};


const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";
    
    if(!taskName){
        setTimeout(() => {
            error.style.display = "block";
        }, 200);
        return;
    }

    const task = `<div class= "task">
        <input type="checkbox" class="task-check" >
        <span class="taskName">${taskName}</span>
        <button class="edit">
            <img src="images/add_icon_green.png">
        </button>

        <button class="delete">
            <img src="images/remove_icon_red.png">
        </button>

    </div>`;

    tasksContainer.insertAdjacentHTML("beforeend",task);


    //delete task
    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((button) => {
        button.onclick = () => {
            button.parentNode.remove();
            taskCount -= 1;
            displayCount(taskCount);
        };
    });

    //edit task
    const editButtons = document.querySelectorAll(".edit");
    editButtons.forEach((editBtn) => {
        editBtn.onclick = (e) => {
            let targetElement = e.target;
            if(!(e.target.className == "edit")){
                targetElement = e.target.parentElement;
            }
            newTaskInput.value = targetElement.previousElementSibling?.innerText;
            targetElement.parentNode.remove();
            taskCount -= 1;
            displayCount(taskCount);
        };
    });
    const taskCheck = document.querySelectorAll(".task-check");
    taskCheck.forEach((checkBox) => {
        checkBox.onchange = () => {
            checkBox.nextElementSibling.classList.toggle("completed");
            if(checkBox.checked){
                taskCount -= 1;
            }
            else{
                taskCount += 1;
            }
            displayCount(taskCount);
        };
    });
    taskCount += 1;
    displayCount(taskCount);
    newTaskInput.value = "";
};

addBtn.addEventListener("click", addTask);

window.onload = () => {
    taskCount = 0;
    displayCount(taskCount);
    newTaskInput.value = "";
};

//don't disapper the add task in refresh browser
//save the content in the browser
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

//data save the open programme again
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}

//call the function
showTask()
