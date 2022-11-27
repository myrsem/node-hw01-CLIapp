const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.resolve("db/contacts.json");

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

const getContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await getContacts();
  const result = contacts.find(
    (contact) => contact.id === contactId.toString()
  );
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await getContacts();
  const index = contacts.findIndex(
    (contact) => contact.id === contactId.toString()
  );
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  updateContacts(contacts);
  return result;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await getContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  updateContacts(contacts);
  return newContact;
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
};