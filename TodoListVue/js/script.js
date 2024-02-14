Vue.createApp({})
    .component("TodoList", {
        data() {
            return {
                items: [],
                newTodoItemText: "",
                newTodoItemId: 1,
                isValidItemText: true
            };
        },

        methods: {
            addTodoItem() {
                if (this.newTodoItemText.length === 0) {
                    this.isValidItemText = false;

                    return;
                }

                const newTodoItem = {
                    id: this.newTodoItemId,
                    text: this.newTodoItemText
                };

                this.newTodoItemId++;
                this.newTodoItemText = "";
                this.isValidItemText = true;

                this.items.push(newTodoItem);
            },

            deleteTodoItem(item) {
                this.items = this.items.filter(x => x !== item);
            }
        },

        template: `
          <form @submit.prevent="addTodoItem" class="row m-0">
            <div class="col ps-0">
              <input class="form-text form-control m-0"
                     type="text"
                     v-model.trim="newTodoItemText"
                     :class="{'is-invalid': !isValidItemText}">
              <span class="invalid-feedback">Необходимо указать текст</span>
            </div>
            <div class="col-auto pe-0">
              <button class="add-button btn btn-success">Добавить</button>
            </div>
          </form>

          <ul class="list-unstyled mt-3">
            <todo-list-item v-for="item in items"
                            :key="item.id"
                            :item="item"
                            @save-item="item.text = $event"
                            @delete-item="deleteTodoItem(item)"></todo-list-item>
          </ul>`
    })
    .component("TodoListItem", {
        props: {
            item: {
                type: Object,
                required: true
            }
        },

        emits: [
            "save-item",
            "delete-item"
        ],

        data() {
            return {
                isEditing: false,
                editingText: this.item.text,
                isValidEditingText: true
            };
        },

        methods: {
            save() {
                if (this.editingText.length === 0) {
                    this.isValidEditingText = false;

                    return;
                }

                this.isEditing = false;
                this.isValidEditingText = true;

                this.$emit("save-item", this.editingText);
            },

            cancel() {
                this.isEditing = false;
                this.isValidEditingText = true;
                this.editingText = this.item.text;
            }
        },

        template: `
          <li class="mb-2">
            <div v-if="!isEditing" class="row">
              <div class="col">
                <span>{{ item.text }}</span>
              </div>
              <div class="col-auto">
                <button @click="$emit('delete-item')" class="btn btn-danger me-1" type="button">Удалить</button>
                <button @click="isEditing = true" class="btn btn-primary" type="button">Редактировать</button>
              </div>
            </div>
            <div v-else class="row">
              <div class="col">
                <input type="text"
                       class="form-control"
                       v-model.trim="editingText"
                       :class="{'is-invalid': !isValidEditingText}"
                       @keydown.enter="save">
                <span class="invalid-feedback">Необходимо указать текст</span>
              </div>
              <div class="col-auto">
                <button @click="save" class="btn btn-success me-1" type="button">Сохранить</button>
                <button @click="cancel" class="btn btn-danger" type="button">Отменить</button>
              </div>
            </div>
          </li>`
    })
    .mount("#app");