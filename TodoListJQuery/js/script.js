$(function () {
    const addTodoForm = $("#add-todo-form");
    const todoList = $("#todo-list");
    const newTodoTextField = $("#new-todo-text-field");

    addTodoForm.submit(function (e) {
        e.preventDefault();

        let newTodoText = newTodoTextField.val().trim();
        newTodoTextField.removeClass("is-invalid");

        if (newTodoText.length === 0) {
            newTodoTextField.addClass("is-invalid");

            return;
        }

        const newTodo = $("<li>").addClass("todo-item row mb-2");

        function setViewMode() {
            newTodo.html(`
                    <div class="col">
                        <span class="todo-item-text"></span>
                    </div>
                    <div class="buttons-block col-auto">
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
                        <div class="col">
                            <input type="text" class="edit-text-field form-text form-control m-0">
                            <span class="invalid-feedback">Необходимо указать текст</span>
                        </div>                        
                        <div class="buttons-block col-auto">
                            <button class="save-button btn btn-success" type="button">Сохранить</button>
                            <button class="cancel-button btn btn-danger" type="button">Отменить</button>
                        </div>
                `);

                const editTextField = newTodo.find(".edit-text-field");
                editTextField.val(newTodoText);

                function saveChangedTodoText() {
                    const changedTodoText = editTextField.val().trim();

                    editTextField.removeClass("is-invalid");

                    if (changedTodoText.length === 0) {
                        editTextField.addClass("is-invalid");

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