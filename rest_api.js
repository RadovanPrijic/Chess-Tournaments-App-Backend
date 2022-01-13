const express = require('express');
const { sequelize } = require('./models');
const cors = require('cors');
const PORT = 8500;

const users = require('./routes/users');
const tournaments = require('./routes/tournaments');
const organisers = require('./routes/organisers');
const results = require('./routes/results');

const app = express();

var corsOptions = {
    origin: 'http://127.0.0.1:8200',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.use('/admin', users);
app.use('/admin', tournaments);
app.use('/admin', organisers);
app.use('/admin', results);

sequelize.authenticate()
    .then(() => console.log('Konektovani ste na bazu.'))
    .catch(err => console.log('Greska: ' + err));

app.listen(PORT, () => {
    console.log(`REST servis je pokrenut: http://127.0.0.1:${PORT}`)
});