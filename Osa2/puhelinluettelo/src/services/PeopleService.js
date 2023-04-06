import axios from "axios"

const path = "http://localhost:3001/people"

const getPeople = () => (
    axios.get(path).then(response => response.data)
)

const addPerson = (person) => (
    axios.post(path, person).then(response => response.data)
)

const deletePerson = (id) => (
    axios.delete(`${path}/${id}`).then(response => response.data)
)

const updateNumber = (person, newNumber) => (
    axios.put(`${path}/${person.id}`, {...person, number: newNumber}).then(response => response.data)
)

export default { getPeople, addPerson, deletePerson, updateNumber }