const express = require("express");
const {
  controllerWrapper,
  validation,
  autenticate,
} = require("../../middlewares");
const { joiSchema } = require("../../models/contact");
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
} = require("../../controllers/contacts");

const router = express.Router();

router.get("/", controllerWrapper(listContacts));
router.get(
  "/:contactId",
  validation(joiSchema),
  controllerWrapper(getContactById)
);
router.post(
  "/",
  autenticate,
  validation(joiSchema),
  controllerWrapper(addContact)
);
router.delete(
  "/:contactId",
  autenticate,
  validation(joiSchema),
  controllerWrapper(removeContact)
);
router.put(
  "/:contactId",
  autenticate,
  validation(joiSchema),
  controllerWrapper(updateContact)
);
router.patch(
  "/:contactId/favorite",
  autenticate,
  controllerWrapper(updateStatusContact)
);

module.exports = router;
