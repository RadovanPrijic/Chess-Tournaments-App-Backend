const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 5000;
app.use(bodyParser.json());

const { Sequelize } = require('sequelize');
const database = new Sequelize('chessdatabase', 'postgres', '12345', { //TODO Ovde upisati potrebno!
    host: 'localhost',
    dialect: 'postgres'
});

database.authenticate
    .then(() => console.log('Database connected.'))
    .catch(err => console.log('Error: ' + err));

app.get('/', (req, res) => {
    res.send('Welcome to the homepage!')
});

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`)
});

