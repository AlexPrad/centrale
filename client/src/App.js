import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import recommande from "./components/recommande";
import PokemonDisplayer from "./components/movielist2";
import SubmitEventStory from "./components/MoviePage2";


function App() {
  const [selectedUser, setSelectedUser] = useState('emma')
  return (
    <Router>
      <div> 
        <div><h1> Nom du site </h1></div>
        <nav>
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/liste">Liste de films</Link>
            </li>
            <li>
              <Link to="/reco"> Recommande-moi un film </Link>
            </li>
            <li>
              <Link to="/ajout"> Ajouter un film </Link>
            </li>
          </ul>
        </nav>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/liste">
            <PokemonDisplayer user={selectedUser}/>
          </Route>
          <Route path="/reco">
            <recommande />
          </Route>
          <Route path="/ajout">
            <SubmitEventStory />
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
