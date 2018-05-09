const mongoose = require('mongoose');
const Group = require('../models/Group');
const Stat = require('../models/Stat');
const Subject = require('../models/Subject');
const User = require('../models/User');

const dbName = 'project3';
mongoose.connect(`mongodb://localhost/${dbName}`);

function generateIds(n){
    var idsArray = []
    for(var i = 0; i <= n; i++){
        const id = new mongoose.Types.ObjectId();
        idsArray.push(id);
    }
    return idsArray;
}

const groupIds = generateIds(3),
    userIds = generateIds(6),
    subjectIds = generateIds(6),
    statIds = generateIds(5);

// 5 cards per suject   
cardIds = [];
for(var i = 0; i <= 6; i++){
    cardIds.push(generateIds(5))
}

const groups = [{
    _id: groupIds[1],
    name: "Group1",
    admin: { _id: userIds[1] }, // in this case, UserAdmin is a user_id that I assigned
    users: [{ _id: userIds[5] }, { _id: userIds[2] }, { _id: userIds[3] }, { _id: userIds[4] }],
    subjects: [{ _id: subjectIds[1] }, { _id: subjectIds[2] }, { _id: subjectIds[3] }],
},
{
    _id: groupIds[2],
    name: "Group2",
    admin: { _id: userIds[2] }, // in this case, UserAdmin is a user_id that I assigned
    users: [{ _id: userIds[1] }, { _id: userIds[5] }, { _id: userIds[3] }, { _id: userIds[6] }],
    subjects: [{ _id: subjectIds[1] }, { _id: subjectIds[2] }, { _id: subjectIds[4] }]
},

{
    _id: groupIds[3],
    name: "Group3",
    admin: { _id: userIds[1] }, // in this case, UserAdmin is a user_id that I assigned
    users: [{ _id: userIds[2] }, { _id: userIds[5] }, { _id: userIds[3] }],
    subjects: [{ _id: subjectIds[1] }, { _id: subjectIds[3] }, { _id: subjectIds[5] }]
}
]

const users = [{
    _id: userIds[1],
    username: "User 1",
    email: "User1@gmail.com",
    encryptedPassword: "12345",
    groups: [{ _id: groupIds[1] }, { _id: groupIds[2] }, { _id: groupIds[3] }],
    subjects: [{ _id: subjectIds[1] }, { _id: subjectIds[2] }, { _id: subjectIds[3] }, { _id: subjectIds[4] }, { _id: subjectIds[5] }]
},
{
    _id: userIds[2],
    username: "User 2",
    email: "User2@gmail.com",
    encryptedPassword: "12345",
    groups: [{ _id: groupIds[1] }, { _id: groupIds[2] }, { _id: groupIds[3] }],
    subjects: [{ _id: subjectIds[1] }, { _id: subjectIds[2] }, { _id: subjectIds[3] }, { _id: subjectIds[4] }, { _id: subjectIds[5] }]
},
{
    _id: userIds[3],
    username: "User 3",
    email: "User3@gmail.com",
    encryptedPassword: "12345",
    groups: [{ _id: groupIds[1] }, { _id: groupIds[2] }, { _id: groupIds[3] }],
    subjects: [{ _id: subjectIds[1] }, { _id: subjectIds[2] }, { _id: subjectIds[3] }, { _id: subjectIds[4] }, { _id: subjectIds[5] }]
},
{
    _id: userIds[4],
    username: "User 4",
    email: "User4@gmail.com",
    encryptedPassword: "12345",
    groups: [{ _id: groupIds[1] }],
    subjects: [{ _id: subjectIds[1] }, { _id: subjectIds[2] }, { _id: subjectIds[3] }]
},
{
    _id: userIds[5],
    username: "User 5",
    email: "User5@gmail.com",
    encryptedPassword: "12345",
    groups: [{ _id: groupIds[1] }, { _id: groupIds[2] }, { _id: groupIds[3] }],
    subjects: [{ _id: subjectIds[1] }, { _id: subjectIds[2] }, { _id: subjectIds[3] }, { _id: subjectIds[4] }, { _id: subjectIds[5] }]
},
{
    _id: userIds[6],
    username: "User 6",
    email: "User6@gmail.com",
    encryptedPassword: "12345",
    groups: [{ _id: groupIds[2] }],
    subjects: [{ _id: subjectIds[1] }, { _id: subjectIds[2] }, { _id: subjectIds[4] }, { _id: subjectIds[6] }]
}
]

