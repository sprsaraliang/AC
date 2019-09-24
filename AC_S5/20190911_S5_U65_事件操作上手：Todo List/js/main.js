// init
let list = document.querySelector('#my-todo')
const todos = ['Hit the gym', 'Read a book', 'Buy eggs', 'Organize office', 'Pay bills']
for (let todo of todos) {
  addItem(todo);
}

function addItem (text) {
  let newItem = document.createElement('li');
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `
  list.appendChild(newItem);
}

// write your code here

const add_controller = document.querySelector('#addBtn');
add_controller.addEventListener('click', addlist);

function addlist(event){
    const new_list = document.querySelector('#newTodo');
   if (new_list.value!=""){
    console.log("新增一項待辦事項："+new_list.value);
    addItem (new_list.value);
   }else {
    console.log("輸入空白，請重新輸入!");
   };
}

const delect_controller = document.querySelector('ul#my-todo');
delect_controller.addEventListener('click', delectItem);

function delectItem(event){
  console.log(event.target);
  if (event.target.classList.contains('delete')) { 
  //如果被偵測的對象的CLASS有包含delect的文本內容時。 才能夠做刪除。
    let li = event.target.parentElement;
    li.remove();
  }else if (event.target.tagName === 'LABEL') { // add here
    event.target.classList.toggle('checked');
  }

}
