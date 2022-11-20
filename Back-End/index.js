const express = require("express");
const app = express();
const PORT = 8080;

const BASE_URL = "https://swapi.dev/api";

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Since react development server uses port 3000, to avoid CORS errors I needed to update the headers
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(PORT);

const sendRequest = (urlExt, res) => {
  fetch(BASE_URL + urlExt)
    .then((response) => response.json())
    .then((data) => res.status(200).send(data));
};

// 4 Default End-Points
app.get("/people", (req, res) => {
  sendRequest(req.url, res);
});

app.get("/planets", (req, res) => {
  sendRequest(req.url, res);
});

app.get("/starships", (req, res) => {
  sendRequest(req.url, res);
});

app.get("/people/:name", (req, res) => {
  const name = req.params.name;
  const urlExt = "/people/?search=" + name;

  sendRequest(urlExt, res);
});

// Extra End-Points
const sendPaginatedRequest = async (
  url,
  page = 1,
  maxPage,
  previousResponse = [],
  res
) => {
  if (page > maxPage) {
    res.status(200).send(previousResponse);
    return;
  } // Base case: if reached last page, setPeople to accumulated data

  try {
    return fetch(BASE_URL + url + `/?page=${page}`) // Append the page number to the base URL
      .then((response) => response.json())
      .then((newResponse) => {
        const response = [...previousResponse, ...newResponse.results]; // Combine the two arrays

        if (newResponse.length !== 0) {
          page++;

          return sendPaginatedRequest(url, page, maxPage, response, res);
        }
      });
  } catch (error) {
    setError(error.message);
  }
};

app.get("/allpeople/", (req, res) => {
  sendPaginatedRequest("/people", 1, 9, [], res); // 82 entries, 9 pages
});

app.get("/allplanets/", (req, res) => {
  sendPaginatedRequest("/planets", 1, 6, [], res); // 60 entries, 6 pages
});

app.get("/allstarships/", (req, res) => {
  sendPaginatedRequest("/starships", 1, 4, [], res); // 36 entries, 4 pages
});
