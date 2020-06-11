import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import recko from "./components/recommande";
import PokemonDisplayer from "./components/movielist2";
import SubmitEventStory from "./components/MoviePage2";
import "./App.css"

function App() {
  const [selectedUser, setSelectedUser] = useState('emma')
  return (
    <Router>
      <div className="background"> 
        <div className = "title"><h2> Adopte un film </h2></div>
        <nav>
          <ul>
            <li>
              <Link className = "links" to="/">Accueil</Link>
            </li>
            <li>
              <Link className = "links" to="/liste">Liste de films</Link>
            </li>
            <li>
              <Link className = "links" to="/reco"> Recommande-moi un film </Link>
            </li>
            <li>
              <Link className = "links" to="/ajout"> Ajouter un film </Link>
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
