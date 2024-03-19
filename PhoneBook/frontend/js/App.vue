<template>
    <div class="container" id="app">
        <h1 class="mb-3">PhoneBook</h1>

        <form @submit.prevent="createContact" class="mb-3">
            <h2 class="h5">Добавить контакт </h2>
            <div class="row row-cols-lg-auto g-3 align-items-top">
                <div class="col-12">
                    <input v-model.trim="name"
                           type="text"
                           class="form-control"
                           placeholder="Имя"
                           :class="{'is-invalid': !isValidName}">
                    <span class="invalid-feedback">Необходимо указать Имя</span>
                </div>
                <div class="col-12">
                    <input v-model.trim="surname"
                           type="text"
                           class="form-control"
                           placeholder="Фамилия"
                           :class="{'is-invalid': !isValidSurname}">
                    <span class="invalid-feedback">Необходимо указать Фамилию</span>
                </div>
                <div class="col-12">
                    <input v-model.trim="phone"
                           type="text"
                           class="form-control"
                           placeholder="Номер телефона"
                           :class="{'is-invalid': !isValidPhone}">
                    <span class="invalid-feedback">Необходимо указать Номер телефона</span>
                </div>
                <div class="col-12">
                    <button class="btn btn-primary">Добавить</button>
                </div>
            </div>
        </form>

        <form @submit.prevent="loadContacts" class="mb-3">
            <h2 class="h5">Найти контакт</h2>

            <div class="row row-cols-lg-auto g-3 align-items-center">
                <div class="col-12">
                    <input v-model="term" type="text" class="form-control" placeholder="Искомый текст">
                </div>
                <div class="col-12">
                    <button class="btn btn-primary">Найти</button>
                </div>
            </div>
        </form>

        <div class="table-responsive" v-cloak>
            <table class="table table-striped">
                <thead>
                <tr>
                    <th>
                        <input @click="selectAll" v-model="allChecked" class="form-check-input" type="checkbox">
                    </th>
                    <th>№</th>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Телефон</th>
                    <th>
                        <button v-if="checkedContacts.length !== 0" @click="showDeleteCheckedContactConfirmModal()"
                                class="btn btn-danger me-2 my-1"
                                type="button">
                            Удалить выбраные контакты
                        </button>
                    </th>
                </tr>
                </thead>
                <tbody>
                <template v-for="(contact, index) in contacts" :key="contact.id">
                    <tr v-if="!contact.isEditing" class="align-middle" >
                        <td>
                            <input v-model="contact.checked" class="form-check-input" type="checkbox" :value="contact">
                        </td>
                        <td v-text="index + 1"></td>
                        <td v-text="contact.name"></td>
                        <td v-text="contact.surname"></td>
                        <td v-text="contact.phone"></td>
                        <td>
                            <button @click="showDeleteContactConfirmModal(contact)" class="btn btn-danger me-2 my-1"
                                    type="button">
                                Удалить
                            </button>
                            <button @click="contact.isEditing = true" class="btn btn-primary" type="button">
                                Редактировать
                            </button>
                        </td>
                    </tr>
                    <tr v-else class="align-middle">
                        <td>
                            <input v-model="contact.checked" class="form-check-input" type="checkbox" :value="contact">
                        </td>
                        <td v-text="index + 1"></td>
                        <td>
                            <input v-model.trim="contact.name"
                                   type="text"
                                   class="form-control"
                                   :class="{'is-invalid': contact.isInvalidEditingName}">
                            <span class="invalid-feedback">Необходимо указать Имя</span>
                        </td>
                        <td>
                            <input v-model.trim="contact.surname"
                                   type="text"
                                   class="form-control"
                                   :class="{'is-invalid': contact.isInvalidEditingSurname}">
                            <span class="invalid-feedback">Необходимо указать Фамилию</span>
                        </td>
                        <td>
                            <input v-model.trim="contact.phone"
                                   type="text"
                                   class="form-control"
                                   :class="{'is-invalid': contact.isInvalidEditingPhone}">
                            <span class="invalid-feedback">Необходимо указать Номер телефона</span>
                        </td>
                        <td>
                            <button @click="saveContact(contact)" class="btn btn-success me-2 my-1" type="button">
                                Сохранить
                            </button>
                            <button @click="contact.isEditing = false" class="btn btn-danger" type="button">Отменить
                            </button>
                        </td>
                    </tr>
                </template>
                </tbody>
            </table>
        </div>

        <confirm-modal ref="deleteContactConfirmModal" @ok="deleteContact()">
            <template #header>Подтвердите удаление</template>
            <template #confirm-button>Удалить</template>
        </confirm-modal>

        <confirm-modal ref="deleteCheckedContactConfirmModal" @ok="deleteCheckedContact()">
            <template #header>Подтвердите удаление</template>
            <template #confirm-button>Удалить</template>
        </confirm-modal>

        <confirm-modal ref="errorConfirmModal" @ok="this.$refs.errorConfirmModal.hide()">
            <template #header>Ошибка!</template>
            <template #confirm-button>OK</template>
        </confirm-modal>
    </div>
