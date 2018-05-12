const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();

const Group = require("../models/Group");
const Subject = require("../models/Subject");
const Stat = require("../models/Stat");
const User = require('../models/User');


router.get('/user-subs/:userId', (req, res, next)=>{
    User.findById(req.params.userId)
    .populate('subjects')
    .then((result)=>{
      res.json(result.subjects);
    })
    .catch((err)=>{
      next(err);
    })
})

router.put('/subs-of-the-user/:userId/gr/:subId',(req, res, next)=>{
    User.findByIdAndUpdate(
        req.params.userId,
        {$pull: {subjects: req.params.subId}})
        .populate('subjects')
      .then((result)=>{
        console.log(result.subjects)
        res.json(result.subjects);
      })
      .catch((err)=>{
        next('error deleting groups',err);
      })
})

router.get("/:subjectId", (req, res, next) => {
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

module.exports = router;