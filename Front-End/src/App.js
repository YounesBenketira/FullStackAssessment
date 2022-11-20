import { useEffect, useRef, useState } from "react";

import useHttp from "./hooks/use-http";

function App() {
  const [contentType, setContentType] = useState("people");
  const nameSearchRef = useRef("");

  const {
    people,
    planets,
    starships,
    isLoading,
    getPeople,
    getPlanets,
    getStarships,
    getPerson,
    getAllPeople,
    getAllPlanets,
    getAllStarships,
  } = useHttp();

  useEffect(() => {
    getPeople();
    getPlanets();
    getStarships();
  }, []);

  const LoadingBar = (
    <div className="flex justify-center items-center col-span-5 h-20 bg-gray-100 border-2 border-gray-300 rounded-xl">
      <h1>Loading...</h1>
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center">
      {/* Navbar */}
      <div className="w-full h-16 flex justify-center  shadow-md">
        <div className="w-[70vw] h-full flex justify-center items-center">
          <h1 className="font-semibold text-3xl">
            <span className="text-green-400 ">FlightHub</span> Assessment
          </h1>
        </div>
      </div>
      {/* Selections */}
      <div className="flex gap-14 text-xl mt-5">
        <button
          className={`hover:bg-green-200 active:bg-green-300 p-3 rounded-xl ${
            contentType === "people" ? "bg-green-300" : ""
          }`}
          onClick={() => {
            setContentType("people");
          }}
        >
          People
        </button>
        <button
          className={`hover:bg-green-200 active:bg-green-300 p-3 rounded-xl ${
            contentType === "planets" ? "bg-green-300" : ""
          }`}
          onClick={() => {
            setContentType("planets");
          }}
        >
          Planets
        </button>
        <button
          className={`hover:bg-green-200 active:bg-green-300 p-3 rounded-xl ${
            contentType === "starships" ? "bg-green-300" : ""
          }`}
          onClick={() => {
            setContentType("starships");
          }}
        >
          Starships
        </button>
      </div>
      {/* People */}
      <div
        className={`flex flex-col gap-5 mt-8 items-center w-7/12 ${
          contentType === "people" ? "block" : "hidden"
        }`}
      >
        <h1 className="text-4xl font-bold w-full text-center">
          List of People
        </h1>
        <div className="flex flex-row-reverse gap-5 w-full">
          <button
            className="px-5 bg-green-300 rounded-xl hover:bg-green-400"
            onClick={() => {
              const name = nameSearchRef.current.value;
              getPerson(name);
            }}
          >
            Search
          </button>
          <input
            type="text"
            className="border-2 border-gray-300 py-2 px-5 rounded-xl "
            ref={nameSearchRef}
          ></input>
        </div>

        <div className="grid grid-cols-5 gap-5 w-full">
          {isLoading ? LoadingBar : people.map((person) => (
            <div
              key={`${person.name} ${person.mass}`}
              className="flex flex-col p-5 shadow-md hover:shadow-xl border-2 border-gray-200 rounded-xl"
            >
              <h2 className="text-lg font-semibold">{person.name}</h2>
              <h5 className="text-md">Gender: {person.gender}</h5>
              <h5 className="text-md">Height: {person.height}cm</h5>
              <h5 className="text-md">Weight: {person.mass}kg</h5>
              <h5 className="text-md">Hair Color: {person.hair_color}</h5>
              <h5 className="text-md">Eye Color: {person.eye_color}</h5>
            </div>
          ))}
        </div>
        <button
          className="flex justify-center items-center border-2 w-36 h-14 text-lg border-gray-200 hover:bg-gray-100 active:bg-gray-200 rounded-xl"
          onClick={getAllPeople}
        >
          Load More
        </button>
      </div>
      {/* Planets */}
      <div
        className={`flex flex-col gap-10 mt-8 items-center ${
          contentType === "planets" ? "block" : "hidden"
        }`}
      >
        <h1 className="text-4xl font-bold w-full text-center">
          List of Planets
        </h1>
        <div className="grid grid-cols-5 gap-5 w-8/12">
          {planets.map((planet) => (
            <div
              key={planet.name}
              className="flex flex-col p-5 shadow-md hover:shadow-xl border-2 border-gray-200 rounded-xl"
            >
              <h2 className="text-lg font-semibold">{planet.name}</h2>
              <h5 className="text-md">Population: {planet.population}</h5>
              <h5 className="text-md">Terrain: {planet.terrain}</h5>
              <h5 className="text-md">Diameter: {planet.diameter}</h5>
              <h5 className="text-md">Gravity: {planet.gravity}</h5>
            </div>
          ))}
        </div>
        <button
          className="flex justify-center items-center border-2 w-36 h-14 text-lg border-gray-200 hover:bg-gray-100 active:bg-gray-200 rounded-xl"
          onClick={getAllPlanets}
        >
          Load More
        </button>
      </div>
      {/* Starships */}
      <div
        className={`flex flex-col gap-10 mt-8 items-center ${
          contentType === "starships" ? "block" : "hidden"
        }`}
      >
        <h1 className="text-4xl font-bold w-full text-center">
          List of Starships
        </h1>
        <div className="grid grid-cols-5 gap-5 w-8/12">
          {starships.map((starship) => (
            <div
              key={starship.name}
              className="flex flex-col p-5 shadow-md hover:shadow-xl border-2 border-gray-200 rounded-xl"
            >
              <h2 className="text-lg font-semibold">{starship.name}</h2>
              <h5 className="text-md">Crew: {starship.crew}</h5>
              <h5 className="text-md">Length: {starship.length}</h5>
              <h5 className="text-md">Model: {starship.model}</h5>
              <h5 className="text-md">Passengers: {starship.passengers}</h5>
              <h5 className="text-md">Class: {starship.starship_class}</h5>
            </div>
          ))}
        </div>
        <button
          className="flex justify-center items-center border-2 w-36 h-14 text-lg border-gray-200 hover:bg-gray-100 active:bg-gray-200 rounded-xl"
          onClick={getAllStarships}
        >
          Load More
        </button>
      </div>
    </div>
  );
}

export default App;
