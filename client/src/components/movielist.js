import React, { useState, useEffect } from "react";
//import { Link, Switch } from "react-router-dom";
import Moviepage from "./MoviePage"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const PokemonDisplayer = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const triggerFetchAgain = () => setFetchAgain(!fetchAgain);

  const fetchExample = async () => {
    try {
      const response = await fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=9f22b180654b01e40d392977511cc5de");   //https://yn9065r1i6.execute-api.eu-west-1.amazonaws.com/dev/movie
      const responseJson = await response.json();
      setIsLoaded(true);
      setError(false);
      setItems(responseJson.results);   //
    } catch (error) {
      setIsLoaded(true);
      setError(error);
    }
  };

  useEffect(() => {
    setIsLoaded(false);
    fetchExample();
    // The useEffect hook will retrigger every time an element in the dependency array changes.
    // changes = strict egality, so beware when mutating objects
  }, [fetchAgain]);

  const displayPokemons = () => {
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Router>
        <ul>
          {items.map((item) => (
            //<li key={item.name}>{<a href={item.url} target="_blank" rel="noopener noreferrer"> {item.name} </a>}</li>
            <li key={item.id}><Link to={String('/movie/'+item.id)}>{item.title}</Link></li>
          ))}
        </ul>
        <Switch>
          <Route path="/movie/:id">
            <Moviepage /> 
            </Route>
          </Switch>
        </Router>
      );
    }
  };

  return (
    <div>
      <button onClick={triggerFetchAgain}>Fetch again</button>
      {displayPokemons()}
    </div>
  );
};

export default PokemonDisplayer;
