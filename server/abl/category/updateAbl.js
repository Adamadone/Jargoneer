const Ajv = require("ajv");
const ajv = new Ajv();

const userDao = require("../../dao/user-dao.js");
const definitionDao = require("../../dao/definition-dao.js");
const categoryDao = require("../../dao/category-dao.js");

const schema = {
  type: "object",
  properties: {
    definitionId: { type: "string", minLength: 32, maxLength: 32 },
    category: { type: "string"},
    colour: { type: "string"},
  },
  required: ["definitionId", "category"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let dtoIn = req.body;

    // validate input
    const valid = ajv.validate(schema, dtoIn);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // check if definition exists
    const definition = definitionDao.get(dtoIn.definitionId);
    if (!definition) {
      res.status(404).json({
        code: "definitionNotFound",
        message: `Definition ${dtoIn.definitionId} not found`,
      });
      return;
    }

    let category = categoryDao.get(dtoIn.definitionId);
    category = { ...(category || {}), ...dtoIn };

    if (!category.category) {
      categoryDao.remove(category.userId, category.definitionId);
    } else {
      category = categoryDao.update(category);
    }
    res.json(category);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
