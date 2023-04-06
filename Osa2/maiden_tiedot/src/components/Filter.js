const Filter = ({filter, filterHandler}) => {
    return (
        <div>
            <p>Find countries <input onChange={filterHandler} value={filter}></input></p>
        </div>
    )
}

export default Filter