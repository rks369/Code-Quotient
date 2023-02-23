let inputTask = document.getElementById('task');
let select_file = document.getElementById('select_file');
let addBtn = document.getElementById('add_task');

displayTasks()

addBtn.addEventListener('click', function (event) {


  const task = inputTask.value.trim();
  if (task.length != 0) {
  
    let formData = new FormData();
    formData.append('id',Date.now());
    formData.append('task',task);
    formData.append('isDone',false);
    formData.append('image',select_file.files[0]);

    addToDo(formData, function (taskObj) {
        select_file.value=null;
      createTaskTile(taskObj);

    })
  }

  inputTask.value = "";

})



