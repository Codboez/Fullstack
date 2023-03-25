import Person from "./Person"

const People = ({people}) => {
    return (
        <div>
            {people.map(person => <Person name={person.name} number={person.number} key={person.name} />)}
        </div>
    )
}

export default People