import React from "react";
import { Choices, Story, Illu } from "./";

export default function Page(props) {
  const imgUrl = props.imgUrl;
  const story = props.story;
  const choices = props.choices;

  function emitChoice(choice) {
    props.emitChoice(choice);
  }

  return (
    <div className="page">
      <Illu imgUrl={imgUrl} />
      <Story story={story} />
      {choices && <Choices choices={choices} emitChoice={emitChoice} />}
    </div>
  );
}
