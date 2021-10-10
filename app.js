const express = require("express");
const Mongoose = require("mongoose");
const routes = require("./routes/routes");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();
const connectionString = "mongodb://127.0.0.1:27017/ems";

app.use(cors(corsOptions));
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "https://localhost:3000"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Mongoose.connect(connectionString)
  .then(() => {
    console.log("MongoDatabase Connected.");
  })
  .catch((error) => handleError(error));

app.use("/", routes);

app.listen(4000, () => {
  console.log("Server is listening at port 4000 (http://localhost:4000/).");
});
