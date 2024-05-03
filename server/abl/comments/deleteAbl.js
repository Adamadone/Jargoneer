const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const definitionDao = require("../../dao/definition-dao.js");

const schema = {
  type: "object",
  properties: {
    definitionId: { type: "string", minLength: 32, maxLength: 32 },
    commentId: { type: "string", minLength: 32, maxLength: 32 },
  },
  required: ["definitionId", "commentId"],
  additionalProperties: false,
};

async function DeleteAbl(req, res) {
  try {
    
    let body = req.body;

    // validate input
    const valid = ajv.validate(schema, body);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const updatedDefinition = definitionDao.deleteComment(body.commentId, body.definitionId);
    if (!updatedDefinition) {
      res.status(404).json({
        code: "definitionNotFound",
        message: `Definition ${body.definitionId} not found`,
      });
      return;
    }

    res.json(updatedDefinition);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = DeleteAbl;
