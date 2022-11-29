import Country from "./Country";
import Weather from "./Weather";
import { useState } from "react";

const Countries = ({ countries }) => {
// have a show button for each country
// when the button is clicked, show the country
// if there is only one country, show the country
// if there are more than 10 countries, show a message
// if there are 10 or less countries, show the countries
// if there are 2 or less countries, show the countries

const [showCountry, setShowCountry] = useState(false);
const [countryToShow, setCountryToShow] = useState("");

const handleShowCountry = (event) => {
  console.log(event.target.value);
  setCountryToShow(event.target.value);
  setShowCountry(true);
}

const countriesToShow = countries.filter((country) => country.name.common === countryToShow);

if (countries.length > 10) {
  return <div>Too many matches, specify another filter</div>;
}

if (countries.length === 1) {
  return (
    <div>
      <Country country={countries[0]} />
      <Weather capital={countries[0].capital} />
    </div>
  );
}

if (countries.length <= 10 && countries.length > 1) {
  return (
    <div>
      {countries.map((country) => (
        <div key={country.name.common}>
          {country.name.common}
          <button value={country.name.common} onClick={handleShowCountry}>
            show
          </button>
        </div>
      ))}
      {showCountry && <Country country={countriesToShow[0]} />}
    </div>
  );
}

return <div></div>;
};

export default Countries;