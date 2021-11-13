import express from 'express';
import mongoose from 'mongoose';

// App Config

const app = express(); //craete instance

const port = process.env.PORT || 8001;

//Middlewares

//DB config

//API Endpoints

app.get('/', (req, res) => res.status(200).send('Hello World'));

//Listener

app.listen(port, () => console.log(`Listening on localhost: ${port}`));
