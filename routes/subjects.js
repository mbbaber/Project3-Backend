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
        // console.log(result.subjects)
        res.json(result.subjects);
      })
      .catch((err)=>{
        next('error deleting groups',err);
      })
})

router.post('/new-subject', (req, res, next)=>{
  const newSub = new Subject({
    name: req.body.name,
    admin: req.user
  });
  let newSubId = "";
  newSub.save(err => {
    if (err) {
      next("error savving new sub",err);
    } else {
      res.json(newSub);
      newSubId = newSub._id;
      // console.log('this new sub ************',newSubId);
      // console.log(req.user);
      User.findByIdAndUpdate(req.user, { $push: { subjects: newSubId } }, {new: true})
        .then(result => {
          // console.log(result);
          // res.json(result);
        })
        .catch(err => {
          next("error updating user",err);
        });
    }
  });
})

router.get('/all-subjects', (req, res, next)=>{
  Subject.find()
  .then(result=>{
    res.json(result);
  })
  .catch((err)=>{
    next(err);
  })
})


router.put('/add-card/:subId',(req, res, next)=>{
 const {front, back} = req.body;
  Subject.findByIdAndUpdate(req.params.subId,
    {$push: {cards: { front: front, back: back }}},
    {new:true}
  )
  .populate('cards')
  .then((result)=>{
    // console.log(result)
    res.json(result)
  })
  .catch((err)=>{
    next(err);
  })
})

// router.get('/:subId/card/:cardId', (req, res, next)=>{
//   console.log(req.params.cardId)
//   Subject.findByIdAndUpdate( 
//     req.params.subId,
//     {$pull: { cards: req.params.cardId }},
//     {new: true})
//   .populate('cards')
//   .then((result)=>{
//     console.log(result)
//     res.json(result.cards)
//   })
//   .catch((err)=>{
//     next(err);
//   })
// })

router.put("/sub/:subId/card/:cardId", (req, res, next) => {
  Subject.findByIdAndUpdate(req.params.subId, 
    {$pull: { cards: {_id: req.params.cardId} }},
    {new:true})
    // .populate("cards")
    .then(result => {
      // console.log('deleted the card',result);
      res.json(result);
    })
    .catch(err => {
      next("error deleting cards");
      next(err);
    });
});

// router.get("/:subjectId", (req, res, next) => {
//   if (!mongoose.Types.ObjectId.isValid(req.params.subjectId)) {
//     next(); // show 404 if bad ObjectId format
//     return;
//   }

//   // I want to display all the card from and back WITHIN the subject
//   Subject.findById(req.params.subjectId)
//     .populate("cards")
//     .then((subject) => {
//       if (!subject) {
//         next(); // show 404 if no group was found
//         return;
//       }
//       res.json(subject);
//     })
//     .catch((err) => {
//       next(err);
//     });

// });

router.get('/:subId', (req, res, next)=>{
  Subject.findById(req.params.subId)
  .then((result)=>{
    res.json(result);
  })
  .catch((err)=>{
    next(err);
  })
})  //same route as above 


router.put('/add-keyword/:subId/:word', (req, res, next)=>{

  Subject.findByIdAndUpdate(req.params.subId,
  {$addToSet: {keywords: req.params.word}},
  {new: true})
  .then((result)=>{
    res.json(result.keywords)
  })
  .catch((err)=>{
    next(err);
  })
})

router.put('/delete-keyword/:subId/:word', (req, res, next)=>{

  Subject.findByIdAndUpdate(req.params.subId,
  {$pull: {keywords: req.params.word}},
  {new: true})
  .then((result)=>{
    res.json(result.keywords)
  })
  .catch((err)=>{
    next(err);
  })
})

module.exports = router;