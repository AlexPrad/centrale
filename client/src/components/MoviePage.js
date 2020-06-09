import React, { useState, useEffect } from "react";

const Moviepage = () => {
    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [fetchAgain, setFetchAgain] = useState(false);
    const triggerFetchAgain = () => setFetchAgain(!fetchAgain);

    var urlcourante = document.location.href;
    // Supprimons l'éventuel dernier slash de l'URL
    var urlcourante = urlcourante.replace(/\/$/, "");
    // Gardons dans la variable queue_url uniquement la portion derrière le dernier slash de urlcourante
    const queue_url = urlcourante.substring (urlcourante.lastIndexOf( "/" )+1 );
   
    const lien = String('https://api.themoviedb.org/3/movie/'+{queue_url}+'?api_key=9f22b180654b01e40d392977511cc5de&language=en-US')

    const Fetch = async () => {
        try {
            const response = await fetch({lien});   //https://yn9065r1i6.execute-api.eu-west-1.amazonaws.com/dev/movie
            //const responseJson = await response.json();
            //console.log(responseJson)
            setIsLoaded(true);
            setError(false);
            setItems(response);
        } catch (error) {
            setIsLoaded(true);
            setError(error);
        }

    }

    useEffect(() => {
        setIsLoaded(false);
        Fetch();
        // The useEffect hook will retrigger every time an element in the dependency array changes.
        // changes = strict egality, so beware when mutating objects
      }, [fetchAgain]);

    const Display = () => {
        if (error) {
            return <div>Error: {error.message}</div>;
          } else if (!isLoaded) {
            return <div>Loading...</div>;
          } else {
                return <ul>{queue_url}</ul>
          }
    }
    return (
        <div>
            <button onClick={triggerFetchAgain}>Fetch again</button>
            {Display()}
        </div>
    )
}

export default Moviepage;
