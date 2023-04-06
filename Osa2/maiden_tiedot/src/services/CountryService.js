const path = "https://restcountries.com/v3.1/all"

const getCountries = () => (
    fetch(path).then(response => response.json())
)

const CountryService = {
    getCountries
}

export default CountryService