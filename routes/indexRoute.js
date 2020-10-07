const express = require('express')
const router = express.Router()
const connectDB = require('../db')
connectDB()
const IssueML = require('../models/IssueML')


// @desc   Index
// @route  GET /
router.get('/', (req, res) => {
    res.render('home')
  })


router.get('/:subject', async (req, res) => {
  console.log(req.params.subject);
    try {
      req.query.issue_subject = req.params.subject
      let rawResponse = await IssueML.find(req.query)
      let sortedResponse = []
      
      rawResponse.map((e) => {
        sortedResponse.push({
          _id: e._id,
          issue_title: e.issue_title,
          issue_text: e.issue_text,
          created_on: e.created_on,
          updated_on: e.updated_on,
          created_by: e.created_by,
          assigned_to: e.assigned_to,
          open: e.open,
          status_text: e.status_text,
        })
      })
      res.render('issues', {sortedResponse})
    } catch (error) {
      console.error(error)
      res.status(500).json({ err: 'unable to get from database' })
    }
    
})

module.exports = router