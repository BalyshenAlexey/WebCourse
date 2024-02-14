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
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(contact, index) in contacts" :key="contact.id">
          <td>
            <input v-model="checkedContacts" class="form-check-input" type="checkbox" :value="contact">
          </td>
          <td v-text="index + 1"></td>
          <td v-if="!contact.isEditing" v-text="contact.name"></td>
          <td v-else>
            <input v-model.trim="contact.name"
                   type="text"
                   class="form-control"
                   :class="{'is-invalid': contact.isInvalidEditingName}">
            <span class="invalid-feedback">Необходимо указать Имя</span>
          </td>
          <td v-if="!contact.isEditing" v-text="contact.surname"></td>
          <td v-else>
            <input v-model.trim="contact.surname"
                   type="text"
                   class="form-control"
                   :class="{'is-invalid': contact.isInvalidEditingSurname}">
            <span class="invalid-feedback">Необходимо указать Фамилию</span>
          </td>
          <td v-if="!contact.isEditing" v-text="contact.phone"></td>
          <td v-else>
            <input v-model.trim="contact.phone"
                   type="text"
                   class="form-control"
                   :class="{'is-invalid': contact.isInvalidEditingPhone}">
            <span class="invalid-feedback">Необходимо указать Номер телефона</span>
          </td>
          <td v-if="!contact.isEditing">
            <button @click="showDeleteContactConfirmModal(contact)" class="btn btn-danger me-2" type="button">Удалить
            </button>
            <button @click="contact.isEditing = true" class="btn btn-primary" type="button">Редактировать</button>
          </td>
          <td v-else>
            <button @click="editContact(contact)" class="btn btn-success me-2" type="button">Сохранить</button>
            <button @click="cancelEditing(contact)" class="btn btn-danger" type="button">Отменить</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <delete-modal ref="deleteContactConfirmModal" @ok="deleteContact()">
      <template #header>Подтвердите удаление</template>
      <template #body>Вы действительно хотите удалить выбранные контакты?</template>
    </delete-modal>
  </div>
</template>

<script>
import PhoneBookService from "./phoneBookService";
import DeleteModal from "./DeleteModal.vue";

export default {
  name: "App",

  components: {
    DeleteModal
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
      allChecked: false,
      checkedContacts: []
    };
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
        surname: this.surname
      }

      this.service.createContact(contact).then(response => {
        if (!response.success) {
          alert(response.message);
          return;
        }

        this.name = "";
        this.phone = "";
        this.surname = "";
        this.loadContacts();
      }).catch(() => alert("Не удалось добавить контакт"))
    },

    showDeleteContactConfirmModal(contact) {
      if (this.checkedContacts.length === 0) {
        this.contactsToDelete.push(contact);
      } else {
        this.contactsToDelete = this.checkedContacts;
      }

      this.$refs.deleteContactConfirmModal.show();
    },

    deleteContact() {
      this.contactsToDelete.forEach(c => {
        this.service.deleteContact(c.id).then(response => {
          if (!response.success) {
            alert(response.message);
            return;
          }

          this.loadContacts();
        }).catch(() => alert("Не удалось удалить контакт"))
      })

      this.$refs.deleteContactConfirmModal.hide();
      this.contactsToDelete = [];
      this.checkedContacts = [];
      this.allChecked = false;
    },

    editContact(contact) {
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

      this.service.editContact(contact).then(response => {
        if (!response.success) {
          alert(response.message);
          return;
        }

        this.cancelEditing(contact);
      }).catch(() => alert("Не удалось изменить контакт"))
    },

    cancelEditing(contact) {
      delete contact.isEditing;
      delete contact.isInvalidEditingName;
      delete contact.isInvalidEditingSurname;
      delete contact.isInvalidEditingPhone;
      this.loadContacts();
    },

    loadContacts() {
      this.service.getContacts(this.term).then(contacts => {
        this.contacts = contacts;
      }).catch(() => alert("Не удалось загрузить список контактов"))
    },

    selectAll() {
      this.checkedContacts = [];

      if (!this.allChecked) {
        for (let c in this.contacts) {
          this.checkedContacts.push(this.contacts[c]);
        }
      }
    }
  }
};
</script>

