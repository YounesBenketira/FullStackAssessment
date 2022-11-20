import { useState, useCallback } from "react";

const useHttp = () => {
  const BASE_URL = "http://localhost:8080/";

  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [starships, setStarships] = useState([]);

  // const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(async (urlExt) => {
    setIsLoading(true);
    // setError(null);
    try {
      const response = await fetch(BASE_URL + urlExt);

      if (!response.ok) throw new Error("Something went wrong!");

      const data = await response.json();

      setIsLoading(false);
      return data;
    } catch (error) {
      // setError(error.message);
      setIsLoading(false);
    }
  }, []);

  // 4 Default Queries
  const getPeople = () => {
    sendRequest("people/").then((peopleData) => setPeople(peopleData.results));
  };

  const getPlanets = () => {
    sendRequest("planets/").then((planetData) =>
      setPlanets(planetData.results)
    );
  };

  const getStarships = () => {
    sendRequest("starships/").then((starshipData) =>
      setStarships(starshipData.results)
    );
  };

  const getPerson = (name) => {
    sendRequest("people/" + name).then((data) => setPeople(data.results));
  };

  // Extra Queries
  const getAllPeople = () => {
    sendRequest("allpeople/").then((data) => setPeople(data));
  };

  const getAllPlanets = (url, page = 1, previousResponse = []) => {
    sendRequest("allplanets/").then((data) => setPlanets(data));
  };

  const getAllStarships = (url, page = 1, previousResponse = []) => {
    sendRequest("allstarships/").then((data) => setStarships(data));
  };

  return {
    people,
    planets,
    starships,
    isLoading,
    // error,
    getPeople,
    getPlanets,
    getStarships,
    getPerson,
    getAllPeople,
    getAllPlanets,
    getAllStarships,
  };
};

export default useHttp;
