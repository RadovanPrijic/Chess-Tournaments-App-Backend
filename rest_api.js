const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 5000;

//const users = require('./routes/users');
//const tournaments = require('./routes/tournaments');
//const organisers = require('./routes/organisers');
//const results = require('./routes/results');
//app.use('/admin', users);
//app.use('/admin', tournaments);
//app.use('/admin', organisers);
//app.use('/admin', results);
//app.use(bodyParser.json());

//app.use(express.static(path.join(__dirname, 'static'))); 
// Ovo je za komunikaciju sa GUI-jem posle.

const { sequelize } = require('./models');
const sequelize = new Sequelize('chess_database', 'root', null, {
    host: '127.0.0.1',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => console.log('Database connected.'))
    .catch(err => console.log('Error: ' + err));

app.get('/', (req, res) => {
    res.send('Welcome to the homepage!')
});

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`)
});

