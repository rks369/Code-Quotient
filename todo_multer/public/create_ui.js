let taskListUL = document.getElementById('taskList');



function createTaskTile(taskObj) {
  const li = document.createElement('li');

  const img = document.createElement('img');
  img.classList.add('task_img')
  img.src = "images/"+ taskObj.image;


  const task = document.createElement('p');
  task.innerHTML = taskObj['task'];
  task.style['text-decoration'] = taskObj['isDone'] ? 'line-through' : 'none';

  const edit_icon = document.createElement('span');
  edit_icon.classList.add('material-symbols-outlined');
  edit_icon.innerHTML = 'edit_note';


  edit_icon.addEventListener('click', function (event) {
    let edit_box = document.createElement('textarea')

    if (edit_icon.innerHTML == 'edit_note') {
      edit_icon.innerHTML = 'check_circle';

      edit_box.classList.add('form-control');
      edit_box.innerHTML = taskObj['task'];

      li.appendChild(edit_box);
    }
    else if (edit_icon.innerHTML == 'check_circle') {
      edit_icon.innerHTML = 'edit_note';
      let taskMsg = edit_icon.parentNode.childNodes[0];
      edit_box = edit_icon.parentNode.childNodes[4];

      taskMsg.innerHTML = edit_box.value;
      updateTask(taskObj['id'], edit_box.value, function () { edit_box.remove(); });

    }

  })

  const check_box = document.createElement('span');
  check_box.classList.add('material-symbols-outlined');
  check_box.innerHTML = taskObj['isDone'] == true ? 'check_box' : 'check_box_outline_blank';

  check_box.addEventListener('click', function () {

    updateStatus(taskObj['id'], function () {
      if (check_box.innerHTML == 'check_box_outline_blank') {
        check_box.parentNode.getElementsByTagName('p')[0].style['text-decoration'] = 'line-through';
        check_box.innerHTML = 'check_box';
      } else if (check_box.innerHTML == 'check_box') {
        check_box.parentNode.getElementsByTagName('p')[0].style['text-decoration'] = 'none';
        check_box.innerHTML = 'check_box_outline_blank'
      }
    })

  })

  const delete_icon = document.createElement('span');
  delete_icon.classList.add('material-symbols-outlined');
  delete_icon.innerHTML = 'delete';

  delete_icon.addEventListener('click', function () {
    deleteTask(taskObj['id'], function () {
      delete_icon.parentNode.remove();
    });
  })

  li.appendChild(img);
  li.appendChild(task);
  li.appendChild(edit_icon);
  li.appendChild(check_box);
  li.appendChild(delete_icon);

  taskListUL.appendChild(li);
}