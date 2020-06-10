import React, { useState, useEffect } from "react";

const Moviepage = () => {
    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);
    const [items2, setItems2] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [fetchAgain, setFetchAgain] = useState(false);
    const triggerFetchAgain = () => setFetchAgain(!fetchAgain);

    const urlcourante = document.location.href;
    // Supprimons l'éventuel dernier slash de l'URL
    const urlcourante2 = urlcourante.replace(/\/$/, "");
    // Gardons dans la variable queue_url uniquement la portion derrière le dernier slash de urlcourante
    const queue_url = urlcourante2.substring (urlcourante2.lastIndexOf( "/" )+1 );
    const id = String(1)
    //console.log(queue_url)
    //const lien = String('https://api.themoviedb.org/3/movie/'+queue_url+'?api_key=9f22b180654b01e40d392977511cc5de&language=en-US')
    const Fetch = async () => {
        try {
            const response = await fetch('https://yn9065r1i6.execute-api.eu-west-1.amazonaws.com/dev/items/'+queue_url);   //https://yn9065r1i6.execute-api.eu-west-1.amazonaws.com/dev/movie   'https://yn9065r1i6.execute-api.eu-west-1.amazonaws.com/dev/items/'+
            const responseJson = await response.json();
            console.log(responseJson)
            setIsLoaded(true);
            setError(false);
            setItems(responseJson.title);
            setItems2(responseJson.uuid);
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
                return (
                    <div>
                        <ul>Titre du film : {items}</ul>
                        <ul>Identifiant du film : {items2}</ul>
                        <ul>Id page web : {queue_url}</ul>
                    </div>
                    
                )
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
