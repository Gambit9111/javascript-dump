import { useState } from 'react'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const StatisticLine = ({ text, value }) => {
    return (
        // table
        <table>
            <tbody>
                <tr>
                    <td>{text}</td>
                    <td>{value}</td>
                </tr>
            </tbody>
        </table>
    )}

const Statistics = ({ good, neutral, bad }) => {
    const all = good + neutral + bad
    const average = (good - bad) / (good + neutral + bad)
    const positive = good / (good + neutral + bad) * 100

    if (all === 0) {
        return (
        <div>
            <p>No feedback given</p>
        </div>
        )}
    return (
        <div>
            <h1>Statistics</h1>
            <StatisticLine text='Good' value={good} />
            <StatisticLine text='Neutral' value={neutral} />
            <StatisticLine text='Bad' value={bad} />
            <StatisticLine text='All' value={all} />
            <StatisticLine text='Average' value={average} />
            <StatisticLine text='Positive' value={positive} />
        </div>
    )

}

const handleClicks = ({ state, statehandler }) => {
    return () => statehandler(state + 1)
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>Give Feedback</h1>
        <Button handleClick={handleClicks({ state: good, statehandler: setGood })} text='Good' />
        <Button handleClick={handleClicks({ state: neutral, statehandler: setNeutral })} text='Neutral' />
        <Button handleClick={handleClicks({ state: bad, statehandler: setBad })} text='Bad' />
        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}



export default App