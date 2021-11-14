import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCards.js";
import Cors from "cors";

// App Config

const app = express(); //craete instance

const port = process.env.PORT || 8001;

const connection_url =
  "mongodb+srv://admin:gxa3zWgQSLi8BvPL@cluster0.6anvo.mongodb.net/tinderdb?retryWrites=true&w=majority";

//Middlewares
app.use(express.json());
app.use(Cors());

//DB config

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// const connection = mongoose.connection;

// connection.once("open", function () {
//   console.log("MongoDB database connection established successfully");
// });

//API Endpoints

// ## go root url, callback func
app.get("/", (req, res) => res.status(200).send("Hello World"));

// add data to db, endpoint /tinder/card
app.post("/tinder/cards", (req, res) => {
  // save request body
  const dbCard = req.body;

  //   function to create a new document
  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    } else {
      // 201 means created, successfully created our data and send back the data
      res.status(201).send(data);
    }
  });
});

// another endpoint (the same) which will download data from the db
// with this will be retrieving every single thing from the collection DB that we just created

app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      // set response to 500, which means internal server error and send error back
      res.status(500).send(err);
    } else {
      // 200 means found
      res.status(200).send(data);
    }
  });
});

//Listener

app.listen(port, () => console.log(`Listening on localhost: ${port}`));
