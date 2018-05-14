const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Group = require("../models/Group");
const Subject = require("../models/Subject");
const Stat = require("../models/Stat");
const User = require("../models/User");

//first have to do database query
//and then respond with json.
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
  User.findByIdAndUpdate(req.params.userId, 
    {$pull: { groups: req.params.groupId }})
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
    admin: req.user,
    users: [req.user._id]
  });
  let newGroupId = "";
  newGroup.save(err => {
    if (err) {
      next(err);
    } else {
      res.json(newGroup);
      newGroupId = newGroup._id;
      User.findByIdAndUpdate(req.user, { $push: { groups: newGroupId } })
        // .then(result => {
        //   // res.json(result);
        //   // console.log(result);
        // })
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

router.put("/gr/:groupId/sb/:subId",(req, res, next)=>{
  Group.findByIdAndUpdate(req.params.groupId,
  {$push: {subjects: req.params.subId }},
  {new: true})
  .populate('groups')
  .then(result => {
    res.json(result);
  })
  .catch(err => {
    next(err);
  });
})

router.put('/us/:userId/gr/:groupId', (req, res, next)=>{
  Group.findByIdAndUpdate(req.params.groupId,
  {$push: {users: req.params.userId }},
  {new: true})
  .then((result)=>{
    User.findByIdAndUpdate(req.params.userId, 
    {$push: {groups: req.params.groupId}},
    {new:true})
    .then(()=>{
      res.json(result.users);
    })
    .catch((err)=>{
      next(err);
    })
    console.log('adding this user', req.params.userId)
  })
  .catch((err)=>{
    next(err);
  })
})

router.put("/delete/user/:userId/group/:groupId", (req, res, next) => {
  Group.findByIdAndUpdate(
    req.params.groupId,
    { $unset: { users: req.params.userId } },
    { new: true }
  )
  .then((result)=>{
    User.findByIdAndUpdate(req.params.userId,
    {$unset: {groups: req.params.groupId}},
  {new: true})
  .then(()=>{
      res.json(result.users);
    })
    .catch((err)=>{
      next(err);
    })
  })
  .catch((err)=>{
    next(err);
  })
});

module.exports = router;
