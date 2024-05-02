const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/category/createAbl");
const UpdateAbl = require("../abl/category/updateAbl");
const DeleteAbl = require("../abl/category/deleteAbl");

router.post("/update", UpdateAbl);
router.post("/create", CreateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;
