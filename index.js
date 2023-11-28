// Loads .env file contents into process.env by default by calling .config()
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./Routes/router");
require("./DB/connection");

// Creates an express application
const pfServer = express();

// Data sharing between client-server
pfServer.use(cors());

// To parse json
pfServer.use(express.json());

pfServer.use(router);

// to make the images visible in front end
pfServer.use("/uploads", express.static("./uploads"));

// Assign a port no. for server or available port
const PORT = 4000 || process.env.PORT;

// Running server
pfServer.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT} and waiting for requests`);
});

// http get request resolving to http://localhost:4000/
pfServer.get("/", (req, res) => {
  res.send(`<h1>Project Fair server started and waiting for requests!!!<h1/>`);
});
