const Filter = ({filterHandler, filter}) => {
    return (
        <div>
            <p>Filter shown with <input onChange={filterHandler} value={filter}></input></p>
        </div>
    )
}

export default Filter