const { createPost, deletePost, editPost, getAllMyPost, getMyFeed, getAllPostWithoutAuth } = require("../controllers/post");
const router = require("express").Router();
const passport = require("passport");

const auth = passport.authenticate("jwt-auth", { session: false });

router.get("/", auth, getAllMyPost);
router.get("/feed", auth, getMyFeed);
router.post("/", auth, createPost);
router.delete("/:id", auth, deletePost);
router.put("/:id", auth, editPost);
router.get("/all-post", getAllPostWithoutAuth);

module.exports = router;