import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdoteService'

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    vote: (state, action) => {
      return state.map(anecdote => {
        if (anecdote.id === action.payload) {
          const { votes, ...others } = anecdote
          return { votes: votes + 1, ...others }
        }
      
        return anecdote
      })
    },
    addAnecdote: (state, action) => {
      return state.concat(action.payload)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const { vote, addAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAnecdotes()
    dispatch(setAnecdotes(anecdotes.data))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const response = await anecdoteService.addAnecdote(content)
    dispatch(addAnecdote(response.data))
  }
}

export const voteForAnecdote = id => {
  return async dispatch => {
    const anecdote = await anecdoteService.getAnecdote(id)
    
    const { votes, ...others } = anecdote.data
    await anecdoteService.updateAnecdote(id, { votes: votes + 1, ...others})

    dispatch(vote(id))
  }
}

export default anecdoteSlice.reducer