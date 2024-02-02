$(function () {
    const addTodoForm = $("#add-todo-form");
    const todoList = $("#todo-list");
    const newTodoTextField = $("#new-todo-text-field");

    addTodoForm.submit(function (e) {
        e.preventDefault();

        let newTodoText = newTodoTextField.val().trim();
        newTodoTextField.removeClass("invalid");

        if (newTodoText.length === 0) {
            newTodoTextField.addClass("invalid");
            return;
        }

        const newTodo = $("<li>").addClass("todo-item", "list-group-item");

        function setViewMode() {
            newTodo.html(`
                    <span class="todo-item-text"></span>
                    <div class="buttons-block float-end">
                        <button class="delete-button btn btn-danger" type="button">Удалить</button>
                        <button class="edit-button btn btn-primary" type="button">Редактировать</button>
                    </div>      
            `);

            newTodo.find(".todo-item-text").text(newTodoText);

            newTodo.find(".delete-button").click(function () {
                newTodo.remove();
            });

            newTodo.find(".edit-button").click(function () {
                newTodo.html(`
                        <input type="text" class="edit-text-field">
                        <div class="buttons-block float-end">
                            <button class="save-button btn btn-success" type="button">Сохранить</button>
                            <button class="cancel-button btn btn-danger" type="button">Отменить</button>
                        </div>
                        <div class="error-message">Необходимо указать текст</div>
                `);

                const editTextField = newTodo.find(".edit-text-field");
                editTextField.val(newTodoText);

                function saveChangedTodoText() {
                    const changedTodoText = editTextField.val().trim();

                    editTextField.removeClass("invalid");

                    if (changedTodoText.length === 0) {
                        editTextField.addClass("invalid");
                        return;
                    }

                    newTodoText = changedTodoText;
                    setViewMode();
                }

                newTodo.find(".edit-text-field").keydown(function (event) {
                    if (event.key === "Enter") {
                        saveChangedTodoText();
                    }
                });

                newTodo.find(".save-button").click(saveChangedTodoText);

                newTodo.find(".cancel-button").click(function () {
                    setViewMode();
                });
            });
        }

        setViewMode();

        todoList.append(newTodo);

        newTodoTextField.val("");
    });
});