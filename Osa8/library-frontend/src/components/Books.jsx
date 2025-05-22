import PropTypes from "prop-types"
import { ALL_BOOKS, ALL_GENRES } from "../queries"
import { useQuery } from "@apollo/client"
import { useState } from "react"

const Books = ({ show }) => {
  const [genre, setGenre] = useState(null)
  const bookQuery = useQuery(ALL_BOOKS, { variables: { genre }})
  const genreQuery = useQuery(ALL_GENRES)

  if (!show) {
    return null
  }

  if (bookQuery.loading || genreQuery.loading) {
    return <div>Loading...</div>
  }

  const handleGenreChange = (event) => {
    if (event.target.value === "all") {
      setGenre(null)
      return
    }

    setGenre(event.target.value)
  }

  const books = bookQuery.data.allBooks
  const genres = genreQuery.data.allGenres

  return (
    <div>
      <h2>books</h2>
      {genre && <p>In genre <b>{genre}</b></p> }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(book => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <select onChange={handleGenreChange} value={genre || "all"}>
        <option value="all">all genres</option>
        {genres.map(genre => (
          <option key={genre} value={genre}>{genre}</option>
        ))
        }
      </select>
    </div>
  )
}

Books.propTypes = {
  show: PropTypes.bool
}

export default Books
