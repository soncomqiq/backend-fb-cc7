const router = require("express").Router();
const passport = require("passport");
const { uploadImage } = require("../controllers/upload");

router.post("/", uploadImage);

module.exports = router;