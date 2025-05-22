import { useState } from "react"
import Authors from "./Authors"
import Books from "./Books"
import NewBook from "./NewBook"
import Login from "./Login"
import { useApolloClient } from "@apollo/client"
import Recommendations from "./Recommendations"

const App = () => {
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>

        {token && 
          <div style={{ display: "inline" }}>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommendations")}>recommendations</button>
            <button onClick={() => logout()}>logout</button>
          </div>
        }
        {!token && 
          <button onClick={() => setPage("login")}>login</button>
        }
        
      </div>

      <Authors show={page === "authors"} token={token} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
      <Recommendations show={page === "recommendations"} token={token} />
      <Login show={page === "login"} setToken={setToken} setPage={setPage} />
    </div>
  );
};

export default App
