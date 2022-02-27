const express = require('express')
const router = express.Router()
const verify = require('./token')

router.get('/', verify, (req, res) => {
  res.json({
    'Title': 'Post1',
    'Description': 'This is post one'
  })
})

module.exports = router