</template>

<script>
import PhoneBookService from "./phoneBookService";
import ConfirmModal from "./СonfirmModal.vue";

export default {
    name: "App",

    components: {
        ConfirmModal
    },

    data() {
        return {
            contacts: [],
            term: "",
            name: "",
            surname: "",
            phone: "",
            service: new PhoneBookService(),
            contactsToDelete: [],
            isValidName: true,
            isValidSurname: true,
            isValidPhone: true,
            allChecked: false
        };
    },

    computed: {
        checkedContacts: function () {
            return this.contacts.filter(contact => contact.checked === true)
        }
    },

    created() {
        this.loadContacts()
    },

    methods: {
        createContact() {
            this.isValidName = true;
            this.isValidSurname = true;
            this.isValidPhone = true;

            if (this.name.length === 0) {
                this.isValidName = false;
            }

            if (this.surname.length === 0) {
                this.isValidSurname = false;
            }

            if (this.phone.length === 0 || isNaN(Number(this.phone))) {
                this.isValidPhone = false;
            }

            if (this.isValidName === false || this.isValidSurname === false || this.isValidPhone === false) {
                return;
            }

            const contact = {
                name: this.name,
                phone: this.phone,
                surname: this.surname,
                checked: false
            }

            this.service.createContact(contact).then(response => {
                if (!response.success) {
                    this.$refs.errorConfirmModal.show(response.message);
                    return;
                }

                this.name = "";
                this.phone = "";
                this.surname = "";
                this.loadContacts();
            }).catch(() => this.$refs.errorConfirmModal.show("Не удалось добавить контакт"))
        },

        showDeleteContactConfirmModal(contact) {
            this.contactsToDelete = contact;

            this.$refs.deleteContactConfirmModal.show("Вы действительно хотите удалить выбранный контакт?");
        },

        showDeleteCheckedContactConfirmModal() {
            this.contactsToDelete = this.checkedContacts;

            this.$refs.deleteCheckedContactConfirmModal.show("Вы действительно хотите удалить выбранные контакты?");
        },

        deleteContact() {
            this.service.deleteContact(this.contactsToDelete.id).then(response => {
                if (!response.success) {
                    this.$refs.errorConfirmModal.show(response.message);
                    return;
                }

                this.loadContacts();
            }).catch(() => this.$refs.errorConfirmModal.show("Не удалось удалить контакт"))

            this.$refs.deleteContactConfirmModal.hide();
            this.contactsToDelete = [];
            this.allChecked = false;
        },

        deleteCheckedContact() {
            this.contactsToDelete.forEach(c => {
                this.service.deleteContact(c.id).then(response => {
                    if (!response.success) {
                        this.$refs.errorConfirmModal.show(response.message);
                        return;
                    }

                    this.loadContacts();
                }).catch(() => this.$refs.errorConfirmModal.show("Не удалось удалить контакт"))
            })

            this.$refs.deleteCheckedContactConfirmModal.hide();
            this.contactsToDelete = [];
            this.allChecked = false;
        },

        saveContact(contact) {
            contact.isInvalidEditingName = false;
            contact.isInvalidEditingSurname = false;
            contact.isInvalidEditingPhone = false;

            if (contact.name.length === 0) {
                contact.isInvalidEditingName = true;
            }

            if (contact.surname.length === 0) {
                contact.isInvalidEditingSurname = true;
            }

            if (contact.phone.length === 0 || isNaN(Number(contact.phone))) {
                contact.isInvalidEditingPhone = true;
            }

            if (contact.isInvalidEditingName === true || contact.isInvalidEditingSurname === true || contact.isInvalidEditingPhone === true) {
                return;
            }

            const editContact = {
                id: contact.id,
                name: contact.name,
                phone: contact.phone,
                surname: contact.surname
            }

            this.service.saveContact(editContact).then(response => {
                if (!response.success) {
                    this.$refs.errorConfirmModal.show(response.message);
                    return;
                }

                contact.isEditing = false;
            }).catch(() => this.$refs.errorConfirmModal.show("Не удалось изменить контакт"))
        },

        loadContacts() {
            this.service.getContacts(this.term).then(contacts => {
                this.contacts = contacts;
            }).catch(() => this.$refs.errorConfirmModal.show("Не удалось загрузить список контактов"))
        },

        selectAll() {
            if (!this.allChecked) {
                this.contacts.forEach(contact => contact.checked = true);
                this.allChecked = true;
            } else {
                this.contacts.forEach(contact => contact.checked = false);
                this.allChecked = false;
            }
        }
    }
};
</script>

