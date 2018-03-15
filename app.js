// # Stride Server
// A simple stride app using actions.

//
// Setup Environment Variables
// -----------------------------------------------------------------------------
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const API_BASE_URL = "https://api.atlassian.com";

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
const http = require("http"),
  express = require("express"),
  app = express(),
  logger = require("morgan"),
  jwt = require("./jwt.js").factory({
    clientSecret: CLIENT_SECRET
  }),
   index = require("./routes/index");

app.use(logger("dev"));
const server = http.createServer(app);


//
// Connect to Router
// -----------------------------------------------------------------------------
app.use("/", index);

//
// Start Node.js Server
// -----------------------------------------------------------------------------
server.listen(
  process.env.PORT || 3000,
  process.env.IP || "0.0.0.0",
  function() {
    var addr = server.address();
    logger(
      "Stride Actions Server listening at",
      addr.address + ":" + addr.port
    );
  }
);
