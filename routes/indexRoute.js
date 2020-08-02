const express = require('express')
const router = express.Router()


// @desc   Index
// @route  GET /
router.get('/', (req, res) => {
    res.send('لا اله الا الله')
  })

module.exports = router
