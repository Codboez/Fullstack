import PropTypes from "prop-types"
import { useState } from "react"
import { LOGIN } from "../queries"
import { useMutation, useApolloClient } from "@apollo/client"

const Login = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const client = useApolloClient()

  const [ login ] = useMutation(LOGIN)

  if (!show) {
    return null
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    const result = await login({ variables: { username, password }})
    
    const token = result.data.login.value
    setToken(token)
    localStorage.setItem("library-user-token", token)

    await client.resetStore()

    setUsername("")
    setPassword("")

    setPage("authors")
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        username <input value={username} onChange={event => setUsername(event.target.value)} />
        password <input value={password} onChange={event => setPassword(event.target.value)} />
        <button type="submit">login</button>
      </form>
    </div>
  )
}

Login.propTypes = {
  show: PropTypes.bool,
  setToken: PropTypes.func,
  setPage: PropTypes.func
}

export default Login