import React from "react";

const Choices = (props) => {
  const choices = props.choices;

  function onPressFunction(choice) {
    console.log("choice", choice);
    props.emitChoice(choice);
  }

  const styles = {
    choices: {
      display: "flex",
      gap: "2rem",
      flexDirection: "column",
      alignItems: "center",
    },
    choice: {
      fontSize: "1.5rem",
      backgroundColor: "#333333",
      color: "white",
      padding: "0.5rem 1rem",
      borderRadius: "1rem",
      maxWidth: "25rem",
      border: "none",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.choices}>
      <button
        onClick={() => onPressFunction(choices[0].target)}
        style={styles.choice}
      >
        {choices[0].text}
      </button>
      <button
        onClick={() => onPressFunction(choices[1].target)}
        style={styles.choice}
      >
        {choices[1].text}
      </button>
    </div>
  );
};

export default Choices;
