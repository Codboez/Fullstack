import { useState } from 'react'

const Button = ({click, name}) => (
  <div>
    <button onClick={click}>{name}</button>
  </div>
)

const Header = ({name}) => (
  <div>
    <h1>{name}</h1>
  </div>
)

const Stats = ({good, neutral, bad}) => {
  const sum = good + neutral + bad

  if (sum == 0) {
    return (
      <div>
        <Header name={"Statistics"} />
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text={"Good"} value={good} />
        <StatisticLine text={"Neutral"} value={neutral} />
        <StatisticLine text={"Bad"} value={bad} />
        <StatisticLine text={"Sum"} value={sum} />
        <StatisticLine text={"Average"} value={(good - bad) / sum} />
        <StatisticLine text={"Positive"} value={good / sum * 100} />
      </tbody>
    </table>
  )
}

const Feedback = (props) => (
  <div>
    <Button click={props.buttonclick1} name={"Good"} />
    <Button click={props.buttonclick2} name={"Neutral"} />
    <Button click={props.buttonclick3} name={"Bad"} />
  </div>
)

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header name={"Give feedback"} />
      <Feedback buttonclick1={() => setGood(good + 1)} buttonclick2={() => setNeutral(neutral + 1)} buttonclick3={() => setBad(bad + 1)} />
      <Header name={"Statistics"} />
      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
