const express = require("express");
const mongoClient = require("mongodb").MongoClient;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoClient.connect("mongodb://127.0.0.1:27017/ems", (err, client) => {
  if (err) return console.error(err);
  console.log("Connected to Database");
});

app.get("/", (request, response) => {
  response.send("hello world");
});

app.post("/signup", (req, res) => {
  res.send("posted data: " + JSON.stringify(req.body));
});

app.listen(4000, () => {
  console.log("Server is listening at port 3000 (http://localhost:4000/).");
});
