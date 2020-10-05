const path = require('path')
const express = require('express')
const app = express()
require('dotenv').config()
const helmet = require('helmet')
const exphbs = require('express-handlebars') 
const methodOverride = require('method-override') 
const moment = require('moment') 


//~~ MIDDLEWARES ~~ //
// Body Parser
app.use(express.json({ extended: false })) 
app.use(express.urlencoded({ extended: false })) 
// Method Override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  }),
)
// Security
app.use(helmet())
// Handlebars
app.engine('.hbs', exphbs({ extname: '.hbs' , helpers: {
   formatDate: (date, format) => moment(date).format(format)
}}))
app.set('view engine', '.hbs')
// ~~~~~~~~~~~~~~~~ //

// Static Routes
app.use(express.static('public'))
// app.use(express.static(path.join(__dirname + '/public')))

// Routes
app.use('/api/issues', require('./routes/apiRoute'))
app.use('/', require('./routes/indexRoute'))

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Listening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`,
  )
})


