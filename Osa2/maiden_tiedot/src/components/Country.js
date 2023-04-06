const Country = ({data}) => {
    return (
        <div>
            <h1>{data.name.common}</h1>

            <p>Capital: {data.capital}</p>
            <p>Area: {data.area}</p>

            <h2>Languages:</h2>
            <ul>
                {Object.values(data.languages).map(language => (<li key={language}>{language}</li>))}
            </ul>

            <img src={data.flags.png} alt={`Flag of ${data.name.common}`} />
        </div>
    )
}

export default Country