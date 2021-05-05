const express = require('express')
const bodyParser = require('body-parser');
const session = require('express-session')

// Create express instance
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
// Require API routes
const users = require('./routes/users')

// Import API Routes
app.use('/users', users)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
