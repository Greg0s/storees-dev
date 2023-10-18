import React from "react";

export default function Illu(props) {
  const styles = {
    illu: {
      maxWidth: "100%",
      maxHeight: "65vh",
      zIndex: "-10",
    },
  };

  // preloading,
  const componentDidMount = () => {
    props.nextImgUrl.forEach((url) => {
      const img = new Image();
      img.src = url.fileName;
    });
  };

  componentDidMount();
  const imgUrl = props.imgUrl;

  return <img src={imgUrl} style={styles.illu} />;
}
