const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const flash = require("connect-flash");

const keys = require("./config/keys");
const port = process.env.PORT || 5000;

const loginRoute = require("./routes/loginRoute");

require("./services/passport");

const app = express();

app.use(bodyParser.json());

mongoose
  .connect(
    process.env.MONGO || keys.mongo,
    keys.newParser
  )
  .then(() => console.log("db connected"))
  .catch(err => console.log(err));

app.listen(port, console.log("server running"));

//use cookie seesion
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey] || [process.env.COOKIEKEY]
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
//app.use(express.static('client/build'))
app.use(loginRoute);
