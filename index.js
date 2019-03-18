// implement your API here
const express = require('express');
const db = require('./data/db')
const server = express();



server.listen(4000, () => console.log(`Running on port 4000`))