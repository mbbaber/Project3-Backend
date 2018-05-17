const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Group = require('../models/Group');
const Stat = require('../models/Stat');
const Subject = require('../models/Subject');
const User = require('../models/User');

const dbName = 'project3';
mongoose.connect(process.env.MONGODB_URI);
// .connect('process.env.MONGODB_URI', {useMongoClient: true}) // MONGODB_URI was taken from heroku

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
    name: "IronHack Team 1",
    admin: { _id: userIds[1] }, // in this case, UserAdmin is a user_id that I assigned
    users: [{ _id: userIds[2] }, { _id: userIds[3] }, { _id: userIds[4] }, { _id: userIds[5] }, { _id: userIds[6] } ],
    subjects: [{ _id: subjectIds[1] }, { _id: subjectIds[2] }, { _id: subjectIds[3] }],
},
{
    _id: groupIds[2],
    name: "IronHack Team 2",
    admin: { _id: userIds[2] }, // in this case, UserAdmin is a user_id that I assigned
    users: [{ _id: userIds[2] }, { _id: userIds[3] }, { _id: userIds[4] }, { _id: userIds[5] }, { _id: userIds[6] } ],
    subjects: [{ _id: subjectIds[1] }, { _id: subjectIds[4] }]
},

{
    _id: groupIds[3],
    name: "Ironhack Team 3",
    admin: { _id: userIds[1] }, // in this case, UserAdmin is a user_id that I assigned
    users: [{ _id: userIds[2] }, { _id: userIds[3] }, { _id: userIds[4] }, { _id: userIds[5] }, { _id: userIds[6] } ],
    subjects: [{ _id: subjectIds[3] }, { _id: subjectIds[5] }]
}
]

const users = [{
    _id: userIds[1],
    username: "Maggie",
    email: "maggie@gmail.com",
    password: "12345",
    groups: [{ _id: groupIds[1] }, { _id: groupIds[2] }, { _id: groupIds[3] }],
    subjects: [{ _id: subjectIds[1] }, { _id: subjectIds[2] }, { _id: subjectIds[3] }, { _id: subjectIds[4] }, { _id: subjectIds[5] }]
},
{
    _id: userIds[2],
    username: "Patrycja",
    email: "patrycja@gmail.com",
    password: "12345",
    groups: [{ _id: groupIds[1] }, { _id: groupIds[2] }, { _id: groupIds[3] }],
    subjects: [{ _id: subjectIds[1] }, { _id: subjectIds[2] }, { _id: subjectIds[3] }, { _id: subjectIds[4] }, { _id: subjectIds[5] }]
},
{
    _id: userIds[3],
    username: "Michael",
    email: "michael@gmail.com",
    password: "12345",
    groups: [{ _id: groupIds[1] }, { _id: groupIds[2] }, { _id: groupIds[3] }],
    subjects: [{ _id: subjectIds[1] }, { _id: subjectIds[2] }, { _id: subjectIds[3] }, { _id: subjectIds[4] }, { _id: subjectIds[5] }]
},
{
    _id: userIds[4],
    username: "Nizar",
    email: "Nizar@gmail.com",
    password: "12345",
    groups: [{ _id: groupIds[1] }, { _id: groupIds[2] }, { _id: groupIds[3] }],
    subjects: [{ _id: subjectIds[1] }, { _id: subjectIds[2] }, { _id: subjectIds[3] }, { _id: subjectIds[4] }, { _id: subjectIds[5] }]
},
{
    _id: userIds[5],
    username: "Arthur",
    email: "arthur5@gmail.com",
    password: "12345",
    groups: [{ _id: groupIds[1] }, { _id: groupIds[2] }, { _id: groupIds[3] }],
    subjects: [{ _id: subjectIds[1] }, { _id: subjectIds[2] }, { _id: subjectIds[3] }, { _id: subjectIds[4] }, { _id: subjectIds[5] }]
},
{
    _id: userIds[6],
    username: "Vivian",
    email: "vivian@gmail.com",
    password: "12345",
    groups: [{ _id: groupIds[1] }, { _id: groupIds[2] }, { _id: groupIds[3] }],
    subjects: [{ _id: subjectIds[1] }, { _id: subjectIds[2] }, { _id: subjectIds[3] }, { _id: subjectIds[4] }, { _id: subjectIds[5] }]
}
]

users.forEach(user => {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
});

