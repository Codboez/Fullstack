const Header = ({name}) => {
  return (
      <div>
      <h2>{name}</h2>
      </div>
  )
}
  
const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => <Part name={part.name} exercises={part.exercises} key={part.id} />)}
    </div>
  )
}
  
const Total = ({parts}) => {
  const exercises = parts.map(part => part.exercises)
  const amount = exercises.reduce((prev, current) => prev + current, 0)

  return (
    <div>
      <p>Number of exercises {amount}</p>
    </div>
  )
}
  
const Part = ({name, exercises}) => {
  return (
    <div>
      <p>{name} {exercises}</p>
    </div>
  )
}
  
const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
