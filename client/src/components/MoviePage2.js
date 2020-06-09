import React from "react";
import { withKnobs } from "@storybook/addon-knobs";

// reference: https://reactjs.org/docs/uncontrolled-components.html

//export default {
//  title: "Fetching data",
//  decorators: [withKnobs],
//};

export const SubmitEventStory = () => {
  const input = React.createRef();

  const handleSubmit = async (event) => {
    await fetch("https://yn9065r1i6.execute-api.eu-west-1.amazonaws.com/dev/items", {
        method:"post", 
        body: JSON.stringify(input.current.value)}
    )
    //event.preventDefault();
  };

  return (
    <ul>
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" ref={input} />
      </label>
      <input type="submit" value="Submit" />
    </form>
    </ul>
  );
};

export default SubmitEventStory