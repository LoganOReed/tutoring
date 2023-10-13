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

// TODO: Make date and time have correct type
const lessonSchema = new mongoose.Schema({
  fName: {
    type: String,
    minLength: 3,
    required: true
  },
  lName: {
    type: String,
    minLength: 3,
    required: true
  },
  email: {
    type: String,
    minLength: 5,
    required: true
  },
  date: {
    type: Date,
    min: new Date().toISOString(),
    required: true,
  },
})

lessonSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Lesson', lessonSchema)
