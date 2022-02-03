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
const router = express.Router();

router.get("/", controllerWrapper(listContacts));
router.get(
  "/:contactId",
  validation(joiSchema),
  controllerWrapper(getContactById)
);
router.post("/", validation(joiSchema), controllerWrapper(addContact));
router.delete(
  "/:contactId",
  validation(joiSchema),
  controllerWrapper(removeContact)
);
router.put(
  "/:contactId",
  validation(joiSchema),
  controllerWrapper(updateContact)
);
router.patch("/:contactId/favorite", controllerWrapper(updateStatusContact));

module.exports = router;
