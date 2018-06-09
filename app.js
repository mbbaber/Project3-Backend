require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors         = require('cors');

const session    = require("express-session");
const MongoStore = require('connect-mongo')(session);
    
require('./config/database');

mongoose.Promise = Promise;
mongoose
  .connect(process.env.MONGODB_URI, {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// AUTH change cors settings for cookies
app.use(cors({
  credentials:true, 
  origin: ['http://localhost:4200']
}));


app.use(session({
  secret: 'irongenerator',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}))
require('./passport')(app);


const authRoutes = require('./routes/auth');
app.use('/a/auth', authRoutes);

const indexRoutes = require('./routes/index');
app.use('/a', indexRoutes);

const groupRoutes = require('./routes/group');
app.use('/a/api', groupRoutes);

const subRoutes = require('./routes/subjects');
app.use('/a/subject', subRoutes);
      
module.exports = app;

 app.use((req, res, next) => {
   res.sendFile(__dirname + '/public/index.html');
 });
