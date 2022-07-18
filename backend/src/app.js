const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');

//Import all the routers. (only memes so far)
const memeRouter = require('./routers/meme');

//Create a new express app
const app = express();
const env = process.env.NODE_ENV; //Set env as the NODE_ENV

//Function to forward http requests to https
var forceSsl = function (req, res, next) {

  //App deployed on heroku.
  //Status protocol for request in heroku deployment can be accessed via x-forwarded-proto
  if (req.headers['x-forwarded-proto'] !== 'https') {

    //For GET request. Redirect status code is 302
    let status = 302;
    //For PUT, PATCH, POST and DELETE. Its 307
    if (req.method !== 'GET') status = 307;

    //redirect http requests to https.
    return res.redirect(status, ['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};

if (env === 'production') app.use(forceSsl); //Enforce https redirect only for production environment
app.use(express.json()); //Parse all the json body coming with request
app.use(mongoSanitize()); //Sanitize the incoming data
app.use(cors()); //Enable CORS

//Use all the routers
app.use(memeRouter);

module.exports = app;