const subjects = [{
    _id: subjectIds[1],
    name: "HTML",
    keywords: ["frontend", "programming"],
    cards: [{ _id: cardIds[1][1], front: "What is HTML?", back: "a language for creating web pages and web applications. HTML special instructions are the building blocks of web pages." }, 
        { _id: cardIds[1][2], front: "What is a block-level element?", back: "Block-level elements begin a new line on the webpage and, if no width is set, extends the full width of the available horizontal space of its parent element." }, 
        { _id: cardIds[1][3], front: "What is a <p> element?", back: "This represents paragraphs, blocks of text separated from adjacent blocks by vertical blank space and/or first-line indentation" }, 
        { _id: cardIds[1][4], front: "What is an ordered list?", back: "The HTML <ol> element represents an ordered list of items. Each list item is numbered." }, 
        { _id: cardIds[1][5], front: "What is an unordered list?", back: "The <ul> element represents a list of items. However, the order of items is not relevant." }]
},

{
    _id: subjectIds[2],
    name: "CSS",
    keywords: ["frontend", "programming"],
    cards: [{ _id: cardIds[2][1], front: "What is CSS?", back: "CSS is a style sheet language used to describe the “rules” that will define the look of your webpage" }, 
    { _id: cardIds[2][2], front: "What is a selector?", back: "Selector(s) point to the element(s) to which we will apply the style rule" }, 
    { _id: cardIds[2][3], front: "What is a declaration block?", back: "Contains one or more declarations, specify the element’s properties and the values we want to set. Separated by semi-colons." }, 
    { _id: cardIds[2][4], front: "What is a class selector?", back: "Selectors that match all the elements based on the element’s class attribute value." }, 
    { _id: cardIds[2][5], front: "What is an ID selector?", back: "Selectors that identify a unique, unrepeatable element in the HTML." }]
},
{
    _id: subjectIds[3],
    name: "Javascript",
    keywords: ["programming", "language"],
    cards: [{ _id: cardIds[3][1], front: "What are the rules for naming variables?", back: "Names can contains letters, numbers and the symbols _ and $, but cannot start with a number." }, 
    { _id: cardIds[3][2], front: "What is Javascript?", back: "JavaScript is an Object Oriented, dynamic programming language created in 1995" }, 
    { _id: cardIds[3][3], front: "What is a variable?", back: "Containers that hold information. They label and store data in memory so that we can use them throughout our program."}, 
    { _id: cardIds[3][4], front: "What is an expression?", back: "An expression is a combination of any value (number, string, array, object) and set of operators that result in another value." }, 
    { _id: cardIds[3][5], front: "What is a string?", back: "A string is simply a sequence of characters. A character can be a letter, number, punctuation, or even things such as new lines and tabs." 
}]
},
{
    _id: subjectIds[4],
    name: "Node JS",
    keywords: ["javascript", "programming"],
    cards: [{ _id: cardIds[4][1], front: "What is Node.js?", back: "Node.js (sometimes called just Node for short) is a JavaScript runtime" }, 
    { _id: cardIds[4][2], front: "What is a runtime environment?", back: "an environment which includes all of the tools and features needed to run a specific program, or in the case of Node.js, a programming language." }, 
    { _id: cardIds[4][3], front: "Why use Node.js?", back: "Because Node uses JavaScript’s event driven and asynchronous model, it excels with live updating features." }, 
    { _id: cardIds[4][4], front: "What is NPM?", back: "npm is a package manager for Node. This means that you and other coders can share your JavaScript code easily, using a command line tool." }, 
]
},

{
    _id: subjectIds[5],
    name: "Angular",
    keywords: ["front-end", "MEAN", "typescript"],
    cards: [{ _id: cardIds[5][1], front: "What is SPA?", back: "A SPA (single page application) is a web application where most of a user’s interactions occur on a single page." }, 
    { _id: cardIds[5][2], front: "What is a Framework?", back: "A universal, reusable software environment to facilitate development of software applications, products and solutions." }, 
    { _id: cardIds[5][3], front: "What is Angular?", back: "A complete JavaScript-based open-source front-end web application framework." }, 
    { _id: cardIds[5][4], front: "How do you use interpolation?", back: "Put a class property name enclosed in double curly braces: {{ myProperty }} in the view template." }, 
    { _id: cardIds[5][5], front: "How do you iterate through collections of data?", back: "Use *ngFor" }]
},

{
    _id: subjectIds[6],
    name: "Terminal",
    keywords: ["tools", "programming"],
    cards: [{ _id: cardIds[6][1], front: "What is the terminal?", back: "Terminal provides a command line interface to the operating system. " }, 
        { _id: cardIds[6][2], front: "What is Zsh?", back: "Zsh is an interactive login shell that enables communication between the user and the computer" }, 
        { _id: cardIds[6][3], front: "What is the Command Line?", back: "Also known as CLI, it is a tool in which you can type text commands to perform specific tasks." }, 
        { _id: cardIds[6][4], front: "What command will return your login name?", back: "whoami" }, 
        { _id: cardIds[6][5], front: "What command will return the current directory you're working on?", back: "pwd" }]
},
]
//Need to create a lot of stats
const stats = [
    // Group 1
    {
        card: {_id: cardIds[1][1]},
        user: {_id: userIds[1]},
        group: {_id: groupIds[1]}, 
        subject: {_id: subjectIds[1]},
        rating: 1, 
        seen: 1
    },
    {
        card: {_id: cardIds[1][2]},
        user: {_id: userIds[1]},
        group: {_id: groupIds[1]}, 
        subject: {_id: subjectIds[1]},
        rating: 2, 
        seen: 2
    },
    {
        card: {_id: cardIds[1][3]},
        user: {_id: userIds[1]},
        group: {_id: groupIds[1]}, 
        subject: {_id: subjectIds[1]},
        rating: 3, 
        seen: 3
    },
    {
        card: {_id: cardIds[2][1]},
        user: {_id: userIds[1]},
        group: {_id: groupIds[1]}, 
        subject: {_id: subjectIds[2]},
        rating: 5, 
        seen: 1
    },
    {
        card: {_id: cardIds[2][2]},
        user: {_id: userIds[1]},
        group: {_id: groupIds[1]}, 
        subject: {_id: subjectIds[2]},
        rating: 4, 
        seen: 2
    },
    {
        card: {_id: cardIds[2][3]},
        user: {_id: userIds[1]},
        group: {_id: groupIds[1]}, 
        subject: {_id: subjectIds[2]},
        rating: 3, 
        seen: 3
    },
    {
        card: {_id: cardIds[3][1]},
        user: {_id: userIds[1]},
        group: {_id: groupIds[1]}, 
        subject: {_id: subjectIds[3]},
        rating: 5, 
        seen: 1
    },
    {
        card: {_id: cardIds[3][2]},
        user: {_id: userIds[1]},
        group: {_id: groupIds[1]}, 
        subject: {_id: subjectIds[3]},
        rating: 2, 
        seen: 2
    },
    {
        card: {_id: cardIds[3][3]},
        user: {_id: userIds[1]},
        group: {_id: groupIds[1]}, 
        subject: {_id: subjectIds[3]},
        rating: 3, 
        seen: 3
    },
    {
        card: {_id: cardIds[3][4]},
        user: {_id: userIds[1]},
        group: {_id: groupIds[1]}, 
        subject: {_id: subjectIds[3]},
        rating: 4, 
        seen: 2
    },
    {
        card: {_id: cardIds[3][5]},
        user: {_id: userIds[1]},
        group: {_id: groupIds[1]}, 
        subject: {_id: subjectIds[3]},
        rating: 5, 
        seen: 3
    },
    // Group 2
    {
        card: {_id: cardIds[1][1]},
        user: {_id: userIds[1]},
        group: {_id: groupIds[2]}, 
        subject: {_id: subjectIds[1]},
        rating: 2, 
        seen: 1
    },
    {
        card: {_id: cardIds[1][2]},
        user: {_id: userIds[1]},
        group: {_id: groupIds[2]}, 
        subject: {_id: subjectIds[1]},
        rating: 2, 
        seen: 2
    },
    {
        card: {_id: cardIds[1][3]},
        user: {_id: userIds[1]},
        group: {_id: groupIds[2]}, 
        subject: {_id: subjectIds[1]},
        rating: 3, 
        seen: 3
    },
    {
        card: {_id: cardIds[4][1]},
        user: {_id: userIds[1]},
        group: {_id: groupIds[2]}, 
        subject: {_id: subjectIds[4]},
        rating: 2, 
        seen: 1
    },
    {
        card: {_id: cardIds[4][2]},
        user: {_id: userIds[1]},
        group: {_id: groupIds[2]}, 
        subject: {_id: subjectIds[4]},
        rating: 2, 
        seen: 2
    },
    {
        card: {_id: cardIds[4][3]},
        user: {_id: userIds[1]},
        group: {_id: groupIds[2]}, 
        subject: {_id: subjectIds[4]},
        rating: 3, 
        seen: 3
    },
    // Group 3
    {
        card: {_id: cardIds[3][1]},
        user: {_id: userIds[1]},
        group: {_id: groupIds[3]}, 
        subject: {_id: subjectIds[3]},
        rating: 2, 
        seen: 1
    },
    {
        card: {_id: cardIds[3][2]},
        user: {_id: userIds[1]},
        group: {_id: groupIds[3]}, 
        subject: {_id: subjectIds[3]},
        rating: 2, 
        seen: 2
    },
    {
        card: {_id: cardIds[5][3]},
        user: {_id: userIds[1]},
        group: {_id: groupIds[3]}, 
        subject: {_id: subjectIds[5]},
        rating: 3, 
        seen: 3
    },
    {
        card: {_id: cardIds[5][1]},
        user: {_id: userIds[1]},
        group: {_id: groupIds[3]}, 
        subject: {_id: subjectIds[5]},
        rating: 2, 
        seen: 1
    },
    {
        card: {_id: cardIds[5][2]},
        user: {_id: userIds[1]},
        group: {_id: groupIds[3]}, 
        subject: {_id: subjectIds[5]},
        rating: 2, 
        seen: 2
    },
    {
        card: {_id: cardIds[5][3]},
        user: {_id: userIds[1]},
        group: {_id: groupIds[3]}, 
        subject: {_id: subjectIds[5]},
        rating: 3, 
        seen: 3
    },
   //USER 2!!!!
   {
    card: {_id: cardIds[1][1]},
    user: {_id: userIds[2]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[1]},
    rating: 1, 
    seen: 1
},
{
    card: {_id: cardIds[1][2]},
    user: {_id: userIds[2]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[1]},
    rating: 2, 
    seen: 2
},
{
    card: {_id: cardIds[1][3]},
    user: {_id: userIds[2]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[1]},
    rating: 5, 
    seen: 3
},
{
    card: {_id: cardIds[2][1]},
    user: {_id: userIds[2]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[2]},
    rating: 5, 
    seen: 1
},
{
    card: {_id: cardIds[2][2]},
    user: {_id: userIds[2]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[2]},
    rating: 4, 
    seen: 2
},
{
    card: {_id: cardIds[2][3]},
    user: {_id: userIds[2]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[2]},
    rating: 4, 
    seen: 3
},
{
    card: {_id: cardIds[3][1]},
    user: {_id: userIds[2]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[3]},
    rating: 5, 
    seen: 1
},
{
    card: {_id: cardIds[3][2]},
    user: {_id: userIds[2]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[3]},
    rating: 4, 
    seen: 2
},
{
    card: {_id: cardIds[3][3]},
    user: {_id: userIds[2]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[3]},
    rating: 5, 
    seen: 3
},
{
    card: {_id: cardIds[3][4]},
    user: {_id: userIds[2]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[3]},
    rating: 4, 
    seen: 2
},
{
    card: {_id: cardIds[3][5]},
    user: {_id: userIds[2]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[3]},
    rating: 5, 
    seen: 3
},
// Group 2
{
    card: {_id: cardIds[1][1]},
    user: {_id: userIds[2]},
    group: {_id: groupIds[2]}, 
    subject: {_id: subjectIds[1]},
    rating: 1, 
    seen: 1
},
{
    card: {_id: cardIds[1][2]},
    user: {_id: userIds[2]},
    group: {_id: groupIds[2]}, 
    subject: {_id: subjectIds[1]},
    rating: 2, 
    seen: 2
},
{
    card: {_id: cardIds[1][3]},
    user: {_id: userIds[2]},
    group: {_id: groupIds[2]}, 
    subject: {_id: subjectIds[1]},
    rating: 3, 
    seen: 3
},
{
    card: {_id: cardIds[4][1]},
    user: {_id: userIds[2]},
    group: {_id: groupIds[2]}, 
    subject: {_id: subjectIds[4]},
    rating: 1, 
    seen: 1
},
{
    card: {_id: cardIds[4][2]},
    user: {_id: userIds[2]},
    group: {_id: groupIds[2]}, 
    subject: {_id: subjectIds[4]},
    rating: 2, 
    seen: 2
},
{
    card: {_id: cardIds[4][3]},
    user: {_id: userIds[2]},
    group: {_id: groupIds[2]}, 
    subject: {_id: subjectIds[4]},
    rating: 3, 
    seen: 3
},
// Group 3
{
    card: {_id: cardIds[3][1]},
    user: {_id: userIds[2]},
    group: {_id: groupIds[3]}, 
    subject: {_id: subjectIds[3]},
    rating: 1, 
    seen: 1
},
{
    card: {_id: cardIds[3][2]},
    user: {_id: userIds[2]},
    group: {_id: groupIds[3]}, 
    subject: {_id: subjectIds[3]},
    rating: 2, 
    seen: 2
},
{
    card: {_id: cardIds[5][3]},
    user: {_id: userIds[2]},
    group: {_id: groupIds[3]}, 
    subject: {_id: subjectIds[5]},
    rating: 4, 
    seen: 3
},
{
    card: {_id: cardIds[5][1]},
    user: {_id: userIds[2]},
    group: {_id: groupIds[3]}, 
    subject: {_id: subjectIds[5]},
    rating: 2, 
    seen: 1
},
{
    card: {_id: cardIds[5][2]},
    user: {_id: userIds[2]},
    group: {_id: groupIds[3]}, 
    subject: {_id: subjectIds[5]},
    rating: 4, 
    seen: 2
},
{
    card: {_id: cardIds[5][3]},
    user: {_id: userIds[2]},
    group: {_id: groupIds[3]}, 
    subject: {_id: subjectIds[5]},
    rating: 3, 
    seen: 3
},
//USER 3
{
    card: {_id: cardIds[1][1]},
    user: {_id: userIds[3]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[1]},
    rating: 1, 
    seen: 1
},
{
    card: {_id: cardIds[1][2]},
    user: {_id: userIds[3]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[1]},
    rating: 2, 
    seen: 2
},
{
    card: {_id: cardIds[1][3]},
    user: {_id: userIds[3]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[1]},
    rating: 4, 
    seen: 3
},
{
    card: {_id: cardIds[2][1]},
    user: {_id: userIds[3]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[2]},
    rating: 5, 
    seen: 1
},
{
    card: {_id: cardIds[2][2]},
    user: {_id: userIds[3]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[2]},
    rating: 4, 
    seen: 2
},
{
    card: {_id: cardIds[2][3]},
    user: {_id: userIds[3]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[2]},
    rating: 3, 
    seen: 3
},
{
    card: {_id: cardIds[3][1]},
    user: {_id: userIds[3]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[3]},
    rating: 1, 
    seen: 1
},
{
    card: {_id: cardIds[3][2]},
    user: {_id: userIds[3]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[3]},
    rating: 2, 
    seen: 2
},
{
    card: {_id: cardIds[3][3]},
    user: {_id: userIds[3]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[3]},
    rating: 3, 
    seen: 3
},
{
    card: {_id: cardIds[3][4]},
    user: {_id: userIds[3]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[3]},
    rating: 4, 
    seen: 2
},
{
    card: {_id: cardIds[3][5]},
    user: {_id: userIds[3]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[3]},
    rating: 2, 
    seen: 3
},
// Group 2
{
    card: {_id: cardIds[1][1]},
    user: {_id: userIds[3]},
    group: {_id: groupIds[2]}, 
    subject: {_id: subjectIds[1]},
    rating: 2, 
    seen: 1
},
{
    card: {_id: cardIds[1][2]},
    user: {_id: userIds[3]},
    group: {_id: groupIds[2]}, 
    subject: {_id: subjectIds[1]},
    rating: 1, 
    seen: 2
},
{
    card: {_id: cardIds[1][3]},
    user: {_id: userIds[3]},
    group: {_id: groupIds[2]}, 
    subject: {_id: subjectIds[1]},
    rating: 1, 
    seen: 3
},
{
    card: {_id: cardIds[4][1]},
    user: {_id: userIds[3]},
    group: {_id: groupIds[2]}, 
    subject: {_id: subjectIds[4]},
    rating: 2, 
    seen: 1
},
{
    card: {_id: cardIds[4][2]},
    user: {_id: userIds[3]},
    group: {_id: groupIds[2]}, 
    subject: {_id: subjectIds[4]},
    rating: 5, 
    seen: 2
},
{
    card: {_id: cardIds[4][3]},
    user: {_id: userIds[3]},
    group: {_id: groupIds[2]}, 
    subject: {_id: subjectIds[4]},
    rating: 3, 
    seen: 3
},
// Group 3
{
    card: {_id: cardIds[3][1]},
    user: {_id: userIds[3]},
    group: {_id: groupIds[3]}, 
    subject: {_id: subjectIds[3]},
    rating: 5, 
    seen: 1
},
{
    card: {_id: cardIds[3][2]},
    user: {_id: userIds[3]},
    group: {_id: groupIds[3]}, 
    subject: {_id: subjectIds[3]},
    rating: 2, 
    seen: 2
},
{
    card: {_id: cardIds[5][3]},
    user: {_id: userIds[3]},
    group: {_id: groupIds[3]}, 
    subject: {_id: subjectIds[5]},
    rating: 3, 
    seen: 3
},
{
    card: {_id: cardIds[5][1]},
    user: {_id: userIds[3]},
    group: {_id: groupIds[3]}, 
    subject: {_id: subjectIds[5]},
    rating: 2, 
    seen: 1
},
{
    card: {_id: cardIds[5][2]},
    user: {_id: userIds[3]},
    group: {_id: groupIds[3]}, 
    subject: {_id: subjectIds[5]},
    rating: 5, 
    seen: 2
},
{
    card: {_id: cardIds[5][3]},
    user: {_id: userIds[3]},
    group: {_id: groupIds[3]}, 
    subject: {_id: subjectIds[5]},
    rating: 3, 
    seen: 3
},
// USER 4
{
    card: {_id: cardIds[1][1]},
    user: {_id: userIds[4]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[1]},
    rating: 1, 
    seen: 1
},
{
    card: {_id: cardIds[1][2]},
    user: {_id: userIds[4]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[1]},
    rating: 2, 
    seen: 2
},
{
    card: {_id: cardIds[1][3]},
    user: {_id: userIds[4]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[1]},
    rating: 3, 
    seen: 3
},
{
    card: {_id: cardIds[2][1]},
    user: {_id: userIds[4]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[2]},
    rating: 3, 
    seen: 1
},
{
    card: {_id: cardIds[2][2]},
    user: {_id: userIds[4]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[2]},
    rating: 4, 
    seen: 2
},
{
    card: {_id: cardIds[2][3]},
    user: {_id: userIds[4]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[2]},
    rating: 3, 
    seen: 3
},
{
    card: {_id: cardIds[3][1]},
    user: {_id: userIds[4]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[3]},
    rating: 5, 
    seen: 1
},
{
    card: {_id: cardIds[3][2]},
    user: {_id: userIds[4]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[3]},
    rating: 2, 
    seen: 2
},
{
    card: {_id: cardIds[3][3]},
    user: {_id: userIds[4]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[3]},
    rating: 5, 
    seen: 3
},
{
    card: {_id: cardIds[3][4]},
    user: {_id: userIds[4]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[3]},
    rating: 4, 
    seen: 2
},
{
    card: {_id: cardIds[3][5]},
    user: {_id: userIds[4]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[3]},
    rating: 5, 
    seen: 3
},
// Group 2
{
    card: {_id: cardIds[1][1]},
    user: {_id: userIds[1]},
    group: {_id: groupIds[4]}, 
    subject: {_id: subjectIds[1]},
    rating: 5, 
    seen: 1
},
{
    card: {_id: cardIds[1][2]},
    user: {_id: userIds[4]},
    group: {_id: groupIds[2]}, 
    subject: {_id: subjectIds[1]},
    rating: 2, 
    seen: 2
},
{
    card: {_id: cardIds[1][3]},
    user: {_id: userIds[4]},
    group: {_id: groupIds[2]}, 
    subject: {_id: subjectIds[1]},
    rating: 3, 
    seen: 3
},
{
    card: {_id: cardIds[4][1]},
    user: {_id: userIds[4]},
    group: {_id: groupIds[2]}, 
    subject: {_id: subjectIds[4]},
    rating: 2, 
    seen: 1
},
{
    card: {_id: cardIds[4][2]},
    user: {_id: userIds[4]},
    group: {_id: groupIds[2]}, 
    subject: {_id: subjectIds[4]},
    rating: 1, 
    seen: 2
},
{
    card: {_id: cardIds[4][3]},
    user: {_id: userIds[4]},
    group: {_id: groupIds[2]}, 
    subject: {_id: subjectIds[4]},
    rating: 3, 
    seen: 3
},
// Group 3
{
    card: {_id: cardIds[3][1]},
    user: {_id: userIds[4]},
    group: {_id: groupIds[3]}, 
    subject: {_id: subjectIds[3]},
    rating: 1, 
    seen: 1
},
{
    card: {_id: cardIds[3][2]},
    user: {_id: userIds[4]},
    group: {_id: groupIds[3]}, 
    subject: {_id: subjectIds[3]},
    rating: 2, 
    seen: 2
},
{
    card: {_id: cardIds[5][3]},
    user: {_id: userIds[4]},
    group: {_id: groupIds[3]}, 
    subject: {_id: subjectIds[5]},
    rating: 3, 
    seen: 3
},
{
    card: {_id: cardIds[5][1]},
    user: {_id: userIds[4]},
    group: {_id: groupIds[3]}, 
    subject: {_id: subjectIds[5]},
    rating: 4, 
    seen: 1
},
{
    card: {_id: cardIds[5][2]},
    user: {_id: userIds[4]},
    group: {_id: groupIds[3]}, 
    subject: {_id: subjectIds[5]},
    rating: 2, 
    seen: 2
},
{
    card: {_id: cardIds[5][3]},
    user: {_id: userIds[4]},
    group: {_id: groupIds[3]}, 
    subject: {_id: subjectIds[5]},
    rating: 5, 
    seen: 3
},
//USER 5
{
    card: {_id: cardIds[1][1]},
    user: {_id: userIds[5]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[1]},
    rating: 1, 
    seen: 1
},
{
    card: {_id: cardIds[1][2]},
    user: {_id: userIds[5]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[1]},
    rating: 2, 
    seen: 2
},
{
    card: {_id: cardIds[1][3]},
    user: {_id: userIds[5]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[1]},
    rating: 4, 
    seen: 3
},
{
    card: {_id: cardIds[2][1]},
    user: {_id: userIds[5]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[2]},
    rating: 5, 
    seen: 1
},
{
    card: {_id: cardIds[2][2]},
    user: {_id: userIds[5]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[2]},
    rating: 4, 
    seen: 2
},
{
    card: {_id: cardIds[2][3]},
    user: {_id: userIds[5]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[2]},
    rating: 1, 
    seen: 3
},
{
    card: {_id: cardIds[3][1]},
    user: {_id: userIds[5]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[3]},
    rating: 5, 
    seen: 1
},
{
    card: {_id: cardIds[3][2]},
    user: {_id: userIds[5]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[3]},
    rating: 2, 
    seen: 2
},
{
    card: {_id: cardIds[3][3]},
    user: {_id: userIds[5]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[3]},
    rating: 4, 
    seen: 3
},
{
    card: {_id: cardIds[3][4]},
    user: {_id: userIds[5]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[3]},
    rating: 4, 
    seen: 2
},
{
    card: {_id: cardIds[3][5]},
    user: {_id: userIds[5]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[3]},
    rating: 5, 
    seen: 3
},
// Group 2
{
    card: {_id: cardIds[1][1]},
    user: {_id: userIds[5]},
    group: {_id: groupIds[2]}, 
    subject: {_id: subjectIds[1]},
    rating: 2, 
    seen: 1
},
{
    card: {_id: cardIds[1][2]},
    user: {_id: userIds[5]},
    group: {_id: groupIds[2]}, 
    subject: {_id: subjectIds[1]},
    rating: 4, 
    seen: 2
},
{
    card: {_id: cardIds[1][3]},
    user: {_id: userIds[5]},
    group: {_id: groupIds[2]}, 
    subject: {_id: subjectIds[1]},
    rating: 3, 
    seen: 3
},
{
    card: {_id: cardIds[4][1]},
    user: {_id: userIds[5]},
    group: {_id: groupIds[2]}, 
    subject: {_id: subjectIds[4]},
    rating: 2, 
    seen: 1
},
{
    card: {_id: cardIds[4][2]},
    user: {_id: userIds[5]},
    group: {_id: groupIds[2]}, 
    subject: {_id: subjectIds[4]},
    rating: 4, 
    seen: 2
},
{
    card: {_id: cardIds[4][3]},
    user: {_id: userIds[5]},
    group: {_id: groupIds[2]}, 
    subject: {_id: subjectIds[4]},
    rating: 3, 
    seen: 3
},
// Group 3
{
    card: {_id: cardIds[3][1]},
    user: {_id: userIds[5]},
    group: {_id: groupIds[3]}, 
    subject: {_id: subjectIds[3]},
    rating: 2, 
    seen: 1
},
{
    card: {_id: cardIds[3][2]},
    user: {_id: userIds[5]},
    group: {_id: groupIds[3]}, 
    subject: {_id: subjectIds[3]},
    rating: 1, 
    seen: 2
},
{
    card: {_id: cardIds[5][3]},
    user: {_id: userIds[5]},
    group: {_id: groupIds[3]}, 
    subject: {_id: subjectIds[5]},
    rating: 3, 
    seen: 3
},
{
    card: {_id: cardIds[5][1]},
    user: {_id: userIds[5]},
    group: {_id: groupIds[3]}, 
    subject: {_id: subjectIds[5]},
    rating: 2, 
    seen: 1
},
{
    card: {_id: cardIds[5][2]},
    user: {_id: userIds[5]},
    group: {_id: groupIds[3]}, 
    subject: {_id: subjectIds[5]},
    rating: 2, 
    seen: 2
},
{
    card: {_id: cardIds[5][3]},
    user: {_id: userIds[5]},
    group: {_id: groupIds[3]}, 
    subject: {_id: subjectIds[5]},
    rating: 3, 
    seen: 3
},
// USER 6
{
    card: {_id: cardIds[1][1]},
    user: {_id: userIds[6]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[1]},
    rating: 1, 
    seen: 1
},
{
    card: {_id: cardIds[1][2]},
    user: {_id: userIds[6]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[1]},
    rating: 2, 
    seen: 2
},
{
    card: {_id: cardIds[1][3]},
    user: {_id: userIds[6]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[1]},
    rating: 1, 
    seen: 3
},
{
    card: {_id: cardIds[2][1]},
    user: {_id: userIds[6]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[2]},
    rating: 5, 
    seen: 1
},
{
    card: {_id: cardIds[2][2]},
    user: {_id: userIds[6]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[2]},
    rating: 4, 
    seen: 2
},
{
    card: {_id: cardIds[2][3]},
    user: {_id: userIds[6]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[2]},
    rating: 3, 
    seen: 3
},
{
    card: {_id: cardIds[3][1]},
    user: {_id: userIds[6]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[3]},
    rating: 5, 
    seen: 1
},
{
    card: {_id: cardIds[3][2]},
    user: {_id: userIds[6]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[3]},
    rating: 5, 
    seen: 2
},
{
    card: {_id: cardIds[3][3]},
    user: {_id: userIds[6]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[3]},
    rating: 5, 
    seen: 3
},
{
    card: {_id: cardIds[3][4]},
    user: {_id: userIds[6]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[3]},
    rating: 5, 
    seen: 2
},
{
    card: {_id: cardIds[3][5]},
    user: {_id: userIds[6]},
    group: {_id: groupIds[1]}, 
    subject: {_id: subjectIds[3]},
    rating: 5, 
    seen: 3
},
// Group 2
{
    card: {_id: cardIds[1][1]},
    user: {_id: userIds[6]},
    group: {_id: groupIds[2]}, 
    subject: {_id: subjectIds[1]},
    rating: 2, 
    seen: 1
},
{
    card: {_id: cardIds[1][2]},
    user: {_id: userIds[6]},
    group: {_id: groupIds[2]}, 
    subject: {_id: subjectIds[1]},
    rating: 5, 
    seen: 2
},
{
    card: {_id: cardIds[1][3]},
    user: {_id: userIds[6]},
    group: {_id: groupIds[2]}, 
    subject: {_id: subjectIds[1]},
    rating: 3, 
    seen: 3
},
{
    card: {_id: cardIds[4][1]},
    user: {_id: userIds[6]},
    group: {_id: groupIds[2]}, 
    subject: {_id: subjectIds[4]},
    rating: 3, 
    seen: 1
},
{
    card: {_id: cardIds[4][2]},
    user: {_id: userIds[6]},
    group: {_id: groupIds[2]}, 
    subject: {_id: subjectIds[4]},
    rating: 2, 
    seen: 2
},
{
    card: {_id: cardIds[4][3]},
    user: {_id: userIds[6]},
    group: {_id: groupIds[2]}, 
    subject: {_id: subjectIds[4]},
    rating: 1, 
    seen: 3
},
// Group 3
{
    card: {_id: cardIds[3][1]},
    user: {_id: userIds[6]},
    group: {_id: groupIds[3]}, 
    subject: {_id: subjectIds[3]},
    rating: 1, 
    seen: 1
},
{
    card: {_id: cardIds[3][2]},
    user: {_id: userIds[6]},
    group: {_id: groupIds[3]}, 
    subject: {_id: subjectIds[3]},
    rating: 2, 
    seen: 2
},
{
    card: {_id: cardIds[5][3]},
    user: {_id: userIds[6]},
    group: {_id: groupIds[3]}, 
    subject: {_id: subjectIds[5]},
    rating: 3, 
    seen: 3
},
{
    card: {_id: cardIds[5][1]},
    user: {_id: userIds[6]},
    group: {_id: groupIds[3]}, 
    subject: {_id: subjectIds[5]},
    rating: 2, 
    seen: 1
},
{
    card: {_id: cardIds[5][2]},
    user: {_id: userIds[6]},
    group: {_id: groupIds[3]}, 
    subject: {_id: subjectIds[5]},
    rating: 5, 
    seen: 2
},
{
    card: {_id: cardIds[5][3]},
    user: {_id: userIds[6]},
    group: {_id: groupIds[3]}, 
    subject: {_id: subjectIds[5]},
    rating: 4, 
    seen: 3
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