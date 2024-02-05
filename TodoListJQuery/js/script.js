$(function () {
    const addTodoForm = $("#add-todo-form");
    const todoList = $("#todo-list");
    const newTodoTextField = $("#new-todo-text-field");

    addTodoForm.submit(function (e) {
        e.preventDefault();

        const errorMessage = addTodoForm.find(".error-message");

        let newTodoText = newTodoTextField.val().trim();
        newTodoTextField.removeClass("is-invalid");
        errorMessage.addClass("d-none");

        if (newTodoText.length === 0) {
            newTodoTextField.addClass("is-invalid");
            errorMessage.removeClass("d-none");

            return;
        }

        const newTodo = $("<li>").addClass("todo-item row mb-2");

        function setViewMode() {
            newTodo.html(`
                    <span class="todo-item-text col"></span>
                    <div class="buttons-block col-auto">
                        <button class="delete-button btn btn-danger me-2" type="button">Удалить</button>
                        <button class="edit-button btn btn-primary" type="button">Редактировать</button>
                    </div>      
            `);

            newTodo.find(".todo-item-text").text(newTodoText);

            newTodo.find(".delete-button").click(function () {
                newTodo.remove();
            });

            newTodo.find(".edit-button").click(function () {
                newTodo.html(`
                        <input type="text" class="edit-text-field form-text form-control col">
                        <div class="buttons-block col-auto">
                            <button class="save-button btn btn-success me-2" type="button">Сохранить</button>
                            <button class="cancel-button btn btn-danger" type="button">Отменить</button>
                        </div>
                        <div class="error-message d-none text-danger">Необходимо указать текст</div>
                `);

                const editTextField = newTodo.find(".edit-text-field");
                editTextField.val(newTodoText);

                function saveChangedTodoText() {
                    const changedTodoText = editTextField.val().trim();
                    const errorMessage = newTodo.find(".error-message");

                    editTextField.removeClass("is-invalid");
                    errorMessage.addClass("d-none");

                    if (changedTodoText.length === 0) {
                        editTextField.addClass("is-invalid");
                        errorMessage.removeClass("d-none");

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