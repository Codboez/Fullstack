import Person from "./Person"

const People = ({people, deleteAction}) => {
    return (
        <div>
            {people.map(person => <Person person={person} key={person.id} deleteAction={deleteAction} />)}
        </div>
    )
}

export default People