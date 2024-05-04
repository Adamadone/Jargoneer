const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const definitionDao = require("../../dao/definition-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
  },
  required: ["id"],
  additionalProperties: false,
};

async function GetAbl(req, res) {
  try {
    // get request query or body
    const reqParams = req.query?.id ? req.query : req.body;

    // validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // read definition by given id
    const definition = definitionDao.get(reqParams.id);
    if (!definition) {
      res.status(404).json({
        code: "definitionNotFound",
        message: `Definition ${reqParams.id} not found`,
      });
      return;
    }

    const categoryMap = definitionDao.definitionMap();
    definition.userMap = categoryMap[reqParams.id] || {};
    

    res.json(definition);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;
