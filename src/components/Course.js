import React from 'react';

const Header = (props) => <h1>{props.course}</h1>
       
const Part = ({part}) => <p>{part.name} &nbsp;{part.exercises}</p>

const Parts = ({parts}) =>  parts.map(part => <Part key={part.id} part ={part}/>)
  
const Total = ({ parts }) => {
  const sum = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <>
      <p><b>total of {sum} exercises</b></p>
    </>
  );
};

const Content = ({ name, parts }) => {
  return (
    <>
      <Header course={name} />
      <Parts parts={parts} />
      <Total parts={parts} />
    </>
  );
};

const Course = ({ courses }) =>
  courses.map((course) => {
    return <Content key={course.id} name={course.name} parts={course.parts} />;
});
   
  


export default Course;