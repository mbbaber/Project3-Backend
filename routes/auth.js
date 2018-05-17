const express = require("express");
const passport = require("passport");
const authRoutes = express.Router();
const User = require("../models/User");
const mongoose = require("mongoose");
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const Group = require('../models/Group')

// AUTH - edit login feature

authRoutes.post("/login", (req, res, next) => {
  const myFunction = passport.authenticate("local", (err, theUser) => {
    if (err) {
      next(err);
      return;
    }
    if (!theUser) {
      const err = new Error("Username or password invalid");
      err.status = 400;
      next(err);
      return;
    }
    req.login(theUser, () => {
      theUser.password = undefined; // clear the password before sending (security risk)
      res.json({ userInfo: theUser });
    });
  });
  myFunction(req, res, next);
});

// AUTH signup feature

authRoutes.post("/signup", (req, res, next) => {
  const { username, password, email } = req.body;

  console.log(req.body);

  const rol = req.body.role;
  if (username === "" || password === "") {
    // 2) instead of rendering, we will do this:
    //res.render("auth/signup", { message: "Indicate username and password" });
    const err = new Error("Username or password invalid");
    err.status = 400; //add generic client error (when the user f's up)
    next(err);
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
      password: hashPass
    });

    newUser.save(err => {
      if (err) {
        next(err);
      } else {
        req.login(newUser, () => {
          //use this if you don't want an email confirmation (just logs in user automatically after signup and saves a step)
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
    req.user.password = undefined;
  }
  res.json({ userInfo: req.user });
});

authRoutes.get("/user/:userId", (req, res, next) => {
  // if (!mongoose.Types.ObjectId.isValid(req.params.groupId)) {
  //   next(); // show 404 if bad ObjectId format
  //   return;
  // }

  User.findById(req.params.userId)
    //.populate("subjects")
    .then(user => {
      if (!user) {
        next(); // show 404 if no group was found
        return;
      }
      res.json(user);
    })
    .catch(err => {
      next(err);
    });
});

authRoutes.get('/all-users-who-belong/:groupId', (req, res, next)=>{
  User.find( {groups: req.params.groupId })
  .then((result)=>{
    result.forEach((one)=>{
      one.password = undefined;
    })
    res.json(result);
  })
  .catch((err)=>{
    next(err)
  })
})

authRoutes.get('/all-users-who-dont-belong/:groupId', (req, res, next)=>{
  User.find( {groups: {$nin: [req.params.groupId] } })
  .then((result)=>{
    result.forEach((one)=>{
      one.password = undefined;
    })
    res.json(result);
  })
  .catch((err)=>{
    next(err)
  })

})

module.exports = authRoutes;
