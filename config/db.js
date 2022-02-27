const mongoose = require('mongoose')

const DBconnection = async() => {
  const conn = await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(e => {
    console.log(`Couldn't connect to Database`.red, e)
  })
  console.log(`MongoDB Connected`.yellow.underline)
}

module.exports = DBconnection
