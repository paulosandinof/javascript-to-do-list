function add() {
    // Get respective inputs and list where data will be append
    var taskName = document.getElementById("task-name");
    var taskResponsible = document.getElementById("task-responsible");
    var toDoList = document.getElementById('done-list');

    var node = document.createElement("DIV");

    // Append task
    node.innerHTML +='<div class="row">' + 
                    '   <div class="col-10 col-sm-11 input-group">' +
                    '       <div class="input-group-prepend">' +
                    '           <div class="input-group-text">' +
                    '               <input type="checkbox" aria-label="Checkbox for following text input">' +
                    '           </div>' +
                    '       </div>' +
                    '       <label type="text" class="form-control">' +
                                taskName.value +
                    '       </label>' +
                    '   </div>' +
                    '   <div class="col-2 col-sm-1">' +
                    '       <button class="btn btn-danger" onclick="remove(this)">' +
                    '           <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor"' +
                    '               xmlns="http://www.w3.org/2000/svg">' +
                    '               <path' +
                    '               d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />' +
                    '               <path fill-rule="evenodd"' +
                    '               d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />' +
                    '           </svg>' +
                    '       </button>' +
                    '   </div>' +
                    '   <div>' +
                    '       <div class="col-12 col-md-12">' +
                    '           <label>Responsável: ' + taskResponsible.value + '</label>' +
                    '       </div>' +
                    '       <div class="col-12 col-md-12">' +
                    '           <button class="btn btn-success">Salvar</button>' +
                    '       </div>' +
                    '   </div>' +
                    '</div>';
                    
    // Append before toDoList, to append after use toDoList.nextSibling
    toDoList.parentNode.insertBefore(node, toDoList);
}

function remove(el) {
    // Get element to remove, first parent is the button div, second one is the task itself
    var element = el.parentElement.parentElement;
    element.remove();
}