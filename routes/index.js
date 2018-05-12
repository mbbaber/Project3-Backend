const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();

const Group = require("../models/Group");
const Subject = require("../models/Subject");
const Stat = require("../models/Stat");
const User = require('../models/User');

// /* GET home page */
// router.get('/', (req, res, next) => {
//   res.render('index');
// });

//first have to do database query
//and then respond with json.


// GET /group/:groupId
router.get("/group/:groupId", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.groupId)) {
    next(); // show 404 if bad ObjectId format
    return;
  }

  // I want to display all the subjects WITHIN the clicked group
  Group.findById(req.params.groupId)
    .populate("subjects")
    .then((group) => {
      if (!group) {
        next(); // show 404 if no group was found
        return;
      }
      res.json(group);
    })
    .catch((err) => {
      next(err);
    });
});


router.patch("/stat", (req, res, next) => {
  // if (!mongoose.Types.ObjectId.isValid(req.params.statId)) {
  //   next(); // show 404 if bad ObjectId format
  //   return;
const { card, group, subject, rating } = req.body;
console.log(req.user);
  Stat.findOneAndUpdate( 
    {user: req.user,
      //"5af4551e2c4927aa694c05d9"
    card: card,
    //"5af4551e2c4927aa694c05f4",
    group: group, //TODO: REFRESH SESSION ISSUE
    //"5af4551e2c4927aa694c05d5",
    subject: subject
    //"5af4551e2c4927aa694c05e0"
  },
    {
      $set: { rating: rating }, //TODO: WTF does this not take a varible!?!?!?
      $inc: { seen: 1 }
    }, 
    {upsert: true, new: true},
 )
 .then((result) => {
    console.log(result)
    res.json(result)
 })
 .catch((err) => {
   console.log("Stat error")
   console.log(err);
   next(err);
 })
});

module.exports = router;
