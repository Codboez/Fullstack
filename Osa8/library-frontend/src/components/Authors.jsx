import PropTypes from "prop-types"
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries"
import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react"

const Authors = ({ show, token }) => {
  const [name, setName] = useState("")
  const [year, setYear] = useState("")

  const authorsQuery = useQuery(ALL_AUTHORS)
  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!show) {
    return null
  }

  if (authorsQuery.loading) {
    return <div>Loading...</div>
  }

  const authors = authorsQuery.data.allAuthors

  const sendBirthyearForm = (event) => {
    event.preventDefault()

    updateAuthor({ variables: { name, year: Number(year) } })

    setName("")
    setYear("")
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token && 
        <div>
          <h2>Set birthyear</h2>
          <form onSubmit={sendBirthyearForm}>
            name<select onChange={event => setName(event.target.value)}>
              <option value="">Select an option</option>
              {authors.map(author => <option key={author.name} value={author.name}>{author.name}</option>)}
            </select>
            born<input value={year} onChange={event => setYear(event.target.value)} /><br/>
            <button type="submit">Update author</button>
          </form>
        </div>
      }
      
    </div>
  )
}

Authors.propTypes = {
  show: PropTypes.bool,
  token: PropTypes.string
}

export default Authors
