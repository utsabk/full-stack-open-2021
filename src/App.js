import React, { useState } from 'react';

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

const Statistic = ({ text, value }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
      </tbody>
    </table>
  );
};

const Statistics = ({ good, neutral, bad}) => {

  const sum = good + neutral + bad;

  const average = (good - bad) / sum > 0 ? (good - bad) / sum : 'Not a number';
  
  const positive = good/sum * 100 + '%';

  if(sum <= 0){
    return <Statistic text="No feedback given" />
  }

  return(
    <>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={sum} />
      <Statistic text="average:" value={average} />
      <Statistic text="positive:" value={positive} />
      </>
  )
}

const App = () => {
  // Defining each componet's state separately

  // const [good, setGood] = useState(0);
  // const [neutral, setNeutral] = useState(0);
  // const [bad, setBad] = useState(0);

  // const handleGood = () => setGood(good + 1);
  // const handleNeutral = () => setNeutral(neutral + 1);
  // const handleBad = () => setBad(bad + 1);

  const [stat, setStat] = useState({ good: 0, neutral: 0, bad: 0 });

  const handleGood = () => setStat({ ...stat, good: stat.good + 1 });
  const handleNeutral = () => setStat({ ...stat, neutral: stat.neutral + 1 });
  const handleBad = () => setStat({ ...stat, bad: stat.bad + 1 });

  return (
    <>
      <h1>give feedback</h1>
      <Button text="good" handleClick={handleGood} />
      <Button text="neutral" handleClick={handleNeutral} />
      <Button text="bad" handleClick={handleBad} />
      <h1>statistics</h1>
      <Statistics good={stat.good} neutral={stat.neutral} bad={stat.bad}/>
    </>
  );
};

export default App;
