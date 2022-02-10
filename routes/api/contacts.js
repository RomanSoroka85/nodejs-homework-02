const express = require("express");
const { controllerWrapper, validation } = require("../../middlewares");
const { joiSchema } = require("../../models/contact");
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
} = require("../../controllers");
const { authenticate } = require("../../middlewares");
const router = express.Router();

router.get("/", controllerWrapper(listContacts));
router.get(
  "/:contactId",
  validation(joiSchema),
  controllerWrapper(getContactById)
);
router.post(
  "/",
  authenticate,
  validation(joiSchema),
  controllerWrapper(addContact)
);
router.delete(
  "/:contactId",
  authenticate,
  validation(joiSchema),
  controllerWrapper(removeContact)
);
router.put(
  "/:contactId",
  authenticate,
  validation(joiSchema),
  controllerWrapper(updateContact)
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  controllerWrapper(updateStatusContact)
);

module.exports = router;
