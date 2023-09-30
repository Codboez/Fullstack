const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      const { good, ...others } = state
      return { good: good + 1, ...others }
    case 'OK':
      const { ok, ...others2 } = state
      return { ok: ok + 1, ...others2 }
    case 'BAD':
      const { bad, ...others3 } = state
      return { bad: bad + 1, ...others3 }
    case 'ZERO':
      return initialState
    default: return state
  }
}

export default counterReducer
