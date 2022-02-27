const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')

dotenv.config({ path: './config/.env'})

const DBconnection = require('./config/db')
DBconnection()

const auth = require('./routes/auth')
const post = require('./routes/post')

const app = express()

app.use(express.json())

const v1 = (route) => `/api/v1/${route}`
app.use(v1('auth'), auth)
app.use(v1('post'), post)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.green.underline);
})
