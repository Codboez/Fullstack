import { useState, useEffect } from 'react'
import NewPerson from './components/NewPerson'
import People from "./components/People"
import Filter from "./components/Filter"
import PeopleService from "./services/PeopleService"

const App = () => {
  const [people, setPeople] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
          setPeople(people.map(p => p.id === newPerson.id ? newPerson : p))
          setNewName("")
          setNewNumber("")
        })
      
      return
    }

    person = {name: newName, number: newNumber}

    PeopleService.addPerson(person)
      .then(newPerson => {
        setPeople(people.concat(newPerson))
        setNewName("")
        setNewNumber("")
    })
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
      .then(() => setPeople(people.filter(p => p.id !== person.id)))
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
