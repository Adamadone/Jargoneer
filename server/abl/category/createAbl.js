const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const categoryDao = require("../../dao/category-dao.js");

const schema = {
    type: "object",
    properties: {
      definitionId: { type: "string", minLength: 32, maxLength: 32 },
      category: { type: "string"},
      colour: { type: "string"},
    },
    required: ["category"],
    additionalProperties: false,
  };

async function CreateAbl(req, res) {
  try {
    let category = req.body;

    // validate input
    const valid = ajv.validate(schema, category);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    category = categoryDao.create(category);
    res.json(category);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
