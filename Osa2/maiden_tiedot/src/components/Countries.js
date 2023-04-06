import { useState, useEffect } from "react"
import CountryService from "../services/CountryService"
import Country from "./Country"

const Countries = ({filter, showButtonHandler}) => {
    const [countries, setCountries] = useState([])

    useEffect(() => {
        CountryService
            .getCountries()
            .then(countries => {
                setCountries(countries)
            })
    }, [])

    const filteredCountries = countries.filter(country => country.name.common.toUpperCase().includes(filter.toUpperCase()))
    
    if (filteredCountries.length === 0 || filteredCountries.length > 10) {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    }

    if (filteredCountries.length === 1) {
        return (
            <div>
                <Country data={filteredCountries[0]} />
            </div>
        )
    }

    return (
        <div>
            {filteredCountries.map(country => 
                <p key={country.name.common}>
                    {country.name.common} <button onClick={() => showButtonHandler(country.name.common)}>Show</button>
                </p>
            )}
        </div>
    )
}

export default Countries