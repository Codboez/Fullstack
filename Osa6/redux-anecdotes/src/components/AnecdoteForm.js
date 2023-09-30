import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const anecdoteAddHandler = async (event) => {
    event.preventDefault()

    dispatch(createAnecdote(event.target[0].value))
    dispatch(createNotification("Successfully added anecdote", 5))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={anecdoteAddHandler}>
        <div><input /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm