function displayTasks() {
    taskListUL.innerHTML = "";
    const request = new XMLHttpRequest();
  
    request.open("GET", "/getTaskList");
    request.send()
    request.addEventListener('load', function () {
      if (request.status == 200) {
        let taskList = JSON.parse(request.response);
  
        taskList.forEach(function (taskObj) {
          createTaskTile(taskObj);
        })
      }
    })
  }
  
  function addToDo(formData, callback) {
    const request = new XMLHttpRequest();
  
    request.open("POST", "/addTask");
  
    request.send(formData);
    request.addEventListener('load', function () {
        let response = JSON.parse(request.response);
      console.log(response);
  
      if (request.status == 200) {
        callback(response);
      }
    })
  }
  
  function updateTask(taskId, task,callback){
     const request = new XMLHttpRequest();
  
    request.open("POST", "/updateTask");
    request.setRequestHeader("Content-Type", "application/json");
  
    request.send(JSON.stringify({id:taskId,task:task}));
    request.addEventListener('load', function () {
      console.log(request);
  
      if (request.status == 200) {
        callback();
      }
    })
  }
  
  function updateStatus(taskId, callback){
     const request = new XMLHttpRequest();
  
    request.open("POST", "/updateStatus");
    request.setRequestHeader("Content-Type", "application/json");
  
    request.send(JSON.stringify({id:taskId}));
    request.addEventListener('load', function () {
      console.log(request);
  
      if (request.status == 200) {
        callback();
      }
    })
  }
  
  function deleteTask(taskId, callback) {
    const request = new XMLHttpRequest();
  
    request.open("DELETE", "/deleteTask");
    request.setRequestHeader("Content-Type", "application/json");
  
    request.send(JSON.stringify({id:taskId}));
    request.addEventListener('load', function () {
      console.log(request);
  
      if (request.status == 200) {
        callback();
      }
    })
  }
  
  