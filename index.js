const express = require('express')
const app = express() //* Instantiates an Express application
require('dotenv').config() //* To access process.env. | ex. PORT
const helmet = require('helmet') //* Security
// const mongoose = require('mongoose') //* For connecting to Mongodb database
// const connectmongo = require('connect-mongo') //* Allows storing sessions to the database so if the server is reset user doesn't get logged out.
// const expresssession = require('express-session') //* For sessions and cookies
// const handlebars = require('express-handlebars') //* Templating engine
// const methodoverride = require('method-override') //* Allows you to make put and delete requests
// const moment = require('moment') //* Used to format dates
// const morgan = require('morgan') //* For login
// const passport = require('passport') //* For Authentication
// const connectDB = require('./db')

// Connects to database
// connectDB()

//~~ MIDDLEWARES ~~ //
// Body Parser
app.use(express.json({ extended: false })) //* It parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: false })) //* Body parser makes req.body. available
// Security
app.use(helmet())
// ~~~~~~~~~~~~~~~~ //

// Static Routes
app.use(express.static('public'))

// Route
app.get('/', (req, res) => {
  res.send('لا اله الا الله')
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT} in ${process.env.mode} mode`)
})

//* to remove side comments with regex \/\/\*.*
