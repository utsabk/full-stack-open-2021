import React, { useState } from 'react';

const Anecdote = ({ anecdote, vote }) => {
  return (
    <>
      <p>{anecdote}</p>
      {vote > 1 ? <p>Has {vote} votes </p> : <p>Has {vote} vote </p>}
    </>
  );
};

const App = () =>{

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  
  const [selected, setSelected] = useState(0);

  const [votes, setVotes] = useState(Array(6).fill(0));

  // Function with two parenthesis
  // look more at https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps#function-that-returns-a-function

  const handleAnecdote = (max) => () => {
    const random = Math.floor(Math.random() * max);
    console.log('random', random);
    setSelected(random);
  };

  const handleVotes = (index) => () => {
    const copy = [...votes];
    copy[index] += 1;

    console.log('cpy',copy);
    setVotes(copy);
  };

  const maxVote = Math.max(...votes);
  const maxVoteIndex = votes.indexOf(maxVote);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} vote={votes[selected]} />
      <button onClick={handleVotes(selected)}>vote</button>
      <button onClick={handleAnecdote(5)}>next anecdote</button>
      {maxVote !== 0 ? (
        <>
          <h1>Anecdote with most votes</h1>
          <Anecdote anecdote={anecdotes[maxVoteIndex]} vote={maxVote} />
        </>
      ) : (
        ''
      )}
    </div>
  );
}

export default App;
