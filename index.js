const db = require("./models");
db.sequelize.sync({ force: true }).then(() => {
  console.log("Completed Connect And Sync");
});