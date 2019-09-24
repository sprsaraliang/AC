// init
let list = document.querySelector('#my-todo');
const todos = ['Hit the gym', 'Read a book', 'Buy eggs', 'Organize office', 'Pay bills']
for (let todo of todos) {
  addItem(todo);
}


function addItem (text) {
  let newItem = document.createElement('li')
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `;
  list.appendChild(newItem);
}


let d_list = document.querySelector('#my-down');

function downItem (text) {
  let downItem = document.createElement('li')
  downItem.innerHTML = `
    <label for="down">${text}</label>
  `;
  d_list.appendChild(downItem);
}



// Create ToDo List Item 
const addBtn = document.querySelector('#addBtn');
const addEnter = document.querySelector('#newTodo');

addBtn.addEventListener('click', Add_debug);
addEnter.addEventListener('keypress', Add_debug);



  if (document.querySelector('#newTodo').value){ //input確認有值，再做相關判斷

      if (event.target.classList.contains('btn-info')){
      let inputValue = document.querySelector('#newTodo').value;
      addItem(inputValue);

     }else if (event.target.classList.contains('form-control') && event.keyCode == 13){
      let inputValue = document.querySelector('#newTodo').value;
      addItem(inputValue);

     }
  }


// Delete and check
list.addEventListener('click', function (event) {
  if (event.target.classList.contains('delete')) {
    let li = event.target.parentElement;
    let down = event.target.previousSibling; 
    let down_label = down.previousElementSibling;
    let down_value = down_label.innerText;
    console.log(down_label);
    console.log(down_value);
    downItem(down_value);
    li.remove();
  } else if (event.target.tagName === 'LABEL') {
    event.target.classList.toggle('checked');
  }
})
