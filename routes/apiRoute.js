const express = require('express')
const router = express.Router()

const connectDB = require('../db')
connectDB()
const IssueML = require('../models/IssueML')

// @desc   api/issues/subject
// @route  POST /
router.post('/:subject', async (req, res) => {
  console.log(req.body)
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
    // console.log(req.body,'body')
    // console.log(req.params,'params');
    // console.log(req.query,'query');
    let obj = {...req.params, ...req.body, ...req.query}

    console.log(obj)
    if (obj._id === '') {
      res.send('no updated field sent.')
    } else {
      req.body.issue_subject = req.params.subject
      req.body.updated_on = new Date()

      let updated = await IssueML.findOneAndUpdate(
        { _id: obj._id },
        removeEmptyFields(obj),
        { new: true },
      )
      console.log(updated, 'updated')
      if (updated !== null) {
        res.redirect('/home')
      } else {
        res.status(500).send('could not update ' + req.body._id)
      }
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('could not update ' + req.body._id)
  }
})

// @desc   api/issues/subject
// @route  DELETE /
router.delete('/:subject', async (req, res) => {
  // Check for no id and set id
  let id = req.query._id || req.body._id
  console.log(id);
  try {
    // Delete
    let deleted = await IssueML.findOneAndRemove({
      issue_subject: 'home',
      _id: id,
    })
    if (deleted !== null) {
      res.json({ success: 'deleted' })
    } else {
      // If unable to delete
      res.status(500).json({ err: 'unable to delete' })
    }
  } catch (error) {
    res.status(500).json({ err: 'unable to delete' })
  }
})

module.exports = router

// Helper Functions
function removeEmptyFields(query) {
  for (key in query) {
    query[key] === '' && delete query[key]
    String(query[key]).match(/^\s+$/) ? (query[key] = '') : null
  }
  return query
}
