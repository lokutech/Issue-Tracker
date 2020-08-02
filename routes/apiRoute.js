const express = require('express')
const router = express.Router()

const connectDB = require('../db')
connectDB()
const IssueML = require('../models/IssueML')

// @desc   api/issues/subject
// @route  POST /
router.post('/:subject', async (req, res) => {
  try {
    req.body.issue_subject = req.params.subject

    Issued = await IssueML.create(req.body)
  } catch (error) {
    console.error(error)
    res.status(500).json({ err: 'unable to post to database' })
  }
  res.send(Issued)
  console.log(Issued)
})

// @desc   api/issues/subject
// @route  GET /
router.get('/:subject', async (req, res) => {
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
    res.send(sortedResponse)
  } catch (error) {
    console.error(error)
    res.status(500).json({ err: 'unable to get from database' })
  }
})

// @desc   api/issues/subject
// @route  PUT /
router.put('/:subject', async (req, res) => {
  try {
    // Check for no fields sent
    if (Object.keys(req.body).length === 0){
      res.send('no updated field sent.')
    } else  {
      req.body.issue_subject = req.params.subject
      req.body.updated_on = new Date()
      let updated = await IssueML.findOneAndUpdate({_id:req.body._id}, req.body, {new: true} )
      console.log(updated);
      if (updated !== null) {
        res.send('Successfully updated')
      } else {
        res.status(500).send('could not update ' + req.body._id)

      }
    }

  } catch (error) {
    console.error(error)
    res.status(500).send('could not update ' + req.body._id)
  }
  // res.send(updated)
  // console.log(updated)
})


module.exports = router
