// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Require path
const path = require('path');

// Initialize the main project folder
// Note to self: below path is super important (for things to work), i.e. point to client directory!
// app.use(express.static('src/client'));

app.use(express.static('dist'));

// Define get route for index.html
// app.get('/', function (req, res) {
//   res.sendFile(path.resolve('src/client/views/index.html'))
// });

app.get('/', function (req, res) {
  res.sendFile(path.resolve('dist/index.html'))
})

// Setup Server
const port = 8000;
const listening = () => {console.log(`running on localhost: ${port}`)};
const server = app.listen(port, listening);

module.exports = app;