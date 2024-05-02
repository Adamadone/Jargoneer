const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const definitionDao = require("../../dao/definition-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
    name: { type: "string", minLength: 1 },
    desc: { type: "string" },
  },
  required: ["id", "desc"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
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

    const updatedDefinition = definitionDao.update(definition);
    if (!updatedDefinition) {
      res.status(404).json({
        code: "definitionNotFound",
        message: `Definition ${definition.id} not found`,
      });
      return;
    }

    res.json(updatedDefinition);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
