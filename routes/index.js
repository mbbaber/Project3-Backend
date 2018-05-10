const express = require('express');
const mongoose = require("mongoose");
const router  = express.Router();

const Group = require("../models/Group")
const Subject = require("../models/Subject")

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


module.exports = router;
