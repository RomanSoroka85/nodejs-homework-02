  const express = require('express')
const router = express.Router()
const {NotFound} = require('http-errors')
const Joi  = require('joi')
const {BadRequest} = require('http-errors')
const contactsOperation = require('../../model/index')

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number()
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contactsOperation.listContacts()
    res.json({
      "status": "success",
      "code": 200,
      "data": {
      result
      }
    })
  }
  catch (error) {
    next(error)
  }
})


router.get('/:contactId', async (req, res, next ) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperation.getById(contactId);
    if (!contact) {
      throw new NotFound('not found')
    }
    res.json(contact);
  }
  catch (error) {
    next (error);
  }
})

router.post('/', async (req, res, next) => {
  try {

    const { error } = joiSchema.validate(req.body);
    if (error) {
      console.log(error.message);
      throw new BadRequest(error.message);
    }
    const result = await contactsOperation.addContact(req.body)

    res.status(201).json({ 
    status: 'succses',
      code: 200,
      data: {
      result
      }
    })
  }
  catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperation.removeContact(contactId);
    if (!result) {
      throw new NotFound('not found')
    }
    res.json({
      status: "success",
      code: 200,
      message: 'success delete'
    })
  }
    catch (error) {
      next(error);
    }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      console.log(error.message);
      throw new BadRequest(error.message);
    }
    const { contactId } = req.params;

    const result = await contactsOperation.updateContact(contactId, req.body);
    if (!result) {
      throw new NotFound('not found')
      }
    res.json({
      "status": "success",
      "code": 200,
      "data": {
      result
      }
    })
  }
  catch (error) {
   next(error);
  }
})

module.exports = router
