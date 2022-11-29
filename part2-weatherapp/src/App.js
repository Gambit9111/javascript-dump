import React from "react";
import { useState, useEffect } from "react";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);

  // get country data from local json
  useEffect(() => {
    fetch("countrydata.json")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      });
  }, []);

  const [filter, setFilter] = useState("");

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  const countriesToShow = filter
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    : countries;

  console.log(countriesToShow);

  return (
    <div>
      <div>
        filter shown with
        <input value={filter} onChange={handleFilterChange} />
      </div>
      <Countries countries={countriesToShow} />
    </div>
  );
};

export default App;
