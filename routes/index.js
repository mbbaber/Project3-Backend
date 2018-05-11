const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();

const Group = require("../models/Group");
const Subject = require("../models/Subject");
const Stat = require("../models/Stat");

// /* GET home page */
// router.get('/', (req, res, next) => {
//   res.render('index');
// });

//first have to do database query
//and then respond with json.
router.get('/api/groups', (req, res, next) => {
  Group.find()
    .then((groups) => {
      res.json(groups);
    })
    .catch((err) => {
      next(err);
    });
});

// GET /api/group/:groupId
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

// GET /subject/:subjectId
router.get("/subject/:subjectId", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.subjectId)) {
    next(); // show 404 if bad ObjectId format
    return;
  }

  // I want to display all the card from and back WITHIN the subject
  Subject.findById(req.params.subjectId)
    .populate("cards")
    .then((subject) => {
      if (!subject) {
        next(); // show 404 if no group was found
        return;
      }
      res.json(subject);
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
  Stat.findOneAndUpdate( 
    {user: req.user,
      //"5af4551e2c4927aa694c05d9"
    card: card,
    //"5af4551e2c4927aa694c05f4",
    group: group,
    //"5af4551e2c4927aa694c05d5",
    subject: subject
    //"5af4551e2c4927aa694c05e0"
  },
    {
      $set: { rating: rating },
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
