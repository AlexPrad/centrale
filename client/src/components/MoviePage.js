import React, { useState, useEffect } from "react";

const Moviepage = (props) => {
    const user = props.user
    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);
    const [items2, setItems2] = useState([]);
    const [items3, setItems3] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [fetchAgain, setFetchAgain] = useState(false);
    const triggerFetchAgain = () => setFetchAgain(!fetchAgain);
    const input3 = React.createRef();

    const urlcourante = document.location.href;
    // Supprimons l'éventuel dernier slash de l'URL
    const urlcourante2 = urlcourante.replace(/\/$/, "");
    // Gardons dans la variable queue_url uniquement la portion derrière le dernier slash de urlcourante
    const queue_url = urlcourante2.substring (urlcourante2.lastIndexOf( "/" )+1 );
        const Fetch = async () => {
        try {
            const response = await fetch('https://yn9065r1i6.execute-api.eu-west-1.amazonaws.com/dev/items/'+queue_url);   //https://yn9065r1i6.execute-api.eu-west-1.amazonaws.com/dev/movie   'https://yn9065r1i6.execute-api.eu-west-1.amazonaws.com/dev/items/'+
            const responseJson = await response.json();
            console.log(responseJson)
            setIsLoaded(true);
            setError(false);
            setItems(responseJson.title);
            setItems2(responseJson.uuid);
            setItems3(responseJson.description);
        } catch (error) {
            setIsLoaded(true);
            setError(error);
        }

    }
    const Fetch2 = async (event) => {
      event.preventDefault();
      await fetch('https://yn9065r1i6.execute-api.eu-west-1.amazonaws.com/dev/creanote', {
        method:"post",
        body: JSON.stringify({title: items, user: user, note: input3.current.value})}
    )
        console.log(input3.current.value)
        console.log(user)
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
                        <ul> 
                        <h3>Fiche descriptive de {items}</h3>
                        <ul>Titre du film : {items}</ul>
                        <ul>Identifiant du film : {items2}</ul>
                        <ul>Description : {items3}</ul>
                        </ul>
                    </div>
                    
                )
          }
    }
    return (
        <div>
        <div>
            <button onClick={triggerFetchAgain}>Fetch again</button>
            {Display()}
            <ul>
            <h3>Noter le film {items}</h3>
              <form onSubmit={Fetch2}>
              <div>
              <label>
                Note : 
                <input type="number" ref={input3} min="0" max="5" required/>
              </label>
              </div>
              <div>
              <input type="submit" value="Submit" />
              </div>
              </form>
            </ul>
        </div>
      </div>

    );
};


export default Moviepage;
