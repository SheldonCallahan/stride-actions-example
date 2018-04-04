// # Stride Server
// A simple stride app using actions.

//
// Setup Environment Variables
// -----------------------------------------------------------------------------
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const API_BASE_URL = 'https://api.atlassian.com'

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
const http = require('http'),
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  index = require('./routes/index')

app.use(logger('dev'))
const server = http.createServer(app)

//
// Connect to Router
// -----------------------------------------------------------------------------
app.use('/', index)

module.exports = app
