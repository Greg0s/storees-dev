// Dependencies
import { useState, useEffect } from "react";
// Utils
import { fetchData } from "./utils";
// Styling
import "./App.css";
// Components
import { Page } from "./components";

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
  const [nextTargets, setNextTargets] = useState([]);
  const [nextPages, setNextPages] = useState([]);

  // First load
  useEffect(() => {
    const fetchStory = async () => {
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

  // On choice click
  useEffect(() => {
    updateStoryData();
  }, [target, pageNb, storyData]);

  const updateStoryData = () => {
    if (storyData) {
      const page = storyData[pageNb][target];

      // Set current page
      setStory(page.text);
      setChoices(page.choices);
      setImgUrl(getImgUrl(page.variations, pageNb, target));

      // Get next pages
      if (page.choices) getNextTargets(page.choices);
    }
  };

  const handleChoice = (choice) => {
    if (!isBoatSet) {
      if (choice == "a") setBoat("flying_candy");
      else if (choice == "b") setBoat("black_dragon");

      setIsBoatSet(true);
    }

    setPageNb(pageNb + 1);
    pageNb++;

    setTarget(choice);
  };

  const getImgUrl = (variations, pageNb, target) => {
    if (!variations) {
      return "/pages/" + pageNb + "/" + target + ".jpg";
    } else {
      return "/pages/" + pageNb + "/" + target + "-" + boat + ".jpg";
    }
  };

  const getNextTargets = (choices) => {
    if (choices) {
      let targets = [];
      choices.forEach((choice) => {
        targets.push(choice.target);
      });
      setNextTargets(targets);
    }

    updateNextPages();
  };

  const updateNextPages = () => {
    let nextPagesTemp = [];
    const nextPageNb = pageNb + 1;
    nextTargets.forEach((nextTarget) => {
      const onePage = {
        text: storyData[nextPageNb][nextTarget].text,
        choices: storyData[nextPageNb][nextTarget].choices,
        imgUrl: getImgUrl(
          storyData[nextPageNb][nextTarget].variations,
          nextPageNb,
          nextTarget
        ),
      };
      nextPagesTemp.push(onePage);
    });
    setNextPages(nextPagesTemp);
  };

  return (
    <div className="App" style={styles.app}>
      {/* Current page */}
      <div className="current-page">
        <Page
          imgUrl={imgUrl}
          story={story}
          choices={choices}
          emitChoice={handleChoice}
        />
      </div>
      {/* Next pages */}
      <div className="next-pages">
        {nextPages.map((page) => (
          <Page
            key={page.text}
            imgUrl={page.imgUrl}
            story={page.text}
            choices={page.choices}
            emitChoice={handleChoice}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
