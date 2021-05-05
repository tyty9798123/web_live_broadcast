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
const index = require('./routes/index')
const stream = require('./routes/stream')

// Import API Routes
app.use('/', index)
app.use('/users', users)
app.use('/stream', stream)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
