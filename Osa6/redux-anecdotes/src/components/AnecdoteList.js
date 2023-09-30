import { useSelector, useDispatch } from 'react-redux'
import Anecdote from './Anecdote'
import { voteForAnecdote, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => {
    const filtered = state.anecdotes.filter(anecdote => anecdote.content.match(new RegExp(filter)))
    return filtered.toSorted((a, b) => b.votes - a.votes)
  })

  const voteHandler = (id, anecdote) => {
    dispatch(voteForAnecdote(id))
    dispatch(createNotification(`Successfully voted for "${anecdote}"`, 5))
  }

  return (
    <div>
      {anecdotes.map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} voteHandler={voteHandler} />)}
    </div>
  )
}

export default AnecdoteList