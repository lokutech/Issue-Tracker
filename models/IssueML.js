const mongoose = require('mongoose')

const IssueSchema = new mongoose.Schema(
  {
    issue_subject: {
      type: String,
      default: 'home',
    },
    issue_title: {
      type: String,
      required: true,
    },
    issue_text: {
      type: String,
      required: true,
    },
    created_by: {
      type: String,
      required: true,
    },
    assigned_to: {
      type: String,
      default: ""
    },
    status_text: {
      type: String,
      default: ""
    },
    created_on: {
      type: Date,
      default: Date.now,
    },
    updated_on: {
      type: Date,
      default: Date.now,
    },
    open: {
      type: Boolean,
      default: true,
    },
  },
)

module.exports = mongoose.model('Issue', IssueSchema)
