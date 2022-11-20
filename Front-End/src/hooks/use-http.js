import { useState, useCallback } from "react";

const useHttp = () => {
  const BACKEND_URL = "http://localhost:8080/";

  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [starships, setStarships] = useState([]);

  // const [error, setError] = useState();
  const sendRequest = async (urlExt) => {
    // setError(null);
    try {
      const response = await fetch(BACKEND_URL + urlExt);

      if (!response.ok) throw new Error("Something went wrong!");

      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error.message);
      // setError(error.message);
    }
  };

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
    setPeople([]);
    sendRequest("allpeople/").then((data) => setPeople(data));
  };

  const getAllPlanets = () => {
    setPlanets([]);
    sendRequest("allplanets/").then((data) => setPlanets(data));
  };

  const getAllStarships = () => {
    setStarships([]);
    sendRequest("allstarships/").then((data) => setStarships(data));
  };

  return {
    people,
    planets,
    starships,
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
