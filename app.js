// # Stride Server
// A simple stride app using actions.

//
// Register Node.js middleware
// -----------------------------------------------------------------------------

const express = require('express'),
  debug = require('debug'),
  index = require('./routes/index')

var app = express()
app.use(debug('dev'))

//
// Connect to Router
// -----------------------------------------------------------------------------
app.use('/', index)
module.exports = app
