const express = require("express");
const router = express.Router();
const passport = require("passport");

const { create, loggedIn } = require("../controllers/loginController");

router.post(
  "/login",
  passport.authenticate("local", {
    successFlash: "login successful",
    successRedirect: "/home",
    failureRedirect: "/login",
    failureFlash: "Login failed",
    failureFlash: true
  })
);

router.post("/create/user", create);

function requireLogin(req, res, next) {
  if (!req.user) return res.redirect("/");
  next();
}

router.get("/home", requireLogin, loggedIn);

module.exports = router;
