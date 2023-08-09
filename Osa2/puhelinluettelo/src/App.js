import { useState, useEffect } from 'react'
import NewPerson from './components/NewPerson'
import People from "./components/People"
import Filter from "./components/Filter"
import PeopleService from "./services/PeopleService"
import Notification from "./components/Notification"

const App = () => {
  const [people, setPeople] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({type: "", text: ""})

  const createMessage = (message, type) => {
    setMessage({text: message, type: type})
    setTimeout(() => setMessage(""), 5000)
  }

  const addNewPerson = (event) => {
    event.preventDefault()

    let person

    if (people.map(person => person.name).includes(newName)) {
      if (!window.confirm(`${newName} is already added. Do you want to replace its number?`)) {
        return
      }
      
      person = people.find(p => p.name === newName)

      PeopleService
        .updateNumber(person, newNumber)
        .then(newPerson => {
          console.log(newPerson)
          setPeople(people.map(p => p.id === newPerson.id ? newPerson : p))
          setNewName("")
          setNewNumber("")
          createMessage("Number changed successfully", "confirmation")
        })

      return
    }

    person = {name: newName, number: newNumber}

    PeopleService.addPerson(person)
      .then(newPerson => {
        setPeople(people.concat(newPerson))
        setNewName("")
        setNewNumber("")
        createMessage("Person added successfully", "confirmation")
      })
      .catch(error => createMessage(error.response.data, "error"))
  }

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const deleteAction = (person) => {
    if (!window.confirm(`Do you want to delete ${person.name}`)) {
      return
    }

    PeopleService
      .deletePerson(person.id)
      .then(() => {
        setPeople(people.filter(p => p.id !== person.id))
        createMessage("Person deleted successfully", "confirmation")
      })
      .catch(() => {
        setPeople(people.filter(p => p.id !== person.id))
        createMessage("Person was already removed from database", "error")
      })

  }

  useEffect(() => {
    PeopleService
      .getPeople()
      .then(newPeople => {
        setPeople(newPeople)
      })
  }, [])
  
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification type={message.type} text={message.text} />

      <Filter filterHandler={handleFilter} filter={filter} />

      <h2>Add a new</h2>

      <NewPerson 
        addNewPerson={addNewPerson}
        handleNameInput={handleNameInput}
        handleNumberInput={handleNumberInput}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <People people={people.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))} deleteAction={deleteAction}/>
    </div>
  )
}

export default App
