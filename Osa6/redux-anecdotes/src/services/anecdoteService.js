import axios from "axios"
import { createId } from "../utils/helper_functions"

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  return await axios.get(baseUrl)
}

export const getAnecdote = async (id) => {
  return await axios.get(`${baseUrl}/${id}`)
}

export const addAnecdote = async (anecdote) => {
  return await axios.post(baseUrl, {
    content: anecdote,
    id: createId(),
    votes: 0
  })
}

export const updateAnecdote = async (id, anecdote) => {
  return await axios.put(`${baseUrl}/${id}`, anecdote)
}

const anecdoteService = { getAnecdotes, addAnecdote, getAnecdote, updateAnecdote }
export default anecdoteService