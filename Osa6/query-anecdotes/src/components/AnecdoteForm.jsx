import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addAnecdote } from "../services/anecdoteService"
import { createId } from "../utils/helper_functions"
import { useContext } from 'react'
import NotificationContext from '../components/NotificationContext'

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const mutation = useMutation(addAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData({ queryKey: ['notes'] })
      queryClient.setQueryData({ queryKey: ['notes'] }, anecdotes.concat(newAnecdote))
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    if (content.length < 5) {
      dispatch({ type: "SET_MESSAGE", payload: "Anecdote must be at least 5 characters" })
      setTimeout(() => dispatch({ type: "SET_MESSAGE", payload: "" }), 5000)
      return
    }

    event.target.anecdote.value = ''
    mutation.mutate({
      id: createId(),
      content: content,
      votes: 0
    })
    dispatch({ type: "SET_MESSAGE", payload: `Successfully created "${content}"` })
    setTimeout(() => dispatch({ type: "SET_MESSAGE", payload: "" }), 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
