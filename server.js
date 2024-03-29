const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();
// // drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
   console.log("Drop and re-sync db.");
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "" });
});


require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

require("./app/routes/createwallet.routes")(app);
require("./app/routes/wallet.routes")(app);
require("./app/routes/transaction.routes")(app);
require("./app/routes/reciever.routes")(app);



// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
