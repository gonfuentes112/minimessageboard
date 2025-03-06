const path = require("path");
const express = require("express");
const app = express();

const indexRouter = require("./routes/indexRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}))

app.use("/", indexRouter);

app.use((req, res) => {
  res.status(404).send("Page not found");
});

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
