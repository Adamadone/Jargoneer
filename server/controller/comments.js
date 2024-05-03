const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/comments/createAbl");
const DeleteAbl = require("../abl/comments/deleteAbl");

router.post("/create", CreateAbl);
router.post("/delete", DeleteAbl)

module.exports = router;
