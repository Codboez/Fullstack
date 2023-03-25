const NewPerson = (props) => {
    return (
        <div>
            <form onSubmit={props.addNewPerson}>
                <div>
                    name: <input onChange={props.handleNameInput} value={props.newName} />
                </div>
                <div>
                    number: <input onChange={props.handleNumberInput} value={props.newNumber} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default NewPerson