const subjects = [{
    _id: subjectIds[1],
    name: "Subject 1",
    keywords: ["keyword1", "keyword2"],
    cards: [{ _id: cardIds[1][1], front: "Card1F", back: "Card1B" }, 
        { _id: cardIds[1][2], front: "Card2F", back: "Card2B" }, 
        { _id: cardIds[1][3], front: "Card3F", back: "Card3B" }, 
        { _id: cardIds[1][4], front: "Card4F", back: "Card4B" }, 
        { _id: cardIds[1][5], front: "Card5F", back: "Card5B" }]
},

{
    _id: subjectIds[2],
    name: "Subject 2",
    keywords: ["keyword1", "keyword2"],
    cards: [{ _id: cardIds[2][1], front: "Card1F", back: "Card1B" }, 
    { _id: cardIds[2][2], front: "Card2F", back: "Card2B" }, 
    { _id: cardIds[2][3], front: "Card3F", back: "Card3B" }, 
    { _id: cardIds[2][4], front: "Card4F", back: "Card4B" }, 
    { _id: cardIds[2][5], front: "Card5F", back: "Card5B" }]
},
{
    _id: subjectIds[3],
    name: "Subject 3",
    keywords: ["keyword2"],
    cards: [{ _id: cardIds[3][1], front: "Card1F", back: "Card1B" }, 
    { _id: cardIds[3][2], front: "Card2F", back: "Card2B" }, 
    { _id: cardIds[3][3], front: "Card3F", back: "Card3B" }, 
    { _id: cardIds[3][4], front: "Card4F", back: "Card4B" }, 
    { _id: cardIds[3][5], front: "Card5F", back: "Card5B" }]
},
{
    _id: subjectIds[4],
    name: "Subject 4",
    keywords: ["keyword1", "keyword3"],
    cards: [{ _id: cardIds[4][1], front: "Card1F", back: "Card1B" }, 
    { _id: cardIds[4][2], front: "Card2F", back: "Card2B" }, 
    { _id: cardIds[4][3], front: "Card3F", back: "Card3B" }, 
    { _id: cardIds[4][4], front: "Card4F", back: "Card4B" }, 
    { _id: cardIds[4][5], front: "Card5F", back: "Card5B" }]
},

{
    _id: subjectIds[5],
    name: "Subject 5",
    keywords: [],
    cards: [{ _id: cardIds[5][1], front: "Card1F", back: "Card1B" }, 
    { _id: cardIds[5][2], front: "Card2F", back: "Card2B" }, 
    { _id: cardIds[5][3], front: "Card3F", back: "Card3B" }, 
    { _id: cardIds[5][4], front: "Card4F", back: "Card4B" }, 
    { _id: cardIds[5][5], front: "Card5F", back: "Card5B" }]
},

{
    _id: subjectIds[6],
    name: "Subject No Group",
    keywords: ["keyword1"],
    cards: [{ _id: cardIds[6][1], front: "Card1F", back: "Card1B" }, 
        { _id: cardIds[6][2], front: "Card2F", back: "Card2B" }, 
        { _id: cardIds[6][3], front: "Card3F", back: "Card3B" }, 
        { _id: cardIds[6][4], front: "Card4F", back: "Card4B" }, 
        { _id: cardIds[6][5], front: "Card5F", back: "Card5B" }]
},
]

const stats = [
    {
        card: {_id: cardIds[1][1]},
        user: {_id: userIds[1]},
        group: {_id: groupIds[1]}, 
        subject: {_id: subjectIds[1]},
        rating: 0, 
        seen: 0
    },
    {
        card: {_id: cardIds[1][2]},
        user: {_id: userIds[1]},
        group: {_id: groupIds[1]}, 
        subject: {_id: subjectIds[1]},
        rating: 1, 
        seen: 10
    },
    {
        card: {_id: cardIds[1][3]},
        user: {_id: userIds[1]},
        group: {_id: groupIds[1]}, 
        subject: {_id: subjectIds[1]},
        rating: 2, 
        seen: 20
    },
    {
        card: {_id: cardIds[1][4]},
        user: {_id: userIds[1]},
        group: {_id: groupIds[1]}, 
        subject: {_id: subjectIds[1]},
        rating: 3, 
        seen: 30
    }
]

User.create(users, err => {
    if(err) {throw err}
    mongoose.connection.close();
  });

  Subject.create(subjects, err => {
    if(err) {throw err}
    mongoose.connection.close();
  });

  Group.create(groups, err => {
    if(err) {throw err}
    mongoose.connection.close();
  });

  Stat.create(stats, err => {
    if(err) {throw err}
    mongoose.connection.close();
  });