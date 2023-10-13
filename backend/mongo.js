const mongoose = require('mongoose')

const argc = process.argv.length

if (argc<3) {
  console.log('give password as argument')
  process.exit(1)
}


const password = process.argv[2]

const url =
  `mongodb+srv://orlogan7:${password}@phonebookcluster.h99m6cj.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=AtlasApp`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Person', personSchema)

if (argc==5) {
  console.log("adding new person")
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
  person.save().then(result => {
    console.log('added %s number %s to phonebook', person.name, person.number)
    mongoose.connection.close()
  })
}else{
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}



