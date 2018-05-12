const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();

const Group = require("../models/Group");
const Subject = require("../models/Subject");
const Stat = require("../models/Stat");
const User = require('../models/User');

router.get('/groups', (req, res, next) => {
    Group.find()
      .then((groups) => {
        res.json(groups);
      })
      .catch((err) => {
        next(err);
      });
  });
  
  router.get('/user-groups/:userId', (req, res, next)=>{
    User.findById(req.params.userId)
    .populate('groups')
    .then((result)=>{
      res.json(result.groups);
    })
    .catch((err)=>{
      next(err);
    })
  })
   
  router.put('/groups-of-the-user/:userId/gr/:groupId', (req, res, next)=>{
    User.findByIdAndUpdate(
      req.params.userId,
      {$pull: {groups: req.params.groupId}})
      .populate('groups')
    .then((result)=>{
      console.log(result.groups)
      res.json(result.groups);
    })
    .catch((err)=>{
      next('error deleting groups',err);
    })
  })

module.exports = router;