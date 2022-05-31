const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/mongdb');
const dotenv = require('dotenv');
const API = require('./api/api')


const app = express();
const port = process.env.PORT || 3000;
dotenv.config();
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use('/api/user', API.userRouter);
app.use('/notes/upload', API.notesRouter);
app.use('/api/projects', API.projectsRouter)
app.use('/api/programs', API.programsRouter)
app.use('/api/user-programs', API.userProgramsRouter)



app.listen(port, function () {
  console.log('Server is running on PORT', port);
});
