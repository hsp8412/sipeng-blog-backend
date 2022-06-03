const express = require("express");
const app = express();

require("./startup/routes")(app);
require("./startup/db")()

const port = process.env.PORT || 4000;

app.get("/",function (res,req){
  res.send("This is the Node.js backend for Sipeng He's personal blog app.")
})

app.listen(port, () => {
  console.log("Listening at " + port);
});

module.exports = app;
