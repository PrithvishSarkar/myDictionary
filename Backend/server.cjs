/*
Backend Portion
Using 'Mongoose' to connect to MongoDB
Using 'Express' server
*/

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

// Using 'dotenv' for Environment Variables
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT;
const URI = process.env.DATABASE_URI;

// Connecting to 'MongoDB Atlas'
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.info("Connected to MongoDB!"))
  .catch((err) => console.error("Connection Error: ", err));

const schema = new mongoose.Schema(
  {
    word: String,
    date: { type: String, default: () => new Date().toDateString() },
    time: { type: String, default: () => new Date().toLocaleTimeString() },
  },
  { collection: "dictionaryAppSearchHistory" }
);
const Word = mongoose.model("dictionaryAppSearchHistory", schema);

// A 'POST' request is required to send searched word to Database
// This request is triggered when the user hits on 'Enter' button from the keyboard
app.post("/", async (req, res) => {
  const { data } = req.body;
  try {
    await Word.create({ word: data });
    res.json({ status: "Success", message: "Data Sent to Database!" });
    console.info("Data Sent to Database!");
  } catch (err) {
    console.error("Database POST Error: ", err);
  }
});

// A 'GET' request is required to send searched words history from Database to Frontend
// This request is triggered when the user clicks on 'Get Your Search History' button
app.get("/searchHistory", async (_, res) => {
  try {
    const storedData = await Word.find();
    res.json(JSON.stringify(storedData));
  } catch (err) {
    console.error("Database GET Error: ", err);
  }
});

// A 'POST' request is required to delete all the Documents in MongoDB Atlas
// This request is triggered when the user clicks on 'Delete' button in Delete Modal
app.post("/searchHistory", async (req, res) => {
  try {
    const { value } = req.body;
    value === true && (await Word.deleteMany({}));
    res.json({ status: "Success", message: "Database Documents Deleted!" });
    console.info("Database Documents Deleted!");
  } catch (err) {
    console.error("Database Delete Error: ", err);
  }
});

app.listen(PORT, () => console.info(`Listening to port ${PORT}`));
