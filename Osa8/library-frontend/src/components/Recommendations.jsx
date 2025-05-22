import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ME } from "../queries"
import { PropTypes } from "prop-types"

const Recommendations = ({ show, token }) => {
  const meQuery = useQuery(ME)
  const bookQuery = useQuery(ALL_BOOKS, { variables: { genre: meQuery?.data?.me?.favoriteGenre }})

  if (!show || !token) {
    return null
  }

  if (bookQuery.loading || meQuery.loading) {
    return <div>Loading...</div>
  }

  const books = bookQuery.data.allBooks
  const genre = meQuery.data.me.favoriteGenre

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
    </div>
  )
}

Recommendations.propTypes = {
  show: PropTypes.bool,
  token: PropTypes.string
}

export default Recommendations