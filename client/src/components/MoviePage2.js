import React from "react";
import { withKnobs } from "@storybook/addon-knobs";

// reference: https://reactjs.org/docs/uncontrolled-components.html

//export default {
//  title: "Fetching data",
//  decorators: [withKnobs],
//};

export const SubmitEventStory = () => {
  const input = React.createRef();
  const input2 = React.createRef();
  const input3 = React.createRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('https://yn9065r1i6.execute-api.eu-west-1.amazonaws.com/dev/movie');  
    const responseJson = await response.json();
    const id = responseJson.results.length + 1
    console.log(id)
    console.log({uuid : input2.current.value, title: input.current.value, desc: input3.current.value,})
    await fetch("https://yn9065r1i6.execute-api.eu-west-1.amazonaws.com/dev/crea", {
        method:"post",
        body: JSON.stringify({uuid : input2.current.value, title: input.current.value, desc: input3.current.value,})}
    )
    //event.preventDefault();
  };

  return (
    <ul>
    <form onSubmit={handleSubmit}>
      <div>
      <label>
        Titre : 
        <input type="text" ref={input} required/>
      </label>
      </div>
      <div>
      <label>
        Identifiant unique : 
        <input type="number" ref={input2} required/>
      </label>
      </div>
      <div>
      <label>
        Description : 
        <input type="text" ref={input3} />
      </label>
      </div>
      <div>
      <input type="submit" value="Submit" />
      </div>
    </form>
    </ul>
  );
};

export default SubmitEventStory