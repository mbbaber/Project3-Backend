const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const nodemailer = require('nodemailer');

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

router.post("/private-group/:userId", (req, res, next)=>{
  const newGroup = new Group({
    name: "Private",
    admin: req.params.userId,
    users: [req.params.userId]
  });
  let newGroupId = "";
  newGroup.save(err => {
    if (err) {
      next(err);
    } else {
      res.json(newGroup);
      newGroupId = newGroup._id;
      User.findByIdAndUpdate(req.params.userId, { $push: { groups: newGroupId } })
        // .then(result => {
        //   // res.json(result);
        //   // console.log(result);
        // })
        .catch(err => {
          next(err);
        });
    }
  });
})

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
  {$push: {subjects: req.params.subId }})
  .populate('groups')
  .then(result => {
    result.users.forEach((oneUserId)=>{
      User.findByIdAndUpdate(oneUserId,
        {$addToSet: { subjects: req.params.subId}}, 
        {new: true})
        .then(()=>{
          res.json(result);
        })
    })
  })
  .catch(err => {
    next(err);
  });
})

router.put("/us/:userId/gr/:groupId", (req, res, next) => {
  Group.findByIdAndUpdate(req.params.groupId, {
    $addToSet: { users: req.params.userId }
  })
    .then(result => {
      User.findByIdAndUpdate(req.params.userId, {
        $addToSet: { groups: req.params.groupId }
      })
      .then(() => {
        result.subjects.forEach(oneSub => {
          User.findByIdAndUpdate(
            req.params.userId,
            { $addToSet: { subjects: oneSub } },
            { new: true }
          ).then(() => {
            res.json(result.users);
          });
        });
      });
      console.log("adding this user", req.params.userId);
    })
    .catch(err => {
      next(err);
    });
});

router.put("/delete/user/:userId/group/:groupId", (req, res, next) => {
var userSubs = [];
var groupSubs = [];
  Group.findByIdAndUpdate(req.params.groupId, {
    $pull: { users: req.params.userId }
  })
    .then(group => {
      User.findByIdAndUpdate(req.params.userId, {
        $pull: { groups: req.params.groupId }
      })
        .populate("groups")
        .then(user => {
          res.json(group.users);
        });
    })
    .catch(err => {
      next(err);
    });
});

router.put("/delete/subs/:groupId/user/:userId", (req, res, next) => {
  Group.findById(req.params.groupId)
    // .populate('subjects')
    .then(group => {
      User.findById(req.params.userId)
        .populate({ path: "groups", populate: { path: "subjects" } })
        .then(user => {
          var arrGrSb = [];
          user.groups.forEach(oneGr => {
            oneGr.subjects.forEach((sub, i) => {
              arrGrSb.push(sub._id);
            });
          });
          var toCheck = [];
          group.subjects.forEach(one => {
            toCheck.push(one);
          });
          arrGrSb.forEach(one => {
            toCheck.forEach((two, i) => {
              if (one.equals(two)) {
                toCheck.splice(i, 1);
              }
            });
          });

          toCheck.forEach(oneId => {
            User.findByIdAndUpdate(
              req.params.userId,
              { $pull: { subjects: oneId } },
              { new: true }
            ).then(res => {
              res.json;
            });
          });
        });
    })
    .catch(err => {
      next(err);
    });
});


const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.gmail_user,
    pass: process.env.gmail_pass
  }
})

router.post('/process-message', (req, res, next)=>{
  const {sender, senderEmail, message, email } = req.body;
    
    transport.sendMail({
      from: "Your Website <website@example.com>",
      to: email,
      subject: `Your study buddy found you!`, 
      text: `
      Name: ${sender}
      Email: ${senderEmail}
      Message: ${message}`,
      html: `
      <h1>Great news!</h1>
      <h2> ${sender} found you as his study-budy!</h2>
      <p>Here's what they wrote:<br> ${message}</p>`
    })
    .then((result)=>{
      res.json(result)
    })
    .catch((err)=>{
      next(err);
    })
  });



module.exports = router;
