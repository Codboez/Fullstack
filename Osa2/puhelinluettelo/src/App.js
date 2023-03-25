import { useState } from 'react'
import NewPerson from './components/NewPerson'
import People from "./components/People"
import Filter from "./components/Filter"

const App = () => {
  const [people, setPeople] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
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
