const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

mongoose.set('strictQuery',false)
mongoose.connect(process.env.MONGODB_URI)
  .then(result => {
    console.log('connected to mongodb')
  })
  .catch((error) => {
    console.log('error connecting to mongodb: ', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 3,
    required: true
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
