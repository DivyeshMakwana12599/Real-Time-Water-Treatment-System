const express = require("express");
const mongoose = require("mongoose");
const homepage = require("./routes/homepage");
const pipe = require("./routes/pipe");

const app = express();

app.use("/", homepage);
app.use("/api/pipe", pipe);

const port = process.env.PORT || 3000;

mongoose
  .connect("mongodb://localhost/pipe-data")
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.error("Error connecting to server...", err));

app.listen(port, () => console.log(`listening on PORT: ${port}...`));
