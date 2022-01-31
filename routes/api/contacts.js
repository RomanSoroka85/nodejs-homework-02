const express = require("express");
const { controllerWrapper, validation } = require("../../middlewares");
const { joiSchema } = require("../../schemas");
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
router.get("/:contactId", controllerWrapper(getContactById));
router.post("/", validation(joiSchema), controllerWrapper(addContact));
router.delete("/:contactId", controllerWrapper(removeContact));
router.put(
  "/:contactId",
  validation(joiSchema),
  controllerWrapper(updateContact)
);
router.patch("/:contactId/favorite", controllerWrapper(updateStatusContact));

module.exports = router;
