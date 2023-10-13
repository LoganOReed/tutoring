import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import lessonsService from './services/lessons'

function Filter({ filter, setFilter }) {
  return (
    <div>
      filter: <input name="filter" value={filter} onChange={e => setFilter(e.target.value)} />
    </div>
  )
}

function ContactForm({ firstName, setFirstName, lastName, setLastName, email, setEmail, date, setDate, time, setTime, addNewLesson }) {

  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px]">
        <form onSubmit={addNewLesson}>
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label htmlFor="fName" className="mb-3 block text-white">
                  First Name
                </label>
                <input name="fName"
                  type="text"
                  id="fName"
                  className="font-sans border border-dark-gray bg-dark-gray text-white placeholder-white rounded-md px-6 py-3 w-full focus:border-dark-gray focus:ring-dark-gray focus:shadow-md"
                  placeholder="First Name"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                />
                </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label htmlFor="lName" className="mb-3 block text-white">
                  Last Name
                </label>
                <input
                  name="lName"
                  type="text"
                  id="lName"
                  className="font-sans border border-dark-gray bg-dark-gray text-white placeholder-white rounded-md px-6 py-3 w-full focus:border-dark-gray focus:ring-dark-gray focus:shadow-md"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
                </div>
            </div>
            </div>
          <div className="mb-5">
            <label htmlFor="email" className="mb-3 block text-white">
              What email would you like me to contact?
              </label>
            <input 
              name="email"
              type="email"
              id="email"
              className="font-sans border border-dark-gray bg-dark-gray text-white placeholder-white rounded-md px-6 py-3 w-full focus:border-dark-gray focus:ring-dark-gray focus:shadow-md"
              placeholder="logan@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            </div>
    <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="date"
                  className="mb-3 block text-white"
                >
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  min={new Date().toISOString().split("T")[0]}
                  className="font-sans border border-dark-gray bg-dark-gray text-white placeholder-white rounded-md px-6 py-3 w-full focus:border-dark-gray focus:ring-dark-gray focus:shadow-md"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="time"
                  className="mb-3 block text-white"
                >
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  id="time"
                  step="900"
                  min="11:00"
                  max="22:00"
                  className="font-sans border border-dark-gray bg-dark-gray text-white placeholder-white rounded-md px-6 py-3 w-full focus:border-dark-gray focus:ring-dark-gray focus:shadow-md"
                  value={time}
                  onChange={e => setTime(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div>
            <button type="submit" className=" w-full border border-purple bg-purple text-white text-center font-bold rounded-md px-4 py-2 ">Submit</button>
          </div>
        </form>
      </div>
    </div>
            // <input name="date" type="date" className="font-sans border border-dark-gray bg-dark-gray text-white placeholder-white rounded-md px-4 py-2 mb-2" placeholder="" value={newNumber} onChange={e => setNewNumber(e.target.value)} />
            // <input name="time" type="datetime-local" className="font-sans border border-dark-gray bg-dark-gray text-white placeholder-white rounded-md px-4 py-2 mb-2" />
            // <button type="submit" className=" w-full border border-purple bg-purple text-white text-center rounded-md px-4 py-2 ">Add</button>
  )
}

function ContactList({ lessons, filter, removeLesson }) {
  return (
    <div>
      {
        lessons.filter(obj => Object.values(obj).some(val => val.toString().toLowerCase().includes(filter.toLowerCase())))
          .map(lesson =>
            <div key={lesson.id}>
              <p>
                {lesson.fName} {lesson.lName} :: {lesson.date} - {lesson.time}
              </p>
              <button value={lesson.id} onClick={removeLesson}>delete</button>
            </div>
          )}
    </div>
  )
}

function App() {
  const [lessons, setLessons] = useState([])

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    lessonsService
      .getAll()
      .then(response => {
        setLessons(response.data)
      })
  }, [])


  const addNewLesson = (e) => {
    e.preventDefault()

    if (lessons.some(p => p.fName === firstName && p.lName === lastName)) {
      alert(`${firstName} ${lastName} is already added to phonebook`)
    }
    else {
      lessonsService
        .create({ fName: firstName, lName: lastName, email: email, date: new Date(date + "T" + time) })
        .then(response => {
          setLessons(lessons.concat(response.data))
          setFirstName('')
          setLastName('')
          setEmail('')
          setDate('')
          setTime('')
        })
    }
  }

  const removeLesson = (e) => {
    if (window.confirm('Do you want to delete this lesson?')) {
      lessonsService
        .remove(e.target.value)
        .then(_ => {
          setLessons(lessons.filter(item => item.id.toString() !== e.target.value))
        })
    }
  }

  return (
    <>
      <h1 className="text-3xl text-white text-center bg-gray underline">
        Hello world!
      </h1>
      <div className="text-white bg-gray">
        <h2>Phonebook</h2>
        <Filter filter={filter} setFilter={setFilter} />
        <ContactForm
          firstName={firstName} setFirstName={setFirstName}
          lastName={lastName} setLastName={setLastName}
          email={email} setEmail={setEmail}
          date={date} setDate={setDate}
          time={time} setTime={setTime}
          addNewLesson={addNewLesson}
        />
        <h2>Numbers</h2>
        <ContactList lessons={lessons} filter={filter} removeLesson={removeLesson} />
      </div>
    </>
  )
}



export default App
