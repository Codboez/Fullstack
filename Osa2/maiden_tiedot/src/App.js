import Filter from "./components/Filter"
import Countries from "./components/Countries"
import { useState } from "react"

const App = () => {
  const [filter, setFilter] = useState("")

  const filterHandler = (event) => {
    setFilter(event.target.value)
  }

  const showButtonHandler = (name) => {
    setFilter(name)
  }

  return (
    <div>
      <Filter filter={filter} filterHandler={filterHandler}></Filter>
      <Countries filter={filter} showButtonHandler={showButtonHandler}></Countries>
    </div>
  );
}

export default App;
