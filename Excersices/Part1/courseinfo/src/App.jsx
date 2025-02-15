const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercise1 = 10
  const part2 = 'Using props to pass data'
  const exercise2 = 7
  const part3 = 'State of a component'
  const exercise3 = 14


  return (
    <div>
      <Header course={course} />
     <Content part1={part1} exercise1={exercise1} part2={part2} exercise2={exercise2} part3={part3} exercise3={exercise3} />

    <Total total={exercise1 + exercise2 + exercise3} />
      
    </div>
  )
}

const Header = ({course})=> {
  return (
    <div>
    {course}
    </div>
  )
}

const Part = ({name, exercise}) => {
 console.log('name', name)
 console.log("exercise", exercise)
  return (
    <div>
     <p>{name} {exercise}</p>
    </div>
  )
}

const Content = ({ part1, part2, part3, exercise1, exercise2, exercise3 }) => {
  // console.log("part prop", part)
  console.log("exercise", exercise1)

  return (
    <div>  
     <Part name={part1} exercise={exercise1} />
     <Part name={part2} exercise={exercise2} />
     <Part name={part3} exercise={exercise3} />
    </div>
  );
};

const Total = ({total})=> {
  return (
    <div>
     {total}
    </div>
  )
}

export default App