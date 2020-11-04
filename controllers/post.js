const db = require("../models");

// DEV ONLY
const getAllPostWithoutAuth = async (req, res) => {
  const allPostInDb = await db.Post.findAll({
    include: [
      {
        model: db.Comment,
        attributes: ["id", "comment"],
        include: [{ model: db.User, attributes: ["id", "name", "profile_url"] }]
      },
      { model: db.User, attributes: ["id", "name", "profile_url"] }
    ],
    attributes: ["id", "caption", "picture_url", "createdAt", "updatedAt"],
  });
  res.send(allPostInDb);
};

const createPost = async (req, res) => {
  const { caption, urlPic } = req.body;
  const newPost = await db.Post.create({ caption, picture_url: urlPic, user_id: req.user.id });
  res.status(201).send(newPost);
};

const deletePost = async (req, res) => {
  const postId = req.params.id;
  await db.Post.destroy({ where: { id: postId, user_id: req.user.id } });
  res.status(204).send();
};

const editPost = async (req, res) => {
  const postId = req.params.id;
  const { caption, urlPic } = req.body;
  await db.Post.update({ caption, picture_url: urlPic }, { where: { id: postId, user_id: req.user.id } });

  res.status(200).send({ message: "Updated" });
};

const getAllMyPost = async (req, res) => {
  const allPost = await db.Post.findAll({
    where: { user_id: req.user.id },
    include: [
      {
        model: db.Comment,
        attributes: ["id", "comment"],
        include: [{ model: db.User, attributes: ["id", "name", "profile_url"] }]
      },
      { model: db.User, attributes: ["id", "name", "profile_url"] }
    ],
    attributes: ["id", "caption", "picture_url", "createdAt", "updatedAt"],
  });
  res.status(200).send(allPost);
};

const getMyFeed = (req, res) => {
  // DONT DO 
};

module.exports = {
  createPost,
  deletePost,
  editPost,
  getAllMyPost,
  getMyFeed,
  getAllPostWithoutAuth,
};