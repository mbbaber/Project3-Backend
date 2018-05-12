const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Group = require("../models/Group");
const Subject = require("../models/Subject");
const Stat = require("../models/Stat");
const User = require("../models/User");

router.get("/groups", (req, res, next) => {
  Group.find()
    .then(groups => {
      res.json(groups);
    })
    .catch(err => {
      next(err);
    });
});

router.get("/user-groups/:userId", (req, res, next) => {
  User.findById(req.params.userId)
    .populate("groups")
    .then(result => {
      res.json(result.groups);
    })
    .catch(err => {
      next(err);
    });
});

router.put("/groups-of-the-user/:userId/gr/:groupId", (req, res, next) => {
  User.findByIdAndUpdate(req.params.userId, {
    $pull: { groups: req.params.groupId }
  })
    .populate("groups")
    .then(result => {
      console.log(result.groups);
      res.json(result.groups);
    })
    .catch(err => {
      next("error deleting groups", err);
    });
});

router.post("/new-group", (req, res, next) => {
  const newGroup = new Group({
    name: req.body.name,
    admin: req.user
  });
  let newGroupId = "";
  newGroup.save(err => {
    if (err) {
      next(err);
    } else {
      res.json(newGroup);
      newGroupId = newGroup._id;
      console.log(newGroupId);
      console.log(req.user);
      User.findByIdAndUpdate(req.user, { $push: { groups: newGroupId } })
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          next(err);
        });
    }
  });
});

router.get("/new-group/:groupId", (req, res, next) => {
  Group.findById(req.params.groupId)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
