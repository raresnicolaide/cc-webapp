const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const universitiesRouter = require("./routers/universitiesRouter");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/universities", universitiesRouter);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
