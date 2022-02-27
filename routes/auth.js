const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
  //Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  })
  try {
    const newUser = await user.save()
    res.send(newUser)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

router.post('/login', async(req, res) => {
  const user = await User.findOne({email: req.body.email})
  if (!user) return res.status(400).send('Email is not found')
  const password = await bcrypt.compare(req.body.password, user.password)
  if (!password) return res.status(400).send('Invalid password')

  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
  res.header('auth-token', token).send(token)
})

module.exports = router
