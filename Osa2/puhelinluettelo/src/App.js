import { useState, useEffect } from 'react'
import NewPerson from './components/NewPerson'
import People from "./components/People"
import Filter from "./components/Filter"
import axios from "axios"

const App = () => {
  const [people, setPeople] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addNewPerson = (event) => {
    event.preventDefault()

    if (people.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const person = {
      name: newName,
      number: newNumber
    }

    setPeople(people.concat(person))
    setNewName("")
    setNewNumber("")
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

  useEffect(() => {
    axios
    .get("http://localhost:3001/people")
    .then(response => {
      setPeople(response.data)
    })
  }, [])
  

  return (
    <div>
      <h1>Phonebook</h1>
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
      <People people={people.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))}/>
    </div>
  )

}

export default App
