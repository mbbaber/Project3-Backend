const express = require("express");
const passport = require('passport');
const authRoutes = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

// AUTH - edit login feature

authRoutes.post("/login", (req, res, next) => {
  const myFunction =
  passport.authenticate("local", (err, theUser) => {
    if (err) {
      next(err);
      return;
    }
    if (!theUser) {
      const err = new Error("Log in failed!");
      err.status = 400;
      next(err);
      return;
    }
    req.login(theUser, () => {
      theUser.password = undefined; // clear the password before sending (security risk)
      res.json({userInfo: theUser });
    });
});
myFunction(req, res, next);
});

// AUTH signup feature

authRoutes.post("/signup", (req, res, next) => {
  const { username, password, email}  = req.body;
  
  console.log(req.body)

  const rol = req.body.role;
  if (username === "" || password === "") {
    // 2) instead of rendering, we will do this:
    //res.render("auth/signup", { message: "Indicate username and password" });
    const err = new Error("Username or password invalid"); 
    err.status = 400; //add generic client error (when the user f's up)
    next();
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      // 3)
      //res.render("auth/signup", { message: "The username already exists" });
      const err = new Error("The username already exists"); 
      err.status = 400;
      next(err);
      return;
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPass,
    });

    newUser.save((err) => {
      if (err) {
        next(err);
      } else {
        req.login(newUser, ()=> { //use this if you don't want an email confirmation (just logs in user automatically after signup and saves a step)
        newUser.password = undefined;
        res.json({ userInfo: newUser }); // will connect userInfo to angular side soon
        }); 
      }
    });
  });
});

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.json({ userInfo: null });
});

authRoutes.get("/checklogin", (req, res, next) => {
  if (req.user) {
    req.user.password = undefined
  }
  res.json({userInfo: req.user })
});

module.exports = authRoutes;
