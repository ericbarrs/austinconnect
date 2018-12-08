const User = require("../models/userModel");

module.exports.create = (req, res) => {
  User.findOne({ userName: req.body.userName })
    .then(user => {
      if (user) {
        res.status(400).json({ user: "user already exist" });
      } else {
        const newUser = new User({
          userName: req.body.userName,
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          password: req.body.password
        });
        newUser.save().then(user => res.send(user));
      }
    })
    .catch(err => res.send(err));
};

module.exports.loggedIn = (req, res) => {
  req.session.flash = null;
  res.json({ passport: req.session.passport });

  //res.send(passport);
  //res.send(req.session);
};
