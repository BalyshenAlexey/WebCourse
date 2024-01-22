document.addEventListener("DOMContentLoaded", function () {
    const addTodoForm = document.getElementById("add-todo-form");
    const todoList = document.getElementById("todo-list");
    const newTodoTextField = document.getElementById("new-todo-text-field");

    addTodoForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let newTodoText = newTodoTextField.value.trim();
        newTodoTextField.classList.remove("invalid");

        if (newTodoText.length === 0) {
            newTodoTextField.classList.add("invalid");
            return;
        }

        const newTodo = document.createElement("li");
        newTodo.classList.add("todo-item");
        newTodo.classList.add("clearfix");

        function setViewMode() {
            newTodo.innerHTML = `
                    <span class="todo-item-text"></span>
                    <div class="buttons-block">
                        <button class="delete-button" type="button">Удалить</button>
                        <button class="edit-button" type="button">Редактировать</button>
                    </div>      
            `;

            newTodo.querySelector(".todo-item-text").textContent = newTodoText;

            newTodo.querySelector(".delete-button").addEventListener("click", function () {
                newTodo.remove();
            });

            newTodo.querySelector(".edit-button").addEventListener("click", function () {
                newTodo.innerHTML = `
                        <input type="text" class="edit-text-field">
                        <div class="buttons-block">
                            <button class="save-button" type="button">Сохранить</button>
                            <button class="cancel-button" type="button">Отменить</button>
                        </div>
                        <div class="error-message">Необходимо указать текст</div>
                `;

                const editTextField = newTodo.querySelector(".edit-text-field");
                editTextField.value = newTodoText;

                function saveChangedTodoText() {
                    const changedTodoText = editTextField.value.trim();

                    editTextField.classList.remove("invalid");

                    if (changedTodoText.length === 0) {
                        editTextField.classList.add("invalid");
                        return;
                    }

                    newTodoText = changedTodoText;
                    setViewMode();
                }

                newTodo.querySelector(".edit-text-field").addEventListener("keydown", function (event) {
                    if (event.key === "Enter") {
                        saveChangedTodoText();
                    }
                });

                newTodo.querySelector(".save-button").addEventListener("click", saveChangedTodoText);

                newTodo.querySelector(".cancel-button").addEventListener("click", function () {
                    setViewMode();
                });
            });
        }

        setViewMode();

        todoList.append(newTodo);

        newTodoTextField.value = "";
    });
});