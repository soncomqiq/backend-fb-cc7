const router = require("express").Router();
const passport = require("passport");
const { uploadImage } = require("../controllers/upload");
const auth = passport.authenticate("jwt-auth", { session: false });

router.post("/", auth, uploadImage);

module.exports = router;