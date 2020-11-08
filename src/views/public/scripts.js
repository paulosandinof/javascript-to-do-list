window.onload = init;

async function init() {
  const response = await fetch("/api/task", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const tasks = await response.json();

  tasks.map((task) => {
    taskToHTML(task);
  });
}

async function add() {
  // Get respective inputs and list where data will be append
  var taskDescription = document.getElementById("task-description");
  var taskResponsible = document.getElementById("task-responsible");

  // Add validation
  const task = await saveTask(taskDescription.value, taskResponsible.value);

  taskToHTML(task);
}

async function remove(el) {
  // Get element to remove, first parent is the button div, second one is the task itself
  var task = el.parentElement.parentElement;

  await removeTask(task.id);

  task.remove();
}

async function move(el) {
  // Get parent list, first, second and third parent are input divs, fourth one is the task itself
  var taskHTML = el.parentElement.parentElement.parentElement.parentElement; // Task from HTML
  var taskDB = await getTask(taskHTML.id);  // Task from database

  if (taskDB.finished) {
    taskDB.finished = false;
  }
  else {
    taskDB.finished = true;
  }

  taskHTML.remove();

  await patchTask(taskDB);

  taskToHTML(taskDB);
}

async function edit(el) {
  var task = el.parentElement;

  var descriptionHTML = task.children[0].children[1];

  if(descriptionHTML.disabled){
    descriptionHTML.disabled = false;
  }
  else{
    descriptionHTML.disabled = true;
  }

  const taskDB = await getTask(task.id);

  taskDB.description = descriptionHTML.value;

  await patchTask(taskDB);
}

// Append element to it's respective list
function taskToHTML(task) {
  var checked, list, style, button;

  if (task.finished) {
    checked = "checked";
    list = "done-list";
    style = "text-decoration: line-through;"
    button = '  <div>'; // this and the end div inside the else are for controlling the next div style
  }
  else {
    checked = '';
    list = "to-do-list";
    style = '';
    button =
      '  <button class="btn btn-primary" onclick="edit(this)">' + // setting edit action
      '    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor"' +
      '      xmlns="http://www.w3.org/2000/svg">' +
      '      <path' +
      '        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />' +
      '      <path fill-rule="evenodd"' +
      '        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />' +
      '    </svg>' +
      '  </button>' +
      '  <div class="col-sm-1">';
  }

  const listToAppend = document.getElementById(list);
  const node = document.createElement("DIV");
  node.id = task._id;
  node.className = "row";

  node.innerHTML =
    '  <div class="col-10 col-sm-10 input-group">' +
    '    <div class="input-group-prepend">' +
    '      <div class="input-group-text">' +
    '        <input type="checkbox" ' + checked + ' aria-label="Checkbox for following text input" onclick="move(this)">' + // setting checkbox
    '      </div>' +
    '    </div>' +
    '    <input type="text" class="form-control" placeholder="Nome da tarefa" value="' + task.description + '" style="' + style + '" disabled>' + // setting task description and style
    '  </div>' +
    button +
    '    <button class="btn btn-danger" onclick="remove(this)">' + // setting remove action (the opening div tag for this section is set in the beginning of this function)
    '      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor"' +
    '        xmlns="http://www.w3.org/2000/svg">' +
    '        <path' +
    '          d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />' +
    '        <path fill-rule="evenodd"' +
    '          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />' +
    '      </svg>' +
    '    </button>' +
    '  </div>' +
    '  <div class="col-12 col-md-12">' +
    '    <label>Responsável: ' + task.responsible + '</label>' + // setting task responsible
    '  </div>';

  listToAppend.parentNode.insertBefore(node, listToAppend.nextSibling);
}

// maybe unify as one and use conditionals?

async function saveTask(description, responsible) {
  const response = await fetch("/api/task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description,
      responsible
    }),
  });

  const task = await response.json();

  return task;
}

async function patchTask(taskDB) {
  const id = taskDB._id;
  const description = taskDB.description;
  const responsible = taskDB.responsible;
  const finished = taskDB.finished;

  const response = await fetch("/api/task/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description,
      responsible,
      finished
    }),
  });

  const task = await response.json();

  return task;
}

async function removeTask(id) {
  const response = await fetch("/api/task/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  await response.json();
}

async function getTask(id) {
  const response = await fetch("/api/task/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const task = await response.json();

  return task;
}