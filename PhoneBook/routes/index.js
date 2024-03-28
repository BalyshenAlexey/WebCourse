const express = require("express");
const router = express.Router();

let contacts = [];
let currentContactId = 1;

router.get("/api/contacts", function (req, res) {
    const term = (req.query.term || "").toUpperCase();

    const result = term.length === 0
        ? contacts
        : contacts.filter(c => c.name.toUpperCase().includes(term) || c.phone.toUpperCase().includes(term) || c.surname.toUpperCase().includes(term));

    res.send(result);
});

router.delete("/api/contacts/:id", function (req, res) {
    const id = Number(req.params.id);

    contacts = contacts.filter(c => c.id !== id);

    res.send({
        success: true,
        message: null
    });
});

router.post("/api/contacts", function (req, res) {
    const contact = {
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone
    };

    if (!contact.name) {
        res.send({
            success: false,
            message: "Поле \"Имя\" обязательно для заполнения"
        });

        return;
    }

    if (!contact.surname) {
        res.send({
            success: false,
            message: "Поле \"Фамилия\" обязательно для заполнения"
        });

        return;
    }

    if (!contact.phone) {
        res.send({
            success: false,
            message: "Поле \"Номер телефона\" обязательно для заполнения"
        });

        return;
    }

    const upperCasePhone = contact.phone.toUpperCase();

    if (contacts.some(c => c.phone.toUpperCase() === upperCasePhone)) {
        res.send({
            success: false,
            message: "Контакт с таким номером уже существует"
        });

        return;
    }

    contact.id = currentContactId;
    currentContactId++;

    contacts.push(contact);

    res.send({
        success: true,
        message: null
    });
});

router.put("/api/contacts", function (req, res) {
    const id = Number(req.body.id);

    if (!req.body.name) {
        res.send({
            success: false,
            message: "Поле \"Имя\" обязательно для заполнения"
        });

        return;
    }

    if (!req.body.surname) {
        res.send({
            success: false,
            message: "Поле \"Фамилия\" обязательно для заполнения"
        });

        return;
    }

    if (!req.body.phone) {
        res.send({
            success: false,
            message: "Поле \"Номер телефона\" обязательно для заполнения"
        });

        return;
    }

    const upperCasePhone = req.body.phone.toUpperCase();

    if (contacts.some(c => c.id !== id && c.phone.toUpperCase() === upperCasePhone)) {
        res.send({
            success: false,
            message: "Контакт с таким номером уже существует"
        });

        return;
    }

    const editingContact = contacts.find(c => c.id === id);

    editingContact.name = req.body.name;
    editingContact.surname = req.body.surname;
    editingContact.phone = req.body.phone;

    res.send({
        success: true,
        message: null
    });
});

module.exports = router;
