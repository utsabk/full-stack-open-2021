import React from 'react';

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Part = ({part}) => {
  return (
    <>
      <p>
        {part.name}
        {part.exercises}
      </p>
    </>
  );
};

const Content = ({parts}) => {
  return (
    <>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </>
  );
};

const Total = ({parts}) => {
  const sum = parts.map(part => part.exercises).reduce((sum,cur) => sum + cur,0)
  return (
    <>
      <p>Number of exercises {sum}</p>
    </>
  );
};
const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },

      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  const {name, parts} = course;

  return (
    <div>
      <Header course={name} />
      <Content parts = {parts} />
      <Total parts = {parts} />
    </div>
  );
};

export default App;
