import { useState, useCallback } from "react";

const useHttp = () => {
  const BASE_URL = "https://swapi.dev/api/";

  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [starships, setStarships] = useState([]);

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(async (urlExt) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(BASE_URL + urlExt);

      if (!response.ok) throw new Error("Something went wrong!");

      const data = await response.json();

      return data;
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, []);

  const sendPaginatedRequest = async (
    url,
    page = 1,
    maxPage,
    previousResponse = [],
    handlerFnc
  ) => {
    if (page > maxPage) {
      handlerFnc(previousResponse);
      return;
    } // Base case: if reached last page, setPeople to accumulated data

    return fetch(BASE_URL + url + `/?page=${page}`) // Append the page number to the base URL
      .then((response) => response.json())
      .then((newResponse) => {
        const response = [...previousResponse, ...newResponse.results]; // Combine the two arrays

        if (newResponse.length !== 0) {
          page++;

          return sendPaginatedRequest(url, page, maxPage, response, handlerFnc);
        }
      });
  };

  // 4 Default Endpoints
  const getPeople = () => {
    sendRequest("people/").then((data) => setPeople(data.results));
  };

  const getPlanets = () => {
    sendRequest("planets/").then((data) => setPlanets(data.results));
  };

  const getStarships = () => {
    sendRequest("starships/").then((data) => setStarships(data.results));
  };

  const getPerson = (name) => {
    sendRequest("people/?search=" + name).then((data) =>
      setPeople(data.results)
    );
  };

  // Extra Endpoints
  const getAllPeople = () => {
    sendPaginatedRequest("people", 1, 9, [], setPeople);
  };

  const getAllPlanets = (url, page = 1, previousResponse = []) => {
    sendPaginatedRequest("planets", 1, 6, [], setPlanets);
  };

  const getAllStarships = (url, page = 1, previousResponse = []) => {
    sendPaginatedRequest("starships", 1, 4, [], setStarships);
  };

  return {
    people,
    planets,
    starships,
    isLoading,
    error,
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
