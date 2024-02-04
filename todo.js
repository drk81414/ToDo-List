let todoList = [
  ];
  
  displayItems();
  
  function addTodo() {
    let inputElement = document.querySelector('#todo-input');
    let dateElement = document.querySelector('#todo-date');
    let todoItem = inputElement.value;
    let todoDate = dateElement.value;


    if(todoDate === "" || todoItem === "") return;
    const d = todoDate.split('-')
    todoDate = `${d[2]}/${d[1]}/${d[0]}`
    todoList.push({item: todoItem, dueDate: todoDate});

    const localtodo = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []
    localtodo.push({
      todo: todoItem,
      date: todoDate
    })
    localStorage.setItem("todos",JSON.stringify(localtodo))
    inputElement.value = '';
    dateElement.value = '';
    displayItems();
  }
  
  function deleteTodo(i){
    
    todoList = todoList.filter((_, index) => index !== i);
   
    localStorage.setItem("todos",JSON.stringify(todoList))
    displayItems()
  }
  function displayItems() {
    const localtodo = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []
    if(localtodo?.length > 0){
      
      todoList = []
      todoList.push(...localtodo)
    }
    let containerElement = document.querySelector('.todo-container');
    let newHtml = '';
    for (let i = 0; i < todoList.length; i++) {
      let {todo, date} = todoList[i];
      newHtml += `
        <span>${todo}</span>
        <span>${date}</span>
        <button class='btn-delete' onclick="deleteTodo(${i})";
        displayItems();">Delete</button>
      `;
    }
    containerElement.innerHTML = newHtml;
  }