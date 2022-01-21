const { v4 } = require('uuid');
const fs = require ('fs/promises')
const path = require("path")
// const contacts = require('./contacts.json')

const contactsPath = path.join(__dirname, 'contacts.json');


const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
    };

const getById = async (contactId) => {
  
    const contacts = await listContacts();
    const selectContact = contacts.find(({ id }) => id === contactId);
    if (!selectContact) {
      throw new Error(`Contact with id=${contactId} not found`);
    }
    return console.table(selectContact);
  }

const removeContact = async (contactId) => { 
    const contacts = await listContacts();
    const idx = contacts.findIndex(({ id }) => id === contactId);
    if (idx === -1) {
      null;
    }
    contacts.splice(idx, 1);
    const updateContacts = await JSON.stringify(contacts);
    await fs.writeFile(contactsPath, updateContacts);
  
  return true
  } 

const addContact = async (body) => { 
  const contacts = await listContacts();
  const newContact = {
      ...body,
      id: v4()
      };
    contacts.push(newContact);
    const updateContacts = await JSON.stringify(contacts);
    await fs.writeFile(contactsPath, updateContacts);
  console.table(contacts);
  return newContact;
  } 

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
    const idx = contacts.findIndex(({ id }) => id === contactId);
    if (idx === -1) {
      throw new Error(`Contact with id=${contactId} not found`);
  }
  contacts[idx] = { ...contacts[idx], body }
  const updateContacts = await JSON.stringify(contacts);
  await fs.writeFile(contactsPath, updateContacts);
  return contacts[idx]
  
}

module.exports = {
  listContacts,
  getById,
  addContact,
  updateContact,
  removeContact,
}
