const { NotFound } = require("http-errors");
// const { Contact } = require("../models");

const contactsOperation = require("../models");

const listContacts = async (req, res, next) => {
  const result = await contactsOperation.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};
const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const contact = await contactsOperation.getContactById(id);
  if (!contact) {
    throw new NotFound(`Contact whith id= ${id} not found`);
  }
  res.json(contact);
};
const addContact = async (req, res, next) => {
  const result = await contactsOperation.addContact(req.body);
  res.status(201).json({
    status: "succses",
    code: 200,
    data: {
      result,
    },
  });
};
const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsOperation.updateContact(contactId, req.body);
  if (!result) {
    throw new NotFound("not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};
const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsOperation.removeContact(contactId);
  if (!result) {
    throw new NotFound("not found");
  }
  res.json({
    status: "success",
    code: 200,
    message: "success delete",
  });
};
const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsOperation.updateStatusContact(
    contactId,
    req.body
  );
  if (!result) {
    throw new NotFound("not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
