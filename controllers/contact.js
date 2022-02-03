const { NotFound } = require("http-errors");
const { Contact } = require("../models");

const listContacts = async (req, res, next) => {
  try {
    const result = await Contact.find({});
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
  const result = await Contact.create(req.body);
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

// router.get("/", async (req, res, next) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findById(id);
//     if (!product) {
//       throw NotFound();
//     }
//     res.json(product);
//   } catch (error) {
//     if (error.message.includes("Cast to ObjectId failed")) {
//       error.status = 404;
//     }
//     next(error);
//   }
// });

// router.post("/", async (req, res, next) => {
//   try {
//     const { error } = joiProductSchema.validate(req.body);
//     if (error) {
//       throw new BadRequest(error.message);
//     }
//     const newProduct = await Product.create(req.body);
//     res.status(201).json(newProduct);
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/:id", async (req, res, next) => {
//   try {
//     const { error } = joiProductUpdateSchema.validate(req.body);
//     if (error) {
//       throw new BadRequest(error.message);
//     }
//     const { id } = req.params;
//     const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });
//     if (!updateProduct) {
//       throw NotFound();
//     }
//     res.json(updateProduct);
//   } catch (error) {
//     next(error);
//   }
// });

// router.patch("/:id/insale", async (req, res, next) => {
//   try {
//     const { error } = joiProductUpdateIsSaleSchema.validate(req.body);
//     if (error) {
//       throw new BadRequest(error.message);
//     }
//     const { inSale } = req.body;
//     const { id } = req.params;
//     const updateProduct = await Product.findByIdAndUpdate(
//       id,
//       { inSale },
//       { new: true }
//     );
//     if (!updateProduct) {
//       throw NotFound();
//     }
//     res.json(updateProduct);
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const deleteProduct = await Product.findByIdAndRemove(id);
//     if (!deleteProduct) {
//       throw NotFound();
//     }
//     res.json({ message: "Delete success" });
//   } catch (error) {
//     next(error);
//   }
// });
