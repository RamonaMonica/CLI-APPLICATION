const { error } = require("console");
const fs = require("fs");
const path = require("path");

const contactsList = path.join(__dirname, "db", "contacts.json");

const listContacts = function () {
  fs.readFile(contactsList, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    console.table(JSON.parse(data));
  });
};

const getContactById = function (contactId) {
  fs.readFile(contactsList, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const contacts = JSON.parse(data);
    const contact = contacts.find((x) => x.id === contactId);
    if (contact) console.table([contact]);
    else console.log("No contact found");
  });
};

const removeContact = function (contactId) {
  fs.readFile(contactsList, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const contacts = JSON.parse(data);
    const contact = contacts.filter((x) => x.id !== contactId);
    contact.forEach((contact, i) => (contact.id = `${i + 1}`));
    fs.writeFileSync(contactsList, JSON.stringify(contact, null, 2), (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
    listContacts();
    console.log(`Contact with id ${contactId} has been removed with succes!`);
  });
};

const addContact = function (name, email, phone) {
  fs.readFile(contactsList, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const contacts = JSON.parse(data);
    const newContact = { id: `${contacts.length + 1}`, name, email, phone };
    const newList = [...contacts, newContact];
    fs.writeFileSync(contactsList, JSON.stringify(newList, null, 2), (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    console.log(`Contact successfully addeeeed!`);
    listContacts();
  });
};

module.exports = { listContacts, getContactById, removeContact, addContact };
