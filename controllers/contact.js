const { NotFound, Unauthorized } = require("http-errors");
const { Contact } = require("../models");

const listContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner: req.user._id }, "name, email", {
      skip,
      limit: +limit,
    }).populate("owner");
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};
const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw new NotFound(`Contact whith id= ${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};
const addContact = async (req, res, next) => {
  const result = await Contact.create({ ...req.body, owner: req.user._id });
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
  const contact = await Contact.findOne({
    _id: contactId,
    owner: req.user._id,
  });
  if (!contact) {
    throw new Unauthorized();
  }
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
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
const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { active } = req.body;
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { active },
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
const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw new NotFound("not found");
  }
  res.json({
    status: "success",
    code: 200,
    message: "success delete",
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
