const Anecdote = ({ anecdote, voteHandler }) => (
  <div>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={() => voteHandler(anecdote.id, anecdote.content)}>vote</button>
    </div>
  </div>
)

export default Anecdote