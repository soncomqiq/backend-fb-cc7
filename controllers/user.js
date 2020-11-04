const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, password, name, profileUrl } = req.body;
  console.log(req.body);
  const targetUser = await db.User.findOne({ where: { username } });

  if (targetUser) {
    res.status(400).send({ message: "Username already taken." });
  } else {
    const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUND));
    const hashedPW = bcrypt.hashSync(password, salt);

    await db.User.create({
      username,
      name,
      password: hashedPW,
      profile_url: profileUrl
    });

    res.status(201).send({ message: "User created." });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const targetUser = await db.User.findOne({ where: { username } });

  if (targetUser) {
    if (bcrypt.compareSync(password, targetUser.password)) {
      const token = jwt.sign({ id: targetUser.id }, process.env.SECRET, { expiresIn: 3600 });
      res.status(200).send({ token });
    } else {
      res.status(400).send({ message: "Username or password incorrect." });
    }
  } else {
    res.status(400).send({ message: "Username or password incorrect." });
  }
};

module.exports = {
  register,
  login
};