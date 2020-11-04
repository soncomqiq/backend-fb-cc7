require("dotenv").config();
const db = require("./models");
const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require('./routes/comment');
const friendRoutes = require("./routes/friend");

require("./config/passport");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/friends", friendRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});

db.sequelize.sync().then(() => {
  console.log("Completed Connect And Sync");
});