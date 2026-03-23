import { useEffect, useState } from 'react'
import axios from 'axios'
import Country from './components/country'


function App() {
  const [ value, setValue] = useState("")
  const [ countries, setCountries] = useState([]) // list of all countries
  const [ selectedCountry, setSelectedCountry] = useState(null) // this state was introduced  to rerender
  // when a country is selected

   useEffect( () => {
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then( Response => {
      setCountries(Response.data)

    })

   },[])

    // need to find the amount of matches in the input   vs the  countries array
    // filter the countries to array to find  those country names that include -value-

    const matches = countries.filter( country =>
      country.name.common.toLowerCase().includes(value.toLowerCase())
    )
    console.log(matches)


   const handleChange = (event) => {
    setValue(event.target.value)
    console.log(value)
    setSelectedCountry(null) // reset selection when typing
   }

  return (
    <div>
      <div>Find countries : <input type="text" value={value} onChange={handleChange}/></div>
      <Country matches={selectedCountry ? [selectedCountry ] : matches  } setSelectCountry={setSelectedCountry} search={value}/>

    </div>
  )
}

export default App
