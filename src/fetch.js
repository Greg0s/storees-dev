const fetchData = async (route = "") => {
  try {
    const response = await fetch("http://localhost:3001/" + route); // Remplacez l'URL par celle que vous souhaitez utiliser.
    if (!response.ok) {
      throw new Error("La requête a échoué");
    }

    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
};

export default fetchData;
