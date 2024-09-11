// Load todos from localStorage
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || { "todoList": [] };
    // console.log(todos);gives ...[]..initially it iss empty when loaded.
    return todos;
}

function addToLocalStorage(todoText) {

    const todos = loadTodos();

    todos.todoList.push(todoText); // Add new todo
    localStorage.setItem("todos", JSON.stringify(todos)); // Save updated todos to localStorage

}
// Display todos in the DOM with delete and edit buttons.

function displayTodos() {
    const todos = loadTodos();
    const todoList = document.getElementById("todoList"); //get that ul element  with its id "todoList".
    // Clear existing list items
    todoList.innerHTML = "";



    // Create a div wrapper for styling
    const todoWrapper = document.createElement("div");
    todoWrapper.classList.add("todo-wrapper"); // Add a class for styling



    // Loop through todos and create elements for each one
    todos.todoList.forEach((todoText, index) => {
        const listItem = document.createElement("li"); //create li using js.
        listItem.textContent = todoText; // text inside li will be the todoText...that we insert using "textContent".

        // Create and append delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");
        deleteButton.addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this todo?")) {
                deleteTodo(index);// Index is passed to the deleteTodo function
            }


        });



        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("edit-btn");
        editButton.addEventListener("click", () => {
            const newText = prompt("Edit todo:", todoText);

            if (newText !== null) {
                const trimmedText = newText.trim();
                if (trimmedText) {
                    editTodo(index, trimmedText);
                }
                else {
                    alert("Todo text cannot be empty!");

                }

            }

        });

       listItem.appendChild(deleteButton); // Append delete button to the list item
        listItem.appendChild(editButton);

        // todoList.appendChild(listItem); // Append list item to the todoList (ul)
        // Append list item to the div wrapper (NOT directly to the ul)
        todoWrapper.appendChild(listItem);
    });
       // Append the div wrapper (with all the todos) to the todoList (ul)
      todoList.appendChild(todoWrapper);


};



function deleteTodo(index) {
    const todos = loadTodos();
    todos.todoList.splice(index, 1); // Remove the todo at the specified index
    localStorage.setItem("todos", JSON.stringify(todos)); // Save updated todos to localStorage
    displayTodos(); // Refresh the displayed todos
}



function editTodo(index, newText) {
    const todos = loadTodos();
    todos.todoList[index] = newText;
    localStorage.setItem("todos", JSON.stringify(todos));
    displayTodos();
}








//add event listerner to the input tag.
document.addEventListener("DOMContentLoaded", (event) => {
    // console.log(document.getElementById("todoInput"));//access to input tag when dom is loaded.
    const todoInput = document.getElementById("todoInput");


    //now this todoInput also have its event listener.
    document.addEventListener("change", (event) => {
        //this callback event fired ,everytime there is a change in input.
        // console.log("something changed");
        // console.log(event.target.value);//print value of input on console.(event.target...represent the input),included extra spaces well,if added by user.
        const textInput = event.target.value; //store that text of input in textInput variable and use it for validation.

        event.target.value = textInput.trim(); //remove extra space afteer text ..if added by user.
        // console.log(event.target.value); //now it trim the extra space.

    })

    //sumbit input
    const submitButton = document.getElementById("addTodo");

    submitButton.addEventListener("click", (event) => {
        const todoText = todoInput.value; //fetch value inside todoInput and store it in todoText.
        if (todoText == "") {
            alert("please add something for todo!!")
        }
        else {
            //  console.log(todoInput.value)
            //add that input to localstorage
            addToLocalStorage(todoText);// Add to localStorage
            todoInput.value = "";// Clear input field
            displayTodos();// Display the updated todo list

        }

    });

    displayTodos();// Display todos when the page loads



});