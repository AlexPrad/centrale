import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const PokemonDisplayer = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const triggerFetchAgain = () => setFetchAgain(!fetchAgain);

  const fetchExample = async () => {
    try {
      const response = await fetch('https://api.themoviedb.org/3/movie/339095?api_key=9f22b180654b01e40d392977511cc5de&language=en-US');   //https://yn9065r1i6.execute-api.eu-west-1.amazonaws.com/dev/movie
      const responseJson = await JSON.parse(response);
      setIsLoaded(true);
      setError(false);
      setItems(responseJson);   //
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
        <ul>
          {items}
        </ul>
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
