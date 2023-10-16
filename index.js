const submitBtn = document.getElementById("submit-btn")
const taskCotainerUl = document.querySelector(".tasks")
const inputField = document.getElementById("text-input")




// this function returns the task obj with time 
const getTaskObj = (task) => {
    const date = new Date();
    const hour = date.getHours().toString().padStart(2, 0);
    const min = date.getMinutes().toString().padStart(2, 0);
    return {
        task: task,
        time: `${hour}:${min}`,
    }
}

// this function will add a task to the task container ul 
function addTaskToUl(task) {
    console.log("this is ul add function")
    console.log(task.task)
    const li = `<li class="task">
                    <span class="task-message">${task.task}</span>
                    <span class="task-time">${task.time}</span>
                    <button class="task-complet-btn">
                    <i class="fa-solid fa-trash-can"></i>
                    </button>
                </li>`

        taskCotainerUl.insertAdjacentHTML("afterbegin", li)
}


// this function dispalyer teh tasks in the dom 
// and this function will run once when the dom loads 
function addTaskToDom() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || "";


    if(!tasks) {
        return;
    }
    else {
            // const li = `<li className="task">${</li>`
        tasks.forEach(task => {
            addTaskToUl(task)

        });
    }
}



submitBtn.addEventListener("click", (e) => {
    e.preventDefault()
    submitBtn.classList.add("submit-btn-click")

    setTimeout(() => {
        submitBtn.classList.remove("submit-btn-click")
    }, 200);

    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || ""
    console.log("existing tasks")
    console.log(existingTasks)

    const task = document.getElementById("text-input").value;

    // check if the task is empty
    if(!task) {
        alert("add task before submitting")
        return;
    }

    const newTasks = [...existingTasks, getTaskObj(task)]

    // tasks.
    localStorage.setItem("tasks", JSON.stringify(newTasks))
    // clear the input feild 
    document.getElementById("text-input").value = "";

    const latestTask = JSON.parse(localStorage.getItem("tasks")).slice(-1);
    addTaskToUl(latestTask[0])

    // disable the add btn 
    submitBtn.disabled = true;
    submitBtn.classList.add("submit-btn-disabled")

})

inputField.addEventListener("keyup", (e) => {
    const inputFieldValue = e.target.value.length;
    if(inputFieldValue === 0) {
        submitBtn.disabled = true;
        submitBtn.classList.add("submit-btn-disabled")
    }
    else {
        submitBtn.disabled = false;
        submitBtn.classList.remove("submit-btn-disabled")
    }
    console.log(submitBtn)
})