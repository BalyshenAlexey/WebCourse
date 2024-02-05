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
                } else {
                    const newTodoItem = {
                        id: this.newTodoItemId,
                        text: this.newTodoItemText
                    };

                    this.isValidItemText = true;

                    this.newTodoItemId++;

                    this.items.push(newTodoItem);

                    this.newTodoItemText = "";
                }
            },

            deleteTodoItem(item) {
                this.items = this.items.filter(x => x !== item);
            }
        },

        template: `
          <form @submit.prevent="addTodoItem" class="row mb-3">
            <label class="col">
              <input class="form-text form-control" type="text" v-model.trim="newTodoItemText"
                     v-bind:class="{'is-invalid': !isValidItemText}">
            </label>

            <button class="col-auto add-button btn btn-success">Добавить</button>

            <span v-if="!isValidItemText" class="text-danger">Необходимо указать текст</span>
          </form>

          <ul class="list-unstyled">
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
                } else {
                    this.isEditing = false;
                    this.isValidEditingText = true;

                    this.$emit("save-item", this.editingText);
                }
            },

            cancel() {
                this.isEditing = false;
                this.editingText = this.item.text;
            }
        },

        template: `
          <li class="mb-2 ms-3">
            <div class="row" v-if="!isEditing">
              <span class="col me-2">{{ item.text }}</span>
              
              <div class="col-auto">
                <button @click="$emit('delete-item')" class="btn btn-danger me-2" type="button">Удалить</button>
                <button @click="isEditing = true" class="btn btn-primary" type="button">Редактировать</button>
              </div>
            </div>
            <div class="row" v-else>
              <input type="text" class="form-control col me-2" v-model.trim="editingText"
                     v-bind:class="{'is-invalid': !isValidEditingText}">
              
              <div class="col-auto">
                <button @click="save" class="btn btn-success me-2" type="button">Сохранить</button>
                <button @click="cancel" class="btn btn-danger" type="button">Отменить</button>
              </div>
              
              <span v-if="!isValidEditingText" class="text-danger">Необходимо указать текст</span>
            </div>
          </li>`
    })
    .mount("#app");