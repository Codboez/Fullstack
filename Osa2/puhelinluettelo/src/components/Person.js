const Person = ({person, deleteAction}) => {
    return (
        <div>
            <p>{person.name} {person.number} <button onClick={() => deleteAction(person)}>Delete</button></p>
        </div>
    )
}

export default Person