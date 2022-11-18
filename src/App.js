import React, {useEffect,useState} from 'react';
import './App.css';
import {Routes, Link, Route } from "react-router-dom";

function App() {
  const [countries,setCountries]=useState([]);
  useEffect(()=>{
    fetch('https://restcountries.com/v2/all')
    .then(response=>response.json())
    .then(response=>setCountries(response));
  }, []);
  
  
  return (
    <>
      <div className="App">
      <h1>Ülkeler</h1>
    <Routes>
  
     
      <Route path="/" exact render={()=>
       countries.map((country,i)=> (
        <div key={i} className="country">
      <Link to={`/country/${country.alpha3Code}`}>
          <h3>{country.name}</h3> </Link>

        </div>
      )) }
     />
    <Route path='/country/:code' render={renderProps=>{
      const country= countries.find(country=>country.alpha3Code
        === renderProps.match.params.code);
      return <Country {...renderProps} country={country} />
    }} />
   
    
    </Routes>
    </div>
    </>
  );
}

export default App;

const Country = props => {
  return (
   <div>
   <h1>{props.country.name}</h1> 
   <p>Capital:{props.country.capital}</p>
   <img src={props.country.flag} alt={props.country.name} style={{width:"250px"}} />
    </div>
  )
}

