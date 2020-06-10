import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//import PokemonDisplayer from "./components/PokemonDisplayer";
import MoviePage2 from "./components/MoviePage2"
import PokemonDisplayer2 from "./components/PokemonDisplayer2";
//import Test from "./components/someRandomFileToTest";
import HomePage from "./components/HomePage";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/demo">API Fetch demo</Link>
            </li>
            <li>
              <Link to="/demo2">API Fetch demo 2</Link>
            </li>
          </ul>
        </nav>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/demo">
            <MoviePage2 />
          </Route>
          <Route path="/demo2">
            <PokemonDisplayer2 />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
