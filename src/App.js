import { useState, useEffect } from "react";
import fetchData from "./fetch";
import "./App.css";
import Choices from "./Choices";
import Story from "./Story";
import Illu from "./Illu";

function App() {
  const styles = {
    app: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "2rem",
    },
  };

  let [target, setTarget] = useState("a");
  let [pageNb, setPageNb] = useState(1);
  const [choices, setChoices] = useState("");
  const [story, setStory] = useState("");
  const [imgUrl, setImgUrl] = useState("1");
  const [storyData, setStoryData] = useState("");
  const [boat, setBoat] = useState("");
  const [isBoatSet, setIsBoatSet] = useState(false);
  const [nextImgUrl, setNextImgUrl] = useState([]);

  useEffect(() => {
    const fetchStory = async () => {
      console.log("1st time !!!!!!!!!!!!!!");
      try {
        const storyDataTemp = await fetchData("pages"); // Utilisation d'await pour attendre la résolution de la promesse
        setStoryData(storyDataTemp);
        setStory(storyDataTemp[pageNb]["a"].text);
        setChoices(storyDataTemp[pageNb]["a"].choices);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchStory();
  }, [pageNb, target]);

  useEffect(() => {
    updateStoryData();
  }, [target, pageNb, storyData]);

  const updateStoryData = () => {
    console.log("la", pageNb);
    if (storyData) {
      const page = storyData[pageNb][target];
      setStory(page.text);
      setChoices(page.choices);
      setIllu(page.variations);
      getNextImgUrl(page.choices);
    }
  };

  const setIllu = (variations) => {
    let imgUrl;

    if (!variations) {
      imgUrl = "/pages/" + pageNb + "/" + target + ".jpg";
    } else {
      imgUrl = "/pages/" + pageNb + "/" + target + "-" + boat + ".jpg";
    }

    console.log(imgUrl);

    setImgUrl(imgUrl);
  };

  const getNextImgUrl = (choices) => {
    if (choices) {
      let targets = [];
      choices.forEach((choice) => {
        targets.push(choice.target);
      });
      setNextImgUrl(targets);
      console.log("targetsss", targets);
    }
  };

  const handleChoice = (choice) => {
    console.log("choice that should become target", choice);

    if (!isBoatSet) {
      if (choice == "a") setBoat("flying_candy");
      else if (choice == "b") setBoat("black_dragon");

      setIsBoatSet(true);
    }

    setPageNb(pageNb + 1);
    pageNb++;
    console.log(pageNb);

    const choiceTemp = choice;
    setTarget(choiceTemp);
    console.log("new target ???", target);
  };

  return (
    <div className="App" style={styles.app}>
      {nextImgUrl && <Illu imgUrl={imgUrl} nextImgUrl={nextImgUrl} />}
      <Story story={story} />
      {choices && <Choices choices={choices} emitChoice={handleChoice} />}
    </div>
  );
}

export default App;
