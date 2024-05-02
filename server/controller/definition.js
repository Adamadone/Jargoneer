const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/definition/getAbl");
const ListAbl = require("../abl/definition/listAbl");
const CreateAbl = require("../abl/definition/createAbl");
const UpdateAbl = require("../abl/definition/updateAbl");
const DeleteAbl = require("../abl/definition/deleteAbl");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;
