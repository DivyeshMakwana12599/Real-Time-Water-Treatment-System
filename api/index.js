const express = require("express");

const app = express();
const homepage = require("./routes/homepage");


app.use("/", homepage);
// app.use("/api/City")

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on PORT: ${port}...`));