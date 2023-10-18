const Story = (props) => {
  const styles = {
    story: {
      maxWidth: "25rem",
      margin: "auto",
      marginBottom: "0",
    },
  };

  return <p style={styles.story}>{JSON.stringify(props.story)}</p>;
};

export default Story;
