const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const definitionDao = require("../../dao/definition-dao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    desc: { type: "string" },
  },
  required: ["name", "desc"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let definition = req.body;

    // validate input
    const valid = ajv.validate(schema, definition);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    definition = definitionDao.create(definition);
    res.json(definition);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
