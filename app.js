// # Stride Server
// A simple stride app using actions.

//
// Register Node.js middleware
// -----------------------------------------------------------------------------

const express = require('express'),
  logger = require('morgan'),
  index = require('./routes/index')

var app = express()
app.use(logger('dev'))

//
// Connect to Router
// -----------------------------------------------------------------------------
app.use('/', index)
module.exports = app
