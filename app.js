const express = require("express");
const Mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("./routes/routes");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

dotenv.config();
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
Mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Mongo Database Connected.");
  })
  .catch((error) => {
    console.log("Mongo Failed to Connect...\n", error);
  });

app.use("/", routes);

app.listen(4000, () => {
  console.log("Server is listening at port 4000 (http://localhost:4000/).");
});
